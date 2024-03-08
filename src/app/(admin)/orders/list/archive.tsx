import { FlatList, Text } from 'react-native';
import orders from '@/assets/data/order';
import OrderListItem from '../../../components/OrderListItem';
import { Stack } from 'expo-router';


export default function ArchiveOrdersScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Orders' }} />
      <Text style={{fontSize:26}}>archive</Text>
      <FlatList
        data={orders}
        contentContainerStyle={{ gap: 10, padding: 10 }}
        renderItem={({ item }) => <OrderListItem order={item} />}
      />
    </>
  );
}