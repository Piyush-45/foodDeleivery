import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { Link, Stack } from 'expo-router'
import { FontAwesome } from '@expo/vector-icons'

const _layout = () => {
    return (
        <Stack >

            <Stack.Screen name='index' options={{
                title: 'Menu', headerRight: () => (
                    <Link href="/(admin)/menu/create" asChild>
                        <Pressable>
                            <FontAwesome name="plus-square-o" size={25} style={{ marginRight: 15, }} />
                        </Pressable>
                    </Link>
                )
            }} />
             
            {/* <Stack.Screen  name='[id]' options={{headerShown:false}}/> */}
        </Stack>


    )
}

export default _layout