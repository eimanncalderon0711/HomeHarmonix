import { View, Text, TouchableOpacity, ScrollView, Image, StatusBar, FlatList } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import Header from '../components/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome6, FontAwesome5, Feather,FontAwesome } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import Cards from '../components/Cards';
import Search from '../components/Search';
import { TextInput } from 'react-native-gesture-handler';
import { DrawerActions, useFocusEffect } from '@react-navigation/native';
import Dropdown from '../components/Dropdown';
import { useRoute } from '@react-navigation/native';
import { apiUrl } from '../apiUrl';
import axios from 'axios';
import Entypo from '@expo/vector-icons/Entypo';
import DropDownEdit from '../components/DropDownEdit';

const Home = ({ navigation }) => {
  const [toggle, setToggle] = useState(false);
  const [toggleEdit, SetToggleEdit] = useState(false);
  const [data, setData] = useState([]);  // State for fetched data
  const [myService, setMyService] = useState([]);
  const user = useSelector((state) => state.user.user);
  const isLogged = useSelector((state) => state.user.islogged);
  const [search, setSearch] = useState("");
  const [searchData, setSearchData] = useState([]);
  // const address = useSelector((state) => state.user.user_address);

  useFocusEffect(
    useCallback(() => {
      fetchData();
      if (isLogged && user.id) {
        fetchMyService(user.id);
      }
    }, [isLogged, user.id])
  );
  
  useEffect(() => {
    if (!isLogged) {
      setMyService([]);
    }
  }, [isLogged]);

 
  
  const fetchData = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/list-service/`);
      const responseData = response.data;
      const filteredData = responseData.filter( i => i.user.id !== user.id);
      setData(filteredData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchMyService = async () => {
    const id = user.id;
      try {
        const response = await axios.get(`${apiUrl}/api/user/service/${id}/`);
        const data1 = response.data;
        if(data1.length > 0) {
          setMyService(data1)
        }else{
          setMyService(data1)
        }
      } catch (error) {
        console.error("Error fetching my service:", error);
      }
  };


  const searchService = (e) => {
    setSearch(e)
    const filterSearch = data.filter(i => i.title.toLowerCase().match(e.toLowerCase()));
    setSearchData(filterSearch);
  }

  const submitSearch = () => {
    console.log(search)
  }

  const handleToggle = () => {
    setToggle(!toggle);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-col bg-primary items-center justify-center z-10">
        <Image source={require('../assets/images/harmonix-logo-new.png')} resizeMode="contain" className="h-10" />
        <View className="py-4 flex-row w-full items-center justify-center px-4">
          <TouchableOpacity>
            <Feather name="menu" size={24} color="white" onPress={() => navigation.dispatch(DrawerActions.openDrawer)} />
          </TouchableOpacity>
          <View className="flex-row flex-1 rounded-full bg-white px-4 items-center ml-4 mr-4" style={{paddingVertical:4}}>
            <TouchableOpacity onPress={submitSearch}>
              <FontAwesome6 name="magnifying-glass" size={18} color="#0064ab" />
            </TouchableOpacity>
            <TextInput value={search} onChangeText={searchService} placeholder="Search" className="pl-2 h-full flex-1 font-fitMedium text-xs" />
          </View>
          <TouchableOpacity className="border-white border-2 rounded-full" onPress={handleToggle}>
            <Text className="text-small font-magBold text-white px-[10px] py-[4px]">+</Text>
          </TouchableOpacity>
        </View>
        {toggle && <Dropdown navigation={navigation} handleToggle={handleToggle} />}
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('Posted Tasks')} className="z-10 flex-row gap-x-2 justify-center items-center bg-primary absolute right-0 top-2/3 py-2 px-3 rounded-l-full">
        <FontAwesome5 name="tasks" size={14} color="white" />
        <Text className="text-white text-xs font-fitBold">View Task</Text>
      </TouchableOpacity>
      <View style={{top:-10, zIndex:10}}>
        {search && <View className='bg-white overflow-hidden border-primary' style={{height:150, borderRadius:4, marginHorizontal:10, borderWidth:0.5, paddingVertical:6}}>
          <ScrollView>
            {searchData.map((i, index) => i.user.id !== user.id && <TouchableOpacity onPress={() => {
              setSearch("")
              navigation.navigate("View Detail", {id: i.id, task_id: null})
              }} key={index}>
            <View className="flex-row items-center" style={{marginHorizontal:6, borderBottomWidth:1, paddingVertical:6, borderColor:"rgba(0,0,0,0.15)"}}>
              <View className="w-14 h-14 overflow-hidden rounded-full border border-primary">
                <Image source={{uri: i.user.profile_image}} className="w-full h-full" resizeMode="cover"/>
              </View>
              <Text className="font-fitMedium text-primary mx-2">{i.title}</Text>
            </View>
            </TouchableOpacity>)}
            {searchData.length === 0 && <View style={{marginTop:50}}><Text className="text-center font-fitSemiBold text-primary">No Services Found</Text></View>}
          </ScrollView>
        </View>}
      </View>
      {isLogged && myService.length > 0 && (<View className='flex-1'>
        <Text className="py-3 px-2 font-fitBold text-md text-white" style={{backgroundColor:"#004170"}}>Your Service</Text>
        <View className="flex-1 border border-primary mx-2 my-1 rounded-2xl py-2 mt-2 px-1">
          <View className="flex-row justify-start items-center px-2">
            <View className="w-10 h-10 rounded-full border items-center justify-center border-primary overflow-hidden">
              {user.profile_image ? <Image source={{uri: `${user.profile_image}`}} resizeMode='cover' className="w-full h-full"/> : <FontAwesome name="user" size={24} className="text-center items-center" color="black" opacity={0.5} />}
            </View>
            <View className="flex-row flex-1 items-cente justify-between">
              <View className="flex-col px-2">
                <Text className="text-primary font-fitBold">{isLogged && myService[0].title}</Text>
                <Text className="text-xs text-slate-500 font-fitLight">{isLogged && myService[0].TypeOfService.map(i => i.service_name).join(', ')}</Text>
              </View>
              <TouchableOpacity className="" onPress={() => SetToggleEdit(!toggleEdit)}>
                <Entypo name="dots-three-vertical" size={18} color="black"/>
              </TouchableOpacity>
              {toggleEdit && <DropDownEdit id={myService[0].id} navigation={navigation}/>}
            </View>

          </View>
          <View className="justify-center flex-1 rounded-b-2xl overflow-hidden bg-slate-300 mt-2">
          {myService[0].portfolios.length > 0 ? <Image source={{uri:myService[0].portfolios[0].image.split(apiUrl)[0]}} resizeMode='cover' className="w-full h-full"/>:<Text className="text-center font-magBold text-lg text-gray-dark">No Images</Text>}
          </View>
        </View>
      </View>)}

      
      
      
      {/* FlatList for displaying data */}
      <View className="flex-[1.4]">
        <Text className="bg-gray-dark py-3 px-2 font-fitBold text-md text-white" style={{backgroundColor:"#004170"}}>Offered Services</Text>
        {data.length > 0 ? (<FlatList
        data={data} // Pass the fetched data
        keyExtractor={(item) => item.id.toString()} // Ensure the key is a string
        renderItem={({ item }) => {
        return (<View className="w-full">
              <View className="border-primary border mx-2 my-1 rounded-xl">
                <View className="flex-row justify-start items-center px-2 py-2">
                  <View className="h-10 w-10 rounded-full overflow-hidden border border-primary">
                    {item.user.profile_image ? <Image source={{uri:item.user.profile_image}} resizeMode="cover" className="h-full w-full" /> 
                    : <View className="bg-slate-200 flex-1 items-center justify-center"><FontAwesome name="user" size={24} color="#0064ab" className="text-center"/></View>}
                  </View>
                  <View className="flex-1 px-2">
                    <Text className="text-primary font-fitBold">{item.title}</Text>
                    <Text className="text-xs text-slate-500 font-fitLight">{item.TypeOfService.map(i => i.service_name).join(', ')}</Text>
                  </View>
                </View>
                <View className="w-fit h-44 bg-slate-300 mx-2 my-2 items-center justify-center overflow-hidden">
                  {item.portfolios.length > 0 ? <Image source={{uri:item.portfolios[0].image}} resizeMode='cover' className="w-full h-full"/>:<Text className="text-center font-magBold text-lg text-gray-dark">No Images</Text>}
                </View>
                <TouchableOpacity onPress={() => navigation.navigate("View Detail", {id: item.id, phone_no: item.user.phone })} className="bg-white mb-2 border-primary border items-center mx-2 py-2">
                  <Text className="text-primary font-fitBold">View Detail</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("View Detail", {id: item.id, task_id: null, phone_no: item.user.phone})} className="bg-primary mb-2 rounded-b-xl items-center py-2 mx-2">
                  <Text className="text-white font-fitBold">Book Now</Text>
                </TouchableOpacity>
              </View>
            </View>)
}}/>):(<View className="flex-1 justify-center items-center"><Text className="text-xl font-fitBlack text-primary">No Services Offered</Text></View>)
        
        }
      </View>
      <StatusBar backgroundColor="#0064ab" barStyle="dark-content" />
    </SafeAreaView>
  );
};

export default Home;
