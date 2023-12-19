import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TouchableWithoutFeedback } from 'react-native';

const PostCard = ({ item,onView, onEdit, onDelete }) => {
  return (
    <View key={item.id} style={styles.card}>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarText}>{item.author[0]}</Text>
        </View>
        <Text style={styles.author}>{item.author}</Text>
      </View>
      <Text style={styles.post}>{item.post}</Text>
      <View style={styles.actions}>
        <TouchableWithoutFeedback onPress={() => onView(item)}>
          <Text style={[styles.actionText, { color: 'green' }]}>View</Text>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => onEdit(item)}>
          <Text style={styles.actionText}>Edit</Text>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => onDelete(item)}>
          <Text style={[styles.actionText, { color: 'red' }]}>Delete</Text>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
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

export default PostCard;
