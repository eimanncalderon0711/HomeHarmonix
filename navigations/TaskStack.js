import React from 'react';
import { View, Text, SafeAreaView, StatusBar, Platform, StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Feather from 'react-native-vector-icons/Feather';

// Import your task screens
import Pending from '../screens/my-task-screen/Pending';
import Ongoing from '../screens/my-task-screen/Ongoing';
import Completed from '../screens/my-task-screen/Completed';

// Create Drawer and Tab navigators
const Tab = createMaterialTopTabNavigator();

// Task Tabs Navigator
function TaskStack({setIsRating}) {
  return (
    <Tab.Navigator screenOptions={{
      headerShown: false, // Hide header
      tabBarIndicatorStyle: {
        backgroundColor: '#0064ab', // Tab indicator color
        height: 3, // Indicator height
      },
      tabBarStyle: {
        elevation: 1, // Avoid z-index issues
        backgroundColor: 'white', // Background color for tabs
        borderBottomWidth: 1,
        borderBottomColor: '#ddd', // Add a subtle bottom border
      },
      tabBarLabelStyle: {
        fontSize: 14, // Font size for tab titles
        fontWeight: 'bold',
        fontFamily: 'fitMediumBold', // Custom font family (use a loaded font if needed)
    
      },
      tabBarActiveTintColor: '#0064ab', // Active tab color
      tabBarInactiveTintColor: 'gray', // Inactive tab color
    }}>
      <Tab.Screen
        name="Pending"
        component={Pending}
        options={{ headerShown: false }}  // Hide header for Pending
      />
      <Tab.Screen
        name="Ongoing"
        component={Ongoing}
        options={{ headerShown: false }}  // Hide header for Ongoing
      />
      <Tab.Screen
        name="Completed"
        component={Completed}
        options={{ headerShown: false }}  // Hide header for Completed
      />
    </Tab.Navigator>
  );
}


export default TaskStack;