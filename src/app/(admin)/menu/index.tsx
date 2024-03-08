import { View, Text, StyleSheet, FlatList, StatusBar } from 'react-native'
import React from 'react'
import products from '@/assets/data/products'
import ProductListItem from '../../components/ProductListItem'
import Button from '../../components/Button'
import { supabase } from '@/src/lib/supabase'


const MenuScreen = () => {
  return (
    // !In React Native's FlatList component, the columnWrapperStyle prop applies to columns, while the contentContainerStyle prop applies to rows.
 <>
  {/* <ExpoStatusBar/> */}
      <FlatList data={products} renderItem={({item})=><ProductListItem product={item}/>} numColumns={2} contentContainerStyle={{gap:10,padding:10,}} columnWrapperStyle={{gap:10}}  />
      
     
      <StatusBar backgroundColor={'black'}/>
 </>

  )
}

export default MenuScreen

const styles = StyleSheet.create({
  white: {
    color: 'white'
  }
})