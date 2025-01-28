import { View, Text, TouchableOpacity, Image, Dimensions } from "react-native";
import React from "react";
import Entypo from '@expo/vector-icons/Entypo';

const { width } = Dimensions.get('window');

const Cards = ({ name, profile, logo, id, services, navigation, user }) => {
  return (
   
    <View key={id} className="flex-1 py-2">
      <Text>{name}</Text>

      {/* <View className="mx-2 border px-2 rounded-2xl border-primary">
      <View className="w-full flex-row items-center justify-between my-2">
        <View className="h-10 w-10 rounded-full overflow-hidden border border-primary">
          <Image source={{uri:logo}} resizeMode="cover" className="h-full w-full" />
        </View>
        <View className="flex-1 flex-row items-center px-2">
          <View className="w-full">
            <Text className="text-primary font-magBold">{name}</Text>
            <Text className="text-xs text-slate-500">Home Cleaning, Painting</Text>
          </View>
        </View>
      </View>
      <View className="border-primary my-2">
        {profile ? <Image source={{uri:profile}} resizeMode="stretch" className="w-full h-44"/> : <Image source={require('../assets/images/Registration.png')} resizeMode="stretch" className="w-full h-44"/>}
      </View>
      <TouchableOpacity onPress={() => navigation.navigate("View Detail", {id: id})} className="bg-primary mb-2 items-center py-2">
        <Text className="text-white font-magBold">View Detail</Text>
      </TouchableOpacity>
      <TouchableOpacity className="bg-yellow mb-2 rounded-b-xl items-center py-2">
        <Text className="text-white font-magBold">Book Now</Text>
      </TouchableOpacity>
      </View> */}
     
    </View>
  );
};

export default Cards;
