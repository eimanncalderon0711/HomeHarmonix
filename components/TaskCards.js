import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Entypo from '@expo/vector-icons/Entypo';
import { FontAwesome } from '@expo/vector-icons';
import TaskDropdown from './TaskDropdown';
import { apiUrl } from '../apiUrl';

const TaskCards = ({ image, id, name, time, pending, ongoing, complete, statuses, navigation, DropDown}) => {

  const [toggle, setToggle] = useState(false);


  return (
    <View className="flex-row items-center px-4 py-4 pb-8 justify-evenly" style={{borderBottomColor:'rgba(0,0,0,0.2)', borderBottomWidth:1}}>
    <View className="flex-row items-center flex-1 pt-4">
      <View className="w-16 h-16 rounded-full border border-primary overflow-hidden">
      {image ? 
      <Image source={{uri:image}} resizeMode="cover" className="h-full w-full"/> :
      <View className="flex-1 justify-center">
          <FontAwesome name="user" size={24} color="black" opacity={0.5} className="text-center" />
       </View>}
      </View>
      <View className="flex-1 pl-4">
        <Text className="font-fitBold text-sm">{name}</Text>
        <Text className="font-fitRegular text-slate-500 text-xs">{time}</Text>
        {statuses && <View className="rounded-md mt-3" style={{backgroundColor:statuses === "inprogress" ? "rgba(247, 74, 37, 0.25)" : statuses === "done" ? "rgba(0, 174, 0, 0.25)" : "rgba(0, 100, 171, 0.25)", width:"45%"}}>
            <Text className="text-sm font-fitMedium text-center py-[3px]" style={{color: statuses === "inprogress" ? "rgba(229, 59, 22, 1)" : statuses === "done" ? "rgba(0, 174, 0, 1)" : "rgba(0, 100, 171, 1)"}}>{statuses === 'confirmed' ? 'Waiting' : statuses === 'pending' ? 'Pending' : statuses === "inprogress" ? "Work in progress" : "Done"}</Text>
        </View>}
      </View>
    </View>
  {toggle && <TaskDropdown setToggle={setToggle} toggle={toggle}  navigation={navigation} statuses={statuses} id={id}/>}
    {DropDown && <TouchableOpacity onPress={() => setToggle(!toggle)}>
      <Entypo name="dots-three-vertical" size={18} color="black" />
    </TouchableOpacity>}
  </View>
  )
}

export default TaskCards