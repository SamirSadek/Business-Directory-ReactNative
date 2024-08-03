import { View, Text, TouchableOpacity, Linking } from 'react-native'
import React from 'react'
import UserIntro from '../../components/Profile/UserIntro'
import MenuList from '../../components/Profile/MenuList'
import { Colors } from '../../constants/Colors'

export default function profile() {
  
    const handlePress = () => {
      Linking.openURL('https://www.facebook.com/tahsanfans');
    };
  return (
    <View style={{
          padding:20
    }}>
      <Text style={{
        fontFamily:'outfit-bold',
        fontSize:25
      }}>profile</Text>

      {/* user info */}
      <UserIntro/>

      {/* Menu List */}
      <MenuList/>
      <TouchableOpacity onPress={handlePress}>

      <Text style={
        {
          marginTop:200,
          textAlign:'center',
          fontFamily:'outfit-bold',
          color:Colors.GRAY
          
        }
      }>Developed by SAMIR @ 2024</Text>
      </TouchableOpacity>

    </View>
  )
}