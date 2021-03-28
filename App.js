/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useState,useEffect } from 'react';
import {View, ActivityIndicator, Alert} from 'react-native';
import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme
} from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import auth,{ firebase }  from "@react-native-firebase/auth"
import {
  Provider as PaperProvider,
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme
} from 'react-native-paper';

import { DrawerContent } from './screens/DrawerContent';
import DetailsScreen from './screens/DetailsScreen';


import MainTabScreen from './screens/MainTabScreen';
import SupportScreen from './screens/SupportScreen';
import SettingsScreen from './screens/SettingsScreen';
import BookmarkScreen from './screens/BookmarkScreen';

import { AuthContext } from './components/context';

import RootStackScreen from './screens/RootStackScreen';

import AsyncStorage from '@react-native-community/async-storage';
import ProfileScreen from './screens/ProfileScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
const HomeStack = createStackNavigator();
const DetailsStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const SettingsStack = createStackNavigator();

const Drawer = createDrawerNavigator();

function App () {
  // const [isLoading, setIsLoading] = React.useState(true);
  // const [userToken, setUserToken] = React.useState(null);

  const [isDarkTheme, setIsDarkTheme] = React.useState(false);

  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  };

  const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors,
      background: '#ffffff',
      text: '#333333'
    }
  }



  const CustomDarkTheme = {
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      ...PaperDarkTheme.colors,
      background: '#333333',
      text: '#ffffff'
    }
  }

  const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();



      const toggleTheme= () => {
      setIsDarkTheme( isDarkTheme => !isDarkTheme );
    }




  function onAuthStateChanged(user) {

              setUser(user);



    if (initializing) setInitializing(false);
  }
    useEffect(() => {

          const subscriber = auth().onAuthStateChanged(onAuthStateChanged)
          return subscriber;




        // unsubscribe on unmount
    }, []);





  if (initializing) return null;
  if (!user ) {

    return (
        <PaperProvider theme={theme}>

            <NavigationContainer theme={theme}>
              <RootStackScreen/>
            </NavigationContainer>

        </PaperProvider>
    );
  }
  console.log("user");
  return (

      <PaperProvider theme={theme}>

          <NavigationContainer theme={theme}>

                    <Drawer.Navigator drawerContent={props => <DrawerContent {...props}  />}    >
                      <Drawer.Screen name="HomeDrawer" component={HomeStackScreen}   />
                      <Drawer.Screen name="ProfileScreen" component={ProfileStackScreen} />
                      <Drawer.Screen name="DetailsScreen" component={DetailsStackScreen} />
                      <Drawer.Screen name="SettingsScreen" component={SettingsStackScreen} />

                    </Drawer.Navigator>

          </NavigationContainer>

      </PaperProvider>
  );
}

export default App;

const   ProfileStackScreen = ({navigation}) => (
    <ProfileStack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: '#3b8abd',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold'
      }
    }}>
      <DetailsStack.Screen name="Profile" component={ProfileScreen} options={{
        headerLeft: () => (
            <Icon.Button name="ios-menu" size={25} backgroundColor="#529ecf" onPress={() => navigation.openDrawer()}></Icon.Button>
        )
      }} />
    </ProfileStack.Navigator>
);
const HomeStackScreen = ({navigation}) => (
    <HomeStack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: '#3b8abd',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold'
      }
    }}>
      <HomeStack.Screen name="Home" component={HomeScreen} options={{
        title:'Home',
        headerLeft: () => (
            <Icon.Button name="ios-menu" size={25} backgroundColor="#3b8abd" onPress={() => navigation.openDrawer()}></Icon.Button>
        )
      }} />
    </HomeStack.Navigator>
);
const DetailsStackScreen = ({navigation}) => (
    <DetailsStack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: '#3b8abd',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold'
      }
    }}>
      <DetailsStack.Screen name="DOCTORSINA" component={DetailsScreen} options={{
        headerLeft: () => (
            <Icon.Button name="ios-menu" size={25} backgroundColor="#529ecf" onPress={() => navigation.openDrawer()}></Icon.Button>
        )
      }} />
    </DetailsStack.Navigator>
);
const SettingsStackScreen = ({navigation}) => (
    <SettingsStack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: '#3b8abd',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold'
      }
    }}>
      <DetailsStack.Screen name="Settings" component={SettingsScreen} options={{
        headerLeft: () => (
            <Icon.Button name="ios-menu" size={25} backgroundColor="#529ecf" onPress={() => navigation.openDrawer()}></Icon.Button>
        )
      }} />
    </SettingsStack.Navigator>
);
