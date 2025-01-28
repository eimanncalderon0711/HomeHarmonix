import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import { apiUrl } from '../apiUrl';
import { useSelector, useDispatch } from 'react-redux';
import { done_rate, refreshes, service_info } from '../app-states/features/bookingSlice';


const TaskDropdown = ({id, navigation, statuses, setToggle, toggle}) => {

     const dispatch = useDispatch();
     const clicked = useSelector((state) => state.booking.click)

     const startJob = async () => {
          toggle = clicked.value
          try {
               const response = await axios.patch(`${apiUrl}/api/booking/${id}/detail/`, {
                    status: 'inprogress',
               });
               const data = await response.data;
               dispatch(refreshes(!toggle))
               setToggle(!toggle)
               navigation.navigate("Ongoing")
          } catch (error) {
               console.log(error)
          }
     }
     
     
     const doneJob = async () => {
          toggle = clicked.value
          try {
               const response = await axios.patch(`${apiUrl}/api/booking/${id}/detail/`, {
                    status: 'done',
               });
               const data = await response.data;
               console.log(data)
               dispatch(refreshes(!toggle))
               setToggle(!toggle)
               navigation.navigate("Completed")
          } catch (error) {
               console.log(error)
          }
     }

     const cancelBooking = async () => {
          try {
               const response = await axios.patch(`${apiUrl}/api/booking/${id}/detail/`, {
                    status: 'canceled',
               });
               const data = await response.data;
               console.log(data)
          } catch (error) {
               console.log(error)
          }
     }
  
     const rateWorker = async() => {
          try {
               const response = await axios.get(`${apiUrl}/api/rate-booking/${id}/`);
               const data = response.data;
               const service = data.service.title
               const user = data.service.user
               const service_id = data.service.id
               dispatch(service_info({
                    id: id,
                    title: service,
                    user: user
               }))
               dispatch(done_rate(true))
          } catch (error) {
               console.log(error)
          }
     }

     useEffect(() =>{console.log(statuses)},[])

     return (
    <View className="absolute bg-white rounded-xl p-4 top-20 right-5 z-10" style={{borderColor:"rgba(0,0,0,0.3)", borderWidth:1}}>  
       <TouchableOpacity onPress={startJob} disabled={statuses === 'confirmed' ? false : true} className="flex-row gap-x-2 py-2 px-2 items-center">
            <MaterialIcons name="engineering" size={24} color={statuses === 'confirmed' ? '#0064ab' : "#94a3b8"} />
            <Text className={`font-fitMedium ${statuses === 'confirmed' ? 'text-primary' : "text-slate-400"}`}>Start Job</Text>
       </TouchableOpacity>
       <TouchableOpacity onPress={doneJob} disabled={statuses === 'inprogress' ? false : true} className="flex-row gap-x-2 py-2 px-2 items-center">
            <FontAwesome5 name="user-check" size={18} color={statuses === 'inprogress' ? '#0064ab' : "#94a3b8"} />
            <Text className={`font-fitMedium ${statuses === 'inprogress' ? 'text-primary' : "text-slate-400"}`}>Done</Text>
       </TouchableOpacity>
       <TouchableOpacity onPress={rateWorker} disabled={statuses === 'done' ? false : true} className="flex-row gap-x-2 py-2 px-1 items-center">
            <MaterialCommunityIcons name="message-star-outline" size={24} color={statuses === 'done' ? '#0064ab' : "#94a3b8"} />
            <Text className={`font-fitMedium ${statuses === 'done' ? 'text-primary' : "text-slate-400"}`}>Rate</Text>
       </TouchableOpacity>
       <TouchableOpacity onPress={cancelBooking} disabled={statuses === 'pending' || statuses === 'confirmed' ? false: true} className="flex-row gap-x-2 py-2 px-1 items-center">
            <MaterialCommunityIcons name="close-circle-outline" size={24} color={statuses === 'pending' || statuses ===  'confirmed' ? '#0064ab' : "#94a3b8"} />
            <Text className={`font-fitMedium ${statuses === 'pending' || statuses === 'confirmed' ? 'text-primary' : "text-slate-400"}`}>Cancel Booking</Text>
       </TouchableOpacity>
      </View>
  )
}

export default TaskDropdown