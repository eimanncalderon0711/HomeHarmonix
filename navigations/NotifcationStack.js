import { createStackNavigator } from '@react-navigation/stack';
import {Notification, EditProfile, MyTask } from '../screens';
import ServiceDetails from '../screens/service-details-screen/ServiceDetails'
import TaskStack from './TaskStack';


const Stack = createStackNavigator();

function NotificationStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name="Notifications" component={Notification} />
      <Stack.Screen name="Service Details" component={ServiceDetails} />
      <Stack.Screen name="My Task" component={MyTask} />
    </Stack.Navigator>
  );
}

export default NotificationStack;