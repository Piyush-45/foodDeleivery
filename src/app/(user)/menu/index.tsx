import { StyleSheet, FlatList, StatusBar, ActivityIndicator, Text } from 'react-native'
import ProductListItem from '../../components/ProductListItem'
import { supabase } from '@/src/lib/supabase'
import { useQuery } from '@tanstack/react-query'
import { useProductList } from '@/src/api/products'


const MenuScreen = () => {
//  ? using query for fetching data from databse

  const { data:products, error, isLoading} = useProductList()

  if(isLoading){
    return <ActivityIndicator/>
  }

  if(error){
    return  <Text> Failed to fetch products</Text>
  }


  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     const { data, error } = await supabase.from('product').select('*')
  //     console.log(data)
  //   }
  //   fetchProducts()
  // }, [])

  return (
    // !In React Native's FlatList component, the columnWrapperStyle prop applies to columns, while the contentContainerStyle prop applies to rows.
    <>
      {/* <ExpoStatusBar/> */}
      <FlatList data={products} renderItem={({ item }) => <ProductListItem product={item} />} numColumns={2} contentContainerStyle={{ gap: 10, padding: 10, }} columnWrapperStyle={{ gap: 10 }} />

      <StatusBar backgroundColor={'black'} />
    </>

  )
}

export default MenuScreen

const styles = StyleSheet.create({
  white: {
    color: 'white'
  }
})