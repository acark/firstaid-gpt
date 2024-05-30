import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  Pressable,
  ScrollView,
  TextInput,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

const dataArray = [
  {
    isImportant: true,
    order: 1,
    stepDescription: 'Assess the situation and check for any other injuries.',
  },
  {
    isImportant: true,
    order: 2,
    stepDescription:
      'Call emergency services or ask someone else to call for help.',
  },
  {
    isImportant: true,
    order: 3,
    stepDescription: 'Do not move the injured leg to prevent further damage.',
  },
  {
    isImportant: true,
    order: 4,
    stepDescription: 'Keep the injured leg elevated to reduce swelling.',
  },
  {
    isImportant: true,
    order: 5,
    stepDescription: 'Apply a cold compress or ice pack to the injured area.',
  },
  {
    isImportant: false,
    order: 6,
    stepDescription: 'Support the injured leg with pillows or blankets.',
  },
  {
    isImportant: true,
    order: 7,
    stepDescription:
      'Reassure the injured person and keep them calm until help arrives.',
  },
];

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const renderSeparator = () => {
  return (
    <View
      style={{
        height: 20,
      }}
    />
  );
};

export default function ResultsPage({route}) {
  const {data} = route.params;
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={navigation.goBack}>
          <View style={styles.backButtonContainer}>
            <Icon name={'chevron-back-outline'} size={30} color={'#e60000'} />
          </View>
        </Pressable>
        <Text style={styles.headerText}>Back</Text>
      </View>
      <FlatList
        data={data}
        contentContainerStyle={styles.listStyle}
        keyExtractor={item => item.order.toString()}
        ItemSeparatorComponent={renderSeparator}
        renderItem={({item}) => (
          <View style={styles.listItemContainer}>
            <Text
              numberOfLines={2}
              style={
                styles.itemDescriptionText
              }>{`${item.stepDescription}`}</Text>
            <View style={styles.itemOrderContainer}>
              <Text style={styles.itemOrderText}>{item.order}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  header: {
    height: 50,
    width: '100%',
    marginTop: 40,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
  },

  headerText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#e60000',
  },

  backButtonContainer: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listStyle: {
    flex: 1,
    paddingVertical: 30,
  },

  listItemContainer: {
    backgroundColor: '#fafafa',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    position: 'relative',
    marginHorizontal: 20,
    borderRadius: 8,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 2,
  },

  itemOrderContainer: {
    position: 'absolute',
    top: -10,
    left: -10,
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e60000',
  },

  itemOrderText: {
    fontSize: 12,
    color: '#ffffff',
  },

  itemDescriptionText: {
    textAlign: 'left',
    width: '100%',
  },
});
