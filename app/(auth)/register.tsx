import React, { useState } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity, 
    TextInput,
    Dimensions,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StatusBar,
    Image,
} from 'react-native';
import { COLORS, FONTS, SIZES } from '../../app/constants/theme';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Animated, { 
    FadeInDown, 
    FadeInUp,
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

export default function RegisterScreen() {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleRegister = () => {
        if (!fullName || !email || !password || !confirmPassword) {
            setError('Lütfen tüm alanları doldurun');
            return;
        }
        if (password !== confirmPassword) {
            setError('Şifreler eşleşmiyor');
            return;
        }
        // TODO: Register işlemleri
        router.replace('/(tabs)/home');
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            <LinearGradient
                colors={[COLORS.primary, COLORS.secondary]}
                style={styles.topGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                <Animated.View 
                    entering={FadeInDown.duration(1000).springify()}
                    style={styles.header}
                >
                    <Text style={styles.welcomeText}>Merhaba</Text>
                    <Text style={styles.title}>Kayıt Ol</Text>
                </Animated.View>
            </LinearGradient>

            <KeyboardAvoidingView 
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardView}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
            >
                <ScrollView 
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContent}
                    keyboardShouldPersistTaps="handled"
                >
                    <Animated.View 
                        entering={FadeInUp.duration(1000).springify()}
                        style={styles.formContainer}
                    >
                        <Text style={styles.subtitle}>Hesabınızı oluşturun</Text>

                        <View style={styles.inputWrapper}>
                            <View style={styles.inputContainer}>
                                <Ionicons 
                                    name="person-outline" 
                                    size={22} 
                                    color={COLORS.gray} 
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Ad Soyad"
                                    value={fullName}
                                    onChangeText={text => setFullName(text)}
                                    autoCapitalize="words"
                                />
                            </View>

                            <View style={styles.inputContainer}>
                                <Ionicons 
                                    name="mail-outline" 
                                    size={22} 
                                    color={COLORS.gray} 
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="E-posta"
                                    value={email}
                                    onChangeText={text => setEmail(text)}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                />
                            </View>

                            <View style={styles.inputContainer}>
                                <Ionicons 
                                    name="lock-closed-outline" 
                                    size={22} 
                                    color={COLORS.gray} 
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Şifre"
                                    value={password}
                                    onChangeText={text => setPassword(text)}
                                    secureTextEntry={!showPassword}
                                />
                                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                                    <Ionicons 
                                        name={showPassword ? "eye-outline" : "eye-off-outline"} 
                                        size={22} 
                                        color={COLORS.gray} 
                                    />
                                </TouchableOpacity>
                            </View>

                            <View style={styles.inputContainer}>
                                <Ionicons 
                                    name="lock-closed-outline" 
                                    size={22} 
                                    color={COLORS.gray} 
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Şifre Tekrar"
                                    value={confirmPassword}
                                    onChangeText={text => setConfirmPassword(text)}
                                    secureTextEntry={!showConfirmPassword}
                                />
                                <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                                    <Ionicons 
                                        name={showConfirmPassword ? "eye-outline" : "eye-off-outline"} 
                                        size={22} 
                                        color={COLORS.gray} 
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>

                        {error ? (
                            <Animated.Text 
                                entering={FadeInUp.duration(500)}
                                style={styles.error}
                            >
                                {error}
                            </Animated.Text>
                        ) : null}

                        <TouchableOpacity 
                            style={styles.registerButton} 
                            onPress={handleRegister}
                        >
                            <LinearGradient
                                colors={[COLORS.primary, COLORS.secondary]}
                                style={styles.buttonGradient}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                            >
                                <Text style={styles.buttonText}>Kayıt Ol</Text>
                            </LinearGradient>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            style={styles.loginButton}
                            onPress={() => router.back()}
                        >
                            <Text style={styles.loginText}>
                                Zaten hesabınız var mı? <Text style={styles.loginLink}>Giriş Yap</Text>
                            </Text>
                        </TouchableOpacity>
                    </Animated.View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    topGradient: {
        height: height * 0.25,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        paddingTop: Platform.OS === 'ios' ? 45 : 25,
        paddingHorizontal: SIZES.padding,
    },
    header: {
        marginTop: height * 0.03,
    },
    welcomeText: {
        fontSize: SIZES.large,
        color: 'rgba(255,255,255,0.8)',
        fontFamily: FONTS.medium,
    },
    title: {
        fontSize: SIZES.extraLarge * 2,
        fontFamily: FONTS.bold,
        color: COLORS.white,
        marginTop: SIZES.base,
    },
    keyboardView: {
        flex: 1,
        backgroundColor: COLORS.white,
        marginTop: -30,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    formContainer: {
        flex: 1,
        paddingHorizontal: SIZES.padding,
    },
    scrollContent: {
        flexGrow: 1,
        paddingTop: SIZES.padding * 1.5,
        paddingBottom: SIZES.padding * 2,
    },
    subtitle: {
        fontSize: SIZES.large,
        fontFamily: FONTS.medium,
        color: COLORS.gray,
        marginBottom: SIZES.padding * 1.5,
    },
    inputWrapper: {
        gap: SIZES.medium,
        marginBottom: SIZES.padding,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        paddingHorizontal: 15,
        marginBottom: 15,
        height: 55,
    },
    input: {
        flex: 1,
        marginLeft: 10,
        fontSize: 16,
        color: '#333',
    },
    error: {
        color: '#FF3B30',
        fontFamily: FONTS.regular,
        marginBottom: SIZES.medium,
        textAlign: 'center',
    },
    registerButton: {
        overflow: 'hidden',
        borderRadius: 12,
        marginTop: SIZES.medium,
    },
    buttonGradient: {
        paddingVertical: 16,
        alignItems: 'center',
    },
    buttonText: {
        color: COLORS.white,
        fontFamily: FONTS.bold,
        fontSize: SIZES.large,
    },
    loginButton: {
        marginTop: SIZES.padding,
        alignItems: 'center',
        marginBottom: SIZES.padding,
    },
    loginText: {
        fontFamily: FONTS.regular,
        fontSize: SIZES.medium,
        color: COLORS.gray,
    },
    loginLink: {
        fontFamily: FONTS.bold,
        color: COLORS.primary,
    },
}); 