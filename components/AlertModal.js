import React from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';

const AlertModal = ({ visible, title, message, onClose }) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
    >
      <View className="flex-1 justify-center items-center" style={{backgroundColor:'rgba(0,0,0,0.4)'}}>
        <View className="w-[90%] p-5 bg-white rounded-lg items-center">
          <Text className="text-lg font-bold mb-4">{title}</Text>
          <Text className="text-base text-gray-700 mb-6 text-center">{message}</Text>
          <TouchableOpacity
            onPress={onClose}
            className="px-4 py-2 bg-blue-500 rounded-md w-1/2 items-center"
          >
            <Text className="text-black font-semibold">OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default AlertModal;