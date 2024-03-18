import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { Link, Stack } from 'expo-router'
import { FontAwesome } from '@expo/vector-icons'

const _layout = () => {
    return (
        <Stack screenOptions={{ headerRight:()=>(
            <Link href="/cart" asChild>
              <Pressable>
              <FontAwesome name="shopping-cart" size={25} style={{marginRight:15, }}/>
              </Pressable>
            </Link>
    )}}> 

            <Stack.Screen  name='index' options={{title:'Menu'}}/>

        </Stack>

    )
}

export default _layout