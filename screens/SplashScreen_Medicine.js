import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    StyleSheet,
    StatusBar,
    Image
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '@react-navigation/native';
import SplashScreen_Doctor from './SplashScreen_Doctor';
import SplashScreen_Appointments from './SplashScreen_Appointments';

const SplashScreen_Medicine = ({navigation}) => {
    const { colors } = useTheme();

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#fff' barStyle="dark-content"/>
            <View style={styles.header}>



                <Animatable.Image
                    animation="bounceIn"
                    duraton="1500"
                    source={require('../assets/Medicine.png')}
                    style={styles.logo}
                    resizeMode="stretch"
                />
            </View>
            <Animatable.View
                style={[styles.footer, {
                    backgroundColor: colors.background
                }]}
                animation="fadeInUpBig"
            >
                <Text style={[styles.title, {
                    color: colors.text
                }]}>Medicine</Text>
                <Text style={styles.text}>
                    Alopathic, Ayurvedic and all type of medicines
                    can bought from here </Text>
                <View style={styles.button}>



                </View>
                <View style={styles.row}>
                    <TouchableOpacity onPress={()=>navigation.navigate('SplashScreen_Doctor')}
                                      style={{
                                          resizeMode: 'stretch',width : width*0.2,height : height*0.1,alignItems: "flex-start"}}>
                        <Image source={require('../assets/fleshysar.png')} style={{
                            alignSelf: "flex-start",
                            resizeMode: 'stretch',width : width*0.18,height : height*0.09,right:width*0.1
                            }}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>navigation.navigate('SplashScreen_Appointments')}
                                      style={{
                                          resizeMode: 'stretch',width : width*0.2,height : height*0.1,alignItems: "flex-end",left:width*0.55}}>
                        <Image source={require('../assets/fleshymin.png')} style={{
                            resizeMode: 'stretch',width : width*0.2,height : height*0.1}} />
                    </TouchableOpacity>

                </View>
                <Image source={require('../assets/felsamedicine.png')} style={{alignSelf: 'center',marginBottom:'5%',
                    resizeMode: 'stretch',width : width*0.2,height : height*0.015}}/>

            </Animatable.View>
        </View>
    );
};

export default SplashScreen_Medicine;

const {height} = Dimensions.get("screen");const {width} = Dimensions.get("screen");
const height_logo = height * 0.5;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    row: {
        marginTop :height*0.1,
        width:width,
        flexDirection: "row",
        flexWrap: "wrap",
    },
    header: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    footer: {
        elevation: 20,
        backgroundColor: '#ffffff',
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,

        paddingHorizontal: 30,
        height : height*0.50

    },
    logo: {
        marginTop : height*0.37,
        width: width * 0.65,
        height: height * 0.7
    },
    title: {
        paddingVertical :30,
        color: '#05375a',
        fontSize: 30,
        textAlign: "center"
    },
    text: {
        color: 'grey',
        marginTop:5,
        textAlign: "center"
    },
    button: {
        alignItems: 'flex-end',
        marginTop: 30
    },
    signIn: {
        width: 150,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        flexDirection: 'row'
    },
    textSign: {
        color: 'white',
        fontWeight: 'bold'
    }
});

