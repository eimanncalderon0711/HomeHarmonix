import { View, Text, StatusBar } from 'react-native'
import React, { useState } from 'react'
import Header from '../components/Header'
import TaskStack from '../navigations/TaskStack'
import { NavigationContainer } from "@react-navigation/native";
import { Feather, Ionicons } from "@expo/vector-icons";
import RatingModal from '../components/RatingModal';
import { useSelector } from 'react-redux';
import BookingAcceptedModal from '../components/BookingAcceptedModal';

const MyTask = ({navigation}) => {

  const [home, setHome] = useState(false);
  const rating = useSelector((state) => state.booking.rating)
  const backToHome = () => {
    navigation.navigate("HomeStack")
    setHome(false)
  }

  return (
    <View className="flex-1">
      {rating.isRating && <RatingModal setHome={setHome}/>}
      {home && <BookingAcceptedModal
      gotoTask={backToHome}
      btnTitle={"Back to Home"}
      description={"Thank you for sharing your feedback. Your review helps maintain trust and ensures better experiences for everyone."}
      status={"Review Submitted"}
      />}
      <View className="w-fit bg-white py-5 flex-row items-center justify-between px-10" style={{paddingTop:40}}>
        <Ionicons name="arrow-back-outline" size={20} color={'#0064ab'} onPress={() => navigation.goBack()}/>
        <Text className="text-primary font-fitSemiBold text-2xl">
          My Task
        </Text>
        <View></View>
      </View>
      <TaskStack navigation={navigation}/>
    </View>
  )
}

export default MyTask