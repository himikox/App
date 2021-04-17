import React from 'react';
import {
    View,
    Text,
    Button,
    TouchableOpacity,
    Dimensions,
    TextInput,
    Platform,
    StyleSheet,
    ScrollView,
    StatusBar, Alert, Image,
} from 'react-native';
import validator from 'validator';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Users from '../model/users';
import auth from "@react-native-firebase/auth"
import {AuthContext} from '../components/context';
import EmailValidator from 'email-validator-net'
import firestore from '@react-native-firebase/firestore';
import SignInScreen from './SignInScreen';

const ForgotPasswordScreen = ({navigation}) => {
    const usersCollection = firestore().collection('patient');
    const [data, setData] = React.useState({
        firstname:'',
        lastname:'',
        mail: '',
        password: '',
        confirm_password: '',
        check_textInputChange: true,
        check_passwordInputChange: true,
        check_ConfirmPasswordInputChange: true,
        check_FirstNameChange: true,
        check_LastNameChange: true,
        secureTextEntry: true,
        confirm_secureTextEntry: true,
        isValidUser : false,
    });
    //const { signUp } = React.useContext(AuthContext);
    const textInputChange = (val) => {
        if( val.trim().length >= 0 ) {
            setData({
                ...data,
                mail: val,
                check_textInputChange: true,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                mail: val,
                check_textInputChange: false,
                isValidUser: false

            });
        }
    }
    const LastNameChange = (val) => {
        if( val.trim().length >= 1 ) {
            setData({
                ...data,
                lastname: val,
                check_LastNameChange: true,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                lastname: val,
                check_LastNameChange: false,
                isValidUser: false

            });
        }
    }
    const FirstNameChange = (val) => {
        if( val.trim().length >= 4 ) {
            setData({
                ...data,
                firstname: val,
                check_FirstNameChange: true,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                firstname: val,
                check_FirstNameChange: false,
                isValidUser: false

            });
        }
    }
    const handleConfirmPasswordChange = (val) => {
        if(val == data.password)
        {
            setData({
                ...data,
                // password: val,
                check_ConfirmPasswordInputChange : true,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                //  password: val,
                check_ConfirmPasswordInputChange : false,
                isValidUser: false

            });
        }

    }

    const handlePasswordChange = (val) => {
        if(val >4) {
            setData({
                ...data,
                password: val,
                isValidUser: true,
                check_passwordInputChange : true
            });
        }
        else {
            setData({
                ...data,
                password: val,
                check_passwordInputChange : false,
                isValidUser: false

            });
        }
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }
    const handleValidMail = (val) => {
        if( validator.isEmail(val)) {

            console.log("email valide");
            setData({
                check_textInputChange: true,
                ...data,
                isValidUser: true
            });



        } else {
            console.log("email pas valide");


            setData({
                ...data,
                check_textInputChange: false,
                isValidUser: false
            });
        }
    }

    const updateConfirmSecureTextEntry = () => {
        setData({
            ...data,
            confirm_secureTextEntry: !data.confirm_secureTextEntry
        });
    }
    const SignUpHandle = (userName, password) => {
        console.log("signup");

    }
    const __doSignUp = async(data) => {
        if(data.isValidUser) {
            console.log("signup");
            try {
                const validatorInstance = EmailValidator("ev-d6eee678ad5edfd7954126bb2941ee21")
                const responseObject = await validatorInstance(data.mail)
                const x = responseObject.statusCode.toString() ;
                console.log(x);
                if ( x === '200' || x === '207' || x=== '215'  ) {

                    let response = await auth().createUserWithEmailAndPassword(data.mail, data.password)
                    const us = auth().currentUser;
                    let r = await us.sendEmailVerification();


                    if (response && response.user) {
                        await  firestore()
                            .collection('patient')
                            .doc(us.uid)
                            .set({
                                mail : data.mail,
                                firstname: data.firstname ,
                                lastname : data.lastname,
                            })
                            .then(() => {
                                console.log('User added!');
                            });
                        // signUp(data.mail,'aa');
                        Alert.alert("Success ✅", "Email Sent.")
                    }
                }
                else {
                    Alert.alert("Error", "Please Enter a Valid mail")

                }
            }
            catch
                (e)
            {
                Alert.alert("Error✅", e.message);
            }
            console.log("done");
            // __doCreateUser(data.mail,data.password);

        }



    }
    const __doCreateUser = async (email, password) => {
        try {
            let response = await auth().createUserWithEmailAndPassword(email, password)
            signUp();
        } catch (e) {
            console.error(e.message)
        }
    }


    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#ffff' barStyle="dark-content"/>
            <View style={{paddingHorizontal:20,paddingVertical:30}}>
                <TouchableOpacity onPress={()=>navigation.navigate('SignInScreen')}>
                    <Image source={require("../assets/SignUp/back-arrow.png")} style={{resizeMode: 'stretch',width:18,height:30}}/>
                </TouchableOpacity>
            </View>
            <View style={styles.header}>
                <Text style={styles.text_header}>Forgot Password</Text>
            </View>
            <View style={styles.textPrivate}>
                <Text style={styles.color_textPrivate}>
                    We just need your register e-mail ID to send reset
                    link
                </Text>
            </View>
            <Animatable.View
                animation="fadeInUpBig"
                style={styles.footer}
            >
                <ScrollView>



                    <View style={styles.action2}>

                        <TextInput
                            placeholder="E-Mail"
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(val) => textInputChange(val)}
                            onEndEditing={(e)=>handleValidMail(e.nativeEvent.text)}
                        />
                        {data.check_textInputChange ?
                            <Animatable.View
                                animation="bounceIn"
                            >

                            </Animatable.View>
                            : null}
                    </View>
                    { data.check_textInputChange ? null :
                        <Animatable.View animation="fadeInLeft" duration={500}>
                            <Text style={styles.errorMsg}>Please enter a valid mail</Text>
                        </Animatable.View>
                    }








                    <View style={styles.button}>
                        <TouchableOpacity
                            style={styles.signIn}
                            onPress={() => {__doSignUp ( data )}}
                        >
                            <Image source={require('../assets/ForgotPassword/resetpassword.png')} style={{resizeMode: 'stretch',width : 400,height : 90}}/>

                        </TouchableOpacity>


                    </View>
                </ScrollView>

            </Animatable.View>
        </View>
    );
};

export default ForgotPasswordScreen;
const {height} = Dimensions.get("screen");const {width} = Dimensions.get("screen");
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 10
    },
    action2: {

        flexDirection: 'row',


        borderWidth : 1,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderColor: '#cfcfcf',
        paddingBottom: 1.5
    },
    footer: {
        flex: 5,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
    },
    text_header: {
        color: '#2d7ba7',

        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18,
        marginTop : 10,
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : 4,

        paddingLeft: 20,
        color: '#b1b1b1',
        fontSize : 15
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    textPrivate: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: height*0.08,
        left:width*0.05
    },
    color_textPrivate: {
        color: 'grey'
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
});
