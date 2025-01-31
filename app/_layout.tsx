import { Stack } from 'expo-router';
import { AppProvider } from './contexts/AppContext';

export default function Layout() {
    return (
        <AppProvider>
            <Stack
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Stack.Screen
                    name="(auth)/onboarding"
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="(auth)/setup"
                    options={{
                        gestureEnabled: false,
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="/(tabs)/home"
                    options={{
                        gestureEnabled: false,
                        headerShown: false,
                    }}
                />
            </Stack>
        </AppProvider>
    );
} 