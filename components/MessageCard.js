import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import React from "react";
import Avatar from "./Avatar";

const MessageCard = ({name, profile, time, messages, incoming_messages, onPress}) => {
  return (
      <TouchableOpacity onPress={onPress} className="p-2 my-1 rounded-md flex-row items-center justify-between">
        {incoming_messages !==0 &&
        <View className="absolute z-10 top-1 left-1 rounded-full bg-primary px-2 h-5 flex-1 items-center justify-center">
          <Text className="font-magBold text-white text-xs relative rounded-full">
            {incoming_messages}
          </Text>
        </View>}
        <Avatar profile={profile}/>
        <View className="pl-4 flex-1">
          <Text className="text-small font-magBold text-primary">
            {name}
          </Text>
          <Text className="font-magRegular text-primary">
            {incoming_messages > 0 ? "You have messages" : null}
          </Text>
        </View>
        <Text className="font-magRegular self-start pt-2 text-primary">
          {time}
        </Text>
      </TouchableOpacity>
  );
};

export default MessageCard;
