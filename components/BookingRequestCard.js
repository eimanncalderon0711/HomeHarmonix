import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { apiUrl } from "../apiUrl";
import { useSelector, useDispatch } from "react-redux";
import { saveBookDetails } from "../app-states/features/bookingSlice";
import FontAwesome from '@expo/vector-icons/FontAwesome';

const BookingRequestCard = ({fullname, image, location, id, setShowModal}) => {
    const [address, setAddress] = useState();
    const user = useSelector((state) => state.user.user); 
    const booking = useSelector((state) => state.booking.book_details);
    const dispatch = useDispatch();

  useEffect(() => {
    if(location){
      axios.get(`${apiUrl}/api/address/detail/${location}/`)
    .then(res => setAddress(res.data.address_name))
    .catch(err => console.error(err))
    }
  },[])

  const openBooking = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/booking/${id}/detail/`)
      const data = response.data;
      setShowModal(true);
      dispatch(saveBookDetails(data))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <TouchableOpacity onPress={openBooking} className="bg-slate-100 mt-5 py-2 px-2 mx-2 rounded-lg">
      <View className="flex-row items-center">
        <View className="w-14 h-14 mr-5 rounded-full overflow-hidden">
          { image ? <Image
            source={{uri: image}}
            className="w-full h-full"
            resizeMode="cover"
          />: <View className="bg-slate-200 flex-1 items-center justify-center"><FontAwesome name="user" size={24} color="#0064ab" className="text-center"/></View>}
        </View>
        <View className="flex-1">
          <Text className="text-base font-fitBold  ">
            New booking request!
          </Text>
       
          <Text className="text-sm font-magRegular text-slate-500">
            {fullname}, {address ? address : ''}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default BookingRequestCard;
