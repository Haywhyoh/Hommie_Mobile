import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function MarketplaceScreen() {
  const dummyItems = [
    { id: '1', title: 'iPhone 12', price: '₦150,000', category: 'Electronics', seller: 'Mike K.' },
    { id: '2', title: 'Plumbing Service', price: '₦5,000', category: 'Services', seller: 'ABC Plumbing' },
    { id: '3', title: 'Sofa Set', price: '₦80,000', category: 'Furniture', seller: 'Sarah M.' },
  ];

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.itemCard}>
      <Text style={styles.itemTitle}>{item.title}</Text>
      <Text style={styles.itemPrice}>{item.price}</Text>
      <Text style={styles.itemCategory}>{item.category}</Text>
      <Text style={styles.itemSeller}>by {item.seller}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Marketplace</Text>
      </View>
      <FlatList
        data={dummyItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.marketplaceList}
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
  marketplaceList: {
    flex: 1,
  },
  itemCard: {
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
  itemTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  itemPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 8,
  },
  itemCategory: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  itemSeller: {
    fontSize: 14,
    color: '#999',
    fontStyle: 'italic',
  },
});
