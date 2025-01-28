import { View, Text, Image, StatusBar, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, TextInput, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import Fields from "../../components/Fields";
import Buttons from "../../components/Buttons";
import { useDispatch } from "react-redux";
import { login } from "../../app-states/features/userSlice";
import Toast from 'react-native-toast-message';
import axios from 'axios';
import { apiUrl } from "../../apiUrl";

const ResetVerification = ({route, navigation}) => {
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState("")
  
  const {email, password} = route.params;


  const verifyCode = async () => {
    setLoading(true);
    try {
        const response = await axios.post(`${apiUrl}/api/verify-code/`, {
            "email": email,
            "code": code
           })
        const data = response.data;
        resetPassword();
        navigation.navigate("Login")
        console.log(data)

    } catch (error) {
        console.log(error.response.data)
    }finally{
        setLoading(false)
    }
  }

  const resetPassword = async () => {
    try {
        const response = await axios.post(`${apiUrl}/api/reset-password/`,{
            "email": email,
            "password": password,
        })
        const data = response.data;
        console.log(data)
        Toast.show({
            type: 'success', 
            text1: 'Password reset successfully',
            text2: 'You can now log in your account.', 
        }); 
    } catch (error) {
        console.log(error.response.data)
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View className={`bg-primary w-full max-h-[300px] rounded-b-[50px] py-5`}>
            <Image
              source={require("../../assets/images/login.png")}
              resizeMode="contain"
              className="w-full h-full"
            />
          </View>

          <View className="justify-center items-center mx-2 px-3 mt-10">
            <Text className="font-fitBold w-full text-center text-medium text-primary">
              Password Reset Verification
            </Text>
            <View className="w-full mt-5 px-4 border rounded-lg border-gray" style={{paddingVertical:10}}>
              <TextInput className="font-fitRegular" onChangeText={(e) => setCode(e)} placeholder="Enter Code Here"/>
            </View>
            {description ? <Text className="text-center mt-3 text-red-500 text-xs font-magBold">{description}</Text> : <Text style={{color:"rgba(0,0,0,0.6)"}} className="text-center mt-3 text-sm font-fitMedium">A code has been sent to your email</Text>}
          </View>
          <TouchableOpacity onPress={verifyCode}>
            <View className="bg-primary items-center w-fit mx-5 mt-4 rounded-lg" style={{paddingVertical:15}}>
              <Text className="text-white font-fitMedium">Enter Code</Text>
            </View>
          </TouchableOpacity>
          <StatusBar backgroundColor={"#0064AB"} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default ResetVerification