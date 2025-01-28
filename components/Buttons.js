import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

const Buttons = ({loading, icons, btnTitle, textStyle, btnStyle, btnSpacing, onPress}) => {
  return (
    <View className={`justify-center items-center ${btnSpacing}`}>
      <TouchableOpacity disabled={loading} onPress={onPress} activeOpacity={0.7} className={`w-full ${btnStyle}`}>
        <Text className={`text-center ${textStyle}`}>{btnTitle}</Text>
        {icons}
      </TouchableOpacity>
    </View>
  );
};

export default Buttons;
