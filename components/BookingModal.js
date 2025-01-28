import { View, Text, Modal, TouchableOpacity } from 'react-native'
import Octicons from '@expo/vector-icons/Octicons';
import React from 'react'

const BookingModal = ({setIsBooked, navigation}) => {
  return (
    <Modal
      transparent={true}
      animationType="slide"
    >
      <View className="flex-1 justify-end items-end" style={{backgroundColor:'rgba(0,0,0,0.4)'}}>
       <View className="h-[50%] bg-white w-full items-center justify-center px-8" style={{borderTopRightRadius: 50, borderTopLeftRadius: 50}}>
          <View className="bg-primary px-8 py-5 items-center justify-center" style={{borderRadius:'100%'}}>
            <Octicons name="check" size={80} color="white" />
          </View>
          <Text className="text-primary font-fitExtraBold text-2xl my-5">Done</Text>
          <Text className="text-sm font-fitMedium">Your booking has been completed successfully. {"\n"}Please wait for confirmation from the worker.</Text>
          <TouchableOpacity className="bg-primary rounded-full px-5 py-2 mt-10" onPress={() => {
            navigation.navigate("Home")
            setIsBooked(false)}}>
              <Text className="text-white font-fitMedium text-lg">Back To Home</Text>
          </TouchableOpacity>
       </View>
      </View>
    </Modal>
  )
}

export default BookingModal