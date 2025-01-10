import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Link, useRouter } from "expo-router";
import { theme } from "../../constants/theme";
import { hp } from "../../helpers/common";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const admin = () => {
  const [username, setUsername] = useState("");
  const [usernameVerify, setUsernameVerify] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordVerify, setPasswordVerify] = useState(false);
  const [showPassowrd, setShowPassowrd] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoggedInAs, setIsLoggedInAs] = useState("second");

  const getData = async () => {
    const data = await AsyncStorage.getItem("isLoggedIn");
    setIsLoggedIn(data);
    const loggedInAs = await AsyncStorage.getItem("isLoggedInAs");
    setIsLoggedInAs(loggedInAs);
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

  const router = useRouter();

  const handleSubmit = async () => {
    if (usernameVerify && passwordVerify) {
      try {
        const response = await axios.post(
          `${process.env.EXPO_PUBLIC_APIURL}/(api)/adminLogin`,
          {
            username,
            password,
          }
        );
        // const response = await axios.post(
        //   "http://myIp:8081/(api)/adminLogin",
        //   {
        //     username,
        //     password,
        //   }
        // );

        // if (response.data.error) {
        //   console.log("not okay ------------------------------");

        //   setError(response.data.message);
        // }
        if (response.data.status == "ok") {
          Alert.alert("Login sucessful");
          AsyncStorage.setItem("token", response.data.data);
          AsyncStorage.setItem("isLoggedIn", JSON.stringify(true));
          AsyncStorage.setItem("isLoggedInAs", "admin");
          // console.log("success ------------------------------");
          router.replace("admin/adminHome");
        } else {
          // console.log("unsuccessful ------------------------------");
          Alert.alert(response.data.message);
        }

        // if(response.data)
      } catch (error) {
        console.log("register error", message);
        // return;
      }
    } else {
      Alert.alert("Fill details");
    }
  };

  // =========================================================
  const handleUsername = (e) => {
    const nameVar = e.nativeEvent.text;
    setUsername(nameVar);
    setUsernameVerify(false);
    if (nameVar.length > 3) {
      setUsernameVerify(true);
    }
  };
  // =========================================================

  const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  const handlePassword = (e) => {
    const passwordVar = e.nativeEvent.text;
    setPassword(passwordVar);
    setPasswordVerify(false);
    if (passwordRegex.test(passwordVar)) {
      setPassword(passwordVar);
      setPasswordVerify(true);
    }
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps={"always"}
    >
      <View>
        <View>
          <View style={styles.loginContainer}>
            <Text style={styles.text_header}>Login as Admin</Text>
            {/* inputs ================= */}
            <View style={styles.action}>
              <TextInput
                placeholder="Username"
                style={styles.textInput}
                onChange={(e) => handleUsername(e)}
              />
            </View>
            {username.length < 1 ? null : usernameVerify ? null : (
              <Text
                style={{
                  marginLeft: 20,
                  color: "red",
                }}
              >
                username should be more than 3 characters
              </Text>
            )}
            {/* <View style={styles.action}>
            <TextInput placeholder="Email" style={styles.textInput} />
          </View> */}
            <View style={styles.action}>
              <TextInput
                placeholder="Password"
                secureTextEntry={!showPassowrd}
                style={styles.textInput}
                onChange={(e) => handlePassword(e)}
              />
              {password.length < 1 ? null : !showPassowrd ? (
                <TouchableOpacity
                  onPress={() => setShowPassowrd(!showPassowrd)}
                >
                  <Text>SHOW</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => setShowPassowrd(!showPassowrd)}
                >
                  <Text>HIDE</Text>
                </TouchableOpacity>
              )}
            </View>
            {password.length < 1 ? null : passwordVerify ? null : (
              <View style={{ marginTop: 10 }}>
                <Text
                  style={{
                    marginLeft: 20,
                    color: "red",
                  }}
                >
                  - Password length must be more than 6 characters
                </Text>
                <Text
                  style={{
                    marginLeft: 20,
                    color: "red",
                  }}
                >
                  - One uppercase, lowercase, number and special character
                </Text>
              </View>
            )}
          </View>
          {/* login button------------------ */}
          <View style={styles.button}>
            <TouchableOpacity
              style={styles.loginBtn}
              onPress={() => handleSubmit()}
            >
              <Text style={styles.btnText}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* <View style={styles.footer}>
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
      </View> */}
      </View>
    </ScrollView>
  );
};

export default admin;

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
