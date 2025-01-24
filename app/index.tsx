import { Redirect } from 'expo-router';

export default function Index() {
  // Kullanıcıyı (auth) grubundaki login sayfasına yönlendir
  return <Redirect href="/(auth)/loginn" />;
} 