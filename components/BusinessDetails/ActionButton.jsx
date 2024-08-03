import { View, Text, FlatList, Image, Linking, Share } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";

export default function ActionButton({ businessDetail }) {
    console.log(businessDetail);
  const actionButtonMenu = [
    {
      id: 1,
      name: "Call",
      icon: "https://cdn-icons-png.flaticon.com/128/126/126509.png",
      url: "tel:" + businessDetail?.contact,
    },
    {
      id: 2,
      name: "Location",
      icon: "https://cdn-icons-png.flaticon.com/128/535/535239.png",
      url:
        "https://www.google.com/maps/search/?api=1&query=" +
        businessDetail?.address,
    },
    {
      id: 3,
      name: "Web",
      icon: "https://cdn-icons-png.flaticon.com/128/1006/1006771.png",
      url: businessDetail?.website,
    },
    {
      id: 4,
      name: "Share",
      icon: "https://cdn-icons-png.flaticon.com/128/1358/1358023.png",
      url: businessDetail?.website,
    },
  ];
  const onPressHandler=(item)=>{
    if(item.name=='Share'){
        Share.share(
            {
                message: businessDetail?.name  + "\n Mobile:" + businessDetail?.contact +  "\n Address:" + businessDetail?.address + "\n Find more detail on RAIPUR BAZAR APP by Samir !"
            }
        )
        return;
    }
    Linking.openURL(item.url)
  }
  return (
    <View
      style={{
        backgroundColor: "#fff",
        padding: 20,
      }}
    >
      <FlatList
        data={actionButtonMenu}
        numColumns={4}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        renderItem={({ item, index }) => (
          <TouchableOpacity
          onPress={()=>onPressHandler(item)}
            key={index}
            style={{
              borderRadius: 20,
              backgroundColor: "#f0fdfa",
              padding: 10,
            }}
          >
            <Image
              source={{ uri: item.icon }}
              style={{ width: 50, height: 50 }}
            />
            <Text
              style={{
                fontFamily: "outfit",
                textAlign: "center",
                marginTop: 5,
              }}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
