import { View, Text, FlatList } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import TaskCards from '../../components/TaskCards';
import { useSelector } from 'react-redux';
import { apiUrl } from '../../apiUrl';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';

const Ongoing = ({navigation}) => {
  const user = useSelector((state) => state.user.user);
  const [bookingData, setBookingData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const isLogged = useSelector((state) => state.user.islogged);

  const fetchConfirmedBookings = async () => {
    setRefreshing(true);
    try {
      const response = await axios.get(`${apiUrl}/api/booking/${user.id}/`)
      const data = response.data;
      if(response.status === 200){
        const confirmed = data.filter((d,i) => d.status === 'inprogress');
        setBookingData(confirmed)
      }

    } catch (error) {
      console.log(error)
    }finally{
      setRefreshing(false);
    }
  };

  const checkFirstIfServiceAvailable = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/user/service/${user.id}/`);
      const data = response.data;
      if (data.length > 0) {
        fetchConfirmedBookings();
      }
    } catch (error) {
      console.log(error)
    }
  }

  useFocusEffect(
    useCallback(() => {
      if(isLogged && user.id) {
        checkFirstIfServiceAvailable();
      }
      else{
        setBookingData([])
      }
    }, [isLogged, user.id])
  );

  return (
    <View className="flex-1 bg-white">
      <View className="w-full h-full">
        {/* this is card below */}
      <FlatList
      contentContainerStyle={{
        flexGrow: 1, // Ensures FlatList takes up all available space
        justifyContent: bookingData.length === 0 ? 'center' : 'flex-start', // Centers empty state
      }}
       data={bookingData}
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
          return <TaskCards navigation={navigation} statuses={item.status} ongoing={true} image={item.user.profile_image} id={item.id} name={item.user.fullname} time={`${formattedTime}, ${formattedYear} | ${formattedDate}`}/>;
      }}
      ListEmptyComponent={() => <View className="flex-1 justify-center items-center"><Text className="text-center font-fitBold text-small text-primary">No Task Available</Text></View>}
      refreshing={refreshing}  // Pass the refreshing state to the FlatList
      onRefresh={fetchConfirmedBookings}    // Pass the fetchData function to the onRefresh prop
       />
      </View>
    </View>
  )
}

export default Ongoing