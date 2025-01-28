import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../../components/Header'
import CheckRounded from '../../components/CheckRounded'
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios'
import { apiUrl } from '../../apiUrl'
import ServiceImages from '../post-service-screens/ServiceImages'

const EditMyService = ({navigation, route}) => {
    const [services, setServices] = useState([]);
    const [title, setTitle] = useState();
    const [photo, setPhoto] = useState([]);
    const [isView, setIsView] = useState(false);

    const {service_id} = route.params;


useEffect(() => {
    fetchToEditService();
},[])

const fetchToEditService = async() => {
    const response = await axios.get(`${apiUrl}/api/details-service/${service_id}`);
    const data = response.data;
    setPhoto(data.portfolios.map(img => img));
    setTitle(data.title);
    setServices(data.TypeOfService.map( i => i.id));

};

const openCamera = async () => {
    let response = await ImagePicker.launchCameraAsync({
        mediaTypes: ['images'], // Ensures only images are captured
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
    });

    if (!response.canceled) {
        setPhoto([...photo, response.assets[0].uri]);
    }

};

const selectPhotoFromGallery = async () => {
    let response = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'], // Ensures only images are selected
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
    });

    if (!response.canceled) {
        setPhoto([...photo, response.assets[0].uri]);
    }
};

const validate = () => {
    if(services.length > 0 && photo.length > 0 && title !== ""){
        return true;
    }
    else{
        Alert.alert('Warning', 'Please complete all the details', [
        {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
        },
        {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]);
    }
    return false;


};

const handleRemove = async (idx, id) => {
  const updatedPhotos = photo.filter((_, index) => index !== idx);
  setPhoto(updatedPhotos);

  if(id){
    try {
      await axios.delete(`${apiUrl}/api/portfolio/${id}`);
      console.log("Image removed successfully");
    } catch (error) {
      console.error("Error removing image:", error);
    }
  }
  
};

const submitHandler = async() => {
    if(validate()){
        const addedPhotos = photo.filter(item => typeof item !== 'object' && item !== null)
        const formData = new FormData();

        try {
           addedPhotos.forEach((item, index)=> {
            formData.append('service', service_id);
            formData.append('image',{
              uri: item,
              name: `image${index}.jpg`,
              type: 'image/jpeg',
            })
            axios.post(`${apiUrl}/api/portfolio/`, formData,{
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            })
           })

          //  axios.patch(`${apiUrl}/api/user/update-service/${service_id}/`, {
          //   "TypeOfService": services
          //  })
          navigation.navigate("Home")
        } catch (error) {
            console.log(error)
        }

    }
}

  return (
    <SafeAreaView>
    {isView ? <ServiceImages photos={photo} setPhotos={setPhoto} navigation={navigation} setIsView={setIsView} /> :
      <>
      <Header title="Edit Your Service" navigation={navigation}/>
      {/* <Text className="px-5 mt-8 text-lg font-magBold text-primary">Services Offered:</Text> */}
      {/* <View className="flex-row px-10">
        <View>
            <CheckRounded title="Carpentry" id={1} type={services} bool={services.includes(1) ? true : false} setType={setServices}/>
            <CheckRounded title="Home Cleaning" id={2} type={services} bool={services.includes(2) ? true : false} setType={setServices}/>
            <CheckRounded title="Plumbing" id={3} type={services} bool={services.includes(3) ? true : false} setType={setServices}/>
        </View>
        <View className="pl-20">
            <CheckRounded title="Gardening" id={4} type={services} bool={services.includes(4) ? true : false} setType={setServices}/>
            <CheckRounded title="Painting" id={5} type={services} bool={services.includes(5) ? true : false} setType={setServices}/>
        </View>
      </View> */}
      <Text className="px-5 text-primary text-lg font-magBold mt-10">Add Title Here:</Text>
      <View className="w-full px-5 mt-4">
        <TextInput editable={false} placeholder='Enter here' value={title} onChangeText={(e) => setTitle(e) } className="pl-2 border-b font-magRegular border-b-slate-400"/>
      </View>
      <View className="items-center flex-row justify-center mt-4 rounded-lg mx-5 border bg-slate-200">
           {photo.length > 3 ? <>
            <View className="flex-row items-center justify-center flex-1">
            <View className="rounded-md flex-wrap flex-row items-center justify-between px-2">
              <View className="w-36 h-24 mt-5" >
                <Image source={{uri:photo[0].image || photo[0]}} className="flex-1 rounded-lg" resizeMode='cover'/>
              </View>
              <View className="w-36 h-24 mt-5" >
                <Image source={{uri:photo[1].image || photo[1]}} className="flex-1 rounded-lg" resizeMode='cover'/>
              </View>
              <TouchableOpacity className="w-36 h-24 mt-5" activeOpacity={0.8} onPress={() => setIsView(true)}>
                <Image source={{uri:photo[2].image || photo[2]}} className="flex-1 rounded-lg" resizeMode='cover'/>
                <View className="absolute bottom-0 right-0 left-0 top-0 rounded-lg" style={{backgroundColor:'rgba(0, 0, 0, 0.7)'}}>
                  <Text className="text-white font-magBold justify-center self-center my-auto">View All</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity className="flex-1 items-center justify-center bg-slate-300 h-24 rounded-lg mx-2" onPress={selectPhotoFromGallery}>
                <Text className="text-center font-magBold border-2 rounded-full px-3 py-1 text-base text-primary border-primary">+</Text>
              </TouchableOpacity>
            </View>
            </View>
           </> :photo.length === 3 ? 
           <View className="flex-row items-center justify-center flex-1">
            <View className="rounded-md flex-wrap flex-row items-center justify-between px-2">
              <View className="w-36 h-24 mt-5">
                <Image source={{uri:photo[0].image || photo[0] }} className="flex-1 rounded-lg" resizeMode='cover'/>
                <TouchableOpacity onPress={() => handleRemove(0, photo[0].id)} className="absolute -top-1 -right-1">
                  <AntDesign name="closecircle" size={18} color="crimson" />
                </TouchableOpacity>
              </View>
              <View className="w-36 h-24 mt-5">
                <Image source={{uri:photo[1].image || photo[1] }} className="flex-1 rounded-lg" resizeMode='cover'/>
                <TouchableOpacity onPress={() => handleRemove(1, photo[1].id)} className="absolute -top-1 -right-1">
                  <AntDesign name="closecircle" size={18} color="crimson" />
                </TouchableOpacity>
              </View>
              <TouchableOpacity className="w-36 h-24 mt-5" >
                <Image source={{uri:photo[2].image || photo[2] }} className="flex-1 rounded-lg" resizeMode='cover'/>
                <TouchableOpacity onPress={() => handleRemove(2, photo[2].id)} className="absolute -top-1 -right-1">
                  <AntDesign name="closecircle" size={18} color="crimson" />
                </TouchableOpacity>
              </TouchableOpacity>
              <TouchableOpacity className="w-36 items-center justify-center mt-2 bg-slate-300 h-24 rounded-lg" onPress={selectPhotoFromGallery}>
                <Text className="text-center font-magBold border-2 rounded-full px-3 py-1 text-base text-primary border-primary">+</Text>
              </TouchableOpacity>
            </View>
            </View> 
           : photo.length === 2 ? <>
            <View className="flex-row items-center justify-center flex-1">
            <View className="rounded-md flex-wrap flex-row items-center justify-between px-5">
              
              <TouchableOpacity className="w-36 h-24 mt-5">
                <Image source={{uri:photo[0].image || photo[0]}} className="flex-1 rounded-lg" resizeMode='cover'/>
                <TouchableOpacity onPress={() => handleRemove(0, photo[0].id)} className="absolute -top-1 -right-1">
                  <AntDesign name="closecircle" size={18} color="crimson" />
                </TouchableOpacity>
              </TouchableOpacity>
              <TouchableOpacity className="w-36 h-24 mt-5">
                <Image source={{uri:photo[1].image || photo[1]}} className="flex-1 rounded-lg" resizeMode='cover'/>
                <TouchableOpacity onPress={() => handleRemove(1, photo[1].id)} className="absolute -top-1 -right-1">
                  <AntDesign name="closecircle" size={18} color="crimson" />
                </TouchableOpacity>
              </TouchableOpacity>
              <TouchableOpacity className="w-36 items-center mt-5 justify-center bg-slate-300 h-24 rounded-lg" onPress={selectPhotoFromGallery}>
                <Text className="text-center font-magBold border-2 rounded-full px-3 py-1 text-base text-primary border-primary">+</Text>
              </TouchableOpacity>
            </View>
            </View> 
           </> : photo.length === 1 ? <>
            <View className="flex-row items-center justify-center flex-1">
            <View className="rounded-md flex-wrap flex-row items-center justify-between px-2">
              <TouchableOpacity className="w-36 h-24 mt-5">
                <Image source={{uri:photo[0].image || photo[0]}} className="flex-1 rounded-lg" resizeMode='cover'/>
                <TouchableOpacity onPress={() => handleRemove(0, photo[0].id)} className="absolute -top-1 -right-1">
                  <AntDesign name="closecircle" size={18} color="crimson" />
                </TouchableOpacity>
              </TouchableOpacity>
              <TouchableOpacity className="flex-1 items-center justify-center bg-slate-300 h-24 rounded-lg mx-2" onPress={selectPhotoFromGallery}>
                <Text className="text-center font-magBold border-2 rounded-full px-3 py-1 text-base text-primary border-primary">+</Text>
              </TouchableOpacity>
            </View>
            </View>
           </>:
           <>
           <TouchableOpacity className="items-center flex-1 py-3" onPress={openCamera}>
                <View className="p-4 bg-primary rounded-full"><AntDesign name="upload" size={24} color="white" /></View>
                <Text className="text-primary text-md font-magBold">Upload</Text>
            </TouchableOpacity>
            <TouchableOpacity className="items-center flex-1 py-3" onPress={selectPhotoFromGallery}>
                <View className="p-4 bg-primary rounded-full"><Feather name="camera" size={24} color="white" /></View>
                <Text className="text-primary text-md font-magBold">Select Photo</Text>
            </TouchableOpacity>
            </>
            }
        </View>
        <TouchableOpacity className="px-5 items-center mt-4" onPress={submitHandler}>
            <Text className="text-white bg-primary w-full text-center py-4 rounded-lg font-magBold">Submit</Text>
        </TouchableOpacity>
        </>
         }
    </SafeAreaView>
  )
}

export default EditMyService