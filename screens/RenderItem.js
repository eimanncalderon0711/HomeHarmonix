import { View, Text } from 'react-native'
import React from 'react'
import Cards from '../components/Cards'

const RenderItem = ({name, logo, profile}) => {
  return (
    <View className="flex-1 items-center flex-row">
      <Cards name={name} logo={logo} profile={profile}/>
    </View>
  )
}

export default RenderItem