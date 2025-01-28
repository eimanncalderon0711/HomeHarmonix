import { View, Text, Image, StatusBar, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import Fields from "../../components/Fields";
import Buttons from "../../components/Buttons";
import { useDispatch } from "react-redux";
import { login } from "../../app-states/features/userSlice";
import Toast from 'react-native-toast-message';
import axios from 'axios';
import { apiUrl } from "../../apiUrl";

const Login = ({ navigation }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const verifyAccount = async () => {
    setLoading(true); // set loading true while requesting to the server
    try {
      const res = await axios.post(apiUrl + '/api/login/', {
        email: email,
        password: password
      }); //POST request to login with password and email

      const data = await res.data.data;
      dispatch(login({
        id: data.id,
        email: data.email,
        fullname: data.fullname,
        profile_image: data.profile_image
      })); //Store the response data in global state using redux

      Toast.show({
        type: 'success',
        text1: res.data.message,
        text2: 'Welcome',
      }); //Success response toast message

      navigation.navigate('HomeStack'); //Redirect to HomeStack if successfully logged in and reset the state to empty
      setEmail("");
      setPassword("");
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message[0]);
        console.log(err)
      }
    } finally {
      setLoading(false); // set loading false after receiving the response success message
    }
  };

  const onLogin = () => {
    if (password === "" || email === "") return setError('Invalid Email or Password');
    verifyAccount();
  }

  const onSignUp = () => {
    setEmail("");
    setPassword("");
    setError("");
    navigation.navigate("Register");
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
            <Text className="font-fitBold text-large text-primary">
              Login
            </Text>

            <Text className="font-fitMedium text-sm text-primary">
              Please Sign in to continue
            </Text>

            <View className="justify-center mt-5">
              <Fields
                value={email}
                onChangeText={(value) => {
                  setEmail(value);
                  if (error) {
                    setError("");
                  }
                }}
                name={"Email"}
                icon={<Feather name="user" size={20} color="gray" />}
              />

              <Fields
                value={password}
                onChangeText={(value) => {
                  setPassword(value);
                  if (error) {
                    setError("");
                  }
                }}
                secureTextEntry={true}
                name={"Password"}
                icon={<Feather name="lock" size={20} color="gray" />}
              />
            </View>

            {error ? <Text className="text-center mt-3 text-red-500 text-xs font-magBold">{error}</Text> : null}
            <View className="mt-2 items-end">
              <TouchableOpacity onPress={() => navigation.navigate("Forgot", {email: email})}>
                <Text className="text-end text-sm font-fitMedium" style={{color:"rgba(0,0,0,0.6)"}}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>
              <TouchableOpacity onPress={onLogin} className="bg-primary my-5  mb-10 rounded-md" style={{paddingVertical:8}}>
                <Text className="font-fitMedium text-white text-center" style={{fontSize:20}}>Login</Text>
              </TouchableOpacity>
            </View>


          {/* <View className="mx-5 pt-5 pb-6 justify-center items-center">
          <View className={`bg-primary items-center`}>
            <TouchableOpacity disabled={loading} onPress={onLogin} activeOpacity={0.7} className={`w-full flex-row`}>
              <Text className={`text-center bg-yellow text-white`}>Login</Text>
              <MaterialIcons name="login" size={24} color="white" className="bg-green" />
            </TouchableOpacity>
          </View>
          </View> */}

          <TouchableOpacity onPress={onSignUp}>
            <Text className="text-center font-fitMedium text-sm">
              Don't Have an Account?{"  "}
              <Text className="text-sm text-primary font-fitSemiBold">Sign Up</Text>
            </Text>
          </TouchableOpacity>
         
          <StatusBar backgroundColor={"#0064AB"} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default Login;
