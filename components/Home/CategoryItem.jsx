import { View, Image, Text } from "react-native";
import React from "react";
import { Colors } from "../../constants/Colors";
import { TouchableOpacity } from "react-native";

export default function CategoryItem({ item,onCategoryPress }) {
  return (
    
      <TouchableOpacity 
      onPress={()=>onCategoryPress(item)}
      style={{padding:15,backgroundColor:'#D1CFFC',marginTop:10,marginRight:5,borderRadius:8}}>
      <Image 

      source={{ uri: item.icon }} 
      style={{ height: 40, width: 40 ,alignItems:"center",alignContent:'center' }} />
      <Text style={{textAlign:"center", fontSize:8, paddingTop:5}}>{item.name}</Text>
      </TouchableOpacity>
   
  );
}
