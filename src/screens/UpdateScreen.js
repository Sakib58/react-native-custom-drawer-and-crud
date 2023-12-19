import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
  Text,
  TextInput,
  Button,
  BackHandler
} from 'react-native';

import { openDatabase } from 'react-native-sqlite-storage';

var db = openDatabase({name: 'blog-app.db', location: 'default'});

const UpdateScreen = ({ props, setCurrentScreen }) => {
  let [id, setId] = useState(props.id);
  let [author, setAuthor] = useState(props.author);
  let [post, setPost] = useState(props.post);

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

  let updatePost = () => {
    console.log(id, author, post);

    if (!id) {
      alert('Please fill id');
      return;
    }
    if (!author) {
      alert('Please fill author name');
      return;
    }
    if (!post) {
      alert('Please fill Post text');
      return;
    }

    db.transaction((tx) => {
      tx.executeSql(
        'UPDATE blog_posts set author=?, post=? where id=?',
        [author, post, id],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'Post updated successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => setCurrentScreen('Home'),
                },
              ],
              { cancelable: false }
            );
          } else alert('Updation Failed');
        }
      );
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <KeyboardAvoidingView
              behavior="padding"
              style={{ flex: 1, justifyContent: 'space-between' }}>
              
              <TextInput
                placeholder="Enter Author Name"
                value={author}
                style={{ padding: 10 }}
                onChangeText={
                  (author) => setAuthor(author)
                }
              />
              <TextInput
                placeholder="Enter Post details"
                value={post}
                onChangeText={
                  (post) => setPost(post)
                }
                maxLength={500}
                style={{ padding: 10 }}
              />
              <Button
                title="Update Post"
                onPress={updatePost}
              />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UpdateScreen;