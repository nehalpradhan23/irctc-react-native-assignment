import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import Button from "./Button";
import { hp, wp } from "../helpers/common";
import { useRouter } from "expo-router";
import { theme } from "../constants/theme";

const HomeScreenButtons = () => {
  const router = useRouter();
  return (
    <View style={styles.buttons}>
      {/* ================================== */}
      <Pressable
        style={[styles.button, styles.adminBtn]}
        title="Admin"
        onPress={() => router.push("admin")}
      >
        <Text style={styles.text}>Admin</Text>
      </Pressable>
      <Pressable
        style={[styles.button, styles.guestBtn]}
        title="Guest"
        onPress={() => router.push("guest")}
      >
        <Text style={styles.text}>Guest</Text>
      </Pressable>
    </View>
  );
};

export default HomeScreenButtons;

const styles = StyleSheet.create({
  buttons: {
    gap: 30,
    width: "100%",
  },
  button: {
    // backgroundColor: theme.colors.primary,
    height: hp(6.6),
    justifyContent: "center",
    alignItems: "center",
    borderCurve: "continuous",
    borderRadius: theme.radius.xl,
  },
  text: {
    fontSize: hp(2.5),
    color: "white",
    fontWeight: theme.fonts.bold,
  },
  adminBtn: {
    backgroundColor: "blue",
  },
  guestBtn: {
    backgroundColor: theme.colors.primary,
  },
});
