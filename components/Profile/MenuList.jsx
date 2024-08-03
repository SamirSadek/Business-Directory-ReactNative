import { View, Text, FlatList, Image, TouchableOpacity, Share } from 'react-native'
import React from 'react'
import { Colors } from '../../constants/Colors'
import { useRouter } from 'expo-router'
import { useAuth } from '@clerk/clerk-expo'


const menuList = [
    {
        id:1,
        name:'Add Business',
        icon:'https://cdn-icons-png.flaticon.com/128/2845/2845652.png',
        path:'/business/add-business'
    },
    {
        id:2,
        name:'My Business',
        icon:'https://cdn-icons-png.flaticon.com/128/420/420199.png',
        path:'/business/my-business'
    },
    {
        id:3,
        name:'Share App',
        icon:'https://cdn-icons-png.flaticon.com/128/3437/3437338.png',
        path:'share'
    },
    {
        id:4,
        name:'Logout',
        icon:'https://cdn-icons-png.flaticon.com/128/1828/1828490.png',
        path:'logout'
    }
]



export default function MenuList() {
    const {signOut} = useAuth()
    const router = useRouter()
    const onMenuClick = (item) =>{
        if(item.path=='logout'){
            signOut();
            return
        }
        if(item.path=='share'){
            Share.share({
                message:'Download the Business Directory App'
            });
            return
        }
        router.push(item.path)
    }

  return (
    <View style={{
        marginTop:50
    }}>
      <FlatList
      numColumns={2}
      data={menuList}
      renderItem={({item,index})=>(
        <TouchableOpacity 
        onPress={()=>onMenuClick(item)}
        style={{
                display:'flex',
                flexDirection:'row',
                alignItems:'center',
                gap:10,
                flex:1,
                padding:10,
                borderWidth:1,
                borderRadius:15,
                margin:10,
                backgroundColor:'#fff',
                borderColor:Colors.PRIMARY
        }}>
            <Image source={{uri:item.icon}}
            style={{
                width:30,
                height:30
            }}
            />
            <Text style={{
                fontFamily:'outfit-medium',
                fontSize:16,
                flex:1
            }}>{item.name}</Text>
        </TouchableOpacity>
      )}
      />
    </View>
  )
}