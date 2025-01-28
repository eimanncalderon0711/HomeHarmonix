import { View, Text, TouchableOpacity, Alert } from "react-native";
import React from "react";
import axios from "axios";
import { apiUrl } from "../apiUrl";

const DropDownEdit = ({id, navigation}) => {

  const handleEdit = (e) => {
    navigation.navigate("Edit Service", {service_id: e})
  }

  const handleDelete = (e) => {
   Alert.alert('Warning', 'Are you sure you want to delete this service?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: async () => {
        await axios.delete(`${apiUrl}/api/details-service/${e}/`);
        Alert.alert('Successful', 'Your Service Succesfully Deleted')
      
      }, style: 'ok'}
    ]);

  }


    return (
        <View className="z-10 absolute bottom-[-85px] rounded-l-lg rounded-b-lg p-3 px-4 right-0 bg-white">
            <TouchableOpacity onPress={() => handleEdit(id)} className="my-2">
              <Text className="text-slate-700 font-magBold font-medium">Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDelete(id)} className="my-2">
              <Text className="text-red-500 font-magBold font-medium">Delete</Text>
            </TouchableOpacity>
        </View>
      );
}

export default DropDownEdit