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
    const [emailNotifications, setEmailNotifications] = useState(true);
    const [budgetAlerts, setBudgetAlerts] = useState(true);
    const [biometricLogin, setBiometricLogin] = useState(false);
    const [autoBackup, setAutoBackup] = useState(true);

    const handleContinue = async () => {
        try {
            await setLanguage(selectedLanguage);
            await setCurrency(selectedCurrency);
            router.push('/setup');
        } catch (error) {
            console.error('Ayarlar kaydedilirken hata:', error);
        }
    };

    const settingsGroups = [
        {
            title: 'Güvenlik',
            subtitle: 'Security',
            icon: 'shield-checkmark-outline',
            settings: [
                {
                    title: 'Biyometrik Giriş',
                    subtitle: 'Biometric Login',
                    value: biometricLogin,
                    onValueChange: setBiometricLogin,
                },
                {
                    title: 'Otomatik Yedekleme',
                    subtitle: 'Auto Backup',
                    value: autoBackup,
                    onValueChange: setAutoBackup,
                },
            ],
        },
        {
            title: 'Bildirimler',
            subtitle: 'Notifications',
            icon: 'notifications-outline',
            settings: [
                {
                    title: 'E-posta Bildirimleri',
                    subtitle: 'Email Notifications',
                    value: emailNotifications,
                    onValueChange: setEmailNotifications,
                },
                {
                    title: 'Bütçe Uyarıları',
                    subtitle: 'Budget Alerts',
                    value: budgetAlerts,
                    onValueChange: setBudgetAlerts,
                },
            ],
        },
    ];

    const actionItems = [
        {
            title: 'Hesap Bilgileri',
            subtitle: 'Account Information',
            icon: 'person-outline',
            action: () => {},
        },
        {
            title: 'Gizlilik Politikası',
            subtitle: 'Privacy Policy',
            icon: 'lock-closed-outline',
            action: () => {},
        },
        {
            title: 'Yardım ve Destek',
            subtitle: 'Help & Support',
            icon: 'help-circle-outline',
            action: () => {},
        },
        {
            title: 'Hakkında',
            subtitle: 'About',
            icon: 'information-circle-outline',
            action: () => {},
        },
    ];

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={[COLORS.primary, COLORS.secondary]}
                style={styles.headerGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                <Text style={styles.title}>Ayarlar</Text>
                <Text style={styles.subtitle}>Settings</Text>
            </LinearGradient>

            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                <View style={styles.content}>
                    {/* Ayar Grupları */}
                    {settingsGroups.map((group, index) => (
                        <View key={index} style={styles.card}>
                            <View style={styles.cardHeader}>
                                <Ionicons name={group.icon} size={24} color={COLORS.primary} />
                                <View style={styles.cardTitleContainer}>
                                    <Text style={styles.cardTitle}>{group.title}</Text>
                                    <Text style={styles.cardSubtitle}>{group.subtitle}</Text>
                                </View>
                            </View>
                            
                            {group.settings.map((setting, settingIndex) => (
                                <View 
                                    key={settingIndex} 
                                    style={[
                                        styles.settingItem,
                                        settingIndex < group.settings.length - 1 && styles.settingBorder
                                    ]}
                                >
                                    <View style={styles.settingTextContainer}>
                                        <Text style={styles.settingTitle}>{setting.title}</Text>
                                        <Text style={styles.settingSubtitle}>{setting.subtitle}</Text>
                                    </View>
                                    <Switch
                                        value={setting.value}
                                        onValueChange={setting.onValueChange}
                                        trackColor={{ false: COLORS.lightGray, true: COLORS.primary }}
                                        thumbColor={COLORS.white}
                                    />
                                </View>
                            ))}
                        </View>
                    ))}

                    {/* Eylem Butonları */}
                    <View style={styles.card}>
                        {actionItems.map((item, index) => (
                            <TouchableOpacity 
                                key={index}
                                style={[
                                    styles.actionItem,
                                    index < actionItems.length - 1 && styles.actionBorder
                                ]}
                                onPress={item.action}
                            >
                                <View style={styles.actionLeft}>
                                    <Ionicons name={item.icon} size={24} color={COLORS.primary} />
                                    <View style={styles.actionTextContainer}>
                                        <Text style={styles.actionTitle}>{item.title}</Text>
                                        <Text style={styles.actionSubtitle}>{item.subtitle}</Text>
                                    </View>
                                </View>
                                <Ionicons name="chevron-forward" size={24} color={COLORS.gray} />
                            </TouchableOpacity>
                        ))}
                    </View>

                    <TouchableOpacity style={styles.logoutButton}>
                        <Ionicons name="log-out-outline" size={24} color={COLORS.error} />
                        <Text style={styles.logoutText}>Çıkış Yap / Logout</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            <TouchableOpacity 
                style={styles.continueButton} 
                onPress={handleContinue}
            >
                <LinearGradient
                    colors={[COLORS.primary, COLORS.secondary]}
                    style={styles.buttonGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                >
                    <Text style={styles.buttonText}>Devam Et / Continue</Text>
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
        padding: SIZES.padding,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.lightGray,
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
    settingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: SIZES.padding,
    },
    settingBorder: {
        borderBottomWidth: 1,
        borderBottomColor: COLORS.lightGray,
    },
    settingTextContainer: {
        flex: 1,
    },
    settingTitle: {
        fontSize: SIZES.font,
        fontFamily: FONTS.medium,
        color: COLORS.primary,
    },
    settingSubtitle: {
        fontSize: SIZES.small,
        fontFamily: FONTS.regular,
        color: COLORS.gray,
    },
    actionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: SIZES.padding,
    },
    actionBorder: {
        borderBottomWidth: 1,
        borderBottomColor: COLORS.lightGray,
    },
    actionLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    actionTextContainer: {
        marginLeft: 10,
    },
    actionTitle: {
        fontSize: SIZES.font,
        fontFamily: FONTS.medium,
        color: COLORS.primary,
    },
    actionSubtitle: {
        fontSize: SIZES.small,
        fontFamily: FONTS.regular,
        color: COLORS.gray,
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: SIZES.padding,
        backgroundColor: COLORS.white,
        borderRadius: SIZES.radius,
        marginTop: 10,
        ...Platform.select({
            ios: {
                shadowColor: COLORS.error,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 8,
            },
            android: {
                elevation: 4,
            },
        }),
    },
    logoutText: {
        marginLeft: 10,
        fontSize: SIZES.font,
        fontFamily: FONTS.medium,
        color: COLORS.error,
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
