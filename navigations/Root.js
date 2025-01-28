import * as Font from 'expo-font';
import { ActivityIndicator } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from './AuthStack'
import DrawerNav from './DrawerNav'
import Booking from '../screens/booking-screen/Booking'
import { Provider, useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';
import TaskStack from './TaskStack';
import { MyTask } from '../screens';

const loadFonts = async () => {
  await Font.loadAsync({
    'Magra-Regular': require('../assets/fonts/Magra-Regular.ttf'),
    'Magra-Bold': require('../assets/fonts/Magra-Bold.ttf'),
    'Outfit-Black': require('../assets/fonts/Outfit-Black.ttf'),
    'Outfit-Bold': require('../assets/fonts/Outfit-Bold.ttf'),
    'Outfit-ExtraBold': require('../assets/fonts/Outfit-ExtraBold.ttf'),
    'Outfit-ExtraLight': require('../assets/fonts/Outfit-ExtraLight.ttf'),
    'Outfit-Light': require('../assets/fonts/Outfit-Light.ttf'),
    'Outfit-Medium': require('../assets/fonts/Outfit-Medium.ttf'),
    'Outfit-Regular': require('../assets/fonts/Outfit-Regular.ttf'),
    'Outfit-SemiBold': require('../assets/fonts/Outfit-SemiBold.ttf'),
    'Outfit-Thin': require('../assets/fonts/Outfit-Thin.ttf'),
  });
};

export default function Root() {

  const [fontsLoaded, setFontsLoaded] = useState(false);
  const isLogin = useSelector((state) => state.user.islogged);

  useEffect(() => {
    loadFonts().then(() => setFontsLoaded(true));
  }, []);


  if (!fontsLoaded) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <NavigationContainer>
      <DrawerNav/>
      <Toast />
      {/* <MyTask/> */}
      {/* <Booking/> */}
    </NavigationContainer>
  );
}

