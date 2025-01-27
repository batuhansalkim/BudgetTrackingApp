import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { COLORS, FONTS, SIZES } from '../constants/theme';
import Animated, { 
    useSharedValue, 
    useAnimatedStyle, 
    withSpring,
    withTiming,
    withSequence,
    withDelay,
    Easing,
} from 'react-native-reanimated';
import { useFonts } from '../hooks/useFonts';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

export default function SplashScreen() {
    const scale = useSharedValue(0);
    const opacity = useSharedValue(0);
    const translateY = useSharedValue(20);

    const logoStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { scale: scale.value },
                { translateY: translateY.value }
            ],
            opacity: opacity.value,
        };
    });

    const titleStyle = useAnimatedStyle(() => {
        return {
            opacity: opacity.value,
            transform: [{ translateY: translateY.value }],
        };
    });

    useEffect(() => {
        const loadApp = async () => {
            try {
                // Font yükleme
                const fontsLoaded = await useFonts();
                if (!fontsLoaded) {
                    throw new Error('Fonts could not be loaded');
                }

                // Animasyonları başlat
                scale.value = withSequence(
                    withTiming(1.2, { 
                        duration: 600,
                        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
                    }),
                    withSpring(1, {
                        damping: 10,
                        stiffness: 100,
                    }),
                );

                opacity.value = withTiming(1, {
                    duration: 800,
                    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
                });

                translateY.value = withTiming(0, {
                    duration: 800,
                    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
                });

                // 2.5 saniye bekle
                await new Promise(resolve => setTimeout(resolve, 2500));

                // Fade out animasyonu
                opacity.value = withTiming(0, {
                    duration: 500,
                    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
                });

                // Onboarding'e yönlendir
                setTimeout(() => {
                    router.replace('/onboarding');
                }, 600);

            } catch (error) {
                console.error('Error loading app:', error);
            }
        };

        loadApp();
    }, []);

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={[COLORS.primary, COLORS.secondary]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.gradient}
            >
                <Animated.View style={[styles.logoContainer, logoStyle]}>
                    <View style={styles.logoBackground}>
                        <Text style={styles.logo}>💰</Text>
                    </View>
                </Animated.View>

                <Animated.Text style={[styles.title, titleStyle]}>
                    Akıllı Bütçe
                </Animated.Text>
            </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: SIZES.large,
    },
    logoBackground: {
        width: 120,
        height: 120,
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 8,
    },
    logo: {
        fontSize: 64,
    },
    title: {
        fontSize: SIZES.extraLarge * 1.5,
        color: COLORS.white,
        marginTop: SIZES.base,
        fontFamily: FONTS.bold,
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 4,
    },
});