import { ActivityIndicator, FlatList, Text } from 'react-native';

import OrderListItem from '../../../components/OrderListItem';
import { Stack } from 'expo-router';
import { useAdminOrderList } from '@/src/api/orders';
import { useEffect } from 'react';
import { supabase } from '@/src/lib/supabase';
import { useQueryClient } from '@tanstack/react-query';
import { useInsertOrderSubscription } from '@/src/api/orders/subscription';


export default function OrdersScreen() {

  const { data: orders, error, isLoading } = useAdminOrderList({ archived: false })

  useInsertOrderSubscription()

  if (isLoading) {
    return <ActivityIndicator />
  }

  if (error) {
    return <Text>failed to fetch</Text>
  }
  return (
    <>
      <Stack.Screen options={{ title: 'Orders' }} />
      <FlatList
        data={orders}
        contentContainerStyle={{ gap: 10, padding: 10 }}
        renderItem={({ item }) => <OrderListItem order={item} />}
      />
    </>
  );
}