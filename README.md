# Akıllı Bütçe Takip ve Harcama Analizi Uygulaması

## Proje Kurulumu ve İlerleme

### 1. Temel Yapı Oluşturma (✓)
- Proje temizlendi ve basit yapıya indirgendi
- Temel klasör yapısı oluşturuldu:
  - app/(auth): Kimlik doğrulama ekranları
  - app/components: Yeniden kullanılabilir bileşenler
  - app/constants: Sabit değerler
  - app/hooks: Custom React hooks
  - app/navigation: Navigasyon yapılandırması
  - app/screens: Uygulama ekranları
  - app/utils: Yardımcı fonksiyonlar
  - app/assets: Medya dosyaları

### 2. Paket Kurulumları ve Açıklamaları (✓)

#### Navigasyon Paketleri
- **@react-navigation/native**: React Native'de sayfa geçişleri için temel navigasyon paketi
- **@react-navigation/stack**: Tam ekran sayfa geçişleri için (Splash, Login, Register ekranları)
- **@react-navigation/bottom-tabs**: Alt tab menüsü için (Ana sayfa, İşlemler, Analiz, Hedefler, Profil)

#### UI ve Animasyon Paketleri
- **react-native-reanimated**: Gelişmiş animasyonlar için (Onboarding animasyonları, geçiş efektleri)
- **react-native-gesture-handler**: Dokunma ve hareket işlemleri için (Kaydırma, sürükleme)

#### Güvenlik ve Layout Paketleri
- **react-native-safe-area-context**: Güvenli alan yönetimi (Çentik, home bar gibi alanları yönetmek için)
- **react-native-screens**: Ekran yönetimi optimizasyonu

#### Veri Saklama
- **@react-native-async-storage/async-storage**: Yerel depolama için (Kullanıcı tercihleri, token saklama)

### 3. Font Implementasyonu (✓)
- Inter font ailesi eklendi
- Font dosyaları assets/fonts klasörüne yerleştirildi
- useFonts hook'u oluşturuldu
- expo-font paketi kuruldu

### 4. Splash Screen Implementasyonu (✓)
- Animasyonlu logo ve başlık tasarımı
- Font yükleme entegrasyonu
- 2.5 saniyelik bekleme süresi
- Gradient arka plan
- Yumuşak geçiş animasyonları (scale, opacity, translateY)
- Gölge efektleri
- Onboarding yönlendirmesi

### 5. Onboarding Ekranları (✓)
- 3 adet tanıtım ekranı
- Kaydırmalı sayfa yapısı
- İnteraktif sayfa göstergeleri
- Animasyonlu geçişler ve ölçeklendirme efektleri
- Her sayfa için özel:
  - Gradient arka planlar
  - SVG desenler (daireler, noktalar, dalgalar)
  - İçerik animasyonları
- Modern tasarımlı ilerleme butonu
- Login sayfasına yönlendirme

### 6. Login Sayfası (✓)
- Form tasarımı ve validasyonu
- E-posta ve şifre alanları
- Hata mesajları
- Kayıt sayfasına yönlendirme
- Ana sayfaya yönlendirme (TODO)

## Sonraki Adımlar
- [ ] Register (Kayıt) sayfası oluşturma
- [ ] Tab navigasyonu kurulumu
- [ ] Ana sayfa tasarımı

## Teknoloji Yığını
- React Native
- Expo
- TypeScript

# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
