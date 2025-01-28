import React, { useState } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    SafeAreaView,
    TouchableOpacity,
    ScrollView,
    Switch,
    Image,
} from 'react-native';
import { COLORS, FONTS, SIZES } from '../../app/constants/theme';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const [darkMode, setDarkMode] = useState(false);
    const [biometricEnabled, setBiometricEnabled] = useState(false);

    const renderSettingItem = ({ 
        icon, 
        label, 
        value, 
        onPress, 
        showArrow = true,
        showSwitch = false,
        switchValue = false,
        onSwitchChange = () => {},
    }) => (
        <TouchableOpacity 
            style={styles.settingItem}
            onPress={onPress}
            disabled={showSwitch}
        >
            <View style={styles.settingItemLeft}>
                <View style={styles.settingIcon}>
                    <Ionicons name={icon} size={24} color={COLORS.primary} />
                </View>
                <Text style={styles.settingLabel}>{label}</Text>
            </View>
            <View style={styles.settingItemRight}>
                {value && <Text style={styles.settingValue}>{value}</Text>}
                {showSwitch && (
                    <Switch
                        value={switchValue}
                        onValueChange={onSwitchChange}
                        trackColor={{ false: COLORS.lightGray, true: COLORS.primary }}
                        thumbColor={COLORS.white}
                    />
                )}
                {showArrow && <Ionicons name="chevron-forward" size={20} color={COLORS.gray} />}
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.title}>Profil</Text>
            </View>

            <ScrollView style={styles.content}>
                {/* Profile Section */}
                <View style={styles.profileSection}>
                    <View style={styles.profileHeader}>
                        <Image
                            source={{ uri: 'https://via.placeholder.com/100' }}
                            style={styles.profileImage}
                        />
                        <View style={styles.profileInfo}>
                            <Text style={styles.profileName}>Batuhan</Text>
                            <Text style={styles.profileEmail}>batuhan@example.com</Text>
                        </View>
                        <TouchableOpacity style={styles.editButton}>
                            <Ionicons name="pencil-outline" size={20} color={COLORS.primary} />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Settings Sections */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Hesap Ayarları</Text>
                    {renderSettingItem({
                        icon: 'person-outline',
                        label: 'Profil Bilgileri',
                        onPress: () => {},
                    })}
                    {renderSettingItem({
                        icon: 'wallet-outline',
                        label: 'Ödeme Yöntemleri',
                        onPress: () => {},
                    })}
                    {renderSettingItem({
                        icon: 'card-outline',
                        label: 'Banka Hesapları',
                        onPress: () => {},
                    })}
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Bildirimler</Text>
                    {renderSettingItem({
                        icon: 'notifications-outline',
                        label: 'Bildirimler',
                        showSwitch: true,
                        switchValue: notificationsEnabled,
                        onSwitchChange: setNotificationsEnabled,
                        showArrow: false,
                    })}
                    {renderSettingItem({
                        icon: 'mail-outline',
                        label: 'E-posta Bildirimleri',
                        onPress: () => {},
                    })}
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Görünüm</Text>
                    {renderSettingItem({
                        icon: 'moon-outline',
                        label: 'Karanlık Mod',
                        showSwitch: true,
                        switchValue: darkMode,
                        onSwitchChange: setDarkMode,
                        showArrow: false,
                    })}
                    {renderSettingItem({
                        icon: 'color-palette-outline',
                        label: 'Tema',
                        value: 'Varsayılan',
                        onPress: () => {},
                    })}
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Güvenlik</Text>
                    {renderSettingItem({
                        icon: 'lock-closed-outline',
                        label: 'Şifre Değiştir',
                        onPress: () => {},
                    })}
                    {renderSettingItem({
                        icon: 'finger-print-outline',
                        label: 'Biyometrik Kimlik',
                        showSwitch: true,
                        switchValue: biometricEnabled,
                        onSwitchChange: setBiometricEnabled,
                        showArrow: false,
                    })}
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Destek</Text>
                    {renderSettingItem({
                        icon: 'help-circle-outline',
                        label: 'Yardım Merkezi',
                        onPress: () => {},
                    })}
                    {renderSettingItem({
                        icon: 'document-text-outline',
                        label: 'Kullanım Koşulları',
                        onPress: () => {},
                    })}
                    {renderSettingItem({
                        icon: 'shield-checkmark-outline',
                        label: 'Gizlilik Politikası',
                        onPress: () => {},
                    })}
                </View>

                {/* Logout Button */}
                <TouchableOpacity style={styles.logoutButton}>
                    <Ionicons name="log-out-outline" size={24} color={COLORS.primary} />
                    <Text style={styles.logoutText}>Çıkış Yap</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: SIZES.padding,
        paddingTop: SIZES.padding,
        paddingBottom: SIZES.padding,
    },
    title: {
        fontSize: SIZES.extraLarge,
        fontFamily: FONTS.bold,
        color: COLORS.black,
    },
    content: {
        flex: 1,
    },
    profileSection: {
        paddingHorizontal: SIZES.padding,
        paddingBottom: SIZES.padding,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.lightGray,
    },
    profileHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
    },
    profileInfo: {
        flex: 1,
        marginLeft: SIZES.padding,
    },
    profileName: {
        fontSize: SIZES.large,
        fontFamily: FONTS.bold,
        color: COLORS.black,
    },
    profileEmail: {
        fontSize: SIZES.font,
        fontFamily: FONTS.regular,
        color: COLORS.gray,
        marginTop: 4,
    },
    editButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: COLORS.lightGray,
        justifyContent: 'center',
        alignItems: 'center',
    },
    section: {
        paddingHorizontal: SIZES.padding,
        paddingTop: SIZES.padding,
    },
    sectionTitle: {
        fontSize: SIZES.large,
        fontFamily: FONTS.semiBold,
        color: COLORS.black,
        marginBottom: SIZES.padding,
    },
    settingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: SIZES.padding,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.lightGray,
    },
    settingItemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    settingIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(46, 73, 251, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: SIZES.base,
    },
    settingLabel: {
        fontSize: SIZES.large,
        fontFamily: FONTS.medium,
        color: COLORS.black,
        marginLeft: SIZES.base,
    },
    settingItemRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    settingValue: {
        fontSize: SIZES.font,
        fontFamily: FONTS.regular,
        color: COLORS.gray,
        marginRight: SIZES.base,
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: SIZES.padding,
        marginVertical: SIZES.padding,
        marginHorizontal: SIZES.padding,
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.lightGray,
    },
    logoutText: {
        fontSize: SIZES.large,
        fontFamily: FONTS.medium,
        color: COLORS.primary,
        marginLeft: SIZES.base,
    },
}); 