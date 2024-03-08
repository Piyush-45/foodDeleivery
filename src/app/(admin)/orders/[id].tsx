import { View, Text, FlatList, Pressable } from 'react-native'
import React from 'react'
import { Stack, useLocalSearchParams } from 'expo-router'
import orders from '@/assets/data/order'
import OrderListItem from '../../components/OrderListItem'
import OrderItemListItem from '../../components/OrderItemListItem'
import { OrderStatusList } from '@/src/types'

const OrderDetailsScreen = () => {
    const { id } = useLocalSearchParams()
    const order = orders.find((o)=> o.id.toString()=== id)
    if(!order){
       return  <Text>Not found</Text>
    }
    return (
        <View style={{padding:20}}>
            <Stack.Screen options={{ title: `Order # ${id}` }} />
            <OrderListItem order={order}/>
            <FlatList data={order.order_items} renderItem={({item})=><OrderItemListItem item={item}/>} contentContainerStyle={{gap:10}}
            
            ListFooterComponent={<>
                <Text style={{ fontWeight: 'bold' }}>Status</Text>
                <View style={{ flexDirection: 'row', gap: 5 }}>
                  {OrderStatusList.map((status) => (
                    <Pressable
                      key={status}
                      onPress={() => console.warn('Update status')}
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
              }/>

            
        </View>
    )
}

export default OrderDetailsScreen