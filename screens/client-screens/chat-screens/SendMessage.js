import { View, Text, SafeAreaView, StatusBar, TouchableOpacity, TextInput, ScrollView} from 'react-native'
import React from 'react'
import { Feather, Ionicons } from "@expo/vector-icons";
import MessageContent from '../../../components/MessageContent';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';


const SendMessage = ({navigation}) => {
  return (
    <SafeAreaView className="bg-white flex-1">
      <View className={`flex-row px-5 pt-8 pb-5`}>
        <TouchableOpacity>
            <Ionicons name="arrow-back-outline" size={35} color={'#0064ab'} onPress={() => navigation.goBack()}/>
        </TouchableOpacity>
        <Text className={`text-medium font-magBold text-primary flex-1`}>Chats</Text>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
      <View className="w-full justify-center items-center">
        <Text className='bg-white z-10 px-3 font-magRegular rounded-lg text-small'>Today</Text>
        <View className="w-[70%] bg-slate-400 h-[1px] absolute top-2.5"></View>
      </View>
       <MessageContent
          sender ='sender' 
          profile={'https://scontent.fdvo2-2.fna.fbcdn.net/v/t39.30808-1/449043168_992002292444002_6626595497113422677_n.jpg?stp=dst-jpg_p100x100&_nc_cat=105&ccb=1-7&_nc_sid=0ecb9b&_nc_ohc=OXUYlJLMtPkQ7kNvgEidn3M&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.fdvo2-2.fna&oh=00_AYC-miOVTsrb03EBWKlwuGx5R_GiJSA-49FV1ta5tdRx0w&oe=66C48336'}/>
       <MessageContent
          sender ='receiver' 
          profile={'https://scontent.fmnl13-2.fna.fbcdn.net/v/t39.30808-1/450688394_8057805287576103_1159261797584389444_n.jpg?stp=dst-jpg_p100x100&_nc_cat=103&ccb=1-7&_nc_sid=0ecb9b&_nc_ohc=aVSsmj6fTjoQ7kNvgEkl9vl&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.fmnl13-2.fna&oh=00_AYDRc4p7AXoGEhElJTnCFe4RFmBCVhlNQIMfe3ELndQSdQ&oe=66C5E063'}/>
       <MessageContent
          sender ='receiver' 
          profile={'https://scontent.fmnl13-2.fna.fbcdn.net/v/t39.30808-1/450688394_8057805287576103_1159261797584389444_n.jpg?stp=dst-jpg_p100x100&_nc_cat=103&ccb=1-7&_nc_sid=0ecb9b&_nc_ohc=aVSsmj6fTjoQ7kNvgEkl9vl&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.fmnl13-2.fna&oh=00_AYDRc4p7AXoGEhElJTnCFe4RFmBCVhlNQIMfe3ELndQSdQ&oe=66C5E063'}/>
       <MessageCo ntent
          sender ='sender' 
          profile={'https://scontent.fdvo2-2.fna.fbcdn.net/v/t39.30808-1/449043168_992002292444002_6626595497113422677_n.jpg?stp=dst-jpg_p100x100&_nc_cat=105&ccb=1-7&_nc_sid=0ecb9b&_nc_ohc=OXUYlJLMtPkQ7kNvgEidn3M&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.fdvo2-2.fna&oh=00_AYC-miOVTsrb03EBWKlwuGx5R_GiJSA-49FV1ta5tdRx0w&oe=66C48336'}/>

      </ScrollView>
  
      <View className="flex-row py-5 px-2 rounded-t-lg" style={{shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.25,
          shadowRadius: 1.84,

          elevation: 1.5,}}>
        <TextInput className='flex-1' multiline placeholder='Message Here'/>
        <TouchableOpacity>
          <MaterialCommunityIcons name="send-circle" size={40} color="#0064ab" />
        </TouchableOpacity>
      </View>
      <StatusBar backgroundColor={'white'}/>
    </SafeAreaView>
  )
}

export default SendMessage