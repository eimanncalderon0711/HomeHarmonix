import { View, TextInput, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Feather } from '@expo/vector-icons';

const Fields = ({ icon, name, onChangeText, value}) => {

  const [isHide, setIsHide] = useState(true);

  return (
    <>
      <View className="flex-row border border-gray mt-2 items-center rounded-lg" style={{paddingVertical: 15, paddingHorizontal: 10}}>
        {icon}
        <TextInput
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={((name === "Password" || name === "New Password" || name ==="Confirm Password")) && isHide}
          placeholder={name}
          className=" text-gray-dark flex-1 pl-3 font-fitRegular"
        />
        {((name === "Password" || name === "Confirm Password" || name === "New Password"))&&
        <TouchableOpacity onPress={() => setIsHide(!isHide)}>
          {isHide ? <Feather name="eye" size={15} color="gray" /> : <Feather name="eye-off" size={15} color="black" />}
        </TouchableOpacity>}
      </View>
    </>
  );
};

export default Fields;
