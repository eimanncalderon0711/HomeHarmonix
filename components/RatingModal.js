import { View, Text, Modal,Image,TouchableOpacity, TextInput, Alert } from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { done_rate } from '../app-states/features/bookingSlice';
import { apiUrl } from '../apiUrl';
import axios from 'axios';


const {width, height} = Dimensions.get('window')

const RatingModal = ({setHome}) => {


    const [ratings, setRatings] = useState({qualityOfWork: 0,affordability: 0,punctuality: 0,professionalism: 0,});
    const [comment, setComment] = useState(null);
    const [TypeOfService, setTypeOfService] = useState([])
    const [profile, setProfile] = useState(null);



    const booking_info = useSelector((state) => state.booking.book_rating_info)
    const user = useSelector((state) => state.user.user);
    const rating = useSelector((state) => state.booking.rating)
    const dispatch = useDispatch();

    const fetchServiceType = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/user/service/${booking_info.user}/`)
        const data = response.data;
        const getProfile = data[0].user.profile_image
        console.log(getProfile)
        const service_type = data.map(i => i.TypeOfService[0].service_name);
        setTypeOfService(service_type)
        setProfile(getProfile)
      } catch (error) {
        console.log(error)
      }
    }


    const handleRating = (category, value) => {
        setRatings((prevRatings) => ({
          ...prevRatings,
          [category]: value,
        }));
      };


    const renderStars = (category) => {
        const rating = ratings[category];
        let stars = [];
    
        for (let i = 1; i <= 5; i++) {
          stars.push(
            <TouchableOpacity key={i} onPress={() => handleRating(category, i)}>
              <AntDesign
                name="star"
                size={18}
                color={i <= rating ? "rgba(232, 175, 48, 1)" : "rgba(200, 200, 200, 1)"}
              />
            </TouchableOpacity>
          );
        }
    
        return stars;
      };

      const submitRating = async () => {
        try {
          const response = await axios.post(`${apiUrl}/api/rating/`, {
            "qualityOfWork": ratings.qualityOfWork,
            "affordability": ratings.affordability,
            "punctuality": ratings.punctuality,
            "professionalism": ratings.professionalism,
            "comment": comment,
            "booking": booking_info.id,
            "user": user.id
          });
          const data = response.data;
          console.log(data)
          dispatch(done_rate(false));
          setHome(true);
        } catch (error) {
          if(error.response.status === 400){
            Alert.alert('', 'You Have Already rated this', [
              {
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ]);
          }
        }
        console.log("Client Comment: ",comment)
        console.log("Client Rating: ",ratings)
      }

      const closeRating = () => {
        dispatch(done_rate(false));
      }


      useEffect(() => {
        fetchServiceType();
      },[rating.isRating])

  return (
    <Modal
      transparent={true}
      animationType="fade"
    >
    <View className="flex-1 justify-center items-center" style={{backgroundColor:'rgba(0,0,0,0.4)'}}>
        <View className="bg-white" style={{width:width*0.90, height:height*0.70, borderRadius: 12, overflow:'hidden'}}>
            <View className="bg-primary flex-row items-center justify-between py-4 px-8">
                <View className="flex-row items-center">
                  {profile ?<View className="w-14 h-14 bg-white rounded-full overflow-hidden">
                              <Image source={{uri: profile}} resizeMode="cover" className="w-full h-full"/>
                            </View> : 
                            <View className="w-14 h-14 bg-white rounded-full overflow-hidden">
                                <Image source={require('../assets/images/client.png')} resizeMode="cover" className="w-full h-full"/>
                            </View>}
                  <View className="ml-4">
                      <Text className="text-white font-fitMedium text-base">{booking_info.title}</Text>
                      <Text className="text-white font-fitMedium text-sm">{TypeOfService.map(i => i)}</Text>
                  </View>
                </View>
                <TouchableOpacity onPress={closeRating}>
                  <FontAwesome name="close" size={20} color="white" />
                </TouchableOpacity>
            </View>
            <View className="flex-1 bg-white">
                <View className="flex-1 flex-row justify-center items-center mx-5">
                    <View className="mr-4">
                        <Text className="py-2 font-fitMedium">Quality of Work:</Text>
                        <Text className="py-2 font-fitMedium">Affordability:</Text>
                        <Text className="py-2 font-fitMedium">Punctuality:</Text>
                        <Text className="py-2 font-fitMedium">Professionalism:</Text>
                    </View>
                    <View style={{marginBottom:3}}>
                        <View className="flex-row" style={{paddingVertical:8}}>
                            {renderStars('qualityOfWork')}
                        </View>
                        <View className="flex-row" style={{paddingVertical:8}}>
                            {renderStars('affordability')}
                        </View>
                        <View className="flex-row" style={{paddingVertical:8}}>
                            {renderStars('punctuality')}
                        </View>
                        <View className="flex-row" style={{paddingVertical:8}}>
                            {renderStars('professionalism')}
                        </View>
                    </View>
                </View>
            </View>
            <View className="px-10 pb-10">
                <TextInput value={comment} onChangeText={(e) => setComment(e)} placeholder={"Add comment (optional)"} multiline className="font-fitMedium" style={{borderBottomWidth:1}}/>
                <View className="items-center justify-center">
                  <TouchableOpacity onPress={submitRating}>
                    <View className="bg-primary px-8 py-3 my-2 rounded-full">
                      <Text className="font-fitMedium text-white">Submit</Text>
                    </View>
                  </TouchableOpacity>
                </View>
            </View>
        </View>
    </View>
    </Modal>
  )
}

export default RatingModal