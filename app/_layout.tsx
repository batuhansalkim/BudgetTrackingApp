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
                    name="(auth)/settings"
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="(auth)/setup"
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="(auth)/login"
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="(auth)/register"
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="(app)/home"
                    options={{
                        headerShown: false,
                    }}
                />
            </Stack>
        </AppProvider>
    );
} 