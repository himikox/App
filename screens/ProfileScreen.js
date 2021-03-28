import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import auth,{ firebase }  from "@react-native-firebase/auth"

const user = firebase.auth().currentUser;
const ProfileScreen = () => {
    return (
      <View style={styles.container}>
        <Text>Profile Screen</Text>
        <Button
          title="Click Here"
          onPress={() => {
              if (auth().currentUser) {
                  console.log(auth().currentUser.email);
              }
              else { console.log('not user')}
          }}
        />
      </View>
    );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
});
