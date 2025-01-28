import {
    View,
    Text,
    Modal,
    Pressable,
    TextInput,
    TouchableOpacity,
    Platform,
    Alert,
  } from "react-native";
  import React, { useCallback, useEffect, useRef, useState } from "react";
  import Ionicons from '@expo/vector-icons/Ionicons';
  import Fontisto from '@expo/vector-icons/Fontisto';
  import DateTimePicker from "@react-native-community/datetimepicker";
  import Entypo from "@expo/vector-icons/Entypo";
  import AntDesign from "@expo/vector-icons/AntDesign";
  import AlertModal from "./AlertModal";
  import { useSelector, useDispatch } from "react-redux";
  import { undo } from "../app-states/features/bookingSlice";
  import MapView, { Marker } from "react-native-maps";
  import * as Location from "expo-location";
  import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
  import axios from "axios";
import { apiUrl } from "../apiUrl";
  
  const AcceptBookingModal = ({ setShowModal, setIsAccepted }) => {
    const booking = useSelector((state) => state.booking.book_details);
    
    const [show, setShow] = useState(false); // Control date picker visibility
    const [alertVisible, setAlertVisible] = useState(false);
    const [address, setAddress] = useState(booking.address);
    const dispatch = useDispatch();

    const mapRef = useRef(null); // Fix mapRef as null initially
  
    const [pinLocation, setPinLocation] = useState(null);
    const [showTime, setShowTime] = useState(false); // Control time picker visibility
    const [amPm, setAmPm] = useState((new Date(booking.schedule_time).getHours() >= 12 ? "PM" : "AM"));
    const [showUserLoc, setShowUserLoc] = useState(false);
    const showAlert = () => setAlertVisible(true);
    const closeAlert = () => setAlertVisible(false);
  

    const handleMapPress = (event) => {
      setShowUserLoc(true);
      setPinLocation({latitude: booking.latitude,
        longitude: booking.longitude,});
    };

    const cancelClientBooking = () => {
      console.log(booking.address)
    };

    const acceptBooking = async () => {
      try {
        const response = await axios.patch(`${apiUrl}/api/booking/${booking.id}/detail/`, {
          ...booking,
          status: "confirmed"
        })

        if(response.status === 200 || response.status === 201){
          setShowModal(false)
          setIsAccepted(true)
        }

        // if(response.status === 200 || response.status === 201){
        //   navigation.navigate("Pending")
        // }
        console.log("The booking is accepted")
      } catch (error) {
        console.log(error)
      }
    }

    
    return (
      <View
        className="absolute z-20 w-full h-full"
        style={{ backgroundColor: "rgba(0,0,0,0.7)" }}
      >
        <AlertModal
          visible={alertVisible}
          title="Invalid Date"
          message="Please select the current date or time"
          onClose={closeAlert}
        />
  
        <Modal animationType="slide" transparent={true}>
          
  
          <View className="flex-1 px-8 items-center justify-center">
            <View className="bg-white w-full pb-8 rounded-2xl">
              <View className="flex-row items-center justify-between bg-primary p-4 rounded-t-lg">
                <TouchableOpacity className="ml-2" onPress={() => {
                  setShowModal(false)
                  setShowUserLoc(false)
                  setPinLocation(null)
                  dispatch(undo())
                }}>
                  <Ionicons name="arrow-back-circle-sharp" size={32} color="white" />
                </TouchableOpacity>
                <Text className="text-center mr-5 text-white font-magRegular text-base">
                  Booking Details
                </Text>
                <Text></Text>
              </View>
  
              {/* THIS IS FOR THE DATE */}
              <View className="px-8 mt-2">
                <View className="flex justify-start">
                  <View
                    className="flex-row py-2 items-center"
                  >
                    <Entypo name="calendar" size={20} color="#505050" />
                    <TextInput
                      value={new Date(booking.schedule_date).toLocaleDateString()}
                      className="pl-2 text-black font-fitRegular"
                      placeholder="mm/dd/yy"
                      editable={false}
                    />
                  </View>
                </View>
              </View>
  
              {/* MY TIME IS HERE */}
              <View className="px-8">
                <View className="flex-row items-center border-t border-slate-500 pt-2 justify-start">
                  <AntDesign name="clockcircleo" size={20} color="#505050" />
                  <View>
                    <TextInput
                      value={new Date(booking.schedule_time).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                      className="pl-2 text-black font-fitRegular"
                      placeholder="hh:mm"
                      editable={false}
                    />
                  </View>
                  <View className="flex-row items-center justify-center ml-10 rounded-lg">
                    <View
                      className={`border rounded-l-lg border-slate-500 px-4  ${
                        amPm === "AM" && "bg-primary"
                      }`}
                    >
                      <Text
                        className={`font-fitLight text-xs ${
                          amPm === "AM" && "text-white"
                        }`}
                      >
                        AM
                      </Text>
                    </View>
                    <View
                      className={`border px-4  rounded-r-lg border-slate-500 ${
                        amPm === "PM" && "bg-primary"
                      } border-l-0`}
                    >
                      <Text
                        className={`font-fitLight text-xs ${
                          amPm === "PM" && "text-white"
                        }`}
                      >
                        PM
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
  
              {/* Input Address */}
              <View className="px-8 mt-2">
                <View className="flex-row border-t border-b items-center border-slate-500 pt-2">
                  <Entypo name="location-pin" size={24} color="#505050" />
                  <TextInput className="text-wrap" multiline editable={false} value={booking.address}/>
                </View>
              </View>
  
              {/* MY MAP VIEW IS HERE */}
              <View className="px-8">
                <View className="py-4 items-center flex-row">
                  <View className="bg-primary p-2 rounded-full">
                    <Fontisto name="map" size={14} color="white" />
                  </View>
                  <TouchableOpacity onPress={handleMapPress} className="ml-2"><Text className="font-fitMedium text-primary">View User Map</Text></TouchableOpacity>
                </View>
                
                 {showUserLoc && (<View
                    className="bg-white mt-10 h-52 p-1"
                    style={{
                      shadowColor: "#000000",
                      shadowOffset: { width: 0, height: 3 },
                      shadowOpacity: 0.17,
                      shadowRadius: 3.05,
                      elevation: 4,
                    }}
                  >
                    
                    <MapView
                      style={{ flex: 1 }}
                      region={{...pinLocation,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,}}
                    >
                      <Marker
                        coordinate={pinLocation}
                        title="Pinned Location"
                        description="This is your selected location"
                      />
                    </MapView>
                  </View>)}
              </View>
  
              <View className="mt-4 w-full flex-row items-center justify-center">
                <TouchableOpacity onPress={cancelClientBooking}
                  
                  className="bg-slate-300 py-2 px-8 rounded-full items-center"
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
                  <Text className="text-slate-700 font-magBold">Decline</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={acceptBooking}
                  className="bg-primary py-2 ml-2 px-8 rounded-full items-center"
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
                  <Text className="text-slate-200 font-magBold">Accept</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  };
  
  export default AcceptBookingModal;
  