import { View, Text, Image, StatusBar, TouchableOpacity, KeyboardAvoidingView, TextInput,ScrollView, Platform, Alert} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons, Feather, FontAwesome5 } from "@expo/vector-icons";
import Fields from "../../components/Fields";
import Buttons from "../../components/Buttons";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import axios from 'axios'
import Toast from 'react-native-toast-message';
import { apiUrl } from "../../apiUrl";
import { register } from "../../app-states/features/userSlice";

const Register = ({navigation}) => {

  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const [fullname, setFullname] = useState("");
  const [password, setPassword] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [phone, setPhone] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");
  
  const onRegister = async () =>{
    //regex for valid email and unique password
    const validEmail =/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    const uniquePassword = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{5,}$/
    
    // Input validations
    if(email === "" && fullname === "" && password === "" && confirmPassword === "") return setError("Input Fields are required")
    if(email === "") return setError("Email is required");
    if(!email.match(validEmail)) return setError("Not a valid email");
    if(fullname === "") return setError("Fullname is required");
    if(phone === "") return setError("Phone is required");
    if(password === "" && confirmPassword === "") return setError("Password is required");
    if(password !== confirmPassword) return setError("Password dont match");
    if(!password.match(uniquePassword)) return setError("Password must contain the following:\n At  least 5 characters\n Uppercase Letter\n Lowercase Letter\n Special Characters : [#?!@$%^&*-]");
    
    try {
      setLoading(true); //set the loading to true while request is in progress

      const response = await axios.post(`${apiUrl}/api/register-verification/`, {
        "email": email
      }) // request a post method for email verification

      const data = response.data; //response data for verification
      setLoading(false); //set the loading to false when request is done
    } catch (error) {
      console.log(error.response.data)
    }
    navigation.navigate("Verification", {email, fullname, password, phone}) //navigate to the verification page
  }

  const onSignIn = () => {
    if (email !== "" || fullname !== "" || password !== "" || confirmPassword != "" || error !== ""){

      setEmail('');
      setFullname('');
      setPassword('');
      setConfirmPassword('');
      setError('');
      navigation.navigate('Login')
    }
    navigation.navigate("Login")
  }

  const handleChange = (text) => {
    // Check if the input matches the regex pattern for 1 to 11 digits
    const regex = /^\d{1,11}$/;
    if (regex.test(text)) {
      setPhone(text);
    } else {
      Alert.alert('Oops', 'Please enter 11 digit NUMBERS only', [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {text: 'OK',}
      ]);
    }
  };

  return (
    <SafeAreaView className="bg-white flex-1">
      <KeyboardAvoidingView
       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
       style={{ flex: 1 }}
       >
        <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        >
          <View className="bg-primary w-full max-h-[250px] rounded-b-[50px]">
        <Image
          source={require("../../assets/images/Registration.png")}
          resizeMode="contain"
          className="w-full h-full"
        />
      </View>
      <View className=" justify-center mx-2 px-3 my-10">
        <Text className="font-magBold text-medium text-primary">CREATE ACCOUNT</Text>
        <View className="justify-center">
          <Fields
            name = "Fullname"
            value={fullname}
            onChangeText={(value) => {
              setFullname(value)
              if(error.length > 0){
                setError("")
              }
            }}
            icon={<Feather name="user" size={20} color="gray" />}
          />
          <Fields
            name="Email"
            value={email}
            onChangeText={(value) => {
              setEmail(value)
              if(error.length > 0){
                setError("")
              }
            }}
            icon={<Feather name="mail" size={20} color="gray" />}
          />
          <View className="flex-row border border-gray mt-2 items-center rounded-lg" style={{paddingVertical: 15, paddingHorizontal: 10}}>
            <FontAwesome5 name="phone-alt" size={20} color="gray" />
            <TextInput value={phone} onChangeText={handleChange} placeholder="Phone" className="text-gray-dark flex-1 pl-3 font-fitRegular"/>
          </View>
          <Fields
            name="Password"
            value={password}
            onChangeText={(value) => {
              setPassword(value)
              if(error.length > 0){
                setError("")
              }
            }}
            placeholder={"Password"}
            icon={<Feather name="lock" size={20} color="gray" />}
          />
          <Fields
            name="Confirm Password"
            value={confirmPassword}
            onChangeText={(value) => {
              setConfirmPassword(value)
              if(error.length > 0){
                setError("")
              }
            }}
            placeholder={"Confirm Password"}
            icon={<Feather name="lock" size={20} color="gray" />}
          />
        </View>
        {error ? <Text className="text-center mt-3 text-red-500 text-xs font-magBold">* {error}</Text> : null}
      </View>

      <View className="items-end mx-5 pb-6">
        <Buttons
          loading={loading}
          onPress={onRegister}
          icons={<MaterialIcons name="login" size={24} color="white" />}
          btnTitle={`${loading ? 'Signing Up..': 'Sign Up'}`}
          btnStyle={"bg-primary p-3 rounded-lg flex-row gap-x-2"}
          textStyle={"text-white text-small font-magRegular"}
        />
      </View>

      <TouchableOpacity onPress={onSignIn}>
        <Text className="text-center font-magRegular text-sm">
          Already Have An account?{"  "}
          <Text className="text-sm text-primary font-magBold">Login</Text>
        </Text>
      </TouchableOpacity>

        </ScrollView>
      </KeyboardAvoidingView>
      
      <StatusBar backgroundColor={"#0064AB"} />
    </SafeAreaView>
  );
};

export default Register;
