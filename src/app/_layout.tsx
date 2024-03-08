import { View, Text } from 'react-native'
import React, { Children } from 'react'
import { Stack } from 'expo-router'
import CartProvider from '../providers/cartProvider'
import AuthProvider from '../providers/AuthProvider'


const _layout = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <Stack>
          <Stack.Screen name='(admin)' options={{ headerShown: false }} />
          <Stack.Screen name='(user)' options={{ headerShown: false }} />
          <Stack.Screen name='(auth)' options={{ headerShown: false }} />
          <Stack.Screen name='cart' options={{ presentation: 'modal' }} />
        </Stack>
      </CartProvider>
    </AuthProvider>
  )
}

export default _layout