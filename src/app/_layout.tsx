import { View, Text } from 'react-native'
import React, { Children } from 'react'
import { Stack } from 'expo-router'
import CartProvider from '../providers/cartProvider'


const _layout = () => {
  return (
    <CartProvider>
      <Stack>
        <Stack.Screen name='(admin)' options={{ headerShown: false }} />
        <Stack.Screen name='(user)' options={{ headerShown: false }} />
        <Stack.Screen name='cart' options={{ presentation: 'modal' }} />
      </Stack>
    </CartProvider>
  )
}

export default _layout