import { View, Text, Image, StyleSheet, Pressable, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import { Stack, useLocalSearchParams } from 'expo-router';
import products from '@/assets/data/products';
import Button from '../../components/Button';
import { useCartContext } from '@/src/providers/cartProvider';
import { useRouter } from 'expo-router';
import { useProduct } from '@/src/api/products';
import RemoteImage from '../../components/RemoteImage';
const sizes = ['S', 'M', 'L', 'XL'];

const ProductDetailScreen = () => {
  const router = useRouter()
  const { addItem } = useCartContext()
  
  const [sizeSelected, setSizeSelected] = useState('M')

  const { id: idString } = useLocalSearchParams();
  const id = parseFloat(typeof idString === 'string' ? idString : idString[0])

  const { data: product, error, isLoading } = useProduct(id)

  if (isLoading) {
    return <ActivityIndicator />
  }
  if (error) {
    return <Text>Failed to fetch products</Text>
  }



  const addToCart = () => {
    if (!product) {
      return
    }
    addItem(product, sizeSelected)
    router.push('/cart')
  };



  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: product.name }} />
      <RemoteImage path={product.image} style={styles.image} />

      {/* Sizes */}
      <Text style={{ fontSize: 18, color: '#333', marginBottom: 4 }}>Select Size</Text>
      <View style={styles.sizesContainer}>
        {sizes.map((size) => (
          <Pressable key={size} onPress={() => setSizeSelected(size)}>
            <View style={[styles.sizes, { backgroundColor: sizeSelected === size ? 'gainsboro' : 'white' }]}><Text key={size} style={styles.size} >{size}</Text></View>
          </Pressable>
        ))}
      </View>

      <Text style={styles.price}>${product.price}</Text>

      <Button onPress={addToCart} text='Add To Cart' />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
    marginBottom: 12,
    borderRadius: 8,
    resizeMode: 'contain',
  },
  sizes: {

    width: 50,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center', borderRadius: 25
  },
  size: {
    fontSize: 20,
    fontWeight: '500',
    // Add spacing between sizes


  },
  price: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
    marginTop: 'auto'
  },
  sizesContainer: {
    flexDirection: 'row', // Display sizes horizontally
    marginBottom: 10, // Add margin bottom for spacing
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

export default ProductDetailScreen;
