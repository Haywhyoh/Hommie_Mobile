import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Dimensions, Alert, TextInput } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const [searchText, setSearchText] = useState('');
  const navigation = useNavigation();

  // Mock user data - would come from authentication context
  const currentUser = {
    firstName: 'Adebayo',
    lastName: 'Ogundimu',
    profileImage: null, // null means we'll show initials
    hasBusinessProfile: true,
    pendingConnectionRequests: 3, // Mock pending requests count
  };

  const handleProfilePress = () => {
    // This will navigate to the ProfileScreen
    Alert.alert(
      'Profile Menu',
      'Choose profile to view',
      [
        {
          text: 'Personal Profile',
          onPress: () => navigation.navigate('Profile' as never)
        },
        ...(currentUser.hasBusinessProfile ? [{
          text: 'Business Profile',
          onPress: () => navigation.navigate('BusinessProfile' as never)
        }] : []),
        {
          text: 'Community Activity',
          onPress: () => navigation.navigate('CommunityActivity' as never)
        },
        {
          text: 'Neighbor Network',
          onPress: () => navigation.navigate('NeighborConnections' as never)
        },
        {
          text: 'Local Businesses',
          onPress: () => navigation.navigate('LocalBusinessDirectory' as never)
        },
        {
          text: 'Cancel',
          style: 'cancel'
        }
      ]
    );
  };

  const handleSearch = () => {
    if (searchText.trim()) {
      Alert.alert('Search', `Searching for: "${searchText}"`);
    }
  };

  const handleAddNeighbor = () => {
    // Navigate to social features screen
    Alert.alert(
      'Connect with Neighbors',
      'Build your community network',
      [
        {
          text: 'Find Neighbors',
          onPress: () => navigation.navigate('NeighborConnections' as never, { initialTab: 'discover' })
        },
        {
          text: 'My Connections',
          onPress: () => navigation.navigate('NeighborConnections' as never, { initialTab: 'connections' })
        },
        {
          text: 'Connection Requests',
          onPress: () => navigation.navigate('NeighborConnections' as never, { initialTab: 'requests' })
        },
        {
          text: 'Cancel',
          style: 'cancel'
        }
      ]
    );
  };

  const handleMessages = () => {
    Alert.alert('Messages', 'Navigate to messages screen');
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with Search Bar */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.profileSection}>
            <TouchableOpacity style={styles.profileButton} onPress={handleProfilePress}>
              <Text style={styles.profileInitial}>
                {getInitials(currentUser.firstName, currentUser.lastName)}
              </Text>
              {currentUser.hasBusinessProfile && (
                <View style={styles.businessIndicator}>
                  <MaterialCommunityIcons name="store" size={10} color="#FFFFFF" />
                </View>
              )}
            </TouchableOpacity>
          </View>
          
          <View style={styles.searchBar}>
            <MaterialCommunityIcons name="magnify" size={20} color="#8E8E8E" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search Hommie"
              placeholderTextColor="#8E8E8E"
              value={searchText}
              onChangeText={setSearchText}
              onSubmitEditing={handleSearch}
            />
            {searchText.length > 0 && (
              <TouchableOpacity onPress={() => setSearchText('')} style={styles.clearButton}>
                <MaterialCommunityIcons name="close-circle" size={18} color="#8E8E8E" />
              </TouchableOpacity>
            )}
          </View>
          
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.headerAction} onPress={handleAddNeighbor}>
              <MaterialCommunityIcons name="account-plus" size={24} color="#2C2C2C" />
              {currentUser.pendingConnectionRequests > 0 && (
                <View style={styles.notificationBadge}>
                  <Text style={styles.notificationText}>
                    {currentUser.pendingConnectionRequests > 9 ? '9+' : currentUser.pendingConnectionRequests}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerAction} onPress={handleMessages}>
              <MaterialCommunityIcons name="chat" size={24} color="#2C2C2C" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Neighbor Post */}
        <View style={styles.postCard}>
          <View style={styles.postHeader}>
            <View style={styles.userAvatar}>
              <Text style={styles.avatarText}>L</Text>
            </View>
            <View style={styles.postInfo}>
              <Text style={styles.userName}>Liza Anto</Text>
              <View style={styles.postMeta}>
                <Text style={styles.postLocation}>Victoria Island • 16h</Text>
                <MaterialCommunityIcons name="home" size={14} color="#8E8E8E" style={styles.homeIcon} />
              </View>
            </View>
            <TouchableOpacity style={styles.moreButton}>
              <MaterialCommunityIcons name="dots-horizontal" size={20} color="#8E8E8E" />
            </TouchableOpacity>
          </View>
          
          <Text style={styles.postText}>Anyone know when the Wilson pool will open back up?</Text>
          
          <View style={styles.postActions}>
            <TouchableOpacity style={styles.actionButton}>
              <MaterialCommunityIcons name="cards-heart-outline" size={16} color="#E74C3C" />
              <Text style={styles.actionCount}>1</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <MaterialCommunityIcons name="heart-outline" size={18} color="#8E8E8E" />
              <Text style={styles.actionText}>Like</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <MaterialCommunityIcons name="comment-outline" size={18} color="#8E8E8E" />
              <Text style={styles.actionCount}>1</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <MaterialCommunityIcons name="share-outline" size={18} color="#8E8E8E" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Sponsored Ad */}
        <View style={styles.postCard}>
          <View style={styles.postHeader}>
            <View style={styles.businessAvatar}>
              <MaterialCommunityIcons name="office-building" size={20} color="#FFFFFF" />
            </View>
            <View style={styles.postInfo}>
              <Text style={styles.userName}>Lagos Prime Properties</Text>
              <Text style={styles.sponsoredLabel}>Sponsored</Text>
            </View>
            <TouchableOpacity style={styles.moreButton}>
              <MaterialCommunityIcons name="dots-horizontal" size={20} color="#8E8E8E" />
            </TouchableOpacity>
          </View>
          
          <Text style={styles.adTitle}>Premium Apartments Now Available</Text>
          <Text style={styles.postText}>Modern 3-bedroom apartments in secure gated estate. Swimming pool, gym, and 24/7 security. Perfect for families.</Text>
          
          <View style={styles.adImage}>
            <View style={styles.imagePlaceholder}>
              <MaterialCommunityIcons name="home-modern" size={48} color="#8E8E8E" />
              <Text style={styles.imagePlaceholderText}>Property Image</Text>
            </View>
          </View>
          
          <TouchableOpacity style={styles.adButton}>
            <Text style={styles.adButtonText}>Learn more</Text>
          </TouchableOpacity>
        </View>

        {/* Event Post */}
        <View style={styles.postCard}>
          <View style={styles.postHeader}>
            <View style={styles.userAvatar}>
              <Text style={styles.avatarText}>K</Text>
            </View>
            <View style={styles.postInfo}>
              <Text style={styles.userName}>Kemi Adebayo</Text>
              <View style={styles.postMeta}>
                <Text style={styles.postLocation}>Ikoyi Estate • 3h</Text>
                <MaterialCommunityIcons name="home" size={14} color="#8E8E8E" style={styles.homeIcon} />
              </View>
            </View>
            <TouchableOpacity style={styles.moreButton}>
              <MaterialCommunityIcons name="dots-horizontal" size={20} color="#8E8E8E" />
            </TouchableOpacity>
          </View>
          
          <Text style={styles.postText}>🎉 Planning a children's birthday party this Saturday at the community center. All kids in the estate are welcome! Let me know if you're coming.</Text>
          
          <View style={styles.eventDetails}>
            <MaterialCommunityIcons name="calendar" size={16} color="#00A651" />
            <Text style={styles.eventText}>Saturday, Aug 19 • 3:00 PM</Text>
          </View>
          <View style={styles.eventDetails}>
            <MaterialCommunityIcons name="map-marker" size={16} color="#00A651" />
            <Text style={styles.eventText}>Community Center, Block A</Text>
          </View>
          
          <View style={styles.postActions}>
            <TouchableOpacity style={styles.actionButton}>
              <MaterialCommunityIcons name="heart-outline" size={18} color="#8E8E8E" />
              <Text style={styles.actionText}>Like</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <MaterialCommunityIcons name="comment-outline" size={18} color="#8E8E8E" />
              <Text style={styles.actionCount}>5</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.joinEventButton}>
              <Text style={styles.joinEventText}>Interested</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Safety Alert Post */}
        <View style={styles.postCard}>
          <View style={styles.postHeader}>
            <View style={styles.alertAvatar}>
              <MaterialCommunityIcons name="shield-alert" size={20} color="#FFFFFF" />
            </View>
            <View style={styles.postInfo}>
              <Text style={styles.userName}>Estate Security</Text>
              <View style={styles.postMeta}>
                <Text style={styles.postLocation}>Victoria Island • 1h</Text>
                <MaterialCommunityIcons name="shield-check" size={14} color="#00A651" style={styles.homeIcon} />
              </View>
            </View>
          </View>
          
          <View style={styles.alertBanner}>
            <MaterialCommunityIcons name="information" size={16} color="#0066CC" />
            <Text style={styles.alertText}>Security Update</Text>
          </View>
          
          <Text style={styles.postText}>New access cards are being distributed this week. Please visit the security office with your ID to collect yours. Old cards will be deactivated on Friday.</Text>
          
          <View style={styles.postActions}>
            <TouchableOpacity style={styles.actionButton}>
              <MaterialCommunityIcons name="heart-outline" size={18} color="#8E8E8E" />
              <Text style={styles.actionText}>Like</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <MaterialCommunityIcons name="comment-outline" size={18} color="#8E8E8E" />
              <Text style={styles.actionCount}>8</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <MaterialCommunityIcons name="share-outline" size={18} color="#8E8E8E" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Marketplace Post */}
        <View style={styles.postCard}>
          <View style={styles.postHeader}>
            <View style={styles.userAvatar}>
              <Text style={styles.avatarText}>T</Text>
            </View>
            <View style={styles.postInfo}>
              <Text style={styles.userName}>Tunde Fashola</Text>
              <View style={styles.postMeta}>
                <Text style={styles.postLocation}>Lekki Phase 1 • 4h</Text>
                <MaterialCommunityIcons name="home" size={14} color="#8E8E8E" style={styles.homeIcon} />
              </View>
            </View>
            <TouchableOpacity style={styles.moreButton}>
              <MaterialCommunityIcons name="dots-horizontal" size={20} color="#8E8E8E" />
            </TouchableOpacity>
          </View>
          
          <Text style={styles.postText}>For Sale: barely used treadmill. Moving abroad and can't take it with me. ₦150,000 (negotiable). Perfect condition!</Text>
          
          <View style={styles.marketplaceBadge}>
            <MaterialCommunityIcons name="shopping" size={14} color="#228B22" />
            <Text style={styles.marketplaceText}>For Sale • ₦150,000</Text>
          </View>
          
          <View style={styles.postActions}>
            <TouchableOpacity style={styles.actionButton}>
              <MaterialCommunityIcons name="heart-outline" size={18} color="#8E8E8E" />
              <Text style={styles.actionText}>Like</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <MaterialCommunityIcons name="comment-outline" size={18} color="#8E8E8E" />
              <Text style={styles.actionCount}>3</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.messageButton}>
              <Text style={styles.messageButtonText}>Message</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingTop: 8,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
   
  },
  profileSection: {
    marginRight: 12,
  },
  profileButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#00A651',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  profileInitial: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  businessIndicator: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#228B22',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    fontSize: 16,
    color: '#2C2C2C',
    flex: 1,
  },
  clearButton: {
    padding: 2,
  },
  headerActions: {
    flexDirection: 'row',
  },
  headerAction: {
    marginLeft: 16,
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#E74C3C',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  notificationText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
  },
  postCard: {
    backgroundColor: '#FFFFFF',
    marginBottom: 8,
    paddingVertical: 16,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#00A651',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  businessAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FF6B35',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  alertAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#0066CC',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  postInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C2C2C',
    marginBottom: 2,
  },
  postMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  postLocation: {
    fontSize: 14,
    color: '#8E8E8E',
  },
  homeIcon: {
    marginLeft: 4,
  },
  sponsoredLabel: {
    fontSize: 14,
    color: '#8E8E8E',
  },
  moreButton: {
    padding: 4,
  },
  postText: {
    fontSize: 16,
    color: '#2C2C2C',
    lineHeight: 22,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  adTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2C2C2C',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  adImage: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  imagePlaceholder: {
    height: 200,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagePlaceholderText: {
    fontSize: 14,
    color: '#8E8E8E',
    marginTop: 8,
  },
  adButton: {
    backgroundColor: '#B8E6B8',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginHorizontal: 16,
    alignItems: 'center',
  },
  adButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C2C2C',
  },
  eventDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  eventText: {
    fontSize: 14,
    color: '#2C2C2C',
    marginLeft: 8,
    fontWeight: '500',
  },
  alertBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E8',
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 8,
  },
  alertText: {
    fontSize: 14,
    color: '#0066CC',
    fontWeight: '600',
    marginLeft: 6,
  },
  marketplaceBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  marketplaceText: {
    fontSize: 14,
    color: '#228B22',
    fontWeight: '600',
    marginLeft: 6,
  },
  postActions: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#F5F5F5',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 16,
  },
  actionText: {
    fontSize: 14,
    color: '#8E8E8E',
    marginLeft: 6,
  },
  actionCount: {
    fontSize: 14,
    color: '#8E8E8E',
    marginLeft: 4,
  },
  joinEventButton: {
    backgroundColor: '#00A651',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 16,
    marginLeft: 'auto',
  },
  joinEventText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  messageButton: {
    backgroundColor: '#0066CC',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 16,
    marginLeft: 'auto',
  },
  messageButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
