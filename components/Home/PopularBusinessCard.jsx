import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors } from '../../constants/Colors'
import Category from './Category'
import { useRouter } from 'expo-router'

export default function PopularBusinessCard({business}) {
  const router = useRouter()
  return (
    <TouchableOpacity 
    onPress={()=> router.push('/businessdetail/'+business?.id ) }
    style={{
      
      padding:10,
      backgroundColor: '#fff',
      borderRadius:20,
      marginRight:10,
      alignItems:'center'  
      

    }}>
      <Image source={{uri: business?.imageUrl}} style={{
        width:200,
        height:130,
        borderRadius:20
        
      }}/>
      <View>
        <Text style={{
          fontFamily:'outfit-bold',
          fontSize:17
        }}>
          {business.name}
        </Text>
        <Text style={{
          fontFamily:'outfit',
          fontSize:13,
          color: Colors.GRAY
        }}>
          {business.address}
        </Text>
        <View style={{
          display:'flex', flexDirection:'row', justifyContent:'space-between'
        }}>
        <View style={{
          display:'flex', flexDirection:'row', gap:5
        }}>
          <Image source={require('./../../assets/images/star.png')}
          style={{width:15, height:15}}
          />
          <Text style={{fontFamily:'outfit'}}>
            4.5
          </Text>
        </View>
        <Text 
        style={{
          fontFamily:'outfit',
          fontSize:10,
          backgroundColor:Colors.PRIMARY,
          color:'#fff',
          padding:2,
          borderRadius:5
        }}
        >
          {business.category}
        </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}