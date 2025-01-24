import { ActivityIndicator, View, StyleSheet, ViewStyle } from 'react-native';

interface LoadingProps {
  size?: number | 'small' | 'large';
  color?: string;
  style?: ViewStyle;
}

export function Loading({ size = 'large', color = '#007AFF', style }: LoadingProps) {
  return (
    <View style={[styles.container, style]}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
}); 