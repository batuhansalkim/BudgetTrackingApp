import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name="loginn" />
      <Stack.Screen name="register" />
    </Stack>
  );
} 