import { View, Text, FlatList } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import TaskCards from '../../components/TaskCards';
import { useDispatch, useSelector } from 'react-redux';
import { apiUrl } from '../../apiUrl';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';

const BookingCompleted = ({navigation}) => {
  const user = useSelector((state) => state.user.user);
  const clicked = useSelector((state) => state.booking.click);
  const dispatch = useDispatch();

  const [myBooking, setMyBooking] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [img, setImg] = useState(null);
  const [submit, setSubmit] = useState(false);
  const isLogged = useSelector((state) => state.user.islogged);

  
  const fetchAcceptedBooking = async () => {
    const response = await axios.get(`${apiUrl}/api/my-booking/`);
    const data = response.data;
    const filterRequestBooking = data.filter((i) => i.user.id === user.id)
    const filterAcceptBooking = filterRequestBooking.filter((i) => i.status === 'done');
    setMyBooking(filterAcceptBooking)
    
    const user_id = filterAcceptBooking[0].service.user

    const getImage = await axios.get(`${apiUrl}/api/user/detail/${user_id}/`)
    const img = getImage.data;
    setImg(img.profile_image);
    // await axios.get(`${apiUrl}/api/user/`)
  }
  
  useFocusEffect(
    useCallback(() => {
      if(isLogged && user.id) {
        fetchAcceptedBooking();
      }
      else{
        setMyBooking([])
      }
    }, [isLogged, user.id, myBooking.length, clicked.value])
  );

  return (
    <View className="flex-1 bg-white">
      <View className="w-full h-full">
        {/* this is card below */}
      <FlatList
      contentContainerStyle={{
        flexGrow: 1, // Ensures FlatList takes up all available space
        justifyContent: myBooking.length === 0 ? 'center' : 'flex-start', // Centers empty state
      }}
       data={myBooking}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => {
          const newDate = new Date(item.schedule_date);
          const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        }; 
        const formatted = newDate.toLocaleString('en-US', options);
        const formattedTime = formatted.split(',')[0]; 
        const formattedYear = formatted.split(',')[1]; 
        const formattedDate = formatted.split(',')[2];
          return <TaskCards DropDown={true} navigation={navigation} statuses={item.status} image={img ? img : null} id={item.id} name={item.service.title} time={`${formattedTime}, ${formattedYear} | ${formattedDate}`}/>;
      }}
      ListEmptyComponent={() => <View className="flex-1 justify-center items-center"><Text className="text-center font-fitBold text-small text-primary">No Bookings Available</Text></View>}
      refreshing={refreshing}  // Pass the refreshing state to the FlatList
      onRefresh={fetchAcceptedBooking}    // Pass the fetchData function to the onRefresh prop
       />
      </View>
    </View>
  )
}

export default BookingCompleted