import {React, useState, useEffect} from "react";
import { View, Text, SafeAreaView, FlatList, TextInput, Button, ScrollView, Alert } from "react-native";
import { openDatabase } from "react-native-sqlite-storage";
import PostCard from "../components/PostCard";

const HomeScreen = ({setCurrentScreen, setProps}) => {
  const [author, setAuthor] = useState('');
  const [postText, setPostText] = useState('');
  let [flatListItems, setFlatListItems] = useState(false);
  const [reload, setReload] = useState([false]);

  const db = openDatabase({name: 'blog-app.db', location: 'default'})
  const onView = (item) => {
    setProps(item);
    return (setCurrentScreen('ViewScreen'));
  }
  const onEdit = (item) => {
    setProps(item);
    return (setCurrentScreen('UpdateScreen'));
  }
  const onDelete = (item) => {
    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM blog_posts WHERE id=?',
        [item.id],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Deleted!',
              'Your post is deleted Successfully!',
              [
                {
                  text: 'Ok',
                  onPress: () => setReload(!reload),
                },
              ],
              { cancelable: false }
            );
          } else alert('Deletion Failed');
        }
      )
    })
  }
  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM blog_posts',
        [],
        (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i)
            temp.push(results.rows.item(i));
          console.log(temp)
          setFlatListItems(temp);
        }
      );
    });
  }, [reload]);

  let listViewItemSeparator = () => {
    return (
      <View
        style={{
          height: 0.2,
          width: '100%',
          backgroundColor: '#808080'
        }}
      />
    );
  };

  let listItemView = (item) => {
    return (
      <PostCard item={item} onView={onView} onEdit={onEdit} onDelete={onDelete} />
    );
  };

  let createPost = () => {
    console.log(author, postText);

    if (!author) {
      alert('Please fill author');
      return;
    }
    if (!postText) {
      alert('Please Add a Post');
      return;
    }

    db.transaction(function (tx) {
      tx.executeSql(
        'INSERT INTO blog_posts (author, post) VALUES (?, ?)',
        [author, postText],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            // setReload(!reload);
            Alert.alert(
              'Success',
              'Your update is posted Successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => setReload(!reload),
                },
              ],
              { cancelable: false }
            );
          } else alert('Post your update Failed');
        }
      );
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
        <View>
          <TextInput placeholder="Author" value={author} onChangeText={setAuthor} />
          <TextInput placeholder="Blog Post" value={postText} onChangeText={setPostText} />
          <Button title="Create Post" onPress={createPost} />
        </View>
        <View style={{ flex: 1, backgroundColor: 'white' }}>
          <View style={{ flex: 1 }}>
            <FlatList
              data={flatListItems}
              ItemSeparatorComponent={listViewItemSeparator}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => listItemView(item)}
              scrollEnabled={true}
              scrollIndicatorInsets={true}
              style={{flex: 1}}
            />
          </View>
        </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
