import { View, Image } from 'react-native'
import React from 'react'

const Avatar = ({profile}) => {
  return (
    <View>
      <Image
          source={{
            uri: profile,
          }}
          className="w-14 h-14 rounded-full"
          resizeMode="contain"
        />
    </View>
  )
}

export default Avatar