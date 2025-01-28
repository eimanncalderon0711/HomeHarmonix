import { View, TextInput, TouchableOpacity, Text,ScrollView} from 'react-native'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import React from 'react'

const Search = () => {
  return (
    <View className="flex-1 items-center justify-center">
      <View className="top-12 w-full rounded-full">
        <View className="flex-row bg-white items-center rounded-full px-2">
          <TouchableOpacity>
            <FontAwesome6 name="magnifying-glass" size={16} color="#0064ab"/>
          </TouchableOpacity>
          <TextInput placeholder='Search' className=" px-2 py-[3px] text-xs flex-1"/>
        </View>
      </View>
    </View>
  )
}

export default Search