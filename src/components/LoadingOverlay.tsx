import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

interface LoadingOverlayProps {
  isVisible: boolean;
  message?: string;
}

const LoadingOverlay = ({ isVisible, message = 'Loading...' }: LoadingOverlayProps) => {
  if (!isVisible) {
    return null;
  }

  return (
    <View style={styles.overlayContainer}>
      <ActivityIndicator size="large" color="#0000ff" />
      <Text style={styles.overlayText}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  overlayContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  overlayText: {
    marginTop: 10,
    fontSize: 16,
    color: '#333',
  },
});

export default LoadingOverlay;
