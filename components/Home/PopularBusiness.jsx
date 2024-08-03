import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "../../constants/Colors";
import { collection, getDocs, limit, query } from "firebase/firestore";
import { db } from "../../configs/FirebaseConfig";
import PopularBusinessCard from "./PopularBusinessCard";

export default function PopularBusiness() {
  const [businessList, setBusinessList] = useState([]);
  useEffect(() => {
    GetBusinessList();
  }, []);

  const GetBusinessList = async () => {
    setBusinessList([]);
    const q = query(collection(db, "BusinessList"), limit(10));
    const querySnapShot = await getDocs(q);

    querySnapShot.forEach((doc) => {
      setBusinessList(prev => [...prev,{id:doc.id,...doc.data()}])
    });
  };
  return (
    <View>
      <View
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
          Popular Business
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
      </View>
      <FlatList
        data={businessList}
        showsHorizontalScrollIndicator={false}
        
        style={{ paddingLeft: 20, marginTop: 5,marginBottom:10 }}
        keyExtractor={(item, index) => index.toString()}
        horizontal={true}

        renderItem={({ item, index }) => (
          <PopularBusinessCard key={index} business={item} />
        )}
      />
    </View>
  );
}
