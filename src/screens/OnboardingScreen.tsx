import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useSettings } from '../context/SettingsContext';

export const OnboardingScreen = ({ navigation }) => {
  const { setLanguage, setCurrency } = useSettings();

  const handleLanguageSelect = async (language: 'tr' | 'en') => {
    await setLanguage(language);
  };

  const handleCurrencySelect = async (currency: 'TRY' | 'USD' | 'EUR' | 'GBP') => {
    await setCurrency(currency);
  };

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.title}>Dil Seçin / Select Language</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleLanguageSelect('tr')}>
          <Text>Türkçe</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleLanguageSelect('en')}>
          <Text>English</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>Para Birimi / Currency</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleCurrencySelect('TRY')}>
          <Text>Turkish Lira (₺)</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleCurrencySelect('USD')}>
          <Text>US Dollar ($)</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleCurrencySelect('EUR')}>
          <Text>Euro (€)</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleCurrencySelect('GBP')}>
          <Text>British Pound (£)</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  section: {
    marginBottom: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  button: {
    padding: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
  },
}); 