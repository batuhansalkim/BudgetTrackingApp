import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function Profile() {
  const handleLogout = () => {
    // Çıkış işlemleri burada yapılacak
    router.replace('/(auth)/login');
  };

  const menuItems = [
    {
      icon: 'person-outline',
      title: 'Hesap Bilgileri',
      onPress: () => {},
    },
    {
      icon: 'location-outline',
      title: 'Adreslerim',
      onPress: () => {},
    },
    {
      icon: 'cart-outline',
      title: 'Siparişlerim',
      onPress: () => {},
    },
    {
      icon: 'heart-outline',
      title: 'Favorilerim',
      onPress: () => {},
    },
    {
      icon: 'card-outline',
      title: 'Ödeme Yöntemlerim',
      onPress: () => {},
    },
    {
      icon: 'settings-outline',
      title: 'Ayarlar',
      onPress: () => {},
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://via.placeholder.com/150' }}
          style={styles.avatar}
        />
        <Text style={styles.name}>Kullanıcı Adı</Text>
        <Text style={styles.email}>kullanici@email.com</Text>
      </View>

      <View style={styles.menuContainer}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            onPress={item.onPress}
          >
            <Ionicons name={item.icon} size={24} color="#666" />
            <Text style={styles.menuText}>{item.title}</Text>
            <Ionicons name="chevron-forward" size={24} color="#ccc" />
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={24} color="#FF3B30" />
        <Text style={styles.logoutText}>Çıkış Yap</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: 'white',
    padding: 20,
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: '#666',
  },
  menuContainer: {
    backgroundColor: 'white',
    marginTop: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    marginLeft: 15,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    marginTop: 20,
    padding: 15,
  },
  logoutText: {
    color: '#FF3B30',
    fontSize: 16,
    marginLeft: 15,
  },
}); 