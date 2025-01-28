import { View, Text, ScrollView, RefreshControl } from "react-native";
import React from "react";
import BookingRequestCard from "../../components/BookingRequestCard";
import TaskRequestCard from "../../components/TaskRequestCard";
import { apiUrl } from "../../apiUrl";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';



const NotificationContainer = ({navigation, bookings, request, setRequests, setShowModal, setAcceptedTask}) => {
  return (
    <ScrollView className="h-fit " 
    > 
      {request.length > 0 &&
        request.map((usr, index) => {
          console.log(usr)
          return usr.status !== "decline" && <TaskRequestCard navigation={navigation} setAcceptedTask={setAcceptedTask} setShowModal={setShowModal} key={index} setRequests={setRequests} id={usr.id} user_id={usr.user.id} fullname={usr.user?.fullname} location={usr.user?.address} image={usr.user?.profile_image}/>
          
        })}
        {bookings.length > 0 && 
        bookings.map((usr, index) => {
          return usr.status !== 'confirmed' && <BookingRequestCard user_id={usr.user.id} setShowModal={setShowModal} image={usr.user.profile_image} fullname={usr.user.fullname} location={usr.user.address} key={index} id={usr.id}/>
        })}  
    </ScrollView>
    
  );
};

export default NotificationContainer;
