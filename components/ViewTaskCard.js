import { View, Text, Image, FlatList, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { apiUrl } from '../apiUrl'
import { useSelector, useDispatch } from "react-redux";
import { TouchableOpacity } from 'react-native-gesture-handler';
import RequestBtn from './RequestBtn';
import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

const ViewTaskCard = ({navigation}) => {

    const [tasks, setTasks] = useState([]);
    const [btnToggle, setBtnToggle] = useState(false);
    const user = useSelector((state) => state.user.user)

 useEffect(() => {
    fetchPostedTasks();
}, [])

const fetchPostedTasks = async () => {
    const response = await axios.get(`${apiUrl}/api/user-task/`)
    const data = response.data;
    setTasks(data);
}

// const verifyUserService = async (userId, taskid) => {
//     console.log(userId, taskid)
  
//     try {
//         const response = await axios.get(`${apiUrl}/api/user/service/${userId}/`)
//         const data = response.data;
//         const haveService = data.length;

//         if(haveService > 0) return sendOffer(userId, taskid);

//     } catch (error) {
//         console.log(error)
//     }

//     Alert.alert("Wakay buot paghimo sa ug service nimo");

// }

// const sendOffer = async(id, taskid) => {
//     console.log(id, taskid)
//     try {
//     const response = await axios.post(`${apiUrl}/api/request/`, {"status": "pending", "user": id, "task": taskid})
//     const data = response.data;
//    } catch (error) {
//     console.log(error)
//    }
// }

const Task = ({taskid, userid, fullname, location, description, profile, services, navigation}) => {

    return <View key={taskid} className="flex-1 p-3 rounded-xl mb-2" style={{backgroundColor:"rgba(0, 100, 171, 0.08)"}}>
                <View className="flex-row items-center">
                <View className="border rounded-full w-14 h-14 border-primary mr-2">
                    <Image source={profile === null ? require('../assets/images/client.png') : {uri: profile}} resizeMode='cover' className="w-full h-full mr-2 rounded-full"/>
                </View>
                    <View>
                        <Text className="font-fitBold">{fullname}</Text>
                        <Text className="font-fitRegular text-xs text-primary">{location}</Text>
                    </View>
                    {userid === user.id && <View className="absolute right-5 top-2">
                        <TouchableOpacity onPress={() => navigation.navigate("Edit Task", {id: taskid})}>
                            <Text className="font-fitBold text-primary">Edit</Text>
                        </TouchableOpacity>
                    </View>}
                </View>
                <View className="px-2 text-base text-justify pt-4">
                    <Text className="font-fitSemiBold text-primary">Looking For: <Text className="font-fitLight text-primary">{services.map(i => i.service_name + " ")}</Text></Text>
                    <Text className="font-fitRegular mt-4">{description}</Text>
                </View>
                {userid !== user.id && <RequestBtn myUserId={user.id} tasks={tasks} setTasks={setTasks} taskid={taskid} userid={userid}/>}
            </View>
};


  return (
    <View className="flex-1">
            { tasks.length > 0 ? <FlatList className="h-full mb-2 mt-2 px-4" 
                data={tasks} 
                renderItem={({item}) => 
                <Task
                    taskid={item.id} 
                    userid={item.user.id}
                    profile={item.user.profile_image}
                    fullname={item.user.fullname} 
                    description={item.description} 
                    location={item.location.location_name} 
                    services={item.TypeOfService}
                    navigation={navigation}
                />}
                keyExtractor={item => item.id.toString()}
            /> : <Text className="font-fitBold text-primary text-lg text-center" style={{marginTop:height*.4}}>No Available Tasks</Text>} 
        </View>
  )
}

export default ViewTaskCard