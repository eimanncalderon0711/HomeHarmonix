import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { Chat } from '../screens';
import SendMessage from '../screens/client-screens/chat-screens/SendMessage';

const Stack = createStackNavigator();

const ChatStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name='Chat' component={Chat}/>
      <Stack.Screen name='SendMessage' component={SendMessage}/>
    </Stack.Navigator>
  )
}

export default ChatStack;