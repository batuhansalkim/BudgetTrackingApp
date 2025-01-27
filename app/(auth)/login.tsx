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

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = () => {
        if (!email || !password) {
            setError('Lütfen tüm alanları doldurun');
            return;
        }
        // TODO: Login işlemleri
        router.replace('/(tabs)/home');
    };

    return (
        <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <LinearGradient
                colors={[COLORS.primary, COLORS.secondary]}
                style={styles.gradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                <ScrollView 
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.content}>
                        <Animated.View 
                            entering={FadeInDown.duration(1000).springify()}
                            style={styles.header}
                        >
                            <Text style={styles.title}>Hoş Geldiniz</Text>
                            <Text style={styles.subtitle}>Hesabınıza giriş yapın</Text>
                        </Animated.View>

                        <Animated.View 
                            entering={FadeInUp.duration(1000).springify()}
                            style={styles.formContainer}
                        >
                            <View style={styles.inputContainer}>
                                <Ionicons name="mail-outline" size={24} color={COLORS.primary} style={styles.inputIcon} />
                                <TextInput
                                    style={styles.input}
                                    placeholder="E-posta"
                                    value={email}
                                    onChangeText={setEmail}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    placeholderTextColor={COLORS.gray}
                                />
                            </View>

                            <View style={styles.inputContainer}>
                                <Ionicons name="lock-closed-outline" size={24} color={COLORS.primary} style={styles.inputIcon} />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Şifre"
                                    value={password}
                                    onChangeText={setPassword}
                                    secureTextEntry={!showPassword}
                                    placeholderTextColor={COLORS.gray}
                                />
                                <TouchableOpacity 
                                    onPress={() => setShowPassword(!showPassword)}
                                    style={styles.eyeIcon}
                                >
                                    <Ionicons 
                                        name={showPassword ? "eye-outline" : "eye-off-outline"} 
                                        size={24} 
                                        color={COLORS.gray} 
                                    />
                                </TouchableOpacity>
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

                            <TouchableOpacity 
                                style={styles.registerButton}
                                onPress={() => router.push('/register')}
                            >
                                <Text style={styles.registerText}>
                                    Hesabınız yok mu? <Text style={styles.registerLink}>Kayıt Olun</Text>
                                </Text>
                            </TouchableOpacity>
                        </Animated.View>
                    </View>
                </ScrollView>
            </LinearGradient>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    gradient: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        padding: SIZES.extraLarge,
    },
    header: {
        alignItems: 'center',
        marginBottom: SIZES.extraLarge * 2,
    },
    title: {
        fontSize: SIZES.extraLarge * 2,
        fontFamily: FONTS.bold,
        color: COLORS.white,
        marginBottom: SIZES.base,
    },
    subtitle: {
        fontSize: SIZES.large,
        fontFamily: FONTS.regular,
        color: COLORS.white,
        opacity: 0.8,
    },
    formContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: SIZES.radius,
        padding: SIZES.extraLarge,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 8,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        borderRadius: SIZES.radius,
        marginBottom: SIZES.medium,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    inputIcon: {
        padding: SIZES.base,
        marginLeft: SIZES.base,
    },
    input: {
        flex: 1,
        paddingVertical: SIZES.medium,
        paddingHorizontal: SIZES.base,
        fontFamily: FONTS.regular,
        fontSize: SIZES.medium,
        color: COLORS.primary,
    },
    eyeIcon: {
        padding: SIZES.base,
        marginRight: SIZES.base,
    },
    forgotPassword: {
        alignSelf: 'flex-end',
        marginBottom: SIZES.large,
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
        borderRadius: SIZES.radius,
        marginTop: SIZES.medium,
    },
    buttonGradient: {
        paddingVertical: SIZES.medium,
        alignItems: 'center',
    },
    buttonText: {
        color: COLORS.white,
        fontFamily: FONTS.bold,
        fontSize: SIZES.large,
    },
    registerButton: {
        marginTop: SIZES.extraLarge,
        alignItems: 'center',
    },
    registerText: {
        fontFamily: FONTS.regular,
        fontSize: SIZES.medium,
        color: COLORS.primary,
    },
    registerLink: {
        fontFamily: FONTS.bold,
        color: COLORS.secondary,
    },
}); 