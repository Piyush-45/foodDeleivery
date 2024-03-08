import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { Stack, useLocalSearchParams } from 'expo-router'
import orders from '@/assets/data/order'
import OrderListItem from '../../components/OrderListItem'
import OrderItemListItem from '../../components/OrderItemListItem'

const OrderDetailsScreen = () => {
    const { id } = useLocalSearchParams()
    const order = orders.find((o)=> o.id.toString()=== id)
    if(!order){
       return  <Text>Not found</Text>
    }
    return (
        <View>
            <Stack.Screen options={{ title: `Order # ${id}` }} />
            <OrderListItem order={order}/>
            <FlatList data={order.order_items} renderItem={({item})=><OrderItemListItem item={item}/>} contentContainerStyle={{gap:10}}/>
        </View>
    )
}

export default OrderDetailsScreen