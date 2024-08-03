import { View, Text, FlatList, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { db } from "../../configs/FirebaseConfig";
import { collection, getDocs, query } from "firebase/firestore";

export default function Slider() {
  const [sliderList, setSliderList] = useState([]);
  useEffect(() => {
    getSliderList();
  }, []);

  const getSliderList = async () => {
    setSliderList([]);
    const q = query(collection(db, "Slider"));
    const querySnapShot = await getDocs(q);

    querySnapShot.forEach((doc) => {
      console.log(doc.data());
      setSliderList((prev) => [...prev, doc.data()]);
    });
  };
  return (
    <View>
      <Text
        style={{
          fontFamily: "outfit-bold",
          paddingLeft: 20,
          paddingTop: 20,
          marginBottom:5,
          fontSize: 20,
        }}
      >
        Special For You
      </Text>
      <FlatList
      showsHorizontalScrollIndicator={false}
        data={sliderList}
        horizontal={true}
        style={{paddingLeft:20}}
        renderItem={({ item, index }) => (
          <Image
            source={{ uri: item.imageUrl }}
            style={{
              width: 300,
              height: 150,
              borderRadius:15,
              marginRight:20
            }}
          />
        )}
      />
    </View>
  );
}
