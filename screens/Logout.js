import { View, Text, Button } from 'react-native'
import React from 'react'
import Header from '../components/Header'
import { useDispatch, useSelector } from 'react-redux'
import {logout} from '../app-states/features/userSlice'

const Logout = ({navigation}) => {

  // const data = useSelector((state) => state.user.user_address)
  const dispatch = useDispatch();

  

  const handlePress = () => {
    dispatch(logout());
  }
  return (
    <View className="flex-1">
      {/* <Header title="Logout" navigation={navigation}/> */}
      <Button title='logout' onPress={handlePress}/>
    </View>
  )
}

export default Logout