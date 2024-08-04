import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Checkbox } from 'react-native-paper';
import { ScheduleContext } from '../ScheduleContext';
import BottomSheetComponent from './BottomSheet';

const Task = ({ task, onToggle, isChecked }) => (
  <View style={styles.taskContainer}>
    <Checkbox
      status={isChecked ? 'checked' : 'unchecked'}
      onPress={onToggle}
    />
    <Text style={styles.task}>{task}</Text>
  </View>
);

const WeekScreen = () => {
  const { weeklySchedule } = useContext(ScheduleContext);
  const [taskStatus, setTaskStatus] = useState({});

  const toggleTaskStatus = (day, index) => {
    setTaskStatus(prevStatus => ({
      ...prevStatus,
      [day]: {
        ...prevStatus[day],
        [index]: !prevStatus[day]?.[index]
      }
    }));
  };

  return (
    <>
      <View style={styles.header}>
        <BottomSheetComponent />
      </View>
    <View style={styles.container}>
      {Object.keys(weeklySchedule).map(day => (
        <View key={day} style={styles.dayContainer}>
          <Text style={styles.day}>{day}</Text>
          {weeklySchedule[day].map((task, index) => (
            <Task
              key={index}
              task={task}
              isChecked={taskStatus[day]?.[index] || false}
              onToggle={() => toggleTaskStatus(day, index)}
            />
          ))}
        </View>
      ))}
    </View>
    </>
  );  
};

const styles = StyleSheet.create({
    header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#242423',
    backgroundColor: '#F5CB5C',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#242423', 
    paddingRight: 5,
  },
  container: {
    padding: 16,
    backgroundColor: '#E8EDDF',
  },
  dayContainer: {
    marginBottom: 16,
  },
  day: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#242423',
  },
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  task: {
    fontSize: 16,
    color: '#333533',
    marginLeft: 8,
  },
});

export default WeekScreen;
