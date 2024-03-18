import { ActivityIndicator, FlatList, Text } from 'react-native';
import orders from '@/assets/data/order';
import OrderListItem from '../../../components/OrderListItem';
import { Stack } from 'expo-router';
import { useAdminOrderList } from '@/src/api/orders';


export default function ArchiveOrdersScreen() {
  const{data:orders,error,isLoading} = useAdminOrderList({archived:true})
  if(isLoading){
    return <ActivityIndicator/>
  }

  if(error){
    return <Text>failed to fetch</Text>
  }

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