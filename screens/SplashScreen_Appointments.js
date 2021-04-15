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
import SignInScreen from './SignInScreen';
const SplashScreen_Appointments = ({navigation}) => {
    const { colors } = useTheme();

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#fff' barStyle="dark-content"/>
            <View style={styles.header}>



                <Animatable.Image
                    animation="bounceIn"
                    duraton="1500"
                    source={require('../assets/appointments.png')}
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
                }]}>Appointments</Text>
                <Text style={styles.text}>
                    Book appointments and get best treatment
                    on one tap</Text>
                <View style={styles.button}>



                </View>
                <TouchableOpacity onPress={()=>navigation.navigate('SignInScreen')}>
                <Image source={require('../assets/gettingstarted.png')} style={{alignSelf: 'center',
                    resizeMode: 'stretch',width : 375,height : 90,marginTop:70}}>

                </Image>
                </TouchableOpacity>


            </Animatable.View>
        </View>
    );
};

export default SplashScreen_Appointments;

const {height} = Dimensions.get("screen");const {width} = Dimensions.get("screen");
const height_logo = height * 0.5;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
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
        height : height*0.45

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
        textAlign: "center",

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

