import { View, Text, FlatList, ActivityIndicator } from 'react-native'
import React from 'react'
import { Stack, useLocalSearchParams } from 'expo-router'
import orders from '@/assets/data/order'
import OrderListItem from '../../components/OrderListItem'
import OrderItemListItem from '../../components/OrderItemListItem'
import { useOrderDetails } from '@/src/api/orders'
import { useUpdateOrderSubscription } from '@/src/api/orders/subscription'

const OrderDetailsScreen = () => {
  const { id: idString } = useLocalSearchParams()
  const id = parseFloat(typeof idString === 'string' ? idString : idString[0])


  const { data: order, isLoading, error } = useOrderDetails(id)

  useUpdateOrderSubscription(id)

  if (isLoading) {
    return <ActivityIndicator />
  }

  if (error) {
    return <Text>failed to fetch</Text>
  }
  // const order = orders.find((o)=> o.id.toString()=== id)
  if (!order) {
    return <Text>Not found</Text>
  }


  if (!order) {
    return <Text>Not found</Text>
  }
  return (
    <View>
      <Stack.Screen options={{ title: `Order # ${id}` }} />
      <OrderListItem order={order} />
      <FlatList data={order.order_items} renderItem={({ item }) => <OrderItemListItem item={item} />} contentContainerStyle={{ gap: 10 }} />
    </View>
  )
}

export default OrderDetailsScreen