export const generateSchedule = (numSubjects, workHours, breakHours, intensity) => {
    const schedule = {
      Pzt: [],
      Sal: [],
      Çar: [],
      Per: [],
      Cum: [],
      Cmt: [],
      Paz: []
    };
  
    const intensityBreaks = {
      kolay: 20,
      normal: 15,
      zor: 10,
      'çok zor': 5
    };
  
    const breakTime = intensityBreaks[intensity] || 15;
  
    const [workStart, workEnd] = workHours.split('-');
    const [workStartHour, workStartMinute] = workStart.split(':').map(Number);
    const [workEndHour, workEndMinute] = workEnd.split(':').map(Number);
  
    const workStartMinutes = workStartHour * 60 + workStartMinute;
    const workEndMinutes = workEndHour * 60 + workEndMinute;
  
    let breakStartHour = 0, breakStartMinute = 0, breakEndHour = 0, breakEndMinute = 0;
  
    if (breakHours) {
      const [breakStart, breakEnd] = breakHours.split('-');
      [breakStartHour, breakStartMinute] = breakStart.split(':').map(Number);
      [breakEndHour, breakEndMinute] = breakEnd.split(':').map(Number);
    }
  
    const breakStartMinutes = breakStartHour * 60 + breakStartMinute;
    const breakEndMinutes = breakEndHour * 60 + breakEndMinute;
  
    const effectiveWorkMinutes = (workEndMinutes - workStartMinutes) - (breakEndMinutes - breakStartMinutes);
    const workPerSubject = Math.floor((effectiveWorkMinutes - (breakTime * (numSubjects - 1))) / numSubjects);
    const adjustedWorkPerSubject = Math.floor((effectiveWorkMinutes - (breakTime * (numSubjects - 1))) / numSubjects);
  
    const generateDailySchedule = () => {
      const dailySchedule = [];
      let currentHour = workStartHour;
      let currentMinute = workStartMinute;
      let currentMinutes = workStartMinutes;
  
      for (let i = 0; i < numSubjects; i++) {
        let subjectTime = adjustedWorkPerSubject;
  
        if (currentMinutes < breakStartMinutes && (currentMinutes + workPerSubject) > breakStartMinutes) {
          const firstHalfMinutes = breakStartMinutes - currentMinutes;
          const secondHalfMinutes = subjectTime - firstHalfMinutes;
          const start = `${String(currentHour).padStart(2, '0')}:${String(Math.floor(currentMinute)).padStart(2, '0')}`;
  
          currentMinutes = breakStartMinutes;
          currentHour = breakEndHour;
          currentMinute = breakEndMinute;
  
          dailySchedule.push(`Ders ${i + 1} (1. Yarı): ${start} - ${String(breakStartHour).padStart(2, '0')}:${String(Math.floor(breakStartMinute)).padStart(2, '0')}`);
          dailySchedule.push(`Öğle Molası: ${String(breakStartHour).padStart(2, '0')}:${String(Math.floor(breakStartMinute)).padStart(2, '0')} - ${String(breakEndHour).padStart(2, '0')}:${String(Math.floor(breakEndMinute)).padStart(2, '0')}`);
  
          const secondHalfStart = `${String(currentHour).padStart(2, '0')}:${String(Math.floor(currentMinute)).padStart(2, '0')}`;
          currentMinutes += secondHalfMinutes;
          currentMinute += secondHalfMinutes;
  
          while (currentMinute >= 60) {
            currentMinute -= 60;
            currentHour++;
          }
  
          const secondHalfEnd = `${String(currentHour).padStart(2, '0')}:${String(Math.floor(currentMinute)).padStart(2, '0')}`;
          dailySchedule.push(`Ders ${i + 1} (2. Yarı): ${secondHalfStart} - ${secondHalfEnd}`);
        } else {
          const start = `${String(currentHour).padStart(2, '0')}:${String(Math.floor(currentMinute)).padStart(2, '0')}`;
          currentMinutes += subjectTime;
          currentMinute += subjectTime;
  
          while (currentMinute >= 60) {
            currentMinute -= 60;
            currentHour++;
          }
  
          const end = `${String(currentHour).padStart(2, '0')}:${String(Math.floor(currentMinute)).padStart(2, '0')}`;
          dailySchedule.push(`Ders ${i + 1}: ${start} - ${end}`);
        }
  
        currentMinutes += breakTime;
        currentMinute += breakTime;
  
        while (currentMinute >= 60) {
          currentMinute -= 60;
          currentHour++;
        }
      }
  
      return dailySchedule;
    };
  
    for (let day in schedule) {
      schedule[day] = generateDailySchedule();
    }
  
    return schedule;
  };
  