import { View, Text, TouchableOpacity,StatusBar, Image, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Feather, Ionicons } from "@expo/vector-icons";
import { DrawerActions } from "@react-navigation/native";
import React, { useState } from 'react'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Search from './Search';
import Dropdown from './Dropdown';

const Header = ({title, navigation, spacing, headerColor, textColor}) => {

  const [toggle, setToggle] = useState(false)

  const handleToggle = () => {
    setToggle(!toggle);
  }

  return (
    <SafeAreaView>
      <View className="bg-primary pt-4 z-20">
      <View className={`py-4 flex-row px-5 gap-x-5 justify-start items-center`}>
          <TouchableOpacity className="mr-5">
            { ((title === 'Home')) ? 
              <Feather name="menu" size={24} color="white" onPress={() => navigation.dispatch(DrawerActions.openDrawer)}/> :
              <Ionicons name="arrow-back-outline" size={24} color={'white'} onPress={() => navigation.goBack()}/>
            }
          </TouchableOpacity>
          <TouchableOpacity onPress={handleToggle}>
            <Text className="text-white text-small font-fitMedium">{title}</Text>
          </TouchableOpacity>
          { toggle && <Dropdown/> }
        </View>
      </View>
      <StatusBar backgroundColor={"#0064ab"} />
    </SafeAreaView>
  )
}

export default Header

