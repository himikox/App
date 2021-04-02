import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';

const DetailsScreen = ({navigation}) => {
    const [state, setState] = React.useState({

        messages: [
            {
                _id: 1,
                text: `Hi! I am DoctorSina.\n\nHow may I help you with today?`,
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'FAQ Bot',
                    avatar: 'https://i.imgur.com/7k12EPD.png'
                }
            }
        ]
    });
   function  onSend(messages = []) {
        setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages)
        }));
    }

    return (

          <View style={{ flex: 1, backgroundColor: '#fff' }}>
              <GiftedChat
                  messages={state.messages}
                  onSend={messages => onSend(messages)}
                  user={{
                      _id: 1
                  }}
              />


      </View>
    );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
});
