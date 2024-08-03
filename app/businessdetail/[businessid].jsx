import { View, Text, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../configs/FirebaseConfig";
import { Colors } from "../../constants/Colors";
import Intro from "../../components/BusinessDetails/Intro";
import ActionButton from "../../components/BusinessDetails/ActionButton";
import About from "../../components/BusinessDetails/About";
import { ScrollView } from "react-native";
import Reviews from "../../components/BusinessDetails/Reviews";

export default function BusinessDetails() {
  const { businessid } = useLocalSearchParams();
  const [businessDetail, setBusinessDetail] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    GetBusinessDetailsById();
  }, []);

  /**
   * Used to get BusinessDetail by Id
   */

  const GetBusinessDetailsById = async () => {
    setLoading(true);
    const docRef = doc(db, "BusinessList", businessid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setBusinessDetail({id:docSnap.id, ...docSnap.data()});
      setLoading(false);
    } else {
      console.log("No Such Document");
    }
  };
  return (
    <View>
      {loading ? (
        <ActivityIndicator
          style={{
            marginTop: "60%",
          }}
          size={"large"}
          color={Colors.PRIMARY}
        />
      ) : (
        <ScrollView>
            {/* Intro */}
            <Intro businessDetail={businessDetail}/>

            {/* Actions Buttons */}
            <ActionButton businessDetail={businessDetail}/>

            {/* About Section */}
            <About businessDetail={businessDetail}/>

            {/* Review Section */}
            <Reviews businessDetail={businessDetail}/>
        </ScrollView>
      )}
    </View>
  );
}
