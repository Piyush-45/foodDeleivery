import React from 'react';
import { View, FlatList, StyleSheet, Text, TouchableOpacity, Button } from 'react-native';
import { useCartContext } from '../providers/cartProvider';
import CartListItems from './components/CartListItems'; // Import CartListItems component
import { supabase } from '../lib/supabase';
// import Button from './components/Button';


const CartScreen = () => {

  const { cartItems, total, checkout } = useCartContext();


  return (
    <View style={styles.container}>
      <FlatList
        data={cartItems}
        renderItem={({ item }) => (
          <CartListItems
            item={item}

          />
        )}
      // keyExtractor={(item) => item.product_id}
      />
      <Text style={{ fontSize: 20, fontWeight: 'bold', fontStyle: 'italic', color: 'blue' }}>Total :${total}</Text>
      {/* <TouchableOpacity onPress={checkOut}>
        <Text style={styles.checkoutBtn} >Checkout</Text>
      </TouchableOpacity> */}
      <Button title='checkout ' onPress={checkout}/>


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  checkoutBtn: {
    fontSize: 22,
    textAlign: 'center',
    borderWidth: 2,
    backgroundColor: 'black',
    color: 'white',
    width: '100%',
    paddingVertical: 8,
    borderRadius: 19
  }
});

export default CartScreen;
