import React, { useState } from 'react';
import { BottomSheet, ListItem } from '@rneui/themed';
import { StyleSheet, TouchableOpacity, Image, View, TouchableWithoutFeedback } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

const BottomSheetComponent = () => {
  const navigation = useNavigation();
  const [isVisible, setIsVisible] = useState(false);

  const list = [
    {
      title: 'Bilgi Giriş',
      containerStyle: { backgroundColor: '#F5CB5C', borderTopWidth: 1, borderColor: 'black' },
      titleStyle: { color: 'black' },
      onPress: () => navigation.navigate('InputScreen'),
    },
    {
      title: 'Haftalık Program',
      containerStyle: { backgroundColor: '#F5CB5C', borderTopWidth: 1, borderColor: 'black' },
      titleStyle: { color: 'black' },
      onPress: () => navigation.navigate('WeekScreen'),
    },
    {
      title: 'İptal',
      containerStyle: { backgroundColor: 'black' },
      titleStyle: { color: '#F5CB5C' },
      onPress: () => setIsVisible(false),
    },
  ];

  return (
    <SafeAreaProvider>
      <View style={styles.bottomSheetWrapper}>
        <TouchableOpacity onPress={() => setIsVisible(true)} style={styles.button}>
          <Image
            source={require('../assets/burgerBar.png')}
            style={styles.image}
          />
        </TouchableOpacity>
        <BottomSheet isVisible={isVisible} onBackdropPress={() => setIsVisible(false)}>
          {list.map((l, i) => (
            <ListItem
              key={i}
              containerStyle={l.containerStyle}
              onPress={l.onPress}
            >
              <ListItem.Content>
                <ListItem.Title style={l.titleStyle}>{l.title}</ListItem.Title>
              </ListItem.Content>
            </ListItem>
          ))}
        </BottomSheet>
      </View>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 30,
    height: 30,
    marginBottom: 10,
  },
  image: {
    width: 30,
    height: 30,
  },
  bottomSheetWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingTop: 16,
    paddingRight: 16,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default BottomSheetComponent;
