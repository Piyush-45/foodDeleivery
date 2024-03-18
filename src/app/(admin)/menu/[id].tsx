import { View, Text, Image, StyleSheet, Pressable, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import { Link, Stack, useLocalSearchParams } from 'expo-router';
import products from '@/assets/data/products';
import Button from '../../components/Button';
import { useCartContext } from '@/src/providers/cartProvider';
import { useRouter } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { useProduct } from '@/src/api/products';
import RemoteImage from '../../components/RemoteImage';
const sizes = ['S', 'M', 'L', 'XL'];

const ProductDetailScreen = () => {
  const [sizeSelected, setSizeSelected] = useState('M')

  // ! $ using tanstack to fetch product based on id
  const { id: idString } = useLocalSearchParams();
  const id = parseFloat(typeof idString === 'string' ? idString : idString[0])
  const { data: product, error, isLoading } = useProduct(id)

  if (isLoading) {
    return <ActivityIndicator />
  }
  if (error) {
    return <Text>Failed to fetch products</Text>
  }

  return (
    <View style={styles.container}>

      <Stack.Screen options={{
        title: 'create a product', headerRight: () => (
          <Link href={`/(admin)/menu/create?id=${id}`} asChild>
            <Pressable>
              <FontAwesome name="pencil" size={25} style={{ marginRight: 15, }} />
            </Pressable>
          </Link>
        )
      }} />
      <RemoteImage path={product.image}  style={styles.image} />
      {/* Sizes */}
      <Text style={styles.price}>{product.name}</Text>
      <Text style={styles.price}>${product.price}</Text>

      {/* <Button onPress={addToCart} text='Add To Cart' /> */}
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
    // marginTop: 'auto'
  },
  sizesContainer: {
    flexDirection: 'row', // Display sizes horizontally
    marginBottom: 10, // Add margin bottom for spacing
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

export default ProductDetailScreen;
