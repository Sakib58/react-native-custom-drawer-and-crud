import {React, useEffect} from 'react';
import { View, Text, StyleSheet, SafeAreaView, BackHandler } from 'react-native';

const ViewScreen = ({ props, setCurrentScreen }) => {
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        setCurrentScreen('Home');
        return true;
      }
    );

    return () => backHandler.remove();
  }, [setCurrentScreen]);
  return (
    <SafeAreaView  style={styles.card}>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarText}>{props.author[0]}</Text>
        </View>
        <Text style={styles.author}>{props.author}</Text>
      </View>
      <Text style={styles.post}>{props.post}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    height: '100%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  avatarText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'white',
  },
  author: {
    fontWeight: 'bold',
  },
  post: {
    marginBottom: 10,
    marginLeft: 30,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  actionText: {
    color: 'blue',
  },
});

export default ViewScreen;
