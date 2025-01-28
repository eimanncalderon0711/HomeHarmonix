// ServiceDetails.js
import { View, Text, StatusBar, Image, FlatList, Dimensions, TouchableOpacity, Modal, ScrollView, Alert } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';
import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../components/Header';
import ServiceImage from '../service-details-screen/ServiceImage';
import { apiUrl } from '../../apiUrl';
import axios from 'axios';
import AppointmentModal from '../../components/AppointmentModal';
import BookingModal from '../../components/BookingModal';
import call from 'react-native-phone-call'


const { width } = Dimensions.get('window');

const ServiceDetails = ({ navigation, route }) => {
    const flatListRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const [showModal, setShowModal] = useState(false);
    const [isBooked, setIsBooked] = useState(false);
    const [mapToggler, setMapToggler] = useState(false);

    const[serviceTitle, setServiceTitle] = useState("");
    const[serviceImg, setServiceImg] = useState();
    const [portfolio, setPortfolio] = useState([]);

    const [isThereRating, setIsThereRating] = useState(0)
    const [ratings, setRatings] = useState(null);

    const {id, user_id, phone_no} = route.params;
    
    useEffect(() => {
        fetchServiceDetail();
        averageRatings();
    },[])


    const averageRatings = async () => {
        try {
          const response = await axios.get(`${apiUrl}/api/rating/${id}/services/`)
          const data = response.data;
          // const {overall_avg, qualityOfWork_avg, affordability_avg, punctuality_avg, professionalism_avg, ratings} = data;
          if(data.ratings.length > 0){
            setIsThereRating(data.ratings.length);
            setRatings(data);
          }
        } catch (error) {
          console.log(error)
        }
      }

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


    const submitBooking = async (date, time, address,pinLocation, user) => {
        
        try { //POST method for submit a Booking
            const response = await axios.post(`${apiUrl}/api/booking/`, {
                "schedule_time": time.toISOString(),
                "schedule_date": date.toISOString(),
                "address": address,
                "latitude": pinLocation.latitude,
                "longitude": pinLocation.longitude,
                "user": user,
                "service": id
            });
            const data = response.data;
            setIsBooked(true);
            setShowModal(false);
        } catch (error) {
            console.error("Error during booking:", error);
            Alert.alert("Error", "There was an issue with your booking. Please try again.");
        }
       
      }

    const makeCall = () => {
      const args = {
            number: phone_no, // String value with the number to call
            prompt: false, // Optional boolean property. Determines if the user should be prompted prior to the call 
            skipCanOpen: true // Skip the canOpenURL check
        }
        call(args).catch((error) =>  Alert.alert('Warning', 'This service dont have phone number', [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ]))
    }

    return (
        <View className="flex-1" >

            {showModal && <AppointmentModal submitBooking={submitBooking} setShowModal={setShowModal} showModal={showModal} mapToggler={mapToggler} setMapToggler={setMapToggler} setIsBooked={setIsBooked}/>}
            {isBooked && <BookingModal setIsBooked={setIsBooked} navigation={navigation}/>}
            
            <Header title={'Service Details'} navigation={navigation} />
            <View className="bg-slate-100 flex-1 px-2 justify-start pt-20">
                <View className="bg-white w-full h-[60%] p-1 border-primary border">
                    <View className="absolute right-0 top-1/2 items-center z-10 " style={{paddingLeft:20}}>
                        <View className="bg-primary rounded-l-full py-2 px-2">
                            <TouchableOpacity onPress={() => setShowModal(true)} className="flex-row">
                                <MaterialCommunityIcons name="book-check" size={20} color="white" />
                                <Text className="text-white pl-1 font-fitBold">Book Now</Text>
                            </TouchableOpacity>
                        </View>
                        <View className="bg-primary rounded-l-full my-2 py-2 px-2 w-full">
                            <TouchableOpacity onPress={makeCall} className="flex-row justify-between">
                                <Feather name="phone" size={20} color="white" />
                                <Text className="text-white text-center font-fitBold" style={{marginRight:25}}>Call</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    
                    <View className="absolute w-full h-16 rounded-full z-10 -top-10">
                        <View className="h-full w-16 rounded-full border border-primary self-center overflow-hidden">
                           { serviceImg ? <Image
                                source={{uri:serviceImg}}
                                resizeMode="cover"
                                className="w-full h-full"
                            /> : <View className="w-full h-full bg-slate-500 items-center justify-center"><FontAwesome name="user" size={24} color="white" className="text-center"/></View>}
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
                    <View className="absolute bottom-2 left-1/2 transform -translate-x-1/2 px-3 rounded-full" style={{backgroundColor:"rgba(255, 255, 255, 0.7)"}}>
                        <Text className="text-primary font-magRegular">
                            {portfolio.length > 0 ? currentIndex + 1 : 0}/{portfolio.length}
                        </Text>
                    </View>
                </View>
                {isThereRating === 0 ? <View className="bg-white w-full mt-10 py-5 px-2 rounded-lg border border-primary">
                    <Text className="text-lg font-fitMedium text-primary">No Reviews Yet</Text>
                </View>:
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View className="bg-white w-full mt-1 py-5 my-2 border border-primary rounded-lg">
                          <Text className="font-fitBold text-lg mx-3">Reviews :</Text>
                          {ratings.ratings.map((item, index) => {
                            let stars = (item.qualityOfWork + item.punctuality + item.professionalism + item.affordability) / 4;
                            stars = Math.round(stars);
                            console.log(apiUrl+ item.user.profile_image)
                            return(
                                <View key={index} className="w-full py-2 px-2 mt-2">
                                    <View className="flex-row items-center">
                                        <View className="w-14 h-14 border rounded-full overflow-hidden">
                                            <Image source={{uri: item.user.profile_image}} className="w-full h-full" resizeMode='cover'/>
                                        </View>
                                        <View className="ml-4 flex-1 justify-center">
                                            <View className="flex-row text-lg items-center">
                                                <Text className="font-fitMedium">{item.user.fullname}</Text>
                                                <View className="mx-2 flex-row">
                                                {Array.from({ length: stars }, (_, i) => (
                                                    <AntDesign key={i} name="star" size={10} color="#ffc82c" />
                                                ))}
                                                </View>
                                            </View>
                                            <Text className="font-fitRegular text-sm text-start">{item.comment}</Text>
                                        </View>
                                    </View>
                                </View>
                            )
                          })}
                        </View>
                    </ScrollView>
                }
                
            </View>
            <StatusBar backgroundColor="#0064ab" barStyle="dark-content" />
        </View>
    );
};

export default ServiceDetails;