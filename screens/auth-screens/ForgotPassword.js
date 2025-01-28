import { View, Text, Image, StatusBar, TouchableOpacity, KeyboardAvoidingView, TextInput, Platform, ScrollView, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import Fields from "../../components/Fields";
import Buttons from "../../components/Buttons";
import { useDispatch } from "react-redux";
import Toast from 'react-native-toast-message';
import axios from 'axios';
import { apiUrl } from "../../apiUrl";

const ForgotPassword = ({ navigation }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);


  const validatePassword = () => {
    const uniquePassword = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{5,}$/
    if(password !== confirmPassword) return setError("Password dont match");
    if(password === "" && confirmPassword === "") return setError("Please input your password");
    if(email === "") return setError("Please enter your email");
    if(!password.match(uniquePassword)) return setError("Password must contain the following:\n At  least 5 characters\n Uppercase Letter\n Lowercase Letter\n Special Characters : [#?!@$%^&*-]");
    passwordReset();
  }

  const passwordReset = async () => {
    console.log(email)
    console.log(password)
   try {
    const response = await axios.post(`${apiUrl}/api/send-verification-code/`,{
        "email":email,
    })
    const data = response.data;
    navigation.navigate("Reset",{ email, password})
    Alert.alert('Request', `${data.message}`, [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {text: 'OK', onPress: () => {
          setEmail("");
          setConfirmPassword("");
          setPassword("");}},
    ]);
   } catch (error) {
    console.log(error.response.data)
     Alert.alert('Request', `${error.response.data.error !== undefined ? error.response.data.error : error.response.data.message}`, [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {text: 'OK', onPress: () => {
            setEmail("");
            setConfirmPassword("");
            setPassword("");}},
      ]);
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

          <View className="justify-center mx-2 px-3 mt-10">
            <Text className="font-magBold text-center text-medium text-primary">
              Password Reset
            </Text>

            <View className="justify-center mt-5">
              <Fields value={email} name="Email" onChangeText={(e) => {
                setEmail(e)
                if(password.length > 0 || confirmPassword.length > 0){
                    setError("")
                }
                }}/>

              <Fields value={password} name="New Password" onChangeText={(e) => {
                setPassword(e)
                if(password.length > 0 || confirmPassword.length > 0){
                    setError("")
                }
                }}/> 
              <Fields value={confirmPassword} name="Confirm Password" onChangeText={(e) => {
                setConfirmPassword(e)
                if(password.length > 0 || confirmPassword.length > 0){
                    setError("")
                }
                }}/>
            </View>

            {error ? <Text className="text-center mt-3 text-red-500 text-xs font-magBold">{error}</Text> : null}
          </View>

          <View className="items-end mx-5 pt-5 pb-6">
             <TouchableOpacity onPress={validatePassword}>
                <View className="bg-primary w-full rounded-lg">
                    <Text className="font-fitMedium text-white text-center" style={{paddingVertical:15}}>{`${loading ? "Confirming.." : "Confirm"}`}</Text>
                </View>
             </TouchableOpacity>
          </View>
          <StatusBar backgroundColor={"#0064AB"} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default ForgotPassword;