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
    StatusBar, Alert,
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

const SignInScreen = ({navigation}) => {
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
          <StatusBar backgroundColor='#529ecf' barStyle="light-content"/>
        <View style={styles.header}>
            <Text style={styles.text_header}>Register Now!</Text>
        </View>
        <Animatable.View
            animation="fadeInUpBig"
            style={styles.footer}
        >
            <ScrollView>
                <Text style={styles.text_footer}>First Name</Text>
                <View style={styles.action}>
                    <FontAwesome
                        name="user-o"
                        color="#05375a"
                        size={20}
                    />
                    <TextInput
                        placeholder="Your First Name"
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={(val) => FirstNameChange(val)}
                        onEndEditing={(e)=> FirstNameChange(e.nativeEvent.text)}
                    />
                    {data.check_FirstNameChange ?
                        <Animatable.View
                            animation="bounceIn"
                        >
                            <Feather
                                name="check-circle"
                                color="green"
                                size={20}
                            />
                        </Animatable.View>
                        : null
                       }
                </View>
                { data.check_FirstNameChange ? null :
                    <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.errorMsg}>please enter your first name</Text>
                    </Animatable.View>
                }

                <Text style={styles.text_footer}>Last Name</Text>
                <View style={styles.action}>
                    <FontAwesome
                        name="user-o"
                        color="#05375a"
                        size={20}
                    />
                    <TextInput
                        placeholder="Your Last Name"
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={(val) => LastNameChange(val)}
                       onEndEditing={(e)=>LastNameChange(e.nativeEvent.text)}
                    />
                    {data.check_LastNameChange ?
                        <Animatable.View
                            animation="bounceIn"
                        >
                            <Feather
                                name="check-circle"
                                color="green"
                                size={20}
                            />
                        </Animatable.View>
                        : null
                        }
                </View>
                { data.check_LastNameChange ? null :
                    <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.errorMsg}>Please enter your last name</Text>
                    </Animatable.View>
                }

            <Text style={styles.text_footer}>Mail</Text>
            <View style={styles.action}>
                <FontAwesome
                    name="user-o"
                    color="#05375a"
                    size={20}
                />
                <TextInput
                    placeholder="Your eMail"
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => textInputChange(val)}
                    onEndEditing={(e)=>handleValidMail(e.nativeEvent.text)}
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
                { data.check_textInputChange ? null :
                    <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.errorMsg}>Please enter a valid mail</Text>
                    </Animatable.View>
                }

            <Text style={[styles.text_footer, {
                marginTop: 35
            }]}>Password</Text>
            <View style={styles.action}>
                <Feather
                    name="lock"
                    color="#05375a"
                    size={20}
                />
                <TextInput
                    placeholder="Your Password"
                    secureTextEntry={data.secureTextEntry ? true : false}
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => handlePasswordChange(val)}
                    onEndEditing={(e)=>handlePasswordChange(e.nativeEvent.text)}
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


            <Text style={[styles.text_footer, {
                marginTop: 35
            }]}>Confirm Password</Text>
            <View style={styles.action}>
                <Feather
                    name="lock"
                    color="#05375a"
                    size={20}
                />
                <TextInput
                    placeholder="Confirm Your Password"
                    secureTextEntry={data.confirm_secureTextEntry ? true : false}
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => handleConfirmPasswordChange(val)}
                    onEndEditing={(e)=>handleConfirmPasswordChange(e.nativeEvent.text)}
                />
                <TouchableOpacity
                    onPress={updateConfirmSecureTextEntry}
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
                { data.check_ConfirmPasswordInputChange ? null :
                    <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.errorMsg}>password must be the same</Text>
                    </Animatable.View>
                }
            <View style={styles.textPrivate}>
                <Text style={styles.color_textPrivate}>
                    By signing up you agree to our
                </Text>
                <Text style={[styles.color_textPrivate, {fontWeight: 'bold'}]}>{" "}Terms of service</Text>
                <Text style={styles.color_textPrivate}>{" "}and</Text>
                <Text style={[styles.color_textPrivate, {fontWeight: 'bold'}]}>{" "}Privacy policy</Text>
            </View>
            <View style={styles.button}>
                <TouchableOpacity
                    style={styles.signIn}
                    onPress={() => {__doSignUp ( data )}}
                >
                <LinearGradient
                    colors={['#529ecf', '#529ecf']}
                    style={styles.signIn}
                >
                    <Text style={[styles.textSign, {
                        color:'#fff'
                    }]}>Sign Up</Text>
                </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={[styles.signIn, {
                        borderColor: '#529ecf',
                        borderWidth: 1,
                        marginTop: 15
                    }]}
                >
                    <Text style={[styles.textSign, {
                        color: '#529ecf'
                    }]}>Sign In</Text>
                </TouchableOpacity>
            </View>
            </ScrollView>
        </Animatable.View>
      </View>
    );
};

export default SignInScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#529ecf'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: Platform.OS === 'ios' ? 3 : 5,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
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
        marginTop: Platform.OS === 'ios' ? 0 : -12,

        paddingLeft: 10,
        color: '#05375a',
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
        marginTop: 20
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
