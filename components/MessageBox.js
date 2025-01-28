import { View, Text } from "react-native";
import React from "react";

const MessageBox = ({textMessage, sender}) => {
  return (
    <>
    {textMessage &&
    <View className={`p-3 mb-2 justify-start bg-${sender === 'sender' ? 'primary' : 'gray-dark'} rounded-tr-xl rounded-br-xl rounded-bl-xl`}>
        <Text className="text-white font-magRegular">{textMessage}</Text>
    </View>
    }
    </>
  );
};

export default MessageBox;
