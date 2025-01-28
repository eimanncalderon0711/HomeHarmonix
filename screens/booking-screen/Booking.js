import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import axios from 'axios';

const Booking = () => {
  const [location, setLocation] = useState(null);
  const [places, setPlaces] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [region, setRegion] = useState(null); // To track map's region

  const googleApiKey = 'AIzaSyAekXSq_b4GaHneUKEBVsl4UTGlaskobFo'; // Replace with your Google API key

  // Get user's current location
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    })();
  }, []);

  // Function to fetch place predictions using Google Places API
  const fetchPlaces = async () => {
    if (searchQuery.length > 0) {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json`, {
          params: {
            input: searchQuery,
            key: googleApiKey,
            sessiontoken: Date.now(),
          }
        });
      setPlaces(response.data.predictions);
    }
  };

  // Function to fetch the details of a selected place
  const fetchPlaceDetails = async (placeId) => {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/details/json`, {
        params: {
          place_id: placeId,
          key: googleApiKey,
        }
      });

    const placeDetails = response.data.result;
    if (placeDetails.geometry && placeDetails.geometry.location) {
      const { lat, lng } = placeDetails.geometry.location;

      // Log latitude and longitude
      console.log('Selected Place Latitude:', lat);
      console.log('Selected Place Longitude:', lng);

      // Update the selected place and center the map to the location
      setSelectedPlace(placeDetails);
      setRegion({
        latitude: lat,
        longitude: lng,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    }
  };

  // Fetch places when the searchQuery changes
  useEffect(() => {
    fetchPlaces();
  }, [searchQuery]);

  // Function to handle selection of a place from the suggestions
  const selectPlace = (place) => {
    setSearchQuery(place.description); // Set search input to the selected place name
    setPlaces([]); // Clear the suggestions list
    fetchPlaceDetails(place.place_id); // Fetch detailed information of the selected place
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        region={region} // Set the region based on the selected location
        onRegionChangeComplete={(newRegion) => setRegion(newRegion)} // Update region when map is dragged
      >
        {/* Display the marker only if the selected place has geometry and location */}
        {selectedPlace && selectedPlace.geometry && selectedPlace.geometry.location && (
          <Marker
            coordinate={{
              latitude: selectedPlace.geometry.location.lat,
              longitude: selectedPlace.geometry.location.lng,
            }}
            title={selectedPlace.name}
          />
        )}
      </MapView>

      <TextInput
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Search for a place"
        style={{
          position: 'absolute',
          top: 40,
          left: 10,
          right: 10,
          height: 50,
          backgroundColor: 'white',
          paddingHorizontal: 10,
          borderRadius: 10,
          elevation: 5,
        }}
      />

      {places.length > 0 && (
        <FlatList
          data={places}
          keyExtractor={(item) => item.place_id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => selectPlace(item)}>
              <View
                style={{
                  padding: 10,
                  borderBottomWidth: 1,
                  borderBottomColor: '#ccc',
                }}
              >
                <Text>{item.description}</Text>
              </View>
            </TouchableOpacity>
          )}
          style={{
            position: 'absolute',
            top: 100,
            left: 10,
            right: 10,
            maxHeight: 200,
            backgroundColor: 'white',
            borderRadius: 10,
            elevation: 5,
          }}
        />
      )}
    </View>
  );
};

export default Booking;
