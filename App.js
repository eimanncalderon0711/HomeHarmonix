import { View, Text, StatusBar } from "react-native";
import Root from "./navigations/Root";
import React from "react";
import { store } from "./app-states/store";
import { Provider } from "react-redux";
import Toast from 'react-native-toast-message';
import "./global.css"
import 'react-native-get-random-values';

const App = () => {
  return (
    <Provider store={store}>
      
        <Root />
        
    </Provider>
  );
};

export default App;
