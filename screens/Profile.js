import { View, Text, StatusBar, Platform, Image, TouchableOpacity, TextInput, ScrollView } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useFocusEffect } from '@react-navigation/native'; 
import Header from "../components/Header";
import { useSelector, useDispatch } from "react-redux";
import Entypo from '@expo/vector-icons/Entypo';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import {FontAwesome, Ionicons } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import AntDesign from '@expo/vector-icons/AntDesign';
import { apiUrl } from "../apiUrl";
import axios from 'axios'
import { saveAddress, saveUser } from "../app-states/features/userSlice";
import * as ImagePicker from 'expo-image-picker';

const Profile = ({ navigation }) => {

  const user = useSelector((state) => state.user.user);
  const user_address = useSelector(state => state.user.user_address)
  const islogged = useSelector((state) => state.user.islogged);
  const [isThereRating, setIsThereRating] = useState(0)
  const [ratings, setRatings] = useState(null);
  const [toggler, setToggler] = useState(false);
  const [profile, setProfile] = useState(null);
  const [verified, setVerified] = useState(false);
  // const [myAddress, setMyAddress] = useState();
  // const [isEdited, setIsEdited] = useState(false);

  const dispatch = useDispatch();

  const checkifVerifiedWorker = async () => {
    try {
      const response = await axios.post(`${apiUrl}/api/verified-account/`, {"user" : user.id})
      const data = response.data;
      switch(data.status) {
        case 'pending':
          setVerified(false);
          break;
        case 'accepted':
          setVerified(true);
          break;
        default:
          setVerified(false);
      }

    } catch (error) {
      console.log(error.response.data.error)
      setVerified(false)
    }
  };

  const fetchAddress = async() => {
    try{
        const res = await axios.get(`${apiUrl}/api/user/detail/${user.id}`)
        const data = await res.data
        
        dispatch(saveUser({
          id: data.id,
          email:data.email,
          fullname: data.fullname,
          profile_image: data.profile_image,
          created_at: data.created_at
        }))

        if(data.address !== null){

          axios.get(`${apiUrl}/api/address/detail/${data.address}`)
          .then((response) => {
            const data = response.data
            dispatch(saveAddress({
              address_id: data.id,
              address_name: data.address_name, 
            }))
            
          })

          .catch((err) => console.log(err))

        }
        
      }

      catch(err){
        console.log(err);
      }
  }

  const pickProfile = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });
    
    if(!result.canceled) {
      selectProfile(result.assets[0]);
    
    }
  }

  const changeProfile = async () => {
    console.log("Change Profile triggered"); // Debugging
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });
    
    if(!result.canceled) {
      console.log("Image selected:", result.assets[0]); // Debugging
      selectProfile(result.assets[0]);
    }
    else {
      console.log("Image selection canceled"); // Debugging
    }
  }

  const handleEdit = () => {
    navigation.navigate('EditProfile')
  }

  const selectProfile = async (image) => {
   const formData = new FormData();
   formData.append('profile_image', {
    uri: image.uri,
    name: 'profile_image.jpg',
    type: 'image/jpeg',
   });

   try {
    if(user.id){
      const response = await axios.put(`${apiUrl}/api/user/detail/${user.id}/`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      const data = response.data;
      dispatch(saveUser({
        id: data.data.id,
        email:data.data.email,
        fullname: data.data.fullname,
        profile_image: data.data.profile_image,
        created_at: data.data.created_at
      }))
    }
   } catch (error) {
    
   }
  }

  const averageRatings = async () => {
    try {
      const getService = await axios.get(`${apiUrl}/api/user/service/${user.id}/`)
      const servResponse = await getService.data;

      const response = await axios.get(`${apiUrl}/api/rating/${servResponse[0].id}/services/`)
      const data = response.data;
      // const {overall_avg, qualityOfWork_avg, affordability_avg, punctuality_avg, professionalism_avg, ratings} = data;
      if(data.ratings.length > 0){
        setIsThereRating(data.ratings.length);
        setRatings(data);
      }
    } catch (error) {
      console.log(error.response.data)
    }

  }
  
  useFocusEffect(
    useCallback(() => {
      if (islogged && user.id) {
        checkifVerifiedWorker();
      }
    }, [islogged, user.id])
  );

  useEffect(() => {
    if(islogged){
      fetchAddress();
      averageRatings();
    }
  }, []);
  

  return (
    <>
    <View className="flex-1 bg-white">
    <ScrollView>
      <Header title="Profile" navigation={navigation}/>
      <Image source={require('../assets/images/Rectangle 30.png')} resizeMode="contain" className="absolute w-full -z-20"/>
      
      <View className="w-36 h-36 rounded-full bg-slate-300 top-16 self-center overflow-hidden">
        {user.profile_image ? 
        <TouchableOpacity className="w-full" onPress={changeProfile}>
          <Image source={{ uri: `${user.profile_image}`}} className="w-full h-full rounded-full"/>
        </TouchableOpacity>
         :
        <TouchableOpacity className="w-full h-full justify-center" onPress={pickProfile}>
          <MaterialCommunityIcons name="camera-plus-outline" size={50} color="black" opacity={0.4} className="text-center"/>
        </TouchableOpacity>}
      </View>

      <View className="justify-center items-center relative top-20">
      <TouchableOpacity className="items-center flex-row gap-x-3" onPress={handleEdit}>
        <Text className="text-primary font-fitBold text-center text-xl">{user.fullname}</Text>
        <SimpleLineIcons name="pencil" size={18} color="#0064ab" />
      </TouchableOpacity>
      { user_address.address_name !== "" ? <View className="flex-row items-center">
                          <Entypo name="location-pin" size={18} color="#0064ab" />
                          <Text className="text-primary font-fitMedium text-xs">{user_address.address_name}, Cagayan De Oro City</Text>
                        </View> : <View><Text className="text-primary font-fitMedium">No Location Yet</Text></View>
      }
      <View className="">
        <Text className={`font-fitMedium mt-2`} style={{fontSize:15, color: verified ? 'green': '#ef4444'}}>{verified ? "Verified":"Not Verified"}</Text>
      </View>
      </View>
      
      {isThereRating === 0 && <View className="self-center relative top-32">
        <Text className="font-fitSemiBold text-md text-primary text-center">Overall Ratings</Text>
        <Text className="font-fitSemiBold text-xl text-primary text-center">No Reviews Yet</Text>
      </View> 
      }

      {isThereRating > 0 && 
       
      <View className="self-center relative" style={{width: "85%", top: 110}}>
        <Text className="text-lg text-center font-fitSemiBold text-primary">Overall Ratings</Text>
        <Text className="text-center text-lg font-fitSemiBold text-primary">{ratings && ratings.overall_avg.toFixed(1)}</Text>
        <View className="mt-10 flex-row items-center">
          <View className="flex-1">
            <Text className="text-lg py-1 font-fitRegular text-primary">Quality of Work:</Text>
            <Text className="text-lg py-1 font-fitRegular text-primary">Affordability:</Text>
            <Text className="text-lg py-1 font-fitRegular text-primary">Punctuality:</Text>
            <Text className="text-lg py-1 font-fitRegular text-primary">Professionalism:</Text>
          </View>
          <View className="flex-1">
              <View className="h-3 bg-slate-200 rounded-full overflow-hidden" style={{marginVertical:10.5}}>
                <View className="bg-yellow h-full" style={{width: `${(ratings.qualityOfWork_avg / 5)*100}%`}}></View>
              </View>
              <View className="h-3 bg-slate-200 rounded-full overflow-hidden" style={{marginVertical:10.5}}>
                <View className="bg-yellow h-full" style={{width:`${(ratings.affordability_avg / 5)*100}%`}}></View>
              </View>
              <View className="h-3 bg-slate-200 rounded-full overflow-hidden" style={{marginVertical:10.5}}>
                <View className="bg-yellow h-full" style={{width: `${(ratings.punctuality_avg / 5)*100}%`}}></View>
              </View>
              <View className="h-3 bg-slate-200 rounded-full overflow-hidden" style={{marginVertical:10.5}}>
                <View className="bg-yellow h-full" style={{width: `${(ratings.professionalism_avg / 5)*100}%`}}></View>
              </View>
          </View>
        </View>
          
        <View View className="flex-1" style={{paddingBottom:100}}>
            <View  className="py-5">
              <Text className="text-black font-fitBold text-lg">Reviews: </Text>
               {ratings.ratings.map((item, index) => {
                  const comment = item.comment;
                  const profile = item.user.profile_image;
                  const name = item.user.fullname;
                  let stars = (item.qualityOfWork + item.punctuality + item.professionalism + item.affordability) / 4;
                  stars = Math.round(stars);

                  return (
                      <View key={index} className="flex-1 items-center my-1 py-5 px-2" style={{borderWidth:1, borderRadius:5, borderColor:"rgba(0,0,0,0.1)"}}>
                    <View className="flex-row mb-4 justify-center h-full items-center">
                      <View className="w-14 h-14 overflow-hidden border items-center justify-center rounded-full mr-2">
                        {item.user.profile_image !== null ? <Image source={{ uri: profile }} className="w-full h-full" resizeMode="cover" /> : <FontAwesome name="user" size={24} color="#0064ab" className="text-center"/>}
                      </View>
                      <View className="flex-1">
                        <View className="flex-row">
                          <Text className="font-fitMedium">{name}</Text>
                          <View className="ml-2 flex-row items-center">
                            {Array.from({ length: stars }, (_, i) => (
                              <AntDesign key={i} name="star" size={10} color="#ffc82c" />
                            ))}
                          </View>
                        </View>
                        <Text className="font-fitRegular text-sm">{comment}</Text>
                      </View>
                    </View>
                    </View>  
                  );
                })}
                </View>
            </View> 
      </View>
      }
      </ScrollView>
    </View>
    </>
  );
};

export default Profile;
