import { View, Text, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../components/Header'
import ViewTaskCard from '../components/ViewTaskCard'

const ViewTasks = ({navigation}) => {
  return (
    <SafeAreaView className="flex-1">
      <Header title={'Available Tasks'} navigation={navigation}/>
      <ViewTaskCard navigation={navigation}/>
    </SafeAreaView>
  )
}

export default ViewTasks