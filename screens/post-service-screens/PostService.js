import { View, Text, TouchableOpacity, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import Header from '../../components/Header'
import CheckRounded from '../../components/CheckRounded'
import { TextInput } from 'react-native-gesture-handler'
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import * as ImagePicker from 'expo-image-picker';
import Buttons from '../../components/Buttons'
import ServiceImages from './ServiceImages'
import { apiUrl } from '../../apiUrl'
import axios from 'axios'
import { useSelector } from 'react-redux'

const PostService = ({navigation}) => {
  const user = useSelector((state) => state.user.user);

  const [services, setServices] = useState([]);
  const [title, setTitle] = useState();
  const [photo, setPhoto] = useState([]);
  const [isView, setIsView] = useState(false);
  const [loading, setLoading] = useState(false);

  const requestMediaLibraryPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission required', 'You need to allow access to the media library to select photos.');
      return false;
    }
    return true;
  };

 
  const selectPhotoFromGallery = async () => {
    // Request media library permissions first
    const hasPermission = await requestMediaLibraryPermission();
    if (!hasPermission) return;
  
    // Launch the gallery after permission is granted
    let response = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],  // Correct usage of MediaType
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    if (!response.canceled) {
      // Successfully selected an image
      setPhoto([...photo, response.assets[0].uri]);
    } else {
      console.log('Image picker was canceled');
    }
  };

  const openCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert(
        "Permission Denied",
        "Camera access is required to take pictures.",
        [{ text: "OK" }]
      );
      return;
    }
  
    try {
      let response = await ImagePicker.launchCameraAsync({
        mediaTypes: ['images'], // Ensures only images are captured
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      if (!response.canceled) {
        setPhoto([...photo, response.assets[0].uri]);
      }
    } catch (error) {
      console.error("Error launching camera:", error);
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


  }

  const handleRemove = (id) => {
    const updatedPhotos = photo.filter((_, index) => index !== id);
    setPhoto(updatedPhotos);
  };

  const submitHandler = async () => {
    if (validate()) {
      setLoading(true); // Set loading to true when submission starts
      try {
        // Create service
        const response = await axios.post(`${apiUrl}/api/create-service/`, {
          title,
          user: user.id,
          TypeOfService: services,
        });

        const serviceData = response.data;
        console.log('Service Created:', serviceData);

        // Prepare image upload promises
        const uploadPromises = photo.map((image, index) => {
          const formData = new FormData();
          formData.append('service', serviceData.id); // Match backend field
          formData.append('image', {
            uri: image,
            name: `image${index}.jpg`,
            type: 'image/jpeg',
          });

          return axios.post(`${apiUrl}/api/portfolio/`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
          });
        });

        // Upload images
        await Promise.all(uploadPromises);

        Alert.alert('Success', 'Service and images uploaded successfully!');
        navigation.navigate('Home');
      } catch (error) {
        if (error.response) {
          console.error('Server Error:', error.response.data); // Log backend response
        } else {
          console.error('Error:', error.response.data); // Log general error
        }
        Alert.alert('Error', 'There was an issue uploading your service. Please try again.');
      } finally {
        setLoading(false); // Reset loading state after submission
      }
    }
};


  
  return (
    <View>
      {isView ? <ServiceImages photos={photo} setPhotos={setPhoto} navigation={navigation} setIsView={setIsView} /> :
      <>
      <Header title="Post Service" navigation={navigation}/>
      <Text className="px-5 mt-8 text-lg font-magBold text-primary">Services Offered:</Text>
      <View className="flex-row px-8">
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
        <Text className="px-5 text-primary text-lg font-fitRegular mt-10">Add Title Here:</Text>
        <View className="w-full px-5 mt-4">
            <TextInput placeholder='Enter here' value={title} onChangeText={(e) => setTitle(e) } className="pl-2 border-b font-magRegular border-b-slate-400"/>
        </View>

        <View className="items-center flex-row justify-center mt-4 rounded-lg mx-5 border border-primary border-da bg-slate-200">
           {photo.length > 3 ? <>
            <View className="flex-row items-center justify-center flex-1">
            <View className="rounded-md flex-wrap flex-row items-center justify-between px-5">
              <View className="w-36 h-24 mt-5" >
                <Image source={{uri:photo[0]}} className="flex-1 rounded-lg" resizeMode='cover'/>
              </View>
              <View className="w-36 h-24 mt-5" >
                <Image source={{uri:photo[2]}} className="flex-1 rounded-lg" resizeMode='cover'/>
              </View>
              <TouchableOpacity className="w-36 h-24 mt-5" activeOpacity={0.8} onPress={() => setIsView(true)}>
                <Image source={{uri:photo[3]}} className="flex-1 rounded-lg" resizeMode='cover'/>
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
            <View className="rounded-md flex-wrap flex-row items-center justify-between px-5">
              <View className="w-36 h-24 mt-5">
                <Image source={{uri:photo[0]}} className="flex-1 rounded-lg" resizeMode='cover'/>
                <TouchableOpacity onPress={() => handleRemove(0)} className="absolute -top-1 -right-1">
                  <AntDesign name="closecircle" size={18} color="crimson" />
                </TouchableOpacity>
              </View>
              <View className="w-36 h-24 mt-5">
                <Image source={{uri:photo[1]}} className="flex-1 rounded-lg" resizeMode='cover'/>
                <TouchableOpacity onPress={() => handleRemove(1)} className="absolute -top-1 -right-1">
                  <AntDesign name="closecircle" size={18} color="crimson" />
                </TouchableOpacity>
              </View>
              <TouchableOpacity className="w-36 h-24 mt-5" >
                <Image source={{uri:photo[2]}} className="flex-1 rounded-lg" resizeMode='cover'/>
                <TouchableOpacity onPress={() => handleRemove(2)} className="absolute -top-1 -right-1">
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
                <Image source={{uri:photo[0]}} className="flex-1 rounded-lg" resizeMode='cover'/>
                <TouchableOpacity onPress={() => handleRemove(0)} className="absolute -top-1 -right-1">
                  <AntDesign name="closecircle" size={18} color="crimson" />
                </TouchableOpacity>
              </TouchableOpacity>
              <TouchableOpacity className="w-36 h-24 mt-5">
                <Image source={{uri:photo[1]}} className="flex-1 rounded-lg" resizeMode='cover'/>
                <TouchableOpacity onPress={() => handleRemove(1)} className="absolute -top-1 -right-1">
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
                <Image source={{uri:photo[0]}} className="flex-1 rounded-lg" resizeMode='cover'/>
                <TouchableOpacity onPress={() => handleRemove(0)} className="absolute -top-1 -right-1">
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

        <TouchableOpacity className="px-5 items-center mt-4" onPress={submitHandler} disabled={loading}>
            <Text className={`text-white ${loading ? 'bg-gray-400' : 'bg-primary'} w-full text-center py-4 rounded-lg font-magBold`}>
              {loading ? 'Submitting...' : 'Submit'}
            </Text>
        </TouchableOpacity>
      <StatusBar backgroundColor='#0064ab' style='dark'/>
      </>}
    </View>
  )
}

export default PostService;