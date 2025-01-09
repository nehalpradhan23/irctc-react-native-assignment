import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { signout } from "@/constants/signout";
import { useRouter } from "expo-router";

const adminHome = () => {
  const [userData, setUserData] = useState("");
  const router = useRouter();
  const getData = async () => {
    const token = await AsyncStorage.getItem("token");
    console.log("token:--- ", token);

    const response = await axios.post(
      "http://192.168.0.108:8081/(api)/userData",
      { token }
    );
    console.log("user data: --", response.data);
    setUserData(response.data.data);
  };
  useEffect(() => {
    getData();
  }, []);

  // ===================================
  return (
    <View>
      <Text>{userData.username}</Text>
      <TouchableOpacity
        onPress={() => {
          signout();
          router.replace("/");
        }}
      >
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default adminHome;

const styles = StyleSheet.create({});
