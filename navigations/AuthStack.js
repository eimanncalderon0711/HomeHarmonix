import { createStackNavigator } from '@react-navigation/stack';
import {Login, Register } from '../screens';
import Verification from '../screens/auth-screens/Verification';
import ForgotPassword from '../screens/auth-screens/ForgotPassword';
import ResetVerification from '../screens/auth-screens/ResetVerification';


const Stack = createStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Verification" component={Verification} />
      <Stack.Screen name="Forgot" component={ForgotPassword} />
      <Stack.Screen name="Reset" component={ResetVerification} />
    </Stack.Navigator>
  );
}

export default AuthStack;