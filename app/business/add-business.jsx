import { View, Text, Image, TextInput, ScrollView, ToastAndroid } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "expo-router";
import { Colors } from "../../constants/Colors";
import { TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import RNPickerSelect from "react-native-picker-select";
import { collection, doc, getDocs, query, setDoc } from "firebase/firestore";
import { db, storage } from "../../configs/FirebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useUser } from "@clerk/clerk-expo";
import { ActivityIndicator } from "react-native";

export default function AddBusiness() {
  const {user} = useUser()
  const navigation = useNavigation();
  const [image, setImage] = useState(null);
  const [categoryList, setCategoryList] = useState([]);
  const [name,setName] = useState()
  const [address,setAddress] = useState()
  const [contact,setContact] = useState()
  const [website,setWebsite] = useState()
  const [about,setAbout] = useState()
  const [loading, setLoading] = useState(false)
  const [category,setCategory] = useState()
  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Add Your Business",
      headerShown: true,
    });
    GetCategoryList();
  }, []);
  const onImagePick = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    setImage(result?.assets[0].uri);
    console.log(result);
  };
  const GetCategoryList = async () => {
    setCategoryList([])
    const q = query(collection(db, "Category"));
    const snapShot = await getDocs(q);
    snapShot.forEach((doc) => {
      console.log(doc.data()),
        setCategoryList(prev => [
          ...prev,
          {
            label: (doc.data()).name,
            value: (doc.data()).name
          },
        ]);
    });
  };
  

  const onAddNewBusiness= async()=>{
    setLoading(true)
    const fileName= Date.now().toString()+".jpg"
    const resp = await fetch(image)
    const blob= await resp.blob()
    const imageRef = ref(storage, 'business-app/'+fileName)
    uploadBytes(imageRef,blob).then((snapshot)=>{
      console.log("File Uploaded");
    }).then(resp=>{
      getDownloadURL(imageRef).then(async(downloadUrl)=>{
        console.log(downloadUrl);
        saveBusinessDetail(downloadUrl)
      })
    }).catch(error => {
      console.error(error);
      setLoading(false);
    });
  }
  const saveBusinessDetail=async(imageUrl)=>{
    await setDoc(doc(db,'BusinessList', Date.now().toString()),{
      name:name,
      address:address,
      contact:contact,
      about:about,
      website:website,
      category:category,
      userName:user?.fullName,
      userEmail:user?.primaryEmailAddress?.emailAddress,
      userImage:user?.imageUrl,
      imageUrl:imageUrl
    })
    setLoading(false)
    ToastAndroid.show('New Business added...',ToastAndroid.LONG)
  }

  return (
    <ScrollView
    scrollEnabled
    showsVerticalScrollIndicator={false}
      style={{
        padding: 20,
        marginBottom:20
      }}
    >
      <Text
        style={{
          fontFamily: "outfit-bold",
          fontSize: 25,
        }}
      >
        Add New Business
      </Text>
      <Text
        style={{
          fontFamily: "outfit",
          color: Colors.GRAY,
        }}
      >
        Fill all details in order to add new business
      </Text>
      <TouchableOpacity
        style={{
          marginTop: 20,
          borderRadius: 15,
        }}
        onPress={() => onImagePick()}
      >
        {!image ? (
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/128/6631/6631821.png",
            }}
            style={{
              width: 100,
              height: 100,
              borderRadius: 15,
            }}
          />
        ) : (
          <Image
            source={{
              uri: image,
            }}
            style={{
              width: 100,
              height: 100,
              borderRadius: 15,
            }}
          />
        )}
      </TouchableOpacity>
      <View>
        <TextInput
        onChangeText={(v)=>setName(v)}
          placeholder="Name"
          style={{
            padding: 10,
            borderWidth: 1,
            borderRadius: 5,
            fontSize: 17,
            backgroundColor: "#fff",
            marginTop: 10,
            borderColor: Colors.GRAY,
            fontFamily: "outfit",
          }}
        />
        <TextInput
        onChangeText={(v)=>setAddress(v)}
          placeholder="Address"
          style={{
            padding: 10,
            borderWidth: 1,
            borderRadius: 5,
            fontSize: 17,
            backgroundColor: "#fff",
            marginTop: 10,
            borderColor: Colors.GRAY,
            fontFamily: "outfit",
          }}
        />
        <TextInput
        onChangeText={(v)=>setContact(v)}
          placeholder="Contact"
          style={{
            padding: 10,
            borderWidth: 1,
            borderRadius: 5,
            fontSize: 17,
            backgroundColor: "#fff",
            marginTop: 10,
            borderColor: Colors.GRAY,
            fontFamily: "outfit",
          }}
        />
        <TextInput
        onChangeText={(v)=>setWebsite(v)}
          placeholder="Website"
          style={{
            padding: 10,
            borderWidth: 1,
            borderRadius: 5,
            fontSize: 17,
            backgroundColor: "#fff",
            marginTop: 10,
            borderColor: Colors.GRAY,
            fontFamily: "outfit",
          }}
        />
        <TextInput
        onChangeText={(v)=>setAbout(v)}
          placeholder="About"
          multiline
          numberOfLines={5}
          style={{
            padding: 10,
            borderWidth: 1,
            borderRadius: 5,
            fontSize: 17,
            backgroundColor: "#fff",
            marginTop: 10,
            borderColor: Colors.GRAY,
            fontFamily: "outfit",
            height: 100,
          }}
        />
        <View style={{
          borderWidth: 1,
          borderRadius: 5,
          fontSize: 17,
          backgroundColor: "#fff",
          marginTop: 10,
          borderColor: Colors.GRAY,
          fontFamily: "outfit",
        }}>
          <RNPickerSelect
            onValueChange={(value) => setCategory(value)}
            items={categoryList}
          />
        </View>
      </View>
      <TouchableOpacity 
      disabled={loading}
      onPress={()=>onAddNewBusiness()}
      style={{
        padding:15,
        backgroundColor:Colors.PRIMARY,
        borderRadius:5,
        marginTop:20,
        marginBottom:20
      }}>
        {loading?
        <ActivityIndicator size={'large'} color={'#fff'}/>:
        <Text style={{
          textAlign:"center",
          fontFamily:'outfit-medium',
          color:'#fff'
        }}>Add New Business</Text>}

      </TouchableOpacity>
    </ScrollView>
  );
}
