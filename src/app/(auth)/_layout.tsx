import { View, Text } from 'react-native'
import React, { Children, useContext } from 'react'
import { Redirect, Stack } from 'expo-router'
import { AuthContext } from '@/src/providers/AuthProvider'
// import CartProvider from '../providers/cartProvider'


const _layout = () => {
  const{session} = useContext(AuthContext)

  if(session){
    return <Redirect href={'/'}/>
  }
  return (
   <Stack/>
  )
}

export default _layout