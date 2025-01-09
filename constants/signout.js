import AsyncStorage from "@react-native-async-storage/async-storage";

export const signout = () => {
  console.log("signing out");

  AsyncStorage.setItem("isLoggedIn", "");
  AsyncStorage.setItem("isLoggedInAs", "");
  AsyncStorage.setItem("isLoggedInAs", "");
};
