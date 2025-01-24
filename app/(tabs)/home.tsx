import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

// Örnek ürün verisi
const products = [
  {
    id: '1',
    name: 'Ürün 1',
    price: '199.99 TL',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: '2',
    name: 'Ürün 2',
    price: '299.99 TL',
    image: 'https://via.placeholder.com/150',
  },
  // Daha fazla ürün eklenebilir
];

export default function Home() {
  const renderProduct = ({ item }) => (
    <Link href={`/product/${item.id}`} asChild>
      <TouchableOpacity style={styles.productCard}>
        <Image
          source={{ uri: item.image }}
          style={styles.productImage}
        />
        <View style={styles.productInfo}>
          <Text style={styles.productName}>{item.name}</Text>
          <Text style={styles.productPrice}>{item.price}</Text>
        </View>
      </TouchableOpacity>
    </Link>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Popüler Ürünler</Text>
      </View>

      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.productGrid}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 15,
    backgroundColor: 'white',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  productGrid: {
    padding: 10,
  },
  productCard: {
    flex: 1,
    margin: 5,
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
  },
  productImage: {
    width: '100%',
    height: 150,
  },
  productInfo: {
    padding: 10,
  },
  productName: {
    fontSize: 16,
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: 'bold',
  },
}); 