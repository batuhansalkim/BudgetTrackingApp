import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Platform,
    Switch,
} from 'react-native';
import { router } from 'expo-router';
import { COLORS, FONTS, SIZES } from '../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../contexts/AppContext';
import { LinearGradient } from 'expo-linear-gradient';

export default function SetupScreen() {
    const { setLanguage, setCurrency, setTheme } = useApp();
    const [selectedLanguage, setSelectedLanguage] = useState('tr');
    const [selectedCurrency, setSelectedCurrency] = useState('TRY');
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [notificationsEnabled, setNotificationsEnabled] = useState(false);

    const languages = [
        { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
        { code: 'en', name: 'English', flag: '🇬🇧' },
    ];

    const currencies = [
        { code: 'TRY', symbol: '₺', name: 'Türk Lirası' },
        { code: 'USD', symbol: '$', name: 'US Dollar' },
        { code: 'EUR', symbol: '€', name: 'Euro' },
    ];

    const requestNotificationPermission = async () => {
        try {
            // Bildirim tercihini context'e kaydedelim
            if (notificationsEnabled) {
                // Bildirim izni isteğini daha sonra yapacağız
                console.log('Bildirimler aktif edildi');
            }
        } catch (error) {
            console.error('Bildirim ayarları kaydedilirken hata:', error);
        }
    };

    const handleContinue = async () => {
        try {
            await setLanguage(selectedLanguage);
            await setCurrency(selectedCurrency);
            await setTheme(isDarkMode ? 'dark' : 'light');
            await requestNotificationPermission();
            router.replace('/(tabs)/home');
        } catch (error) {
            console.error('Setup kaydedilirken hata:', error);
        }
    };

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={[COLORS.primary, COLORS.secondary]}
                style={styles.headerGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                <Text style={styles.title}>Hoş Geldiniz</Text>
                <Text style={styles.subtitle}>Hızlı Kurulum</Text>
            </LinearGradient>

            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                <View style={styles.content}>
                    {/* Dil Seçimi */}
                    <View style={styles.card}>
                        <View style={styles.cardHeader}>
                            <Ionicons name="language" size={24} color={COLORS.primary} />
                            <View style={styles.cardTitleContainer}>
                                <Text style={styles.cardTitle}>Dil Seçimi</Text>
                                <Text style={styles.cardSubtitle}>Language Selection</Text>
                            </View>
                        </View>
                        <View style={styles.optionsContainer}>
                            {languages.map((lang) => (
                                <TouchableOpacity
                                    key={lang.code}
                                    style={[
                                        styles.optionButton,
                                        selectedLanguage === lang.code && styles.selectedOption
                                    ]}
                                    onPress={() => setSelectedLanguage(lang.code)}
                                >
                                    <Text style={styles.flagText}>{lang.flag}</Text>
                                    <Text style={styles.optionText}>{lang.name}</Text>
                                    {selectedLanguage === lang.code && (
                                        <Ionicons name="checkmark-circle" size={24} color={COLORS.primary} />
                                    )}
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    {/* Para Birimi Seçimi */}
                    <View style={styles.card}>
                        <View style={styles.cardHeader}>
                            <Ionicons name="cash-outline" size={24} color={COLORS.primary} />
                            <View style={styles.cardTitleContainer}>
                                <Text style={styles.cardTitle}>Para Birimi</Text>
                                <Text style={styles.cardSubtitle}>Currency</Text>
                            </View>
                        </View>
                        <View style={styles.optionsContainer}>
                            {currencies.map((curr) => (
                                <TouchableOpacity
                                    key={curr.code}
                                    style={[
                                        styles.optionButton,
                                        selectedCurrency === curr.code && styles.selectedOption
                                    ]}
                                    onPress={() => setSelectedCurrency(curr.code)}
                                >
                                    <Text style={styles.currencySymbol}>{curr.symbol}</Text>
                                    <Text style={styles.optionText}>{curr.name}</Text>
                                    {selectedCurrency === curr.code && (
                                        <Ionicons name="checkmark-circle" size={24} color={COLORS.primary} />
                                    )}
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    {/* Görünüm ve Bildirim Ayarları */}
                    <View style={styles.card}>
                        <View style={styles.cardHeader}>
                            <Ionicons name="settings-outline" size={24} color={COLORS.primary} />
                            <View style={styles.cardTitleContainer}>
                                <Text style={styles.cardTitle}>Tercihler</Text>
                                <Text style={styles.cardSubtitle}>Preferences</Text>
                            </View>
                        </View>
                        
                        <View style={styles.preferenceItem}>
                            <View style={styles.preferenceTextContainer}>
                                <Text style={styles.preferenceTitle}>Karanlık Mod</Text>
                                <Text style={styles.preferenceSubtitle}>Dark Mode</Text>
                            </View>
                            <Switch
                                value={isDarkMode}
                                onValueChange={setIsDarkMode}
                                trackColor={{ false: COLORS.lightGray, true: COLORS.primary }}
                                thumbColor={COLORS.white}
                            />
                        </View>

                        <View style={styles.preferenceItem}>
                            <View style={styles.preferenceTextContainer}>
                                <Text style={styles.preferenceTitle}>Bildirimler</Text>
                                <Text style={styles.preferenceSubtitle}>Notifications</Text>
                            </View>
                            <Switch
                                value={notificationsEnabled}
                                onValueChange={setNotificationsEnabled}
                                trackColor={{ false: COLORS.lightGray, true: COLORS.primary }}
                                thumbColor={COLORS.white}
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>

            <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
                <LinearGradient
                    colors={[COLORS.primary, COLORS.secondary]}
                    style={styles.buttonGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                >
                    <Text style={styles.buttonText}>Başlayalım</Text>
                    <Ionicons name="arrow-forward" size={24} color={COLORS.white} />
                </LinearGradient>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    headerGradient: {
        paddingTop: Platform.OS === 'ios' ? 60 : 40,
        paddingBottom: 20,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    title: {
        fontSize: SIZES.extraLarge,
        fontFamily: FONTS.bold,
        color: COLORS.white,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: SIZES.large,
        fontFamily: FONTS.regular,
        color: COLORS.white,
        textAlign: 'center',
        opacity: 0.8,
    },
    scrollView: {
        flex: 1,
    },
    content: {
        padding: SIZES.padding,
    },
    card: {
        backgroundColor: COLORS.white,
        borderRadius: SIZES.radius,
        marginBottom: 20,
        padding: SIZES.padding,
        ...Platform.select({
            ios: {
                shadowColor: COLORS.primary,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 8,
            },
            android: {
                elevation: 4,
            },
        }),
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    cardTitleContainer: {
        marginLeft: 10,
    },
    cardTitle: {
        fontSize: SIZES.large,
        fontFamily: FONTS.bold,
        color: COLORS.primary,
    },
    cardSubtitle: {
        fontSize: SIZES.font,
        fontFamily: FONTS.regular,
        color: COLORS.gray,
    },
    optionsContainer: {
        gap: 10,
    },
    optionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: SIZES.padding,
        backgroundColor: COLORS.lightGray,
        borderRadius: SIZES.radius,
        borderWidth: 1,
        borderColor: 'transparent',
    },
    selectedOption: {
        borderColor: COLORS.primary,
        backgroundColor: 'rgba(33,150,243,0.05)',
    },
    flagText: {
        fontSize: SIZES.extraLarge,
        marginRight: 10,
    },
    currencySymbol: {
        fontSize: SIZES.large,
        fontFamily: FONTS.bold,
        color: COLORS.primary,
        marginRight: 10,
        width: 30,
    },
    optionText: {
        flex: 1,
        fontSize: SIZES.font,
        fontFamily: FONTS.medium,
        color: COLORS.primary,
    },
    preferenceItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.lightGray,
    },
    preferenceTextContainer: {
        flex: 1,
    },
    preferenceTitle: {
        fontSize: SIZES.font,
        fontFamily: FONTS.medium,
        color: COLORS.primary,
    },
    preferenceSubtitle: {
        fontSize: SIZES.small,
        fontFamily: FONTS.regular,
        color: COLORS.gray,
    },
    continueButton: {
        margin: SIZES.padding,
        borderRadius: SIZES.radius,
        overflow: 'hidden',
    },
    buttonGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: SIZES.padding,
    },
    buttonText: {
        color: COLORS.white,
        fontSize: SIZES.large,
        fontFamily: FONTS.medium,
        marginRight: 10,
    },
}); 