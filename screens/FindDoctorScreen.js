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
const HomeStack = createStackNavigator();
const DetailsStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const SettingsStack = createStackNavigator();

const Drawer = createDrawerNavigator();
const Tab = createMaterialBottomTabNavigator();

const FindDoctorScreen = ({navigation}) => {

    const { colors } = useTheme();

    const theme = useTheme();

    return (
        <View style={styles.container}>
            <StatusBar barStyle= { theme.dark ? "light-content" : "dark-content" }/>
         <Text> Find Doctor</Text>

        </View>
    );
};

export default FindDoctorScreen;

const {height} = Dimensions.get("screen");const {width} = Dimensions.get("screen");
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
});
