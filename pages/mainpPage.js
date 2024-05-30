// MainPage.js

import React, {useState} from 'react';
import {
  View,
  TextInput,
  Button,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  Dimensions,
} from 'react-native';
import axios from 'axios';
import WavyHeader from '../components/WavyHeader';
import LinearGradient from 'react-native-linear-gradient';
import MyTabs from '../navigation/TabNavigator';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const MainPage = () => {
  const [userQuery, setUserQuery] = useState('');
  const [response, setResponse] = useState('');

  const fetchFirstAidAdvice = () => {
    // Assuming userQuery is defined in your surrounding code. If not, pass it as a function parameter.

    return new Promise((resolve, reject) => {
      const data = JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: `First aid advice for: ${userQuery}`,
          },
        ],
      });

      const xhr = new XMLHttpRequest();
      xhr.withCredentials = true;

      xhr.onreadystatechange = function () {
        // Only run if the request is complete
        if (xhr.readyState !== 4) return;

        if (xhr.status >= 200 && xhr.status < 300) {
          // This is the success case
          console.log(JSON.parse(xhr.responseText));
          resolve(JSON.parse(xhr.responseText).choices[0].message.content);
        } else {
          // This handles errors
          console.error(
            'There was an error fetching the first aid advice:',
            xhr.responseText,
          );
          reject('Sorry, an error occurred while fetching your advice.');
        }
      };

      xhr.open('POST', 'https://api.openai.com/v1/chat/completions');
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.setRequestHeader('Authorization', 'Bearer api-key'); // Replace YOUR_OPENAI_API_KEY with your actual key
      xhr.send(data);
    })
      .then(response => {
        // Handle success, set response data to your state
        console.log(response);
        setResponse(response); // Assuming setResponse updates your component state
      })
      .catch(error => {
        // Handle error
        console.error(error);
        setResponse(error); // Assuming setResponse updates your component state
      });
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#fcfcfc', '#f5f5f5']} style={styles.gradient}>
        <MyTabs />
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },

  gradient: {
    flex: 1,
    width: '100%',
  },
  input: {
    height: 200,
    width: '100%',
    marginBottom: 12,
    borderWidth: 1,
    textAlignVertical: 'top',
    padding: 10,
    borderColor: '#f5f5f5',
    borderWidth: 0.5,
    borderRadius: 10,
    color: '#424242',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    backgroundColor: '#fafafa',
    elevation: 3,
  },
  responseContainer: {
    flex: 1,
    marginTop: 20,
  },

  contentWrapper: {
    marginHorizontal: 20,
    marginTop: 300,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    width: windowWidth - 40,
  },

  submitButton: {
    backgroundColor: '#e60000',
    height: 40,
    borderRadius: 4,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },

  submitButtonText: {
    fontSize: 12,
    color: '#ffffff',
    fontWeight: 700,
  },
  svgCurve: {
    position: 'absolute',
    width: Dimensions.get('window').width,
  },
  headerText: {
    fontSize: 25,
    fontWeight: 'bold',
    // change the color property for better output
    color: '#fff',
    textAlign: 'center',
    marginTop: 35,
  },

  headerContainer: {
    marginTop: 40,
  },
});

export default MainPage;
