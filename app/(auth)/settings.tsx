import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Platform,
} from 'react-native';
import { Link, router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, FONTS, SIZES, SHADOWS } from '../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../contexts/AppContext';

interface Currency {
    code: string;
    symbol: string;
    name: string;
}

interface Language {
    code: string;
    name: string;
    localName: string;
}

const currencies: Currency[] = [
    { code: 'TRY', symbol: '₺', name: 'Turkish Lira' },
    { code: 'USD', symbol: '$', name: 'US Dollar' },
    { code: 'EUR', symbol: '€', name: 'Euro' },
    { code: 'GBP', symbol: '£', name: 'British Pound' },
];

const languages: Language[] = [
    { code: 'tr', name: 'Turkish', localName: 'Türkçe' },
    { code: 'en', name: 'English', localName: 'English' },
    { code: 'de', name: 'German', localName: 'Deutsch' },
    { code: 'fr', name: 'French', localName: 'Français' },
];

export default function SettingsScreen() {
    const [selectedCurrency, setSelectedCurrency] = useState<string>('TRY');
    const [selectedLanguage, setSelectedLanguage] = useState<string>('tr');
    const { setLanguage, setCurrency } = useApp();

    const handleContinue = async () => {
        try {
            await setLanguage(selectedLanguage);
            await setCurrency(selectedCurrency);
            router.push('/setup');
        } catch (error) {
            console.error('Ayarlar kaydedilirken hata:', error);
        }
    };

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={[COLORS.primary, COLORS.secondary]}
                style={styles.gradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                <Text style={styles.title}>Uygulama Ayarları</Text>
                <Text style={styles.subtitle}>App Settings</Text>

                <ScrollView style={styles.scrollView}>
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Para Birimi</Text>
                        <Text style={styles.sectionSubtitle}>Currency</Text>
                        <View style={styles.optionsContainer}>
                            {currencies.map((currency) => (
                                <TouchableOpacity
                                    key={currency.code}
                                    style={[
                                        styles.option,
                                        selectedCurrency === currency.code && styles.selectedOption,
                                    ]}
                                    onPress={() => setSelectedCurrency(currency.code)}
                                >
                                    <Text style={styles.optionSymbol}>{currency.symbol}</Text>
                                    <Text style={styles.optionText}>{currency.name}</Text>
                                    {selectedCurrency === currency.code && (
                                        <Ionicons
                                            name="checkmark-circle"
                                            size={24}
                                            color={COLORS.primary}
                                            style={styles.checkIcon}
                                        />
                                    )}
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Dil</Text>
                        <Text style={styles.sectionSubtitle}>Language</Text>
                        <View style={styles.optionsContainer}>
                            {languages.map((language) => (
                                <TouchableOpacity
                                    key={language.code}
                                    style={[
                                        styles.option,
                                        selectedLanguage === language.code && styles.selectedOption,
                                    ]}
                                    onPress={() => setSelectedLanguage(language.code)}
                                >
                                    <Text style={styles.optionText}>{language.localName}</Text>
                                    <Text style={styles.optionSubtext}>{language.name}</Text>
                                    {selectedLanguage === language.code && (
                                        <Ionicons
                                            name="checkmark-circle"
                                            size={24}
                                            color={COLORS.primary}
                                            style={styles.checkIcon}
                                        />
                                    )}
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                </ScrollView>

                <TouchableOpacity style={styles.button} onPress={handleContinue}>
                    <Text style={styles.buttonText}>Devam Et / Continue</Text>
                </TouchableOpacity>
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
        paddingTop: Platform.OS === 'ios' ? 60 : 40,
    },
    title: {
        fontSize: SIZES.extraLarge,
        fontFamily: FONTS.bold,
        color: COLORS.white,
        textAlign: 'center',
        marginBottom: 5,
    },
    subtitle: {
        fontSize: SIZES.large,
        fontFamily: FONTS.regular,
        color: COLORS.white,
        textAlign: 'center',
        marginBottom: 30,
        opacity: 0.8,
    },
    scrollView: {
        flex: 1,
        paddingHorizontal: SIZES.padding,
    },
    section: {
        marginBottom: 30,
        backgroundColor: 'rgba(255,255,255,0.9)',
        borderRadius: SIZES.radius,
        padding: SIZES.padding,
        ...SHADOWS.light,
    },
    sectionTitle: {
        fontSize: SIZES.large,
        fontFamily: FONTS.bold,
        color: COLORS.primary,
        marginBottom: 5,
    },
    sectionSubtitle: {
        fontSize: SIZES.font,
        fontFamily: FONTS.regular,
        color: COLORS.gray,
        marginBottom: 15,
    },
    optionsContainer: {
        backgroundColor: COLORS.white,
        borderRadius: SIZES.radius,
        overflow: 'hidden',
    },
    option: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: SIZES.padding,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.lightGray,
    },
    selectedOption: {
        backgroundColor: 'rgba(33,150,243,0.1)',
    },
    optionSymbol: {
        fontSize: SIZES.large,
        fontFamily: FONTS.bold,
        color: COLORS.primary,
        marginRight: 10,
        width: 30,
    },
    optionText: {
        fontSize: SIZES.font,
        fontFamily: FONTS.medium,
        color: COLORS.primary,
        flex: 1,
    },
    optionSubtext: {
        fontSize: SIZES.small,
        fontFamily: FONTS.regular,
        color: COLORS.gray,
        marginLeft: 10,
    },
    checkIcon: {
        marginLeft: 10,
    },
    button: {
        backgroundColor: 'rgba(255,255,255,0.2)',
        padding: SIZES.padding,
        margin: SIZES.padding,
        borderRadius: SIZES.radius,
        alignItems: 'center',
    },
    buttonText: {
        color: COLORS.white,
        fontSize: SIZES.large,
        fontFamily: FONTS.medium,
    },
}); 
