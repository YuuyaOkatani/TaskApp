
// JSX
// import { Component } from "react";
// import { StatusBar } from 'expo-status-bar';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { collection, doc, setDoc, addDoc, updateDoc, deleteDoc, getDoc, getDocs } from "firebase/firestore";
// import {db} from './config';


import React, { useState } from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { NavigationContainer } from '@react-navigation/native';

import { createDrawerNavigator } from '@react-navigation/drawer';

import Login from "./pages/Login.js"
import HomeScreen from "./pages/HomeScreen.js"





// const height = useSharedValue(0);
//   const activateAnimation = () => {
//     height.value += 100;
//   }



//const Stack=createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();
export default function App() {



  return (


    <NavigationContainer >
      <Drawer.Navigator screenOptions={{headerShown: false}} initialRouteName="Login">
        <Drawer.Screen name="Logout" component={Login}  />
        <Drawer.Screen name="Home" component={HomeScreen} />
      </Drawer.Navigator>
    </NavigationContainer>


  );
}




//export default App;

