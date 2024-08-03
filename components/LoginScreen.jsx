import { View, Text, Image, StyleSheet,TouchableOpacity } from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking"

import React from "react";
import { Colors } from "@/constants/Colors";
import { useOAuth } from "@clerk/clerk-expo";
export const useWarmUpBrowser = () => {
    React.useEffect(() => {
      // Warm up the android browser to improve UX
      // https://docs.expo.dev/guides/authentication/#improving-user-experience
      void WebBrowser.warmUpAsync();
      return () => {
        void WebBrowser.coolDownAsync();
      };
    }, []);
  };
  
  WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
    useWarmUpBrowser();
    const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

    const onPress = React.useCallback(async () => {
      try {
        const { createdSessionId, signIn, signUp, setActive } =
          await startOAuthFlow({ redirectUrl: Linking.createURL("/dashboard", { scheme: "myapp" })});
  
        if (createdSessionId) {
          setActive({ session: createdSessionId });
        } else {
          // Use signIn or signUp for next steps such as MFA
        }
      } catch (err) {
        console.error("OAuth error", err);
      }
    }, []);

  return (
    <View>
      <View
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: 80,
        }}
      >
        <Image
          source={require("./../assets/images/login.png")}
          style={{
            width: 220,
            height: 450,
            borderRadius: 20,
            borderWidth: 2,
            borderColor: "#000",
          }}
        ></Image>
      </View>
      <View style={{ backgroundColor: "#fff", padding: 30, marginTop: -20 }}>
        <Text
          style={{
            fontSize: 25,
            fontFamily: "outfit-bold",
            textAlign: "center",
          }}
        >
          Your Ultimate{" "}
          <Text
            style={{
              color: Colors.PRIMARY,
            }}
          >
            Community Business Directory
          </Text>{" "}
          App <Text style={{ fontSize: 10 }}> by samir sadek</Text>
        </Text>
        <Text
          style={{
            fontSize: 12,
            fontFamily: "outfit",
            marginVertical: 15,
            textAlign: "center",
          }}
        >
          Find your favorite business near you and post your own business to
          your community
        </Text>
        <TouchableOpacity style={styles.btn}
        onPress={onPress}>
        <Text style={{
            textAlign:"center",
            color:'#fff',
            fontFamily:'outfit'

        }}>Let's Get Started</Text>
      </TouchableOpacity>
      </View>
     
    </View>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: Colors.PRIMARY,
    padding: 16,
    borderRadius: 99,
    marginTop:0
  },
});
