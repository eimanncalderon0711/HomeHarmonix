import { View, Text } from 'react-native'
import React from 'react'
import MessageBox from './MessageBox'
import Avatar from './Avatar'

const MessageContent = ({sender, profile}) => {
  return (
    <View className={`px-3 ${sender !== 'sender' ? 'flex-row' : 'flex-row-reverse'} mt-5 justify-start`}>
        <Avatar profile={profile}/>
        <View className="flex-1 px-3 pt-2">
            <MessageBox sender={sender} textMessage={'Buenas Dias'}/>
            <MessageBox sender={sender} textMessage={'Perspiciatis quidem, pariatur, temporibus aut corrupti Perspiciatis quidem, pariatur, temporibus aut corrupti facere incidunt accusantium aliquam quod earum veritatis.'}/>
            <MessageBox sender={sender} textMessage={'Lorem'}/>
        </View>
    </View>
  )
}

export default MessageContent