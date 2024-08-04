import React, { createContext, useState } from 'react';

export const ScheduleContext = createContext();

export const ProgramProvider = ({ children }) => {
  const [weeklySchedule, setWeeklySchedule] = useState({
    Pzt: [],
    Sal: [],
    Çar: [],
    Per: [],
    Cum: [],
    Cmt: [],
    Paz: []
  });

  return (
    <ScheduleContext.Provider value={{ weeklySchedule, setWeeklySchedule }}>
      {children}
    </ScheduleContext.Provider>
  );
};
