import { View, Text, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import axios from "axios";
import { apiUrl } from "../apiUrl";

const RequestBtn = ({btnToggle, taskid, setTasks, tasks, userid, myUserId}) => {

  const verifyUserService = async () => {
    try {
        const response = await axios.get(`${apiUrl}/api/user/service/${myUserId}/`)
        const data = response.data;
        const haveService = data.length;

        if(haveService > 0) return sendOffer(myUserId, taskid);

    } catch (error) {
        console.log(error)
    }

    Alert.alert('Request Denied', 'You need to provide services before sending request.', [
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);

}


const sendOffer = async(id, taskid) => {
  console.log(id, taskid)
  try {
  const response = await axios.post(`${apiUrl}/api/request/`, {"status": "pending", "user": id, "task": taskid})
  const data = response.data;

  const filterRequest = tasks.filter(item => item.id !== taskid)
  setTasks(filterRequest)

  Alert.alert('Successful', 'Your request has been sent.', [
    {text: 'OK', onPress: () => console.log('OK Pressed')},
  ]);

 } catch (error) {
  console.log(error)
 }
}


  return (
    <TouchableOpacity
    disabled={btnToggle}
      onPress={verifyUserService}
      className={`bg-primary rounded-lg py-2 px-2 w-[40%] mt-2 items-center justify-center`}
      style={{
        shadowColor: "#000000",
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.17,
        shadowRadius: 3.05,
        elevation: 4,
      }}
    >
      <Text className="text-white text-xs">Send Request Offer</Text>
    </TouchableOpacity>
  );
};

export default RequestBtn;
