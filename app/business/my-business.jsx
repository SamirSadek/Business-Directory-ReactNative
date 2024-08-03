import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useUser } from '@clerk/clerk-expo'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../configs/FirebaseConfig'
import BusinessListCard from '../../components/BusinessList/BusinessListCard'
import { useNavigation } from 'expo-router'

export default function MyBusiness() {
    const [businessList,setBusinessList] = useState([])
    const [loading, setLoading] = useState(false)
    const {user} = useUser()
    const navigation = useNavigation()
    useEffect(()=>{
        navigation.setOptions({
            headerShown:true,
            headerTitle:'My Business'
        })
        user&&GetUserBusiness()
    },[user])
    /**
     * Used to business list by user email
     */
    const GetUserBusiness=async()=>{
        setLoading(true)
        setBusinessList([])
        const q = query(collection(db,'BusinessList'),where('userEmail','==',user?.primaryEmailAddress?.emailAddress))

        const querySnapShot = await getDocs(q)
        querySnapShot.forEach((doc)=>{
            console.log(doc.data());
            setBusinessList(prev=>[...prev,{id:doc.id,...doc.data()}])
        })
        setLoading(false)
    }
  return (
    <View style={{
        padding:20
    }}>
      <Text style={{
        fontFamily:'outfit-bold',
        fontSize:30
      }}>My Business</Text>
      <FlatList
      onRefresh={GetUserBusiness}
      refreshing={loading}
      data={businessList}
      renderItem={({item,index})=>(
        <BusinessListCard business={item}
        key={index}/>
      )}
      />
    </View>
  )
}