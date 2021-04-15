import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Platform,
    StyleSheet,
    StatusBar,
    Alert, Image, Dimensions,
} from 'react-native';
import SplashScreen_Appointments from './SplashScreen_Appointments';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import auth,{ firebase }  from "@react-native-firebase/auth"
import {RadioButton, useTheme} from 'react-native-paper';

import { AuthContext } from '../components/context';

import Users from '../model/users';
import validator from 'validator';

const SignInScreen = ({navigation}) => {
    console.log("i'm here1");

    const [data, setData] = React.useState({
        mail: '',
        password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        isValidUser: true,
        isValidPassword: true,
    });

    const { colors } = useTheme();

   // const { signIn } = React.useContext(AuthContext);

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

    const handlePasswordChange = (val) => {
        if( val.trim().length >= 0 ) {
            setData({
                ...data,
                password: val,
                isValidPassword: true
            });
        } else {
            setData({
                ...data,
                password: val,
                isValidPassword: false
            });
        }
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

    const handleValidUser = (val) => {
        if( validator.isEmail(val)) {
            console.log("email valide");
            setData({

                ...data,
                isValidUser: true
            });
        } else {
            console.log("emailpas valide");


            setData({
                ...data,
                isValidUser: false
            });
        }
    }
    const __doSingIn = async (data) => {
        if(data.isValidUser)
        {
            console.log("done");
            // __doCreateUser(data.mail,data.password);
            try {

                let response = await auth().signInWithEmailAndPassword(data.mail, data.password).then(

                  function() {
                        if (auth().currentUser.emailVerified) {
                            console.log('Not verified');
                        } }



                )

                    if (response && response.user) {
                  //  signIn(data.mail,'aa');
                    Alert.alert("Success ✅", "Authenticated successfully")
                }
        else {

                    }
            } catch (e) { Alert.alert("ERROR ✅", "Mail or password doesn't exist")


            }
        }
    }
    const loginHandle = (userName, password) => {

        const foundUser = Users.filter( item => {
            return userName == item.username && password == item.password;
        } );

        if ( data.username.length == 0 || data.password.length == 0 ) {
            Alert.alert('Wrong Input!', 'Username or password field cannot be empty.', [
                {text: 'Okay'}
            ]);
            return;
        }

        if ( foundUser.length == 0 ) {
            Alert.alert('Invalid User!', 'Username or password is incorrect.', [
                {text: 'Okay'}
            ]);
            return;
        }
        signIn(foundUser);
    }
    const [checked, setChecked] = React.useState('first');
    return (
      <View style={styles.container}>
          <StatusBar backgroundColor='#fff' barStyle="dark-content"/>
          <View style={{paddingHorizontal:20,paddingVertical:20}}>
              <TouchableOpacity onPress={()=>navigation.navigate('SplashScreen_Appointments')}>
              <Image source={require("../assets/SignIn/back-arrow.png")} style={{resizeMode: 'stretch',width:18,height:30}}/>
              </TouchableOpacity>
          </View>
        <View style={styles.header}>
            <Text style={styles.text_header}>Sign In</Text>
        </View>

          <Animatable.View
              animation="fadeInUpBig"
              style={styles.footer}
          >
            <View style={styles.action2}>

                <TextInput
                    placeholder="E-mail"
                    placeholderTextColor="#666666"
                    style={[styles.textInput, {
                        color: colors.text
                    }]}
                    autoCapitalize="none"
                    onChangeText={(val) => textInputChange(val)}
                    onEndEditing={(e)=>handleValidUser(e.nativeEvent.text)}
                />
                {data.check_textInputChange ?
                <Animatable.View
                    animation="bounceIn"
                >
                    <Feather
                        name="check-circle"
                        color="green"
                        size={20}
                    />
                </Animatable.View>
                : null}
            </View>
            { data.isValidUser ? null :
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Mail invalide.</Text>
            </Animatable.View>
            }



            <View style={styles.action1}>

                <TextInput
                    placeholder="Password"
                    placeholderTextColor="#666666"
                    secureTextEntry={data.secureTextEntry ? true : false}
                    style={[styles.textInput, {
                        color: colors.text
                    }]}
                    autoCapitalize="none"
                    onChangeText={(val) => handlePasswordChange(val)}
                />
                <TouchableOpacity
                    onPress={updateSecureTextEntry}
                >
                    {data.secureTextEntry ?
                    <Feather
                        name="eye-off"
                        color="grey"
                        size={20}

                    />
                    :
                    <Feather
                        name="eye"
                        color="grey"
                        size={20}

                    />
                    }
                </TouchableOpacity>
            </View>
            { data.isValidPassword ? null :
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Password must be 8 characters long.</Text>
            </Animatable.View>
            }

              <View style={styles.row}>
                  <View style={{color: '#a7a7a7', fontSize:16,alignSelf:'flex-start',right:30}}>
                      <RadioButton
                          color={'grey'}
                          value="first"
                          status={ checked === 'first' ? 'checked' : 'unchecked' }
                          onPress={() => setChecked('first')}
                      />
                  </View>

                      <Text style={{color: '#a7a7a7', fontSize:16,right:30}}>Remember</Text>

                  <TouchableOpacity>
                      <Text style={{color: '#a7a7a7', fontSize:16,alignSelf:'flex-end',left:90}}>Forgot password?</Text>
                  </TouchableOpacity>

              </View>

            <View style={styles.button}>
                <TouchableOpacity
                    style={styles.signIn}
                    onPress={() => {__doSingIn( data)}}
                >
               <Image source={require('../assets/SignIn/Button.png')} style={{resizeMode: 'stretch',width : 400,height : 90}}/>

                </TouchableOpacity>
                <Text style={{color: '#a7a7a7', fontSize:16,alignItems: 'center'}}>OR</Text>


            </View>

              <View style={styles.row}>
                  <TouchableOpacity
                      style={styles.signIn}
                      onPress={() => {__doSingIn( data)}}
                  >
                      <Image source={require('../assets/SignIn/facebook_button.png')}
                             style={{resizeMode: 'stretch',width : 100,height : 20,alignSelf:'flex-start',right:30}}/>

                  </TouchableOpacity>
                  <TouchableOpacity
                      style={styles.signIn}
                      onPress={() => {__doSingIn( data)}}
                  >
                      <Image source={require('../assets/SignIn/facebook_button.png')}
                             style={{resizeMode: 'stretch',width : 100,height : 20,alignSelf:'flex-end',left:90}}/>

                  </TouchableOpacity>
              </View>
          </Animatable.View>
      </View>
    );
};

export default SignInScreen;
const {height} = Dimensions.get("screen");const {width} = Dimensions.get("screen");
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ffffff'
    },
    header: {
        flex: 1,
        paddingVertical: 20,
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    row: {
        paddingHorizontal: 30,
        marginTop:0,
        width:width,
        flexDirection: "row",
        flexWrap: "wrap",
    },
    footer: {
        flex: 10,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,

    },
    text_header: {
        color: '#2d7ba7',
        marginBottom: 20,
        fontSize: 35
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action1: {

        flexDirection: 'row',

        marginBottom: 10,
        borderWidth : 1,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderColor: '#cfcfcf',
        paddingBottom: 1.5
    },
    action2: {

        flexDirection: 'row',

        marginBottom: 30,
        borderWidth : 1,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderColor: '#cfcfcf',
        paddingBottom: 1.5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : 4,

        paddingLeft: 20,
        color: '#b1b1b1',
        fontSize : 15
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
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
    }
  });
