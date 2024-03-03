import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { Link, Tabs } from 'expo-router'
import  FontAwesome from '@expo/vector-icons/FontAwesome'

function TabBarIcon(props:{
  name:React.ComponentProps<typeof FontAwesome >['name'];
  color:string
}){
return <FontAwesome size={20} style={{marginBottom:-3}} {...props}/>
}

const _layout = () => {
  return (
    <Tabs screenOptions={{tabBarStyle:{backgroundColor:'green'}}}>
      <Tabs.Screen name='index' options={{href:null}}/>
      <Tabs.Screen name='menu' options={{title:"Menu", headerShown:false}}
        />
      <Tabs.Screen name='admin' options={{headerTitle:"tab 2", title:'Orders'}}/>
      {/* <Tabs.Screen name='/[id]' options={{headerTitle:"details"}}/> */}
    </Tabs>
  )
}

export default _layout