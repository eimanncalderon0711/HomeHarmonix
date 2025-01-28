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
import DateTimePicker from "@react-native-community/datetimepicker";
import Entypo from "@expo/vector-icons/Entypo";
import AntDesign from "@expo/vector-icons/AntDesign";
import AlertModal from "./AlertModal";
import { useSelector } from "react-redux";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import axios from "axios";

const AppointmentModal = ({ setShowModal, submitBooking }) => {
  const [date, setDate] = useState(new Date()); // Initial date set to today
  const [time, setTime] = useState(new Date()); // Initial time set to now
  const [show, setShow] = useState(false); // Control date picker visibility
  const [alertVisible, setAlertVisible] = useState(false);
  const [address, setAddress] = useState("");

  const user = useSelector((state) => state.user.user);
  const mapRef = useRef(null); // Fix mapRef as null initially

  const [pinLocation, setPinLocation] = useState(null);
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [showTime, setShowTime] = useState(false); // Control time picker visibility
  const [amPm, setAmPm] = useState(time.getHours() >= 12 ? "PM" : "AM");
  const [permissionGranted, setPermissionGranted] = useState(null);
  const showAlert = () => setAlertVisible(true);
  const closeAlert = () => setAlertVisible(false);

  // Focus on the pin and animate the map to that location
  const focusOnPin = () => {
    if (mapRef.current) {
      mapRef.current.animateToRegion(
        {
          ...pinLocation,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        },
      );
    }
  };

  const handleMapPress = async (event) => {
    const { latitude, longitude } = await event.nativeEvent.coordinate;
    setPinLocation({ latitude, longitude });
  };

  const getCurrLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    setPermissionGranted(status);
    if (status !== "granted") {
      Alert.alert(
        "Permission denied",
        "Permission to access location was denied."
      );
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });

    setPinLocation({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });

    let reverseGeocode = await Location.reverseGeocodeAsync({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
  };

  const handleCancel = () => {
    setRegion(null);
    setPinLocation(null);
    setShowModal(false);
    setPermissionGranted(null);
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    const today = new Date();
    today.setHours(0, 0, 0, 0); 

    if (currentDate < today) {
      showAlert();
      setShow(false);
    } else {
      setShow(Platform.OS === "ios");
      setDate(currentDate);
    }
  };

  const onChangeTime = (event, selectedTime) => {
    const currentTime = selectedTime || time;
    setShowTime(false);
    setTime(currentTime);
  };

  const handleAmPmToggle = (selectedAmPm) => {
    const currentTime = new Date(time);
    let hours = currentTime.getHours();
    if (selectedAmPm === "AM" && hours >= 12) {
      hours -= 12;
    } else if (selectedAmPm === "PM" && hours < 12) {
      hours += 12;
    }
    currentTime.setHours(hours);
    setTime(currentTime);
    setAmPm(selectedAmPm);
  };

  const validateBooking = (date, time, address, pinLocation, user) => {
    if(date && time && address){
      submitBooking(date, time, address, pinLocation, user);
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
        {show && (
          <DateTimePicker
            value={date}
            mode="date"
            display={Platform.OS === "android" ? "calendar" : "default"}
            onChange={onChange}
          />
        )}

        <View className="flex-1 px-8 items-center justify-center">
          <View className="bg-white w-full pb-8 rounded-lg">
            <View className="items-center bg-primary p-2 rounded-t-lg">
              <Text className="text-center text-white font-magRegular text-base">
                Booking Appointment
              </Text>
            </View>

            {/* THIS IS FOR THE DATE */}
            <View className="px-8 mt-2">
              <View className="flex justify-start">
                <TouchableOpacity
                  className="flex-row py-2 items-center"
                  onPress={() => setShow(!show)}
                >
                  <Entypo name="calendar" size={20} color="#505050" />
                  <TextInput
                    value={date.toLocaleDateString()} 
                    className="pl-2 text-black font-fitRegular"
                    placeholder="mm/dd/yy"
                    editable={false}
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* MY TIME IS HERE */}
            <View className="px-8">
              <View className="flex-row items-center border-t border-slate-500 pt-2 justify-start">
                <AntDesign name="clockcircleo" size={20} color="#505050" />
                <TouchableOpacity onPress={() => setShowTime(true)}>
                  <TextInput
                    value={time.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                    className="pl-2 text-black font-fitRegular"
                    placeholder="hh:mm"
                    editable={false}
                  />
                </TouchableOpacity>
                <View className="flex-row items-center justify-center ml-10 rounded-lg">
                  <TouchableOpacity
                    className={`border rounded-l-lg border-slate-500 px-4  ${
                      amPm === "AM" && "bg-primary"
                    }`}
                    onPress={() => handleAmPmToggle("AM")}
                  >
                    <Text
                      className={`font-fitLight text-xs ${
                        amPm === "AM" && "text-white"
                      }`}
                    >
                      AM
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    className={`border px-4  rounded-r-lg border-slate-500 ${
                      amPm === "PM" && "bg-primary"
                    } border-l-0`}
                    onPress={() => handleAmPmToggle("PM")}
                  >
                    <Text
                      className={`font-fitLight text-xs ${
                        amPm === "PM" && "text-white"
                      }`}
                    >
                      PM
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* Input Address */}
            <View className="px-8 mt-2">
              <TouchableOpacity className="flex-row border-t border-b items-center border-slate-500 pt-2">
                <Entypo name="location-pin" size={24} color="#505050" />
                <GooglePlacesAutocomplete
                    placeholder='Search'
                    fetchDetails={true}
                    onPress={(data, details = null) => {
                      console.log(data)
                      setAddress(data.description)
                      let lat = details.geometry.location.lat;
                      let lng = details.geometry.location.lng;
                      setPinLocation({
                        latitude: lat,
                        longitude: lng,
                      });

                      setRegion({
                        latitude: lat,
                        longitude: lng,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                      });
                      focusOnPin(); // Focus on the pin
                    }}
                    query={{
                      key: 'AIzaSyAekXSq_b4GaHneUKEBVsl4UTGlaskobFo',
                      language: 'en',
                      location: `${region.latitude}, ${region.longitude}`,
                    }}
                  />
              </TouchableOpacity>
            </View>

            {/* MY MAP VIEW IS HERE */}
            <View className="px-8">
              {pinLocation && (
                <View
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
                    region={region}
                    onPress={handleMapPress}
                    provider="google"
                    ref={mapRef}
                  >
                    {pinLocation && (
                      <Marker
                        coordinate={pinLocation}
                        title="Pinned Location"
                        description="This is your selected location"
                      />
                    )}
                  </MapView>
                </View>
              )}

              <View className="flex-row justify-center mt-4">
                <TouchableOpacity
                  onPress={getCurrLocation}
                  style={{
                    width: '100%',
                    backgroundColor: "#0064ab",
                    paddingVertical: 10,
                    paddingHorizontal: 20,
                    borderRadius: 10,
                  }}
                >
                  <Text className="text-center font-fitSemiBold" style={{ color: "#ffffff" }}>Allow Location Access</Text>
                </TouchableOpacity>
              </View>
            </View>

            {showTime && (
              <DateTimePicker
                value={time}
                mode="time"
                display={Platform.OS === "android" ? "clock" : "spinner"}
                onChange={onChangeTime}
              />
            )}

            <View className="mt-4 w-full flex-row items-center justify-center">
              <TouchableOpacity
                onPress={handleCancel}
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
                <Text className="text-slate-700 font-magBold">Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => validateBooking(date, time, address, pinLocation, user.id)
                }
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
                <Text className="text-slate-200 font-magBold">Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default AppointmentModal;
