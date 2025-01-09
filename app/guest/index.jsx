import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Link, useRouter } from "expo-router";
import { theme } from "../../constants/theme";
import { hp } from "../../helpers/common";

const guest = () => {
  const router = useRouter();
  return (
    <View>
      <View>
        <View style={styles.loginContainer}>
          <Text style={styles.text_header}>Login as Guest</Text>
          {/* inputs ================= */}
          <View style={styles.action}>
            <TextInput placeholder="Username" style={styles.textInput} />
          </View>
          {/* <View style={styles.action}>
            <TextInput placeholder="Email" style={styles.textInput} />
          </View> */}
          <View style={styles.action}>
            <TextInput
              placeholder="Password"
              secureTextEntry
              style={styles.textInput}
            />
          </View>
        </View>
        {/* login button------------------ */}
        <View style={styles.button}>
          <TouchableOpacity style={styles.loginBtn}>
            <Text style={styles.btnText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}>Don't have an account?</Text>
        <Pressable onPress={() => router.replace("guest/register")}>
          <Text
            style={[
              styles.footerText,
              {
                color: theme.colors.primaryDark,
                fontWeight: theme.fonts.semibold,
              },
            ]}
          >
            Register
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default guest;

const styles = StyleSheet.create({
  loginContainer: {
    // backgroundColor: "#fff",
    // borderTopLeftRadius: 30,
    // borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: "black",
    fontWeight: "bold",
    fontSize: 30,
    marginBottom: 50,
  },
  textInput: {
    flex: 1,
    marginTop: -12,

    color: "#05375a",
  },
  action: {
    flexDirection: "row",
    paddingTop: 14,
    paddingBottom: 3,
    marginTop: 15,

    paddingHorizontal: 15,

    borderWidth: 1,
    borderColor: "black",
    borderRadius: 50,
  },
  button: {
    alignItems: "center",
    marginTop: -20,
    alignItems: "center",
    textAlign: "center",
    margin: 20,
  },
  loginBtn: {
    width: "40%",
    backgroundColor: "lightgray",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 50,
  },
  btnText: {
    // color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
  footerText: {
    textAlign: "center",
    color: theme.colors.text,
    fontSize: hp(1.6),
  },
});
