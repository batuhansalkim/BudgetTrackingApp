import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    TextInput,
    Platform,
} from 'react-native';
import { router } from 'expo-router';
import { COLORS, FONTS, SIZES, SHADOWS } from '../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../contexts/AppContext';

export default function SetupScreen() {
    const { currency } = useApp();
    const [monthlyIncome, setMonthlyIncome] = useState('');
    const [savingsGoal, setSavingsGoal] = useState('');

    const handleContinue = () => {
        // Burada gelir ve tasarruf hedefi bilgilerini kaydedeceğiz
        router.push('/home');
    };

    const getCurrencySymbol = () => {
        switch (currency) {
            case 'TRY': return '₺';
            case 'USD': return '$';
            case 'EUR': return '€';
            case 'GBP': return '£';
            default: return currency;
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Finansal Bilgiler</Text>
            <Text style={styles.subtitle}>Financial Information</Text>

            <ScrollView style={styles.scrollView}>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Aylık Geliriniz</Text>
                    <Text style={styles.sectionSubtitle}>Monthly Income</Text>
                    <View style={styles.inputContainer}>
                        <Text style={styles.currencySymbol}>{getCurrencySymbol()}</Text>
                        <TextInput
                            style={styles.input}
                            value={monthlyIncome}
                            onChangeText={setMonthlyIncome}
                            placeholder="0.00"
                            keyboardType="numeric"
                            placeholderTextColor={COLORS.gray}
                        />
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Aylık Tasarruf Hedefiniz</Text>
                    <Text style={styles.sectionSubtitle}>Monthly Savings Goal</Text>
                    <View style={styles.inputContainer}>
                        <Text style={styles.currencySymbol}>{getCurrencySymbol()}</Text>
                        <TextInput
                            style={styles.input}
                            value={savingsGoal}
                            onChangeText={setSavingsGoal}
                            placeholder="0.00"
                            keyboardType="numeric"
                            placeholderTextColor={COLORS.gray}
                        />
                    </View>
                </View>

                <View style={styles.infoContainer}>
                    <Ionicons name="information-circle-outline" size={24} color={COLORS.primary} />
                    <Text style={styles.infoText}>
                        Bu bilgiler size özel bütçe önerileri oluşturmak için kullanılacaktır.
                        {'\n'}
                        This information will be used to create personalized budget recommendations.
                    </Text>
                </View>
            </ScrollView>

            <TouchableOpacity 
                style={[
                    styles.button,
                    (!monthlyIncome || !savingsGoal) && styles.buttonDisabled
                ]}
                onPress={handleContinue}
                disabled={!monthlyIncome || !savingsGoal}
            >
                <Text style={styles.buttonText}>Devam Et / Continue</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        paddingTop: Platform.OS === 'ios' ? 60 : 40,
    },
    title: {
        fontSize: SIZES.extraLarge,
        fontFamily: FONTS.bold,
        color: COLORS.primary,
        textAlign: 'center',
        marginBottom: 5,
    },
    subtitle: {
        fontSize: SIZES.large,
        fontFamily: FONTS.regular,
        color: COLORS.gray,
        textAlign: 'center',
        marginBottom: 30,
    },
    scrollView: {
        flex: 1,
        paddingHorizontal: SIZES.padding,
    },
    section: {
        marginBottom: 30,
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
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.lightGray,
        borderRadius: SIZES.radius,
        paddingHorizontal: SIZES.padding,
        height: 60,
    },
    currencySymbol: {
        fontSize: SIZES.large,
        fontFamily: FONTS.bold,
        color: COLORS.primary,
        marginRight: 10,
    },
    input: {
        flex: 1,
        fontSize: SIZES.large,
        fontFamily: FONTS.medium,
        color: COLORS.primary,
        height: '100%',
    },
    infoContainer: {
        flexDirection: 'row',
        backgroundColor: COLORS.lightGray,
        borderRadius: SIZES.radius,
        padding: SIZES.padding,
        marginTop: 20,
    },
    infoText: {
        flex: 1,
        marginLeft: 10,
        fontSize: SIZES.font,
        fontFamily: FONTS.regular,
        color: COLORS.gray,
        lineHeight: 20,
    },
    button: {
        backgroundColor: COLORS.primary,
        padding: SIZES.padding,
        margin: SIZES.padding,
        borderRadius: SIZES.radius,
        alignItems: 'center',
    },
    buttonDisabled: {
        backgroundColor: COLORS.gray,
    },
    buttonText: {
        color: COLORS.white,
        fontSize: SIZES.large,
        fontFamily: FONTS.medium,
    },
}); 