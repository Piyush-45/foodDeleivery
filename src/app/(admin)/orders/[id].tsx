import { View, Text, FlatList, Pressable, ActivityIndicator } from 'react-native'
import React from 'react'
import { Stack, useLocalSearchParams } from 'expo-router'
import orders from '@/assets/data/order'
import OrderListItem from '../../components/OrderListItem'
import OrderItemListItem from '../../components/OrderItemListItem'
import { OrderStatusList } from '@/src/types'
import { useOrderDetails } from '@/src/api/orders'
import { useUpdateOrder } from '../../../api/orders/index'


const OrderDetailsScreen = () => {
  const { id: idString } = useLocalSearchParams()

  const id = parseFloat(typeof idString === 'string' ? idString : idString[0])

  const { data: order, isLoading, error } = useOrderDetails(id)
  const {mutate:updateOrder } = useUpdateOrder()


  const updateStatus = (status)=>{
    updateOrder({id: id, updatedFields:{status}})
  }

  if (isLoading) {
    return <ActivityIndicator />
  }

  if (error || !order) {
    return <Text>failed to fetch</Text>
  }

  console.log(order)
  // const order = orders.find((o)=> o.id.toString()=== id)
  if (!order) {
    return <Text>Not found</Text>
  }
  return (
    <View style={{ padding: 20 }}>
      <Stack.Screen options={{ title: `Order # ${id}` }} />
      <OrderListItem order={order} />
      <FlatList data={order.order_items} renderItem={({ item }) => <OrderItemListItem item={item} />} contentContainerStyle={{ gap: 10 }}

        ListFooterComponent={<>
          <Text style={{ fontWeight: 'bold' }}>Status</Text>
          <View style={{ flexDirection: 'row', gap: 5 }}>
            {OrderStatusList.map((status) => (
              <Pressable
                key={status}
                onPress={() =>updateStatus(status)}
                style={{
                  borderColor: 'skyblue',
                  borderWidth: 1,
                  padding: 10,
                  borderRadius: 5,
                  marginVertical: 10,
                  backgroundColor:
                    order.status === status
                      ? 'skyblue'
                      : 'transparent',
                }}
              >
                <Text
                  style={{
                    color:
                      order.status === status ? 'white' : 'skyblue',
                  }}
                >
                  {status}
                </Text>
              </Pressable>
            ))}
          </View>
        </>
        } />


    </View>
  )
}

export default OrderDetailsScreen