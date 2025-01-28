import { View, Text, Modal, TouchableOpacity } from 'react-native'
import Octicons from '@expo/vector-icons/Octicons';
import React, { useEffect } from 'react'
import { apiUrl } from '../apiUrl';

const BookingAcceptedModal = ({setIsAccepted, navigation, description, status, btnTitle, gotoTask}) => {


  return (
    <Modal
    transparent={true}
    animationType="slide"
  >
    <View className="flex-1 justify-center items-center" style={{backgroundColor:'rgba(0,0,0,0.4)'}}>
     <View className="h-[70%] w-[90%] bg-white items-center justify-center px-8"style={{borderRadius: 20}}>
        <View className="bg-primary px-8 py-5 items-center justify-center" style={{borderRadius:'100%'}}>
          <Octicons name="check" size={80} color="white" />
        </View>
        <Text className="text-primary font-fitExtraBold text-2xl my-5">{status}</Text>
        <Text className="text-sm font-fitMedium mb-10">{description}</Text>
        <TouchableOpacity
        onPress={gotoTask}
        className="bg-primary rounded-full px-5 py-2 absolute bottom-10"
        style={{
          shadowColor:"#000000",
          shadowOffset: {
              width: 1,
              height: 2,
          },
          shadowOpacity: 0,
          shadowRadius: 5,
          elevation: 4,
          }}>
            <Text className="text-white font-fitMedium text-lg">{btnTitle}</Text>
        </TouchableOpacity>
     </View>
    </View>
  </Modal>
  )
}

export default BookingAcceptedModal