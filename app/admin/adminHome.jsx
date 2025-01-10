import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { signout } from "@/constants/signout";
import { useRouter } from "expo-router";
import { hp } from "@/helpers/common";
import { theme } from "@/constants/theme";

const adminHome = () => {
  const [userData, setUserData] = useState("");
  const [allTrains, setAllTrains] = useState([]);
  const [trainLoading, setTrainLoading] = useState(true);
  const router = useRouter();
  // ===================================
  const getData = async () => {
    const token = await AsyncStorage.getItem("token");
    console.log("token:--- ", token);

    const response = await axios.post(
      `${process.env.EXPO_PUBLIC_APIURL}/(api)/userData`,
      {
        token,
      }
    );
    // const response = await axios.post(
    //   "http://192.168.0.108:8081/(api)/userData",
    //   { token }
    // );
    console.log("user data: --", response.data);
    setUserData(response.data.data);
  };

  const getTrainsData = async () => {
    try {
      // setTrainLoading(true);
      const response = await axios.get(
        `${process.env.EXPO_PUBLIC_APIURL}/(api)/getAllTrains`
      );
      // const response = await axios.get(
      //   "http://192.168.0.108:8081/(api)/getAllTrains"
      // );
      console.log("trains data: --", response.data);

      setAllTrains(response.data.data);
    } catch (error) {
      console.log("fetch error", error);
    } finally {
      setTrainLoading(false);
    }
  };
  // ===================================
  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getTrainsData();
  }, []);

  // ===================================
  // Render each train item
  const renderTrainItem = ({ item }) => (
    // <View style={styles.trainCard}>
    //   <Text style={styles.trainName}>🚆 {item.trainName}</Text>
    //   <Text>Source: {item.source}</Text>
    //   <Text>Source Date: {new Date(item.sourceDate).toLocaleDateString()}</Text>
    //   <Text>Source Time: {new Date(item.sourceTime).toLocaleTimeString()}</Text>
    //   <Text>Destination: {item.destination}</Text>
    //   <Text>
    //     Destination Date: {new Date(item.destDate).toLocaleDateString()}
    //   </Text>
    //   <Text>
    //     Destination Time: {new Date(item.destTime).toLocaleTimeString()}
    //   </Text>
    //   <Text>Seat Capacity: {item.seatCapacity}</Text>
    // </View>

    <View style={styles.trainDetailsContainer}>
      <View style={styles.singleDetail}>
        <Text style={styles.text}>Train Name: </Text>
        <Text style={styles.text}>{item.trainName}</Text>
      </View>
      <View style={styles.singleDetail}>
        <Text style={styles.text}>Source: </Text>
        <Text style={styles.text}>{item.source}</Text>
      </View>
      <View style={styles.singleDetail}>
        <Text style={styles.text}>Destination: </Text>
        <Text style={styles.text}>{item.destination}</Text>
      </View>
      <View style={styles.singleDetail}>
        <Text style={styles.text}>Seat capacity: </Text>
        <Text style={styles.text}>{item.seatCapacity}</Text>
      </View>
      <View style={styles.singleDetail}>
        <Text style={styles.text}>Source date: </Text>
        <Text style={styles.text}>
          {new Date(item.sourceDate).toDateString()}
        </Text>
      </View>
      <View style={styles.singleDetail}>
        <Text style={styles.text}>Source Time: </Text>
        <Text style={styles.text}>
          {new Date(item.sourceTime).toLocaleTimeString()}
        </Text>
      </View>
      <View style={styles.singleDetail}>
        <Text style={styles.text}>Destination Date: </Text>
        <Text style={styles.text}>
          {new Date(item.destDate).toDateString()}
        </Text>
      </View>
      <View style={styles.singleDetail}>
        <Text style={styles.text}>Destination Time: </Text>
        <Text style={styles.text}>
          {new Date(item.destTime).toLocaleTimeString()}
        </Text>
      </View>
    </View>
  );
  // ===================================
  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Welcome, {userData.username}</Text>
          <TouchableOpacity
            onPress={() => {
              signout();
              router.replace("/");
            }}
          >
            <Text style={[styles.headerText, { color: "red" }]}>Logout</Text>
          </TouchableOpacity>
        </View>
        {/* add train ---------------------- */}
        <View style={styles.addNewTrainView}>
          <TouchableOpacity
            style={styles.addNewTrainBtn}
            onPress={() => router.push("/admin/addTrain")}
          >
            <Text style={styles.addNewTrainText}>Add new train</Text>
          </TouchableOpacity>
        </View>
        {/* show all trains */}
        <View style={styles.allTrainsView}>
          <Text style={styles.allTrains}>All trains</Text>
          <View style={styles.trainContainer}>
            {trainLoading ? (
              <ActivityIndicator size="large" color="#007bff" />
            ) : (
              // <Text>dd</Text>
              <FlatList
                data={allTrains}
                renderItem={renderTrainItem}
                keyExtractor={(item) => item._id}
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false}
              />
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

export default adminHome;

const styles = StyleSheet.create({
  mainContainer: { flex: 1 },
  container: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    flex: 1,
  },
  header: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  headerText: {
    fontSize: 22,
  },
  addNewTrainView: {
    paddingVertical: 30,
  },
  addNewTrainText: {
    fontSize: 25,
    fontWeight: "bold",
  },
  addNewTrainBtn: {
    // backgroundColor: theme.colors.primary,
    fontSize: 25,
    height: hp(6),
    justifyContent: "center",
    alignItems: "center",
    borderCurve: "continuous",
    borderRadius: 100,
    // borderRadius: theme.radius.lg,
    backgroundColor: "lightblue",
  },
  allTrainsView: {
    flex: 1,
    // backgroundColor: "red",
  },
  allTrains: {
    fontSize: 35,
    marginBottom: 10,
  },
  listContainer: {
    paddingBottom: 20,
  },
  trainCard: {
    backgroundColor: "#fff",
    padding: 15,
    marginVertical: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  trainName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  trainContainer: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    padding: 10,
  },
  trainDetailsContainer: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 20,
    gap: 7,
    borderColor: "black",
    marginBottom: 20,
    borderWidth: 1,
  },
  singleDetail: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    fontSize: 16,
  },
});
