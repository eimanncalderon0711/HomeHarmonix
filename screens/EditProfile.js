import { View, Text, Image, TouchableOpacity, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { useSelector, useDispatch } from "react-redux";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import axios from "axios";
import { apiUrl } from "../apiUrl";
import { saveAddress, saveUser } from "../app-states/features/userSlice";

const EditProfile = ({ navigation }) => {

  const user = useSelector(state => state.user.user);
  const user_address = useSelector(state => state.user.user_address)
  const [addressData, setAddressData ] = useState(user_address.address_name);

  const dispatch = useDispatch();


  // useEffect(() => {
  //   if(user_address.address_id){
  //   axios.get(`${apiUrl}/api/address/detail/${user_address.address_id}/`)
  //   .then((response) => {
  //     console.log(response.data);
  //     setAddressData(response.data.address_name)
  //   })
  //   .catch((err) => console.log(err))
  // }
  // },[])

  const addAddress = async () => {
    try {

      const response = await axios.post(`${apiUrl}/api/address/`, {
        "address_name" : addressData
      })

      const data = response.data

      axios.put(`${apiUrl}/api/user/detail/${user.id}/`,{
        "fullname": user.fullname,
        "address": data.id
      })

      dispatch(saveAddress({
        address_id: data.id,
        address_name: data.address_name
      }))
      
      
      navigation.goBack();


    } catch (error) {
      console.log(error)
    }
  }

  const updateAddress = async () => {
    try {
      const response = await axios.put(`${apiUrl}/api/user/update-address/${user_address.address_id}/`, {
        "address_name" : addressData
      })
      const data = response.data

      dispatch(saveAddress({
        address_id: data.id,
        address_name: data.address_name
      }))

      navigation.goBack()

    } catch (error) {
      console.log(error)
    }
  }

  const handleSave = () => {
    if(!user_address.address_id){
      addAddress();
    }
    else{
      updateAddress();
    }
  };


  return (
    <>
    <View className="flex-1 bg-white">
      <Header title="Profile" navigation={navigation}/> 
      <Image source={require('../assets/images/Rectangle 30.png')} resizeMode="contain" className="absolute w-full -z-10"/>
      <View className="w-32 h-32 rounded-full bg-slate-300 self-center top-16 justify-center items-center">
        {user.profile_image ? 
        <TouchableOpacity className="w-full">
          <Image source={{ uri: `${apiUrl}${user.profile_image}` }} className="w-full h-full rounded-full"/>
        </TouchableOpacity>
         :
        <TouchableOpacity>
          <MaterialCommunityIcons name="camera-plus-outline" size={50} color="black" opacity={0.4} />
        </TouchableOpacity>}
      </View>

      <View className="self-center relative top-24 items-center flex-row gap-x-3">
        <Text className="text-primary font-magBold text-lg">{user.fullname}</Text>
      </View>
      <View className="self-center w-full relative top-24 items-center px-14 gap-y-3 pt-10">
        <View className="flex-row bg-[#f4f4f4] rounded-md py-2 w-full items-center justify-between px-4">
          <TextInput placeholder="Name" defaultValue={user.fullname} editable={false} className="flex-1 font-magBold text-xs text-primary"/>
        </View>
        <View className="flex-row bg-[#f4f4f4] rounded-md py-2 w-full items-center justify-between px-4">
          <TextInput placeholder="Email" defaultValue={user.email} editable={false} className="flex-1 font-magBold text-xs text-primary"/>
        </View>
        <View className="flex-row bg-[#f4f4f4] rounded-md py-2 w-full items-center justify-between px-4">
          <TextInput placeholder="Address" value={addressData} onChangeText={(e) => setAddressData(e)} className="flex-1 font-magBold text-xs text-primary"/>
          <SimpleLineIcons name="pencil" size={18} color="#0064ab" />
        </View>
        <TouchableOpacity activeOpacity={0.5} onPress={handleSave}>
          <Text className="bg-primary px-3 py-2 text-white rounded-lg font-magBold">Save</Text>
        </TouchableOpacity>
      </View>
    </View>
    </>
  );
};

export default EditProfile;