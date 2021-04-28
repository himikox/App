import React from 'react';
import {View, Text, Button, Image, StyleSheet, StatusBar, FlatList, TouchableOpacity} from 'react-native';
import { useTheme } from '@react-navigation/native';
import {  Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import ExploreScreen from './ExploreScreen';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import ProfileScreen from './ProfileScreen';
import DetailsScreen from './DetailsScreen';
import SettingsScreen from './SettingsScreen';

import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import FindDoctorScreen from './FindDoctorScreen';
const HomeStack = createStackNavigator();
const DetailsStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const SettingsStack = createStackNavigator();

const Drawer = createDrawerNavigator();
const Tab = createMaterialBottomTabNavigator();

const HomeScreen = ({navigation}) => {

  const { colors } = useTheme();

  const theme = useTheme();

  return (
      <View style={styles.container}>
        <StatusBar barStyle= { theme.dark ? "light-content" : "dark-content" }/>
        <View style={{ width: width * 0.9, display: "flex", flexDirection: "row", flexWrap: "wrap", alignContent: "center", alignItems: "center", justifyContent: "center" }}>
        <TouchableOpacity onPress={()=>navigation.navigate('SettingsScreen')}
                          style={{
                            resizeMode: 'stretch',width : width*0.45,height : height*0.25}}>
        <Image source={require("../assets/HomePage/FindDoctor.png")} style={{width:width*0.45,height:height*0.25,resizeMode: 'stretch'}} />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>console.log('doctor')}
                          style={{
                            resizeMode: 'stretch',width : width*0.45,height : height*0.25}}>
        <Image source={require("../assets/HomePage/Doctriod.png")} style={{width:width*0.45,height:height*0.25,resizeMode: 'stretch'}} />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>console.log('doctor')}
                          style={{
                            resizeMode: 'stretch',width : width*0.45,height : height*0.25}}>
        <Image source={require("../assets/HomePage/Iod.png")} style={{width:width*0.45,height:height*0.25,resizeMode: 'stretch'}} />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>console.log('doctor')}
                          style={{
                            resizeMode: 'stretch',width : width*0.45,height : height*0.25}}>
        <Image source={require("../assets/HomePage/Appointments.png")} style={{width:width*0.45,height:height*0.25,resizeMode: 'stretch'}} />
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>console.log('doctor')}
                          style={{
                            resizeMode: 'stretch',width : width*0.45,height : height*0.25}}>
      <Image source={require("../assets/HomePage/Emergency.png")} style={{width:width*0.45,height:height*0.25,resizeMode: 'stretch'}} />
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>console.log('doctor')}
                          style={{
                            resizeMode: 'stretch',width : width*0.45,height : height*0.25}}>
<Image source={require("../assets/HomePage/MedecineShop.png")} style={{width:width*0.45,height:height*0.25,resizeMode: 'stretch'}} />
        </TouchableOpacity>
      </View>

      </View>
  );
};

export default HomeScreen;
const {height} = Dimensions.get("screen");const {width} = Dimensions.get("screen");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
});
const   ProfileStackScreen = ({navigation}) => (
    <ProfileStack.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: '#3b8abd',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
            fontSize:25,
        }
    }}>
        <DetailsStack.Screen name="Account" component={ProfileScreen} options={{
            headerLeft: () => (
                <Icon.Button name="ios-menu" size={40} backgroundColor="#3b8abd" onPress={() => navigation.openDrawer()}></Icon.Button>
            )
        }} />
    </ProfileStack.Navigator>
);
const HomeStackScreen = ({navigation}) => (
    <HomeStack.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: ('#3b8abd'),

        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
            fontSize:25,
        }
    }}>
        <HomeStack.Screen name="Home" component={HomeScreen} options={{
            title:'Home',
            headerLeft: () => (
                <Icon.Button name="ios-menu" size={40} backgroundColor="#3b8abd" onPress={() => navigation.openDrawer()}></Icon.Button>
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
            fontWeight: 'bold',
            fontSize:25,
        }
    }}>
        <DetailsStack.Screen name="DOCTORSINA" component={DetailsScreen} options={{
            headerLeft: () => (
                <Icon.Button name="ios-menu" size={40} backgroundColor="#3b8abd" onPress={() => navigation.openDrawer()}></Icon.Button>
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
            fontWeight: 'bold',
            fontSize:25,
        }
    }}>
        <DetailsStack.Screen name="Settings" component={SettingsScreen} options={{
            headerLeft: () => (
                <Icon.Button name="ios-menu" size={40} backgroundColor="#3b8abd" onPress={() => navigation.openDrawer()}></Icon.Button>
            )
        }} />
    </SettingsStack.Navigator>
);
