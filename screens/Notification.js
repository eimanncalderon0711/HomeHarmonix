import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, RefreshControl, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Header from '../components/Header';
import { apiUrl } from '../apiUrl';
import NotificationContainer from '../screens/notification-screen/NotificationContainer'
import AcceptBookingModal from '../components/AcceptBookingModal';
import BookingAcceptedModal from '../components/BookingAcceptedModal';

const Notification = ({ navigation, service_id }) => {
  const user = useSelector((state) => state.user.user);
  const isLogged = useSelector((state) => state.user.islogged);
  const [request, setRequests] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [toggle, setToggle] = useState(false)
  const [isAccepted, setIsAccepted] = useState(false);

  const handleToggle = () => {
    setToggle(!toggle);
  }


  const fetchNotifications = async () => {
    if (user.id) {
      try {
        // const checkIfHasBookings = await axios.get(`${apiUrl}/api/booking/`);
        // const data = checkIfHasBookings.data;
        // const validated = data.filter(i => i.user === user.id);
        // console.log(validated)
        // if(validated.length > 0){
          const response = await axios.get(`${apiUrl}/api/booking/${user.id}/`);
          const data = response.data;
          const filterPendings = data.filter(i => i.status === "pending")
          setBookings(filterPendings);
        } 
       catch (error) {
        console.log(error) 
      }
    }
    
  };
  
  const fetchRequestsNotifications = async () => {
    if (user.id) {
      try {
        const checkIfUserHasTask = await axios.get(`${apiUrl}/api/task/`)
        const data = checkIfUserHasTask.data;
        const validate = data.filter(i => i.user === user.id);
        if(validate.length > 0){
          const response = await axios.get(`${apiUrl}/api/request/${user.id}/`);
          const data = response.data;
          console.log(data)
          const filterPendings = data.filter(i => i.status === "pending")
          setRequests(filterPendings);
        }
      } catch (error) {
        console.error('Error fetching request notifications:', error.response.data);
      }
    }
  };

  const onRefreshHandler = async () => {
    setRefreshing(true);
    await fetchNotifications();  // Fetch notifications
    await fetchRequestsNotifications();  // Fetch request notifications
    console.log("Refresh complete!");
    setRefreshing(false);  // Always stop the refreshing state
    
  };
  
  const gotoTask = () => {
    setIsAccepted(false);
    navigation.navigate("My Task")
  }

  useEffect(() => {
    if (isLogged && user.id) {
      // Clear previous requests and fetch fresh data
      setRequests([]);
      setBookings([]);
      fetchNotifications();
      fetchRequestsNotifications();  
    }
    else {
      setRequests([]); // If user is not logged, clear requests
      setBookings([]); // Clear bookings as well
    }
    
  }, [user.id, isLogged, setIsAccepted]);

  console.log(request)

  return (
    <View className="flex-1 bg-primary">
      {showModal && <AcceptBookingModal  setIsAccepted={setIsAccepted} setShowModal={setShowModal} navigation={navigation}/>}
      {isAccepted && <BookingAcceptedModal gotoTask={gotoTask} btnTitle={"Go to Task"} status={"Done"} description={"Your booking has been completed successfully. Please wait for confirmation from the worker."} setIsAccepted={setIsAccepted} navigation={navigation}/>}
      {/* <View className="bg-primary pt-4">
      <View className={`py-4 flex-row px-5 gap-x-5 justify-start items-center`}>
          <TouchableOpacity className="mr-5">
            <Ionicons name="arrow-back-outline" size={24} color={'white'} onPress={() => navigation.goBack()}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleToggle}>
            <Text className="text-white text-small font-fitMedium">Notifications</Text>
          </TouchableOpacity>
          { toggle && <Dropdown/> }
        </View>
      </View> */}
      <Header title={'Notifications'} navigation={navigation}/>
      <View className="bg-primary flex-1">
      <View
        className="bg-white"
        style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50, height: '100%', marginTop:50}}
      >
        <ScrollView
        
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefreshHandler} />
        }
          className="bg-white absolute left-0 right-0 -top-10 bottom-10 mx-4 px-2 flex-1 overflow-hidden rounded-2xl"
          style={{
            shadowColor: '#000000',
            shadowOffset: { width: 0, height: 3 },
            shadowOpacity: 0.17,  
            shadowRadius: 3.05,
            elevation: 4,
          }} 
        > 


          <NotificationContainer bookings={bookings} navigation={navigation} setShowModal={setShowModal} request={request} setRequests={setRequests}/>
          {request.length === 0 && bookings.length === 0 && (
              <View className="h-full items-center justify-center pb-10">
                <MaterialCommunityIcons name="bell-outline" size={80} color="#0064ab" />
                <Text className="text-center text-primary font-fitBold text-xl pt-5 tracking-wide">
                  No Notification Here {'\n'} <Text className="font-fitLight text-sm">There is no notification to show {"\n"}right now</Text>
                </Text>
              </View>
          )}  
        </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default Notification;
