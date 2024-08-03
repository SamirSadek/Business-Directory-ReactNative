import { View, Text, FlatList, ScrollView } from 'react-native'
import React from 'react'
import BusinessListCard from './BusinessListCard'

export default function ExploreBusinessList({businessList}) {
  return (
    <View style={{
        marginTop:20
    }}>
      <FlatList
       data={businessList}
       scrollEnabled
       showsVerticalScrollIndicator={false}
       renderItem={({item,index})=>(
        <BusinessListCard business={item}/>
       )}
      
      />
      
    </View>
  )
}