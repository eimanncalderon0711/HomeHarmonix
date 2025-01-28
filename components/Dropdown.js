import { View, Text, TouchableOpacity, Alert } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { apiUrl } from "../apiUrl";

const Dropdown = ({navigation,handleToggle }) => {
  const user = useSelector((state) => state.user.user);

  const checkAccount = async() => {
    // navigation.navigate("PostService")
    try {
      const response = await axios.post(`${apiUrl}/api/verified-account/`, {"user" : user.id})
      const data = response.data;
      switch(data.status) {
        case 'pending':
          Alert.alert('In Progress', 'Your account verification is in progress')
          break;
        case 'accepted':
          navigation.navigate('PostService')
          break;
        case 'decline':
          Alert.alert('Oops', 'You need to verify your account first to post your service!', [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {text: 'Verify My Account', onPress: () => navigation.navigate("VerifyAccount")},
          ]);
          break;
        default:
          return
      }
    } catch (error) {
      console.log(error.response.data.error)
      Alert.alert('Oops', 'You need to verify your account first to post your service!', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'Verify My Account', onPress: () => navigation.navigate("VerifyAccount")},
      ]);
      // Alert.alert('Oops', 'You need to verify your account first to post your service!');
      handleToggle()
    }
  }
  
  return (
    <View className="z-50 absolute bottom-[-85px] rounded-l-lg rounded-b-lg p-3 px-4 right-10 bg-white">
        <TouchableOpacity className="my-2" onPress={() => {
          navigation.navigate("PostTask")
          handleToggle()
          }}>
          <Text className="text-slate-700 font-magBold font-medium">Post Task</Text>
        </TouchableOpacity>
        <TouchableOpacity className="my-2" onPress={checkAccount}>
          <Text className="text-slate-700 font-magBold font-medium">Post Service</Text>
        </TouchableOpacity>
    </View>
  );
};

export default Dropdown;
