import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { 
  CONNECTION_TYPES,
  TRUSTED_NEIGHBOR_LEVELS,
  NeighborProfile,
  NeighborConnection
} from '../constants/socialNetworkingData';

interface NeighborConnectionComponentProps {
  neighborProfile: NeighborProfile;
  currentConnection?: NeighborConnection;
  userId: string;
  compactMode?: boolean;
  showConnectionButton?: boolean;
  showTrustScore?: boolean;
  onConnectionChange?: (action: string, connectionType: string) => void;
}

export default function NeighborConnectionComponent({
  neighborProfile,
  currentConnection,
  userId,
  compactMode = false,
  showConnectionButton = true,
  showTrustScore = true,
  onConnectionChange
}: NeighborConnectionComponentProps) {
  const [loading, setLoading] = useState(false);

  const getTrustLevel = (trustScore: number) => {
    if (trustScore >= 90) return TRUSTED_NEIGHBOR_LEVELS.find(l => l.id === 'estate_elder');
    if (trustScore >= 75) return TRUSTED_NEIGHBOR_LEVELS.find(l => l.id === 'community_pillar');
    if (trustScore >= 50) return TRUSTED_NEIGHBOR_LEVELS.find(l => l.id === 'trusted_neighbor');
    if (trustScore >= 25) return TRUSTED_NEIGHBOR_LEVELS.find(l => l.id === 'known_neighbor');
    return TRUSTED_NEIGHBOR_LEVELS.find(l => l.id === 'new_neighbor');
  };

  const getConnectionStatus = () => {
    if (!currentConnection) return 'none';
    return currentConnection.status;
  };

  const getConnectionType = () => {
    if (!currentConnection) return null;
    return CONNECTION_TYPES.find(type => type.id === currentConnection.connectionType);
  };

  const handleConnectionAction = (action: 'connect' | 'follow' | 'trust' | 'disconnect' | 'block') => {
    if (loading) return;
    
    setLoading(true);
    
    const actionMessages = {
      connect: `Send connection request to ${neighborProfile.displayName}?`,
      follow: `Start following ${neighborProfile.displayName}?`,
      trust: `Add ${neighborProfile.displayName} to your trusted neighbors?`,
      disconnect: `Disconnect from ${neighborProfile.displayName}?`,
      block: `Block ${neighborProfile.displayName}? This will remove any existing connection.`
    };

    Alert.alert(
      action.charAt(0).toUpperCase() + action.slice(1),
      actionMessages[action],
      [
        { text: 'Cancel', style: 'cancel', onPress: () => setLoading(false) },
        {
          text: action.charAt(0).toUpperCase() + action.slice(1),
          style: action === 'block' ? 'destructive' : 'default',
          onPress: () => {
            // Simulate API call
            setTimeout(() => {
              setLoading(false);
              onConnectionChange?.(action, action === 'trust' ? 'trusted' : 'connect');
              Alert.alert('Success', `${action.charAt(0).toUpperCase() + action.slice(1)} action completed.`);
            }, 1000);
          }
        }
      ]
    );
  };

  const renderConnectionButton = () => {
    const connectionStatus = getConnectionStatus();
    const connectionType = getConnectionType();

    if (connectionStatus === 'none') {
      return (
        <View style={styles.connectionActions}>
          <TouchableOpacity 
            style={[styles.actionButton, styles.followButton]}
            onPress={() => handleConnectionAction('follow')}
            disabled={loading}
          >
            <MaterialCommunityIcons name="account-plus" size={16} color="#0066CC" />
            <Text style={[styles.actionButtonText, styles.followButtonText]}>Follow</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionButton, styles.connectButton]}
            onPress={() => handleConnectionAction('connect')}
            disabled={loading}
          >
            <MaterialCommunityIcons name="account-multiple-plus" size={16} color="#FFFFFF" />
            <Text style={[styles.actionButtonText, styles.connectButtonText]}>Connect</Text>
          </TouchableOpacity>
        </View>
      );
    }

    if (connectionStatus === 'pending') {
      return (
        <View style={styles.pendingContainer}>
          <MaterialCommunityIcons name="clock-outline" size={16} color="#FF6B35" />
          <Text style={styles.pendingText}>Pending</Text>
        </View>
      );
    }

    if (connectionStatus === 'accepted') {
      return (
        <View style={styles.connectedActions}>
          <View style={[styles.connectionStatusBadge, { backgroundColor: connectionType?.color + '20' }]}>
            <MaterialCommunityIcons 
              name={connectionType?.icon as any} 
              size={14} 
              color={connectionType?.color} 
            />
            <Text style={[styles.connectionStatusText, { color: connectionType?.color }]}>
              {connectionType?.name}
            </Text>
          </View>
          
          {connectionType?.id !== 'trusted' && (
            <TouchableOpacity 
              style={styles.upgradeButton}
              onPress={() => handleConnectionAction('trust')}
              disabled={loading}
            >
              <MaterialCommunityIcons name="shield-plus" size={14} color="#FF6B35" />
              <Text style={styles.upgradeButtonText}>Trust</Text>
            </TouchableOpacity>
          )}
          
          <TouchableOpacity 
            style={styles.moreButton}
            onPress={() => {
              Alert.alert(
                'Connection Options',
                'Choose an action:',
                [
                  { text: 'Message', onPress: () => Alert.alert('Message', 'Opening chat...') },
                  { text: 'View Profile', onPress: () => Alert.alert('Profile', 'Opening profile...') },
                  { text: 'Disconnect', style: 'destructive', onPress: () => handleConnectionAction('disconnect') },
                  { text: 'Block', style: 'destructive', onPress: () => handleConnectionAction('block') },
                  { text: 'Cancel', style: 'cancel' }
                ]
              );
            }}
          >
            <MaterialCommunityIcons name="dots-vertical" size={16} color="#8E8E8E" />
          </TouchableOpacity>
        </View>
      );
    }

    return null;
  };

  const trustLevel = getTrustLevel(neighborProfile.trustScore);

  if (compactMode) {
    return (
      <View style={styles.compactContainer}>
        <View style={styles.compactInfo}>
          <View style={styles.compactHeader}>
            <Text style={styles.compactName}>{neighborProfile.displayName}</Text>
            {neighborProfile.isVerified && (
              <MaterialCommunityIcons name="check-decagram" size={14} color="#00A651" />
            )}
          </View>
          
          <Text style={styles.compactLocation}>
            {neighborProfile.building && `${neighborProfile.building}, `}{neighborProfile.estate}
          </Text>
          
          {showTrustScore && (
            <View style={styles.compactTrust}>
              <MaterialCommunityIcons name={trustLevel?.icon as any} size={12} color={trustLevel?.color} />
              <Text style={[styles.compactTrustText, { color: trustLevel?.color }]}>
                {neighborProfile.trustScore}
              </Text>
            </View>
          )}
        </View>
        
        {showConnectionButton && (
          <View style={styles.compactActions}>
            {getConnectionStatus() === 'none' ? (
              <TouchableOpacity 
                style={styles.compactConnectButton}
                onPress={() => handleConnectionAction('connect')}
                disabled={loading}
              >
                <MaterialCommunityIcons name="account-plus" size={14} color="#00A651" />
              </TouchableOpacity>
            ) : (
              <View style={[styles.compactStatusBadge, { backgroundColor: getConnectionType()?.color + '20' }]}>
                <MaterialCommunityIcons 
                  name={getConnectionType()?.icon as any} 
                  size={12} 
                  color={getConnectionType()?.color} 
                />
              </View>
            )}
          </View>
        )}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Neighbor Info */}
      <View style={styles.neighborInfo}>
        <View style={styles.neighborAvatar}>
          {neighborProfile.profileImage ? (
            <Text>📷</Text>
          ) : (
            <Text style={styles.avatarText}>
              {neighborProfile.firstName.charAt(0)}{neighborProfile.lastName.charAt(0)}
            </Text>
          )}
        </View>
        
        <View style={styles.neighborDetails}>
          <View style={styles.nameSection}>
            <Text style={styles.neighborName}>{neighborProfile.displayName}</Text>
            {neighborProfile.isVerified && (
              <MaterialCommunityIcons name="check-decagram" size={16} color="#00A651" />
            )}
          </View>
          
          <View style={styles.locationSection}>
            <MaterialCommunityIcons name="map-marker" size={14} color="#8E8E8E" />
            <Text style={styles.neighborLocation}>
              {neighborProfile.building ? `${neighborProfile.building}, ` : ''}{neighborProfile.estate}
            </Text>
          </View>
          
          {neighborProfile.bio && (
            <Text style={styles.neighborBio} numberOfLines={2}>{neighborProfile.bio}</Text>
          )}
          
          <View style={styles.neighborStats}>
            {showTrustScore && (
              <View style={[styles.trustBadge, { backgroundColor: trustLevel?.color + '20' }]}>
                <MaterialCommunityIcons name={trustLevel?.icon as any} size={14} color={trustLevel?.color} />
                <Text style={[styles.trustScore, { color: trustLevel?.color }]}>
                  {neighborProfile.trustScore}
                </Text>
              </View>
            )}
            
            <View style={styles.connectionStats}>
              <Text style={styles.statText}>{neighborProfile.connectionStats.totalConnections} connections</Text>
              <Text style={styles.statDivider}>•</Text>
              <Text style={styles.statText}>Joined {neighborProfile.joinedDate}</Text>
            </View>
          </View>
          
          {/* Shared Interests */}
          {neighborProfile.interests.length > 0 && (
            <View style={styles.interestsSection}>
              <Text style={styles.interestsLabel}>Interests:</Text>
              <View style={styles.interestsList}>
                {neighborProfile.interests.slice(0, 3).map((interest, index) => (
                  <View key={index} style={styles.interestTag}>
                    <Text style={styles.interestText}>{interest}</Text>
                  </View>
                ))}
                {neighborProfile.interests.length > 3 && (
                  <Text style={styles.moreInterests}>+{neighborProfile.interests.length - 3}</Text>
                )}
              </View>
            </View>
          )}
        </View>
      </View>
      
      {/* Connection Actions */}
      {showConnectionButton && renderConnectionButton()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  compactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 8,
    shadowColor: '#000000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  compactInfo: {
    flex: 1,
  },
  compactHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  compactName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2C2C2C',
    marginRight: 4,
  },
  compactLocation: {
    fontSize: 11,
    color: '#8E8E8E',
    marginBottom: 2,
  },
  compactTrust: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  compactTrustText: {
    fontSize: 10,
    fontWeight: '600',
    marginLeft: 3,
  },
  compactActions: {
    marginLeft: 8,
  },
  compactConnectButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E8F5E8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  compactStatusBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  neighborInfo: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  neighborAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
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
  neighborDetails: {
    flex: 1,
  },
  nameSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  neighborName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C2C2C',
    marginRight: 6,
  },
  locationSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  neighborLocation: {
    fontSize: 12,
    color: '#8E8E8E',
    marginLeft: 4,
  },
  neighborBio: {
    fontSize: 14,
    color: '#2C2C2C',
    lineHeight: 18,
    marginBottom: 8,
  },
  neighborStats: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  trustBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 10,
    marginRight: 8,
  },
  trustScore: {
    fontSize: 11,
    fontWeight: '700',
    marginLeft: 3,
  },
  connectionStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    fontSize: 11,
    color: '#8E8E8E',
  },
  statDivider: {
    fontSize: 11,
    color: '#8E8E8E',
    marginHorizontal: 4,
  },
  interestsSection: {
    marginTop: 4,
  },
  interestsLabel: {
    fontSize: 11,
    color: '#8E8E8E',
    marginBottom: 4,
  },
  interestsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  interestTag: {
    backgroundColor: '#E8F5E8',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    marginRight: 4,
    marginBottom: 2,
  },
  interestText: {
    fontSize: 9,
    color: '#00A651',
    fontWeight: '600',
  },
  moreInterests: {
    fontSize: 9,
    color: '#8E8E8E',
    fontStyle: 'italic',
  },
  connectionActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    flex: 1,
    justifyContent: 'center',
  },
  followButton: {
    backgroundColor: '#F0F8FF',
    borderWidth: 1,
    borderColor: '#0066CC',
    marginRight: 8,
  },
  connectButton: {
    backgroundColor: '#00A651',
    marginLeft: 8,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
  },
  followButtonText: {
    color: '#0066CC',
  },
  connectButtonText: {
    color: '#FFFFFF',
  },
  pendingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    backgroundColor: '#FFF4E6',
    borderRadius: 16,
  },
  pendingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FF6B35',
    marginLeft: 6,
  },
  connectedActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  connectionStatusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    flex: 1,
    justifyContent: 'center',
  },
  connectionStatusText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  upgradeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF4E6',
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 12,
    marginLeft: 8,
  },
  upgradeButtonText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#FF6B35',
    marginLeft: 3,
  },
  moreButton: {
    padding: 8,
    marginLeft: 4,
  },
});