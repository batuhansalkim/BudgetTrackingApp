import { View, StyleSheet } from 'react-native';
import { useState } from 'react';
import { Link, router } from 'expo-router';
import { Button, Input, Card } from '../../components';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = () => {
    // Basit validasyon
    if (!name || !email || !password || !confirmPassword) {
      setError('Lütfen tüm alanları doldurun');
      return;
    }
    if (password !== confirmPassword) {
      setError('Şifreler eşleşmiyor');
      return;
    }
    // Kayıt başarılı olduğunda ana sayfaya yönlendir
    router.replace('/(tabs)/home');
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Input
          label="Ad Soyad"
          value={name}
          onChangeText={setName}
          placeholder="Adınızı ve soyadınızı girin"
          error={error}
        />

        <Input
          label="E-posta"
          value={email}
          onChangeText={setEmail}
          placeholder="E-posta adresinizi girin"
          error={error}
        />
        
        <Input
          label="Şifre"
          value={password}
          onChangeText={setPassword}
          placeholder="Şifrenizi girin"
          secureTextEntry
          error={error}
        />

        <Input
          label="Şifre Tekrar"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="Şifrenizi tekrar girin"
          secureTextEntry
          error={error}
        />

        <Button 
          title="Kayıt Ol" 
          onPress={handleRegister}
          style={styles.button}
        />

        <Link href="/(auth)/login" asChild>
          <Button 
            title="Zaten hesabınız var mı? Giriş yapın" 
            variant="outline"
            style={styles.loginButton}
            onPress={() => {}}
          />
        </Link>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
  },
  card: {
    marginHorizontal: 20,
  },
  button: {
    marginTop: 16,
  },
  loginButton: {
    marginTop: 8,
  },
}); 