import { View, Text, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';

const CheckRounded = ({ title, type, setType, id, bool }) => {
  const [isCheck, setCheck] = useState(false);


  useEffect(() => {
    setCheck(bool)
  },[bool])


  const handlePress = (ids) => {
    if (isCheck) {
      setType((prev) => prev.filter((item) => item !== ids));
    } else {
      setType((prev) => [...prev, ids]);
    }
    setCheck(!isCheck);
  };

  return (
    <View>
      <TouchableOpacity
        className="flex-row items-center gap-x-2 pt-2"
        onPress={() => handlePress(id)}
      >
        <View
          className={`h-3 w-3 border border-gray rounded-full ${
            isCheck ? 'bg-gray' : ''
          }`}
        ></View>
        <Text className="text-primary font-fitRegular text-md">{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CheckRounded;