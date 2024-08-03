import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "../../constants/Colors";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../configs/FirebaseConfig";
import CategoryItem from "./CategoryItem";
import { useRouter } from "expo-router";

export default function Category({explore = false,onCategorySelect}) {
  const [categoryList, setCategoryList] = useState([]);
  const router = useRouter()

  useEffect(() => {
    getCategoryList();
  }, []);

  const getCategoryList = async () => {
    setCategoryList([])
    const q = query(collection(db, "Category"));
    const querySnapShot = await getDocs(q);
    querySnapShot.forEach((doc) => {
        console.log(doc.data());
      setCategoryList(prev => [...prev, doc.data()]);
    });
  };

  const onCategoryPressHandler = (item) =>{
    if(!explore){
      router.push('/businesslist/'+item.name)
    }else{
       onCategorySelect(item.name)
    }
  }
  return (
    <View>
      {!explore&&<View
        style={{
          paddingLeft: 20,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 20,
            marginTop: 10,
            fontFamily: "outfit-bold",
          }}
        >
          Category
        </Text>
        <Text
          style={{
            fontFamily: "outfit-medium",
            paddingRight: 15,
            paddingTop: 10,
            color: Colors.PRIMARY,
          }}
        >
          View All 
        </Text>
      </View>}

      <FlatList
        data={categoryList}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        style={{paddingLeft:20,marginTop:5}}
        renderItem={({ item, index }) => (
        
          <CategoryItem 
          item={item} 
          key={item.icon}
          onCategoryPress={(category)=>onCategoryPressHandler(category)}/>
  )}
      />
    </View>
  );
}
