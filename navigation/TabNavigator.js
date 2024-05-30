import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import TextInputPage from '../pages/TextInputPage';
import MicrophonePage from '../pages/MicrophonePage';

const Tab = createBottomTabNavigator();

export default function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          if (route.name === 'Text') {
            iconName = focused ? 'document-text' : 'document-text-outline';
          } else if (route.name === 'Microphone') {
            iconName = focused ? 'mic' : 'mic-outline';
          }
          // You can return any component that you like here!
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: 'bold',
        },
      })}
      tabBarOptions={{
        activeTintColor: '#e60000',
        inactiveTintColor: 'gray',
      }}>
      <Tab.Screen name="Text" component={TextInputPage} />
      <Tab.Screen name="Microphone" component={MicrophonePage} />
    </Tab.Navigator>
  );
}
