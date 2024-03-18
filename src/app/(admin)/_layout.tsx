import { View, Text, Pressable } from 'react-native'
import React, { useContext } from 'react'
import { Link, Redirect, Tabs } from 'expo-router'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { AuthContext } from '@/src/providers/AuthProvider';

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string
}) {
  return <FontAwesome size={20} style={{ marginBottom: -3 }} {...props} />
}

const _layout = () => {
  const { isAdmin } = useContext(AuthContext)
  
  if (!isAdmin) {
    return <Redirect href={'/'} />
  }
  return (
    <Tabs screenOptions={{ tabBarStyle: { backgroundColor: 'yellow' } }}>
      <Tabs.Screen name='index' options={{ href: null, }} />
      <Tabs.Screen name='menu' options={{ title: "Menu", headerShown: false,tabBarIcon:()=>(<TabBarIcon name='cutlery' color='gray' />) }}
      />
      <Tabs.Screen name='orders' options={{ headerShown: false, title: 'Orders', tabBarIcon: () => <TabBarIcon name="list" color='gray' />}} />
      
    </Tabs>
  )
}

export default _layout