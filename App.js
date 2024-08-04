import { NavigationContainer } from '@react-navigation/native';

import { createStackNavigator } from '@react-navigation/stack';
import { ProgramProvider } from './ScheduleContext';

import WeekScreen from './pages/WeekScreen';
import InputScreen from './pages/InputScreen';
import WorkTime from './pages/WorkTime';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <ProgramProvider>
        <Stack.Navigator>
          <Stack.Screen name="InputScreen" component={InputScreen} options={{ headerShown: false }} />
          <Stack.Screen name="WorkTime" component={WorkTime} options={{ headerShown: false }} />
          <Stack.Screen name="WeekScreen" component={WeekScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      </ProgramProvider>
    </NavigationContainer>
  );
};

export default App;
