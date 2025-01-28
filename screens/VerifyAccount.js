import { View, Text, TouchableOpacity, ScrollView, TextInput, Alert, Image } from 'react-native'
import React, { useState } from 'react'
import * as ImagePicker from 'expo-image-picker';
import { apiUrl } from '../apiUrl';
import axios from 'axios';
import { useSelector } from 'react-redux';

const VerifyAccount = ({navigation}) => {
    const [certificates, setCertificates] = useState([])
    const [validId, setValidId] = useState()
    const [phone1, setPhone1] = useState("")
    const [phone2, setPhone2] = useState("")
    const user = useSelector((state) => state.user.user);
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
          quality: 1,
        });
      
        if (!response.canceled) {
          // Successfully selected an image
          setCertificates([...certificates, response.assets[0].uri]);
        } else {
          console.log('Image picker was canceled');
        }
      };

    const uploadValidId = async () => {
    // Request media library permissions first
    const hasPermission = await requestMediaLibraryPermission();
    if (!hasPermission) return;
    
    // Launch the gallery after permission is granted
    let response = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],  // Correct usage of MediaType
        allowsEditing: true,
        quality: 1,
    });
    
    if (!response.canceled) {
        // Successfully selected an image
        setValidId(response.assets[0].uri);
    } else {
        console.log('Image picker was canceled');
    }
    };
    
    const submitCredentials = async () => {
        // console.log('Certificate:', certificates)
        // console.log('Valid Id:', validId)
        if(!validId || !phone1 || !phone2){
            console.log("Fill all the required fields")
            Alert.alert("Failed", "Fill all the required fields")
        }
        else if(phone1 === phone2) {
          Alert.alert("Failed", "Provide both phone number must be unique")
        }
        else if(phone1.length !== 11 || phone2.length !== 11 || phone1 === "" || phone2 === ""){
            Alert.alert("Failed", "Provide a valid phone number")
        }
        else{
          const submitVerifiedAccount = async (phoneNumbers, certificates, validId) => {
            const phoneId = [];
            const certificateId = [];
            const formData = new FormData();
            setLoading(true);
          
            try {
              // Step 1: Insert phone numbers and store their IDs
              console.log("Processing phone numbers...");
              for (const phone of phoneNumbers) {
                try {
                  const response = await axios.post(`${apiUrl}/api/reference-user/`, { phone });
                  phoneId.push(response.data.id); // Store the phone ID
                } catch (error) {
                  console.error("Error processing phone number:", error.response?.data || error);
                }
              }
              console.log("Phone IDs:", phoneId);
          
              // Step 2: Insert certificates and store their IDs
              console.log("Processing certificates...");
              for (const certificate of certificates) {
                const certForm = new FormData();
                certForm.append('certificate', {
                  uri: certificate,
                  name: `image.jpg`,
                  type: 'image/jpeg',
                });
          
                try {
                  const response = await axios.post(`${apiUrl}/api/certificates/`, certForm, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                  });
                  certificateId.push(response.data.id); // Store the certificate ID
                } catch (error) {
                  console.error("Error processing certificate:", error.response?.data || error);
                }
              }
              console.log("Certificate IDs:", certificateId);
          
              // Step 3: Append data to FormData
              console.log("Preparing form data...");
              formData.append('valid_id', {
                uri: validId,
                name: `image.jpg`,
                type: 'image/jpeg',
              });
          
              phoneId.forEach((id) => formData.append('character_references', id));
              certificateId.forEach((id) => formData.append('certificate', id));
              formData.append('user', user.id);
          
              // Step 4: Submit the final POST request
              console.log("Submitting final request...");
              const response = await axios.post(`${apiUrl}/api/getverified-account/`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
              });
              if(response.status === 201){
                console.log("Final Response: ", response.data);
                Alert.alert('Success!', "Wait for 1-5 days to verify your account", [{
                  text: 'OK',
                  onPress: () => navigation.goBack(),
                }])
              }
            } catch (error) {
              console.error("Final Post Error: ", error.response?.data || error);
            }finally{
              setLoading(false)
            }
          };
          
          // Example Call
          const phoneNumbers = [phone1, phone2]; // Replace with actual phone numbers
          
          submitVerifiedAccount(phoneNumbers, certificates, validId);
        }
    };

    const handleChange1 = (text) => {
        // Check if the input matches the regex pattern for 1 to 11 digits
        const regex = /^\d{0,11}$/;
        if (regex.test(text)) {
          setPhone1(text);
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
    const handleChange2 = (text) => {
        // Check if the input matches the regex pattern for 1 to 11 digits
        const regex = /^\d{0,11}$/;
        if (regex.test(text)) {
          setPhone2(text);
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

    const clearData = () => {
        setCertificates([])
        setValidId()
    }

  return (
    <View className="bg-white flex-1 items-center justify-start">
    <ScrollView className="my-5">
      <Text className="text-center font-fitExtraBold text-primary"m style={{fontSize:30, marginTop: 60}}>Verify Your Account</Text>
      <Text className="text-center font-fitExtraBold text-primary"m style={{fontSize:30, marginBottom:35}}>and {'\n'}Provide Your Service</Text>
      <View className="w-full px-10">
        <View className=" w-full border border-primary rounded-md" style={{marginTop:15}}>
            <TouchableOpacity onPress={selectPhotoFromGallery} style={{backgroundColor: "#0064ab", paddingVertical:10}}>
                <Text className="text-white text-center font-fitMedium">Add certificate: (Optional)</Text>
            </TouchableOpacity>
            {certificates.length > 0 && <View className="flex-row flex-wrap justify-evenly" style={{padding:5}}>
              {certificates.map((i, idx) => <Image key={idx} source={{uri: i}} width={120} height={120} resizeMode='contain'/>)}
            </View>}
        </View>
        <View className="w-full border border-primary rounded-md" style={{marginTop:15, marginBottom:10}}>
            <TouchableOpacity disabled={validId ? true : false} onPress={uploadValidId} style={{backgroundColor: validId ? "gray" : "#0064ab", paddingVertical:10}}>
                <Text className="text-white text-center font-fitMedium">Add Valid ID: (Required)</Text>
            </TouchableOpacity>
            {validId && <View className="justify-center items-center" style={{padding:5}}><Image source={{uri: validId}} width={180} height={180} resizeMode='contain'/></View>}
        </View>
       
        <View className="self-start">
            <TouchableOpacity onPress={clearData} className="bg-primary rounded-md" style={{paddingVertical:8, paddingHorizontal:20, marginBottom: 10}}>
                <Text className="text-white font-fitMedium text-center">Clear</Text>
            </TouchableOpacity>
        </View>
        <View>
            <Text className="font-fitMedium text-primary">Add Atleast 2 People to prove your Service reliability (Required)</Text>
        </View>
        <View className="border rounded-md border-primary" style={{marginVertical:4, paddingVertical:15, paddingHorizontal:5}}>
            <TextInput className="font-fitMedium text-sm" value={phone1} onChangeText={handleChange1} placeholder='Enter Phone Number'/>
        </View>
        <View className="border rounded-md border-primary" style={{marginVertical:4, paddingVertical:15, paddingHorizontal:5}}>
            <TextInput className="font-fitMedium text-sm" value={phone2} onChangeText={handleChange2} placeholder='Enter Phone Number'/>
        </View>
        <View className="flex-row justify-center w-full items-center" style={{marginTop:10}}>
            <TouchableOpacity disabled={loading ? true : false} onPress={() => navigation.goBack()} className={`${loading ? 'bg-gray' : 'bg-primary'} flex-1 rounded-m`} style={{marginRight:5}}>
                <Text className="text-center text-white font-fitMedium" style={{paddingVertical:15}}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity disabled={loading ? true : false} onPress={submitCredentials} className={`${loading ? 'bg-gray' : 'bg-primary'} flex-1 rounded-m`} style={{marginLeft:5}}>
                <Text className="text-center text-white font-fitMedium" style={{paddingVertical:15}}>{loading ? "Submitting" : "Submit"}</Text>
            </TouchableOpacity>
        </View>
      </View>
      </ScrollView>
    </View>
  )
}

export default VerifyAccount