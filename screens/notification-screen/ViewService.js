// ViewService.js
import { View, Text, StatusBar, Image, FlatList, Dimensions, TouchableOpacity, Modal, Pressable, Alert } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../components/Header';
import ServiceImage from '../service-details-screen/ServiceImage';
import { apiUrl } from '../../apiUrl';
import axios from 'axios';
import AppointmentModal from '../../components/AppointmentModal';
import BookingModal from '../../components/BookingModal';


const { width } = Dimensions.get('window');

const ViewService = ({ navigation, route }) => {
    const flatListRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const [showModal, setShowModal] = useState(false);
    const [isBooked, setIsBooked] = useState(false);
    const [mapToggler, setMapToggler] = useState(false);

    const[serviceTitle, setServiceTitle] = useState("");
    const[serviceImg, setServiceImg] = useState();
    const [portfolio, setPortfolio] = useState([]);

    const {id} = route.params;

    
    useEffect(() => {
        fetchServiceDetail();
    },[])
    
    
    const fetchServiceDetail = async () => {
        const response = await axios.get(`${apiUrl}/api/details-service/${id}/`);
        const data = response.data;
        setServiceImg(data.user.profile_image);
        setServiceTitle(data.title);
        setPortfolio(data.portfolios);
    };


    const handleScroll = (event) => {
        const contentOffsetX = event.nativeEvent.contentOffset.x;
        const index = Math.floor(contentOffsetX / width);
        setCurrentIndex(index);
    };

    const validateBooking = (date, time, address) => {
        if(date && time && address){
          return true
        }
        else{
          return false;
        }
      }

    const submitBooking = async (date, time, address,pinLocation, user) => {
        if(validateBooking(date, time, address)){
          const response = await axios.patch(`${apiUrl}/api/requests/`, 
            {
              "schedule_time": time,
              "schedule_date": date,
              "address": address,
              "latitude": pinLocation ? pinLocation.latitude : null,
              "longitude": pinLocation ? pinLocation.longitude : null,
              "user": user,
              "task": id
          })
          const data = response.data;
          console.log(data)
          setIsBooked(true)
          setShowModal(false)
        }
        else{
            Alert.alert('Warning', 'Address is required', [
                {
                  text: 'Cancel',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                {text: 'OK', onPress: () => console.log('OK Pressed')},
              ]);
        }

      }


    return (
        <SafeAreaView className="flex-1" >

            {showModal && <AppointmentModal submitBooking={submitBooking} setShowModal={setShowModal} showModal={showModal} mapToggler={mapToggler} setMapToggler={setMapToggler} setIsBooked={setIsBooked}/>}
            {isBooked && <BookingModal setIsBooked={setIsBooked}/>}
            
            <Header title={'Service Details'} navigation={navigation} />
            <View className="bg-slate-100 flex-1 px-2 justify-start pt-20">
                <View className="bg-white w-full h-[60%] rounded-lg p-1 border-primary border">
                    <TouchableOpacity onPress={() => setShowModal(true)} className="bg-primary absolute right-0 top-1/2 rounded-l-full items-center z-10 py-2 px-2 flex-row">
                        <MaterialCommunityIcons name="book-check" size={20} color="white" />
                        <Text className="text-white pl-1 font-fitBold">Book Now</Text>
                    </TouchableOpacity>
                    <View className="absolute w-full h-16 rounded-full z-10 -top-10">
                        <View className="h-full w-16 rounded-full border border-primary self-center overflow-hidden">
                            <Image
                                source={{uri:serviceImg}}
                                resizeMode="cover"
                                className="w-full h-full"
                            />
                        </View>
                    </View>
                    <View className="bg-[#D0DDFF] w-full rounded-t-lg items-center">
                        <Text className="p-4 text-lg font-fitMedium text-primary">{serviceTitle}</Text>
                    </View>
                    <View className="bg-white flex-1 rounded-b-lg justify-center">
                        {portfolio.length > 0 ? <FlatList
                            ref={flatListRef}
                            data={portfolio}
                            horizontal
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => {
                                return <ServiceImage image={item.image} id={item.id}/>;
                            }}
                            showsHorizontalScrollIndicator={false}
                            onScroll={handleScroll}
                            snapToAlignment="start"
                            snapToInterval={width}
                            decelerationRate="fast"
                        />: <Text className="text-center text-base font-magRegular">No Available Post</Text>}
                    </View>
                    <View className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-white p-2 rounded-full">
                        <Text className="text-primary font-magRegular">
                            {portfolio.length > 0 ? currentIndex + 1 : 0}/{portfolio.length}
                        </Text>
                    </View>
                </View>
                <View className="bg-white w-full mt-10 py-5 px-2 rounded-lg border border-primary">
                    <Text className="text-lg font-fitMedium text-primary">No Reviews Yet</Text>
                </View>
            </View>
            <StatusBar backgroundColor="#0064ab" barStyle="dark-content" />
        </SafeAreaView>
    );
};

export default ViewService;