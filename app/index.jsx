import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import ScreenWrapper from "../components/ScreenWrapper";
import { hp, wp } from "../helpers/common";
import Button from "../components/Button";
import HomeScreenButtons from "../components/HomeScreenButtons";

const index = () => {
  const router = useRouter();
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
