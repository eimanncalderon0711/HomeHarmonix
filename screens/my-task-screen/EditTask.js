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

const EditTask = ({navigation, route}) => {

  const user = useSelector((state) => state.user.user)
  const titleFocus = useRef(false);

  const [loading, setLoading] = useState(false);
  const [isFocus, setFocus] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState();
  const [description, setDescription] = useState('');
  const [locationOptions, setLocationOptions] = useState([]);
  const [services, setServices] = useState([]);
  const [error, setError] = useState("");

  const {id} = route.params;

  const fetchMyTask = async () => {
    const response = await axios.get(`${apiUrl}/api/task/${id}/`)
    const data = response.data;
    setDescription(data.description)
    setSelectedLocation(data.location)
    setServices(data.TypeOfService);
  }

  const updateTask = async()=> {
    const response = await axios.patch(`${apiUrl}/api/task/${id}/`,{ 
        "description": description,
        "location": selectedLocation,
        "TypeOfService": services,
    })
    console.log("successfully updated")
    setLoading(false);
    navigation.navigate("Posted Tasks")
  }

  const updateHandle = async() => {
    setLoading(true);
    try {  
      if(selectedLocation && description && services.length > 0){
        return updateTask();
      }
    } catch (error) {
      console.log(error)
    }
    return setError("Fill all the required fields");
  }

  const fetchLocationChoices = async () => {
    const response = await axios.get(`${apiUrl}/api/location/`);
    const data = response.data;
    setLocationOptions(data);
  }

  useEffect(() => {
    fetchLocationChoices();
    fetchMyTask();
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


  return (
    <SafeAreaView className="flex-1">

      <View className="bg-primary flex-row justify-center">
        <View className="flex-row justify-around flex-1 pb-3 pt-5">
          <View className="flex-row">
            <TouchableOpacity>
              <Ionicons name="arrow-back-outline" size={24} color={'white'} onPress={() => navigation.goBack()}/>
            </TouchableOpacity>
            <Text className="text-white font-magBold text-lg ml-5">Edit Task</Text>
          </View>
          <View className={`${loading ? 'bg-gray' : 'bg-white'} rounded-xl`}>
          <TouchableOpacity disabled={loading} onPress={updateHandle}>
            <Text className={`text-small font-magBold ${loading ? 'text-slate-400' : 'text-primary'} px-5 py-1`}>{loading ? "Updating.." : "Update"}</Text>
          </TouchableOpacity>
          </View>
        </View>
      </View>

      <View className="pt-10 px-5">

        <View className="rounded-full overflow-hidden w-2/3 mb-5">
          <Picker
            selectedValue={selectedLocation}
            onValueChange={(location, index) => setSelectedLocation(location)}
            itemStyle={{borderColor: 'black', borderWidth: '1px'}}
            style={{
              backgroundColor: '#0064ab',
              width: '100%',
              color: '#fff'
            }}
            dropdownIconColor={'white'}
            
          >
            <Picker.Item label="Select Location" enabled={false}/>
            {
              locationOptions.map((location) => {
                return <Picker.Item key={location.id} label={location.location_name} value={location.id}/>
              })
            }
          </Picker>
        </View>

        <Text className="text-primary font-magBold text text-base">Services Offered:</Text>
        <View className="mt-2 gap-y-2 flex-row">
          <View>
            <CheckRounded title="Carpentry" id={1} type={services}  bool={services.includes(1) ? true : false} setType={setServices}/>
            <CheckRounded title="Home Cleaning" id={2} type={services}  bool={services.includes(2) ? true : false} setType={setServices}/>
            <CheckRounded title="Plumbing" id={3} type={services}  bool={services.includes(3) ? true : false} setType={setServices}/>
          </View>
          <View className="pl-20">
            <CheckRounded title="Gardening" id={4} type={services}  bool={services.includes(4) ? true : false} setType={setServices}/>
            <CheckRounded title="Painting" id={5} type={services}  bool={services.includes(5) ? true : false} setType={setServices}/>
          </View>
        </View>
      </View>

      <View className="px-4 pt-5">
        <Text className="text-md text-primary font-magBold pt-5 pb-3">Add a Title Here:</Text>
        <View className="border h-52 border-primary">
        <TouchableOpacity activeOpacity={1} onPress={focusTextInput}>
          <TextInput ref={titleFocus} value={description} onChangeText={(e) => {
            setDescription(e)
            if(description !== "") {
              setError("");
            }
            }} placeholder='Add title here' multiline={true} className="px-2 text-sm"/>
        </TouchableOpacity>
        </View>
      </View>
      {error && <View className="items-center mt-3"><Text className="text-red-500 text-base font-fitMedium">{error}</Text></View>}
      <StatusBar backgroundColor={"#0064ab"}/>
    </SafeAreaView>
  )
}

export default EditTask