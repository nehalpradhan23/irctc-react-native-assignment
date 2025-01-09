import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import ScreenWrapper from "../components/ScreenWrapper";
import { hp, wp } from "../helpers/common";
import Button from "../components/Button";
import HomeScreenButtons from "../components/HomeScreenButtons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoggedInAs, setIsLoggedInAs] = useState("second");
  const router = useRouter();

  const getData = async () => {
    const data = await AsyncStorage.getItem("isLoggedIn");
    setIsLoggedIn(data);
    const loggedInAs = await AsyncStorage.getItem("isLoggedInAs");
    setIsLoggedInAs(loggedInAs);
    console.log("home data: --", data);
    console.log("logged as: --", loggedInAs);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      if (isLoggedInAs === "admin") {
        router.replace("/admin/adminHome");
      } else if (isLoggedInAs === "guest") {
        router.replace("/guest/guestHome");
      }
    }
  }, [isLoggedIn, isLoggedInAs]);

  // ========================================================
  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>IRCTC</Text>
        </View>
        <HomeScreenButtons />
      </View>
    </ScreenWrapper>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: wp(4),
    // backgroundColor: "gray",
  },
  title: {
    fontSize: hp(6),
  },
});
