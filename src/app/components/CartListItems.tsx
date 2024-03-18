import { useCartContext } from '@/src/providers/cartProvider';
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Button from './Button';
import { supabase } from '@/src/lib/supabase';
import RemoteImage from './RemoteImage';
import products from '@/assets/data/products';

const CartListItems = ({ item}) => {

  const {updateQuantity} = useCartContext()

  return (
    <View style={styles.cartItem}>
      <RemoteImage  path={item.product.image} fallback='' style={styles.image} />
      <View style={styles.itemInfo}>
        <Text style={styles.productName}>{item.product.name}</Text>
        <Text>Size: {item.size}</Text>
        <Text>Quantity: {item.quantity}</Text>
        <Text style={{ color: 'blue' }}>${item.product.price}</Text>
      </View>
      <View style={styles.quantityButtons}>
        <TouchableOpacity onPress={()=>updateQuantity(item.id, -1)}>
          <Text style={styles.quantityButton}>-</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>updateQuantity(item.id,1)}>
          <Text style={styles.quantityButton}>+</Text>
        </TouchableOpacity>
      </View>
      

    </View>
  );
};

const styles = StyleSheet.create({
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginRight: 10,
  },
  itemInfo: {
    flex: 1,
  },
  quantityButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  quantityButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#ccc',
    borderRadius: 5,
    marginRight: 10,
  },
});

export default CartListItems;
