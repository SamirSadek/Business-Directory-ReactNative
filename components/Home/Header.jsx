import { View, Text, Image, TextInput } from "react-native";
import React from "react";
import { useUser } from "@clerk/clerk-expo";
import { Colors } from "../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";

export default function Header() {
  const { user } = useUser();
  return (
    <View
      style={{ padding: 20, paddingTop: 40, backgroundColor: Colors.PRIMARY ,borderBottomLeftRadius :15,
        borderBottomRightRadius: 15}}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
        }}
      >
        <Image
          source={{ uri: user?.imageUrl }}
          style={{
            width: 45,
            height: 45,
            borderRadius: 99,
          }}
        />
        <View>
          <Text
            style={{
              color: "#fff",
            }}
          >
            Welcome,
          </Text>
          <Text
            style={{
              color: "#fff",
              fontSize: 19,
              fontFamily: "outfit-medium",
            }}
          >
            {user?.fullName}
          </Text>
        </View>
      </View>
      {/* Search Bar */}
      <View style={{
        display:'flex',
        flexDirection: 'row',
        alignItems:"center",
        gap:10,
        backgroundColor: '#fff',
        padding: 10,
        marginVertical: 10,
        borderRadius:15,
        
      }}>
        <Ionicons name="search-outline" size={24} color={Colors.PRIMARY} />
        <TextInput
        style={{
            fontFamily:'outfit',
            fontSize:16
        }}
        placeholder="Search ...." />
      </View>
    </View>
  );
}
