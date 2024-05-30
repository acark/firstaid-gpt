import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  Pressable,
  ScrollView,
  TextInput,
} from 'react-native';
import WavyHeader from '../components/WavyHeader';
import {useNavigation} from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function TextInputPage() {
  const [userQuery, setUserQuery] = useState('');
  const [response, setResponse] = useState('');
  const navigation = useNavigation();

  const fetchFirstAidAdvice = props => {
    // Assuming userQuery is defined in your surrounding code. If not, pass it as a function parameter.

    return new Promise((resolve, reject) => {
      const data = JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: `Please provide a detailed list of first aid steps for: ${userQuery}. Each step should be formatted as a JSON object with the following structure: {order: <step_number>, isImportant: <true_or_false>, stepDescription: "<step_description>"}. Do not include "Step <step_number>:" at the beginning of the stepDescription.`,
          },
        ],
      });

      const xhr = new XMLHttpRequest();
      xhr.withCredentials = true;

      xhr.onreadystatechange = function () {
        // Only run if the request is complete
        if (xhr.readyState !== 4) return;

        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(xhr.responseText);
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
      .then(res => {
        const r = JSON.parse(res);
        if (r.choices && r.choices.length > 0 && r.choices[0].message) {
          const parsedResponse = JSON.parse(r.choices[0].message.content);
          setResponse(parsedResponse);
          //console.log(parsedResponse);
          navigation.navigate('ResultsPage', {data: parsedResponse});
        } else {
          throw new Error('Invalid response structure');
        }
      })
      .catch(error => {
        setResponse(error);
      });
  };

  return (
    <View>
      <WavyHeader
        customStyles={styles.svgCurve}
        customHeight={160}
        customTop={130}
        customBgColor="#e60000"
        customWavePattern="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,213.3C672,192,768,128,864,128C960,128,1056,192,1152,208C1248,224,1344,192,1392,176L1440,160L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
      />
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Tell Your Emergency</Text>
      </View>
      <View style={styles.contentWrapper}>
        <TextInput
          style={styles.input}
          multiline={true}
          onChangeText={setUserQuery}
          value={userQuery}
          placeholder="Ask a first aid question"
        />
        <Pressable onPress={fetchFirstAidAdvice}>
          <View style={styles.submitButton}>
            <Text style={styles.submitButtonText}>
              First Aid Instructions text
            </Text>
          </View>
        </Pressable>
        {/* <ScrollView style={styles.responseContainer}>
        <Text>{response}</Text>
      </ScrollView> */}
      </View>
    </View>
  );
}

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
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderColor: '#f5f5f5',
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
    fontSize: 16,
  },
  responseContainer: {
    flex: 1,
    marginTop: 20,
  },

  contentWrapper: {
    marginHorizontal: 20,
    marginTop: 200,
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
    fontWeight: 'bold',
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
