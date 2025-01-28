import { View, Text, StatusBar } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Feather, Ionicons } from "@expo/vector-icons";
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import Checkbox from 'expo-checkbox';
import CheckRounded from '../../components/CheckRounded';
import Dropdown from '../../components/Dropdown';
import {Picker} from '@react-native-picker/picker';
import axios from 'axios';
import { apiUrl } from '../../apiUrl';
import { useSelector, useDispatch } from "react-redux";

const PostTask = ({navigation}) => {

  const user = useSelector((state) => state.user.user)
  const titleFocus = useRef(false);

  const [loading, setLoading] = useState(false);
  const [isFocus, setFocus] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [description, setDescription] = useState('');
  const [locationOptions, setLocationOptions] = useState([]);
  const [services, setServices] = useState([]);
  const [error, setError] = useState("");


  const addTask = async () => {
    //POST method to post a tasks
    const response = await axios.post(`${apiUrl}/api/task/`,{
      "description": description,
      "user": user.id,
      "location": selectedLocation,
      "TypeOfService": services
    });
    console.log("Posted Successfully");
  };

  //Validate the inputs to add a task
  const postHandle = () => {
    if(selectedLocation && description && services.length > 0){
      addTask();
      navigation.navigate("Home")
    }
    setError("Fill all the required fields");

  }

  const fetchLocationChoices = async () => {
    const response = await axios.get(`${apiUrl}/api/location/`);
    const data = response.data;
    setLocationOptions(data);
  }

  useEffect(() => {
    fetchLocationChoices();
  }, [])

  const focusTextInput = () => {
    if(isFocus) {
      titleFocus.current.focus();
      setFocus(false);
    }
    else{
      titleFocus.current.blur();
      setFocus(true);
    }
    
  }

  const [isCheck, setCheck] = useState(false);

  const handlePress = () => {
    setCheck(!isCheck);
  };


  return (
    <SafeAreaView className="flex-1">

      <View className="bg-primary flex-row justify-center">
        <View className="flex-row justify-around flex-1 pb-3 pt-5">
          <View className="flex-row flex-1 justify-around">
            <TouchableOpacity className="pr-20">
              <Ionicons name="arrow-back-outline" size={24} color={'white'} onPress={() => navigation.goBack()}/>
            </TouchableOpacity>
            <Text className="text-white font-magBold text-lg" style={{marginRight:25}}>Post A Task</Text>
          <View></View>
          </View>
        </View>
      </View>

      <View className="pt-10 px-5">

        <View className="rounded-full overflow-hidden w-2/3 mb-5">
          <Picker
            selectedValue={selectedLocation}
            onValueChange={(location, index) => setSelectedLocation(location)}
            itemStyle={{borderColor: 'black', borderWidth: '1px', fontFamily: 'fitSemiBold'}}
            style={{
              fontFamily: 'fitBold',
              backgroundColor: '#0064ab',
              width: '100%',
              color: '#fff',
            }}
            dropdownIconColor={'white'}
            
          >
            <Picker.Item label="Select Location" enabled={false} style={{ fontFamily: 'fitBold', fontSize: 16, color: 'black' }}/>
            {
              locationOptions.map((location) => {
                return <Picker.Item key={location.id} label={location.location_name} value={location.id} style={{ fontFamily: 'fitBold', fontWeight: "bold", fontSize: 16, color: 'black' }}/>
              })
            }
          </Picker>
        </View>

        <Text className="text-primary font-fitRegular text text-base">Services Offered:</Text>
        <View className="mt-2 gap-y-2 flex-row">
          <View>
            <CheckRounded title="Carpentry" id={1} type={services} setType={setServices}/>
            <CheckRounded title="Home Cleaning" id={2} type={services} setType={setServices}/>
            <CheckRounded title="Plumbing" id={3} type={services} setType={setServices}/>
          </View>
          <View className="pl-20">
            <CheckRounded title="Gardening" id={4} type={services} setType={setServices}/>
            <CheckRounded title="Painting" id={5} type={services} setType={setServices}/>
          </View>
        </View>
      </View>

      <View className="px-4 pt-5">
        <Text className="text-md text-primary font-fitRegular pt-5 pb-3">Add a Title Here:</Text>
        <View className="border h-52 border-primary">
          <TouchableOpacity activeOpacity={1} onPress={focusTextInput} style={{height:"100%"}}>
            <TextInput ref={titleFocus} value={description} onChangeText={(e) => setDescription(e)} placeholder='Add title here' multiline={true} className="px-2 font-fitRegular text-sm"/>
          </TouchableOpacity>
        </View>
        <View className={`w-full z-30 rounded-xl`} style={{marginVertical:15}}>
          <TouchableOpacity onPress={postHandle} 
              style={{justifyContent: "center", 
                      alignItems:"center", 
                      backgroundColor: loading ? 'white' : '#0064ab', 
                      paddingVertical:25,
                      borderRadius: 10
                      }}>
            <Text className={`text-small font-fitSemiBold ${loading ? 'text-primary' : 'text-white'} px-5 py-1`}>Post</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      {error && <View className="items-center mt-3"><Text className="text-red-500 text-base">{error}</Text></View>}
      <StatusBar backgroundColor={"#0064ab"}/>
    </SafeAreaView>
  )
}

export default PostTask