import { View, Text,TouchableOpacity, Image } from 'react-native'
import React from 'react'
import Header from '../../components/Header'
import { Feather, Ionicons } from "@expo/vector-icons";
import { ScrollView } from 'react-native-gesture-handler';
import AntDesign from '@expo/vector-icons/AntDesign';
import axios from 'axios'
import { apiUrl } from '../../apiUrl';

const ServiceImages = ({navigation, photos, setIsView, setPhotos}) => {


  const photoMap = photos.map(photo => photo)

  const removeImage = async (idx, id) => {
    const updatedPhotos = photos.filter((_, index) => index !== idx);
    setPhotos(updatedPhotos);
    if(id){
      try {
        await axios.delete(`${apiUrl}/api/portfolio/${id}`);
        console.log("Image removed successfully");
      } catch (error) {
        console.error("Error removing image:", error);
      }
    }
  };

  return (
    <ScrollView>
      <View className="bg-primary pt-4">
      <View className={`py-4 flex-row px-5 gap-x-5 justify-start items-center`}>
          <TouchableOpacity className="mr-5">
              <Ionicons name="arrow-back-outline" size={24} color={'white'} onPress={() => setIsView(false)}/>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text className="text-white text-small font-magBold">Hoy BOBO! nara imung pics</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View className="flex-row flex-wrap justify-between px-3 gap-y-4 items-center flex-1 mt-2">
        {photoMap.map((phot1, index) => {
        return<View key={index}>
          <View>
            <Image key={index} source={{uri:phot1.image || phot1}} className="rounded-lg w-40 h-32" resizeMode='contain'/>
          </View>
          <TouchableOpacity onPress={() => removeImage(index, phot1.id)} className="absolute -top-1 -right-1 z-10">
            <AntDesign name="closecircle" size={18} color="crimson" />
          </TouchableOpacity>
        </View>
        })
      }
      </View>
      
    </ScrollView>
    
  )
}

export default ServiceImages