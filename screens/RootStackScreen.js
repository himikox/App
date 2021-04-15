import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import SplashScreen from './SplashScreen';
import SplashScreen_Doctor from './SplashScreen_Doctor';
import SplashScreen_Medicine from './SplashScreen_Medicine';
import SplashScreen_Appointments from './SplashScreen_Appointments';
import SignInScreen from './SignInScreen';
import SignUpScreen from './SignUpScreen';

const RootStack = createStackNavigator();

const RootStackScreen = ({navigation}) => (
    <RootStack.Navigator headerMode='none'>
        <RootStack.Screen name="SplashScreen_Doctor" component={SplashScreen_Doctor}/>
        <RootStack.Screen name="SplashScreen_Medicine" component={SplashScreen_Medicine}/>
        <RootStack.Screen name="SplashScreen_Appointments" component={SplashScreen_Appointments}/>
        <RootStack.Screen name="SplashScreen" component={SplashScreen}/>
        <RootStack.Screen name="SignInScreen" component={SignInScreen}/>
        <RootStack.Screen name="SignUpScreen" component={SignUpScreen}/>
    </RootStack.Navigator>
);

export default RootStackScreen;
