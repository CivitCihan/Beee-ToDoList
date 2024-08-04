import React, { useContext, useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { ScheduleContext } from '../ScheduleContext';
import { generateSchedule } from '../ScheduleGenerator';
import BottomSheetComponent from './BottomSheet';

const WorkTime = ({ route, navigation }) => {
  const { numSubjects, workHours, breakHours, intensity } = route.params;
  const { weeklySchedule, setWeeklySchedule } = useContext(ScheduleContext);
  const [dailySchedule, setDailySchedule] = useState(generateSchedule(numSubjects, workHours, breakHours, intensity));
  const [editingIndex, setEditingIndex] = useState(null);
  const [newSessionName, setNewSessionName] = useState('');

  const handleAddToDay = (day) => {
    setWeeklySchedule((prevSchedule) => ({
      ...prevSchedule,
      [day]: dailySchedule.Pzt,
    }));
  };

  const handleEditSession = (index) => {
    setEditingIndex(index);
    setNewSessionName(dailySchedule.Pzt[index]);
  };

  const handleSaveSession = () => {
    const updatedSessions = [...dailySchedule.Pzt];
    updatedSessions[editingIndex] = newSessionName;
    setDailySchedule({ Pzt: updatedSessions });
    setEditingIndex(null);
    setNewSessionName('');
  };

  return (
    <>
      <View style={styles.header}>
        <BottomSheetComponent />
      </View>
      <View style={styles.container}>
        <ScrollView>
          <Text style={styles.label}>Günlük Program</Text>
          {dailySchedule.Pzt.map((session, index) => (
            <View key={index} style={styles.sessionContainer}>
              {editingIndex === index ? (
                <View style={styles.editContainer}>
                  <TextInput
                    style={styles.input}
                    value={newSessionName}
                    onChangeText={setNewSessionName}
                  />
                  <Button title="Kaydet" onPress={handleSaveSession} color="#4CAF50" />
                </View>
              ) : (
                <TouchableOpacity onPress={() => handleEditSession(index)}>
                  <Text style={styles.session}>{session}</Text>
                </TouchableOpacity>
              )}
            </View>
          ))}
          <Text style={styles.label}>Programı Hangi Güne Eklemek İstersiniz?</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollViewContainer}>
            <View style={styles.daysContainer}>
              {Object.keys(weeklySchedule).map((day, index) => (
                <TouchableOpacity key={index} style={styles.dayButton} onPress={() => handleAddToDay(day)}>
                  <Text style={styles.dayButtonText}>{day}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
          <Button title="Haftalık Programa Geç" onPress={() => navigation.navigate('WeekScreen')} color="#F5CB5C" />
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 45,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#242423',
    backgroundColor: '#F5CB5C',
  },
  container: {
    paddingTop: 10,
    flex: 1,
    backgroundColor: '#E8EDDF',
    paddingHorizontal: 16,
  },
  label: {
    fontSize: 18,
    color: '#242423',
    marginBottom: 10,
  },
  sessionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  session: {
    backgroundColor: '#fff',
    fontSize: 16,
    color: '#333',
    padding: 5,
    borderWidth: 1, 
    borderRadius: 5,
  },
  editContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    flex: 1,
    marginRight: 10,
  },
  scrollViewContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  daysContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  dayButton: {
    backgroundColor: '#F5CB5C',
    padding: 10,
    marginHorizontal: 3,
    borderWidth: 1,
    borderRadius: 5,
  },
  dayButtonText: {
    color: '#242423',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default WorkTime;
