import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { apiUrl } from '../apiUrl';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const TaskRequestCard = ({navigation, id, fullname, user_id, image, location, setShowModal}) => {

  
  const [accepted, isAccepted] = useState(false);

    // useEffect(() => {
    //   axios.get(`${apiUrl}/api/address/detail/${location}/`)
    //   .then(res => res.status)
    //   .catch(err => console.error(err))
    // },[])
 
    const declineService = async () => {
      try {
        const response = await axios.delete(`${apiUrl}/api/request-status/${id}/`);
      } catch (error) {
        console.log(error)
      }
    };

    const viewService = async () => {
      let service_id;
      try {
        const response = await axios.get(`${apiUrl}/api/user/service/${user_id}/`);
        const data = response.data
        service_id = data[0].id  
      } catch (error) {
        console.log(error)
      }
      navigation.navigate("Service Details", {id: service_id, user_id: user_id})
    }

  return (
    <View key={id} className="bg-slate-100 mt-5 py-2 px-2 mx-2 rounded-lg">
      <View className="flex-row items-center">
        <View className="w-14 h-14 mr-5 justify-center rounded-full overflow-hidden">
          {image ? <Image
            source={{uri: image}}
            className="w-full h-full"
            resizeMode="cover"
          /> : <View className="bg-slate-200 flex-1 items-center justify-center"><FontAwesome name="user" size={24} color="#0064ab" className="text-center"/></View>}
        </View>
        <View className="flex-1">
          <Text className="text-base font-fitBold  ">
            {fullname} <Text className="text-primary font-fitRegular">made a request for your task</Text>
          </Text>
          <TouchableOpacity>
            <Text className="text-sm font-fitMedium text-slate-500">
              View Profile
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View className="flex-row justify-start mt-2 py-2">
       { !accepted ?  <>
      <TouchableOpacity onPress={viewService} className="bg-primary rounded-full py-1 px-4">
          <Text className="text-sm text-white text-center font-fitMedium">View Service</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={declineService} className="bg-red-500 mx-2 rounded-full py-1 px-4">
          <Text className="text-sm text-white text-center font-fitMedium">Remove</Text>
      </TouchableOpacity>
      </> 
        : 
        <View className="flex-row px-4 flex-1 items-center">
          <TouchableOpacity onPress={() => setShowModal(true)} className="bg-primary rounded-full py-1 px-4">
            <Text className="text-sm text-white font-fitMedium">Book Now</Text>
          </TouchableOpacity>
          <TouchableOpacity className="border-primary border ml-4 rounded-full py-1 px-4">
            <Text className="text-sm text-primary font-fitMedium">Call</Text>
          </TouchableOpacity>
        </View>}
      </View>
    </View>
  )
}

export default TaskRequestCard