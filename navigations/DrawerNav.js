import * as React from 'react';
import { DrawerItem, DrawerItemList, createDrawerNavigator } from '@react-navigation/drawer';
import { Logout, Chat, MyTask, Notification, Profile, Home, PostTask } from '../screens';
import { Feather, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, TouchableOpacity, Image, } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../app-states/features/userSlice';
import { FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useState, useEffect } from 'react';
import ChatStack from './ChatStack';
import ProfileStack from './ProfileStack';
import HomeStack from './HomeStack';
import AuthStack from './AuthStack';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { apiUrl } from '../apiUrl';
import TaskStack from './TaskStack';
import NotificationStack from './NotifcationStack';
import MyBookings from '../screens/MyBookings';


const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props) => {

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const islogged = useSelector((state) => state.user.islogged);
  const user = useSelector((state) => state.user.user);
  const [image, setImage] = useState(null);


  const handleLogout = () => {
    dispatch(logout())

    navigation.navigate('AuthStack');
  };

  return (
    <SafeAreaView className="flex-1 py-6 bg-white">
      <View className="mx-4 flex-row py-5 items-center">
        <TouchableOpacity className="absolute top-0 right-0" onPress={() => navigation.dispatch(DrawerActions.closeDrawer)}>
          <Ionicons name="close" size={30} color="#0064ab" />
        </TouchableOpacity>
        <View className="bg-slate-400 h-24 w-24 rounded-full ml-2 items-center justify-center border border-primary" 
        style={{shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 6,
                },
                shadowOpacity: 0.39,
                shadowRadius: 8.30,

                elevation: 13,}}>

            {user.profile_image ? <Image source={{uri: `${user.profile_image}`}} className="flex-1 h-full w-full rounded-full"/> : <FontAwesome name="user" size={60} color="black" opacity={0.5} />}
        </View>
      
      { islogged ? <Text className="mx-auto text-base text-primary font-magBold">{user.fullname}</Text> :
        <TouchableOpacity className="self-center flex-1" onPress={() => navigation.navigate('AuthStack')}>
          <Text className="text-white bg-primary ml-10 py-2 rounded-md font-medium text-center w-[50%]">Login</Text>
        </TouchableOpacity>
      }

        

      </View>
      <View className="mt-5">
        <DrawerItemList {...props}/>
        <DrawerItem 
            style={{borderBottomColor:'rgba(0,0,0,0.25)', borderBottomWidth:1}} 
            onPress={handleLogout} label={({ focused}) => (
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text className="text-primary font-medium">Logout</Text>
                <Feather name="chevron-right" size={24} color={focused ? "#0064ab" : "#000"} />
              </View>
            )}
            icon={() => <View className="bg-slate-300 rounded-lg p-2">
                          <MaterialIcons name="logout" size={24} color="#0064ab"/>
                        </View>}/>
      </View>
    </SafeAreaView>
  )
}

const DrawerNav = () => {

  const islogged = useSelector((state) => state.user.islogged);
  
  return (
    <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props}/>} screenOptions={{
      headerShown:false,
      headerStyle: {
        borderCurve: 'round',
      },
      drawerStyle:{
        width: '100%'
      },
      drawerItemStyle: {
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,0.25)',
        size: '100px'
      },
      drawerActiveBackgroundColor:'rgba(87,87,87, 0.4)',
      drawerActiveTintColor:"#0064ab",
      
    }}>
      <Drawer.Screen name="HomeStack" component={HomeStack}  options={{
        drawerLabel: ({ focused }) => (
          <View className="flex-row justify-between items-center">
            <Text className="text-primary font-medium">Home</Text>
            <Feather name="chevron-right" size={24} color={focused ? "#0064ab" : "#000"} />
          </View>
        ),
        
        drawerIcon:() => <View className="bg-slate-300 rounded-lg p-2"><Feather name="home" size={24} color={"#0064ab"}/></View>
        }}/>
      <Drawer.Screen name="ProfileStack" component={islogged ? ProfileStack : AuthStack} options={{
        drawerLabel: ({ focused }) => (
          <View className="flex-row justify-between items-center">
            <Text className="text-primary font-medium">Profile</Text>
            <Feather name="chevron-right" size={24} color={focused ? "#0064ab" : "#000"} />
          </View>
        ),
      
        drawerIcon:() => <View className="bg-slate-300 rounded-lg p-2"><Feather name="user" size={24} color={"#0064ab"}/></View>
        }}/>
      {/* <Drawer.Screen name="Messages" component={ChatStack} options={{
        drawerLabel: ({ focused }) => (
          <View className="flex-row justify-between items-center">
            <Text className="text-primary font-medium">Messages</Text>
            <Feather name="chevron-right" size={24} color={focused ? "#0064ab" : "#000"} />
          </View>
        ),
       
        drawerIcon:() => <View className="bg-slate-300 rounded-lg p-2"><AntDesign name="message1" size={24} color={"#0064ab"}/></View>
      }}/> */}
      <Drawer.Screen name='Notification' component={NotificationStack} options={{
        drawerLabel: ({ focused }) => (
          <View className="flex-row justify-between items-center">
            <Text className="text-primary font-medium">Notifications</Text>
            <Feather name="chevron-right" size={24} color={focused ? "#0064ab" : "#000"} />
          </View>
        ),
        
        drawerIcon:() => <View className="bg-slate-300 rounded-lg p-2"><Ionicons name="notifications-outline" size={24} color={"#0064ab"} /></View>
        }}/>
      <Drawer.Screen name='My Task' component={MyTask} options={{
        drawerLabel: ({ focused }) => (
          <View className="flex-row justify-between items-center">
            <Text className="text-primary font-medium">My Task</Text>
            <Feather name="chevron-right" size={24} color={focused ? "#0064ab" : "#000"} />
          </View>
        ),
        
        drawerIcon:() => <View className="bg-slate-300 rounded-lg p-2"><FontAwesome5 name="tasks" size={24} color="#0064ab" /></View>
        }}/>
      <Drawer.Screen name="My Bookings" component={MyBookings} options={{
        drawerLabel: ({ focused }) => (
          <View className="flex-row justify-between items-center">
            <Text className="text-primary font-medium">My Bookings</Text>
            <Feather name="chevron-right" size={24} color={focused ? "#0064ab" : "#000"} />
          </View>
        ),
        drawerIcon:() => <View className="bg-slate-300 rounded-lg p-2"><MaterialCommunityIcons name="calendar" size={24} color={"#0064ab"} /></View>
      }}/>

        <Drawer.Screen name="AuthStack" component={AuthStack} options={{
          drawerItemStyle:{display: "none"}
        }}/>
    </Drawer.Navigator>
  );
}

export default DrawerNav;
