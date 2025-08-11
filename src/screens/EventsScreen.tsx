import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function EventsScreen() {
  const dummyEvents = [
    { id: '1', title: 'Community Meeting', date: 'Saturday, Dec 15', time: '3:00 PM', location: 'Community Hall' },
    { id: '2', title: 'Neighborhood Cleanup', date: 'Sunday, Dec 16', time: '9:00 AM', location: 'Main Street' },
    { id: '3', title: 'Holiday Party', date: 'Friday, Dec 20', time: '7:00 PM', location: 'Park Pavilion' },
  ];

  const renderEvent = ({ item }: { item: any }) => (
    <View style={styles.eventCard}>
      <Text style={styles.eventTitle}>{item.title}</Text>
      <Text style={styles.eventDate}>{item.date} at {item.time}</Text>
      <Text style={styles.eventLocation}>{item.location}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Events</Text>
      </View>
      <FlatList
        data={dummyEvents}
        renderItem={renderEvent}
        keyExtractor={(item) => item.id}
        style={styles.eventsList}
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
  eventsList: {
    flex: 1,
  },
  eventCard: {
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
  eventTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  eventDate: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  eventLocation: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '500',
  },
});
