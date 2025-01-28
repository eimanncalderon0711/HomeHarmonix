import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { Home, PostTask } from '../screens';
import ViewTasks from '../screens/ViewTasks';
import AuthStack from './AuthStack'
import PostService from '../screens/post-service-screens/PostService';
import { useSelector } from "react-redux";
import ServiceDetails from '../screens/service-details-screen/ServiceDetails';
import EditMyService from '../screens/my-service-screen/EditMyService';
import EditTask from '../screens/my-task-screen/EditTask';
import VerifyAccount from '../screens/VerifyAccount';



const Stack = createStackNavigator();

const HomeStack = () => {

  const isLogin = useSelector((state) => state.user.islogged);


  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name='Home' component={Home}/>
      <Stack.Screen name='PostTask' component={isLogin ? PostTask: AuthStack}/>
      <Stack.Screen name='PostService' component={isLogin ? PostService : AuthStack}/>
      <Stack.Screen name='Posted Tasks' component={isLogin ? ViewTasks : AuthStack}/>
      <Stack.Screen name='View Detail' component={isLogin ? ServiceDetails : AuthStack}/>
      <Stack.Screen name='Edit Service' component={isLogin ? EditMyService : AuthStack}/>
      <Stack.Screen name='Edit Task' component={isLogin ? EditTask : AuthStack}/>
      <Stack.Screen name='VerifyAccount' component={isLogin ? VerifyAccount : AuthStack}/>
    </Stack.Navigator>
  )
}

export default HomeStack;