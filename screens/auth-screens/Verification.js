import { View, Text, Image, StatusBar, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, TextInput, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import Toast from 'react-native-toast-message';
import axios from 'axios';
import { apiUrl } from "../../apiUrl";

const Verification = ({route, navigation}) => {

  const dispatch = useDispatch();
  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const {fullname, email, password, phone} = route.params;

  const storeRegistration = async () => {
    //set the loading true while requesting a POST method
    setLoading(true)
    try {
      const res = await axios.post( apiUrl +'/api/user/', { // POST method to store the user information in the database
        'email': email,
        'fullname': fullname,
        'password': password,
        'phone': phone
      })
      
      dispatch(register({ //save the response in the global state using redux
        id: res.data.id,
        email:res.data.email,
        fullname: res.data.fullname}))
      

    
    } catch (error) { //catch the error and save it to the error state to show the error message
      if (error.response && error.response.data){
        setError(error.response.data.message[0])
        
      }
    }finally{
      //set the loading to true after executing all the request
      setLoading(false);
    }
  }


  const verifyCode = async () => {
    //POST method request to verify code
    try {
      const response = await axios.post(`${apiUrl}/api/verify-code/`, {
        "code": code,
        "email": email,
      })
      const result = response.data; //response data
      console.log(result)

      if(response.status === 200){ // check the response status 
        storeRegistration(); //store the registration information if the request was successful
        Toast.show({ //show toast message after successful request
          type: 'success', 
          text1: 'Registration Successful',
          text2: 'Welcome! You can now log in.',
        });
        navigation.navigate('Login'); //navigate to login
      }
    } catch (error) {
      console.log(error.response.data) //logs the error
      Alert.alert('Failed', error.response.data.error);
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
            <Text className="font-fitBold text-medium text-primary">
              Account Verification
            </Text>
            <View className="w-full mt-5 px-4 border rounded-lg border-primary">
              <TextInput onChangeText={(e) => setCode(e)} placeholder="Enter Code Here" />
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

export default Verification