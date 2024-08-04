import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Switch, Animated } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import BottomSheetComponent from './BottomSheet';

const InputPage = ({ navigation }) => {
  const [numSubjects, setNumSubjects] = useState('4');
  const [startHour, setStartHour] = useState('09');
  const [startMinute, setStartMinute] = useState('00');
  const [endHour, setEndHour] = useState('17');
  const [endMinute, setEndMinute] = useState('00');
  const [startBreakHour, setStartBreakHour] = useState('12');
  const [startBreakMinute, setStartBreakMinute] = useState('00');
  const [endBreakHour, setEndBreakHour] = useState('13');
  const [endBreakMinute, setEndBreakMinute] = useState('00');
  const [intensity, setIntensity] = useState('kolay');
  const [breakEnabled, setBreakEnabled] = useState(false);
  const [animatedHeight] = useState(new Animated.Value(0));

  const handleSubmit = () => {
    navigation.navigate('WorkTime', {
      numSubjects,
      workHours: `${startHour}:${startMinute}-${endHour}:${endMinute}`,
      breakHours: breakEnabled ? `${startBreakHour}:${startBreakMinute}-${endBreakHour}:${endBreakMinute}` : '',
      intensity,
    });
  };

  const toggleBreak = (value) => {
    setBreakEnabled(value);
    Animated.timing(animatedHeight, {
      toValue: value ? 150 : 0,
      duration: 350,
      useNativeDriver: false,
    }).start();
  };

  const TimePicker = ({ label, selectedHour, selectedMinute, onHourChange, onMinuteChange }) => {
    const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'));
    const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));

    return (
      <View style={Styles.timePickerContainer}>
        <Text style={Styles.label}>{label}</Text>
        <View style={Styles.pickerRow}>
          <Picker
            selectedValue={selectedHour}
            style={[Styles.picker, Styles.pickerHalf]}
            onValueChange={onHourChange}
          >
            {hours.map(hour => (
              <Picker.Item key={hour} label={hour} value={hour} />
            ))}
          </Picker>
          <Text style={Styles.colon}>:</Text>
          <Picker
            selectedValue={selectedMinute}
            style={[Styles.picker, Styles.pickerHalf]}
            onValueChange={onMinuteChange}
          >
            {minutes.map(minute => (
              <Picker.Item key={minute} label={minute} value={minute} />
            ))}
          </Picker>
        </View>
      </View>
    );
  };

  return (
    <>
      <View style={Styles.header}>
        <BottomSheetComponent />
      </View>
      <View style={Styles.container}>
        <ScrollView>
          <Text style={Styles.label}>Kaç ders saati yapılacak?</Text>
          <TextInput
            style={Styles.input}
            keyboardType="numeric"
            value={numSubjects}
            onChangeText={setNumSubjects}
          />

          <TimePicker
            label="Çalışmanın başlangıç saati"
            selectedHour={startHour}
            selectedMinute={startMinute}
            onHourChange={setStartHour}
            onMinuteChange={setStartMinute}
          />
          <TimePicker
            label="Çalışmanın bitiş saati"
            selectedHour={endHour}
            selectedMinute={endMinute}
            onHourChange={setEndHour}
            onMinuteChange={setEndMinute}
          />

          <View style={Styles.switchContainer}>
            <Text style={Styles.label}>Öğle molası ekle</Text>
            <Switch
              value={breakEnabled}
              onValueChange={toggleBreak}
              trackColor={{ false: "#CFDBD5", true: "#333533" }}
              thumbColor={breakEnabled ? "#F5CB5C" : "#333533"}
              style={Styles.switch}
            />
          </View>

          <Animated.View style={[Styles.animatedView, { height: animatedHeight }]}>
            {breakEnabled && (
              <>
                <TimePicker
                  label="Büyük molanın başlangıç saati"
                  selectedHour={startBreakHour}
                  selectedMinute={startBreakMinute}
                  onHourChange={setStartBreakHour}
                  onMinuteChange={setStartBreakMinute}
                />
                <TimePicker
                  label="Büyük molanın bitiş saati"
                  selectedHour={endBreakHour}
                  selectedMinute={endBreakMinute}
                  onHourChange={setEndBreakHour}
                  onMinuteChange={setEndBreakMinute}
                />
              </>
            )}
          </Animated.View>

          <Text style={Styles.label}>Ders çalışma zorluğu:</Text>
          <Picker
            selectedValue={intensity}
            style={Styles.picker}
            onValueChange={(itemValue) => setIntensity(itemValue)}
          >
            <Picker.Item label="Kolay" value="kolay" />
            <Picker.Item label="Normal" value="normal" />
            <Picker.Item label="Zor" value="zor" />
            <Picker.Item label="Çok Zor" value="çok zor" />
          </Picker>
        </ScrollView>
        <TouchableOpacity style={Styles.submitButton} onPress={handleSubmit}>
          <Text style={Styles.submitButtonText}>Programı Oluştur</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const Styles = StyleSheet.create({
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
    paddingTop: 10,
    flex: 1,
    backgroundColor: '#E8EDDF',
    paddingHorizontal: 16,
  },
  label: {
    fontSize: 18,
    color: '#242423',
    marginBottom: 2,
  },
  input: {
    borderWidth: 1,
    borderColor: '#333533',
    padding: 8,
    marginBottom: 16,
    borderRadius: 4,
    backgroundColor: '#CFDBD5',
  },
  picker: {
    borderWidth: 1,
    borderColor: '#333533',
    height: 50,
    width: '100%',
    backgroundColor: '#CFDBD5',
  },
  pickerHalf: {
    width: '50%',
  },
  timePickerContainer: {
    marginBottom: 16,
  },
  pickerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  colon: {
    fontSize: 18,
    color: '#242423',
    marginHorizontal: 5,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  switch: {
    alignSelf: 'flex-end',
  },
  animatedView: {
    marginBottom: 16,
  },
  submitButton: {
    backgroundColor: '#F5CB5C',
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginVertical: 10,
  },
  submitButtonText: {
    color: '#333533',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default InputPage;
