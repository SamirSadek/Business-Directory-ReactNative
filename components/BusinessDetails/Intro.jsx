import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  ToastAndroid,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Colors } from "../../constants/Colors";
import { collection, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../configs/FirebaseConfig";
import { useUser } from "@clerk/clerk-expo";

export default function Intro({ businessDetail }) {
  const { user } = useUser();
  const router = useRouter();
  const onDelete = () => {
    Alert.alert(
      "Do you want to Delete?",
      "Do you really want to Delete this Business?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => deleteBusiness(),
        },
      ]
    );
  };
  const deleteBusiness = async () => {
    console.log("Delete Business");
    // Reference the document correctly
    const businessDocRef = doc(db, "BusinessList", businessDetail.id);

    // Delete the document
    await deleteDoc(businessDocRef);
    router.back();
    ToastAndroid.show("Business Deleted!", ToastAndroid.LONG);
  };
  return businessDetail && businessDetail.imageUrl ? (
    <View>
      <View
        style={{
          position: "absolute",
          zIndex: 10,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
          padding: 25,
        }}
      >
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back-circle" size={40} color="white" />
        </TouchableOpacity>
        <Ionicons name="heart-outline" size={40} color="black" />
      </View>
      <Image
        source={{ uri: businessDetail.imageUrl }}
        style={{ width: "100%", height: 340 }}
      />
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 20,
          marginTop: -20,
          backgroundColor: "#fff",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          alignItems: "center",
        }}
      >
        <View
          style={{
            padding: 20,
            marginTop: -20,
            backgroundColor: "#fff",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}
        >
          <Text style={{ fontFamily: "outfit-bold", fontSize: 25 }}>
            {businessDetail.name}
          </Text>
          <Text style={{ fontFamily: "outfit", fontSize: 18 }}>
            {businessDetail.address}
          </Text>
        </View>
        {user?.primaryEmailAddress?.emailAddress ==
          businessDetail?.userEmail && (
          <TouchableOpacity
            style={{
              borderRadius: 99,
              borderWidth: 1,
              padding: 4,
              borderColor: Colors.GRAY,
            }}
            onPress={() => onDelete()}
          >
            <Ionicons name="trash-outline" size={24} color="red" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  ) : (
    <Text>No Image</Text>
  );
}
