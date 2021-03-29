import React from 'react';

import auth,{ firebase }  from "@react-native-firebase/auth"
import {
    StyleSheet,
    Text,
    View,
    Image,
    Button,
    TouchableOpacity, ScrollView,
} from 'react-native';

const user = firebase.auth().currentUser;
const ProfileScreen = () => {
    return (
        <ScrollView>
        <View style={styles.container}>
            <View style={styles.header}></View>
            <Image style={styles.avatar} source={{uri: 'https://bootdey.com/img/Content/avatar/avatar6.png'}}/>
            <View style={styles.body}>
                <View style={styles.bodyContent}>
                    <Text style={styles.name}>foulen ben foulen</Text>
                    <Text style={styles.info}>{user.email}</Text>

                    <Text style={styles.description}>, omittam </Text>


                </View>
                <View style = {styles.lineStyle} />
                <Text style={ {fontSize:20,
                    color:"#05375a",
                    paddingLeft : 10
                     }}>Birth date</Text>
            </View>
        </View>
        </ScrollView>
    );
};

export default ProfileScreen;

const styles = StyleSheet.create({
    header:{
        backgroundColor: "#529ecf",
        height:200,
    },
    avatar: {
        width: 200,
        height: 200,
        borderRadius: 100,
        borderWidth: 4,
        borderColor: "white",
        marginBottom:10,
        alignSelf:'center',
        position: 'absolute',
        marginTop:100
    },
    name:{
        fontSize:30,
        color:"#05375a",
        fontWeight: 'bold'
    },
    lineStyle:{
        borderWidth: 0.5,
        borderColor:'#05375a',
        margin:5,

    },
    body:{
        marginTop:70,
    },
    bodyContent: {
        flex: 1,
        alignItems: 'center',
        padding:30,
    },
    name1:{
        fontSize:28,
        color: "#696969",
        fontWeight: "600"
    },
    info:{
        fontSize:16,
        color: "#529ecf",
        marginTop:10
    },
    description:{
        fontSize:16,
        color: "#696969",
        marginTop:10,
        textAlign: 'center'
    },
    buttonContainer: {
        marginTop:10,
        height:45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:20,
        width:250,
        borderRadius:30,
        backgroundColor: "#00BFFF",
    },
});


