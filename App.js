import React from 'react';
//import Login from './src/pages/Login'
import { View, Text } from 'react-native';

// import firebase from './firebaseConnection';
// import 'firebase/auth';


import { NavigationContainer } from '@react-navigation/native';
import Route from './src/pages/Routes';
import AuthProvider from './src/context/user';

export default function App() {
 return (
<NavigationContainer>
  <AuthProvider>
  <Route/>
  </AuthProvider>
</NavigationContainer>
 )}