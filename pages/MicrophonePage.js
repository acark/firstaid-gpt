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

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function MicrophonePage() {
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
          //onChangeText={setUserQuery}
          //value={userQuery}
          placeholder="Ask a first aid question"
        />
        <Pressable>
          <View style={styles.submitButton}>
            <Text style={styles.submitButtonText}>First Aid Instructions</Text>
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
