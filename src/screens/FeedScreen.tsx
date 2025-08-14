import React from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';

export default function FeedScreen() {
  const dummyPosts = [
    { id: '1', text: 'Community meeting this Saturday at 3 PM!', author: 'John D.', time: '2 hours ago' },
    { id: '2', text: 'Lost dog found near the park. Please contact if it\'s yours.', author: 'Sarah M.', time: '4 hours ago' },
    { id: '3', text: 'Great plumber recommendation: Mike from ABC Plumbing', author: 'David K.', time: '1 day ago' },
  ];

  const renderPost = ({ item }: { item: any }) => (
    <View style={styles.postCard}>
      <View style={styles.postHeader}>
        <Text style={styles.author}>{item.author}</Text>
        <Text style={styles.time}>{item.time}</Text>
      </View>
      <Text style={styles.postText}>{item.text}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Community Feed</Text>
      </View>
      <FlatList
        data={dummyPosts}
        renderItem={renderPost}
        keyExtractor={(item) => item.id}
        style={styles.feedList}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#007AFF',
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  feedList: {
    flex: 1,
  },
  postCard: {
    backgroundColor: 'white',
    margin: 10,
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  author: {
    fontWeight: '600',
    color: '#333',
  },
  time: {
    color: '#666',
    fontSize: 12,
  },
  postText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 22,
  },
});
