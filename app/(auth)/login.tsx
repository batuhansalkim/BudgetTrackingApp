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
    Alert,
} from 'react-native';
import { COLORS, FONTS, SIZES } from '../../app/constants/theme';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Animated, { 
    FadeInDown, 
    FadeInUp,
} from 'react-native-reanimated';
import { useApp } from '../contexts/AppContext';

const { width, height } = Dimensions.get('window');

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [focusedInput, setFocusedInput] = useState<string | null>(null);

    const handleLogin = () => {
        if (!email || !password) {
            setError('Lütfen tüm alanları doldurun');
            return;
        }

        // Email formatı kontrolü
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError('Geçerli bir e-posta adresi giriniz');
            return;
        }

        // Şifre uzunluğu kontrolü
        if (password.length < 6) {
            setError('Şifre en az 6 karakter olmalıdır');
            return;
        }

        // Başarılı giriş durumunda ana sayfaya yönlendir
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
                    <Text style={styles.welcomeText}>Tekrar</Text>
                    <Text style={styles.title}>Hoş Geldiniz</Text>
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
                        <Text style={styles.subtitle}>Hesabınıza giriş yapın</Text>

                        <View style={styles.inputWrapper}>
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
                        </View>

                        <TouchableOpacity style={styles.forgotPassword}>
                            <Text style={styles.forgotPasswordText}>Şifremi Unuttum</Text>
                        </TouchableOpacity>

                        {error ? (
                            <Animated.Text 
                                entering={FadeInUp.duration(500)}
                                style={styles.error}
                            >
                                {error}
                            </Animated.Text>
                        ) : null}

                        <TouchableOpacity 
                            style={styles.loginButton} 
                            onPress={handleLogin}
                        >
                            <LinearGradient
                                colors={[COLORS.primary, COLORS.secondary]}
                                style={styles.buttonGradient}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                            >
                                <Text style={styles.buttonText}>Giriş Yap</Text>
                            </LinearGradient>
                        </TouchableOpacity>

                        <View style={styles.dividerContainer}>
                            <View style={styles.dividerLine} />
                            <Text style={styles.dividerText}>veya</Text>
                            <View style={styles.dividerLine} />
                        </View>

                        <TouchableOpacity 
                            style={styles.googleButton}
                            onPress={() => {
                                // Google sign-in logic will be implemented
                                console.log('Google sign-in pressed');
                            }}
                        >
                            <Ionicons 
                                name="logo-google" 
                                size={24} 
                                color="#4285F4"
                                style={styles.googleIcon}
                            />
                            <Text style={styles.googleButtonText}>Google ile devam et</Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            style={styles.registerButton}
                            onPress={() => router.push('/(auth)/register')}
                        >
                            <Text style={styles.registerText}>
                                Hesabınız yok mu? <Text style={styles.registerLink}>Kayıt Olun</Text>
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
        height: height * 0.3,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        paddingTop: Platform.OS === 'ios' ? 60 : 40,
        paddingHorizontal: SIZES.padding,
    },
    header: {
        marginTop: height * 0.05,
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
        paddingTop: SIZES.padding * 2,
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
    eyeIcon: {
        padding: SIZES.base,
    },
    forgotPassword: {
        alignSelf: 'flex-end',
        marginBottom: SIZES.padding,
    },
    forgotPasswordText: {
        color: COLORS.primary,
        fontFamily: FONTS.medium,
        fontSize: SIZES.font,
    },
    error: {
        color: '#FF3B30',
        fontFamily: FONTS.regular,
        marginBottom: SIZES.medium,
        textAlign: 'center',
    },
    loginButton: {
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
    registerButton: {
        marginTop: SIZES.padding,
        alignItems: 'center',
    },
    registerText: {
        fontFamily: FONTS.regular,
        fontSize: SIZES.medium,
        color: COLORS.gray,
    },
    registerLink: {
        fontFamily: FONTS.bold,
        color: COLORS.primary,
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: SIZES.padding,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: COLORS.lightGray,
    },
    dividerText: {
        marginHorizontal: SIZES.base,
        color: COLORS.gray,
        fontFamily: FONTS.regular,
    },
    googleButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginHorizontal: SIZES.padding,
        borderWidth: 1,
        borderColor: COLORS.lightGray,
        elevation: 1,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 1,
    },
    googleIcon: {
        marginRight: 12,
    },
    googleButtonText: {
        color: COLORS.black,
        fontFamily: FONTS.medium,
        fontSize: SIZES.medium,
    },
}); 