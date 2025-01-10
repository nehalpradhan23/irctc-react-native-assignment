import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { signout } from "@/constants/signout";
import { useRouter } from "expo-router";
import { hp } from "@/helpers/common";

const guestHome = () => {
  const [userData, setUserData] = useState("");
  const [allTrains, setAllTrains] = useState([]);
  const [trainLoading, setTrainLoading] = useState(true);
  const router = useRouter();
  // =============================================
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
  // ================================
  useEffect(() => {
    getData(); //todo
  }, []);

  useEffect(() => {
    getTrainsData();
  }, []);

  // =============================================
  const handleBook = (item) => {
    console.log("item --------------", item);

    router.push({
      pathname: "/guest/bookingPage",
      params: { ...item, username: userData.username },
    });
  };
  // ==============================
  const renderTrainItem = ({ item }) => (
    <View style={styles.trainCard}>
      <View styles={styles.trainCardDetails}>
        <Text style={styles.trainName}>🚆 {item.trainName}</Text>
        <Text>Source: {item.source}</Text>
        <Text>
          Source Date: {new Date(item.sourceDate).toLocaleDateString()}
        </Text>
        <Text>
          Source Time: {new Date(item.sourceTime).toLocaleTimeString()}
        </Text>
        <Text>Destination: {item.destination}</Text>
        <Text>
          Destination Date: {new Date(item.destDate).toLocaleDateString()}
        </Text>
        <Text>
          Destination Time: {new Date(item.destTime).toLocaleTimeString()}
        </Text>
        <Text>Seat Capacity: {item.seatCapacity}</Text>
      </View>
      <View style={styles.bookButtonContainer}>
        <TouchableOpacity
          style={styles.bookButton}
          onPress={() => handleBook(item)}
        >
          <Text style={styles.bookButtonText}>Book this train</Text>
        </TouchableOpacity>
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
            <Text style={styles.headerText}>Logout</Text>
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity
            style={styles.myBookingsBtn}
            onPress={() => router.push("/guest/myBookings")}
          >
            <Text style={styles.myBookingsBtnText}>My bookings</Text>
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
              />
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

export default guestHome;

const styles = StyleSheet.create({
  mainContainer: { flex: 1 },
  container: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
  },
  headerText: {
    fontSize: 22,
  },

  allTrainsView: {
    flex: 1,
    // backgroundColor: "red",
  },
  allTrains: {
    fontSize: 35,
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
    flexDirection: "row",
    width: "100%",
    position: "relative",
  },
  trainCardDetails: {
    flex: 1,
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
  myBookingsBtn: {
    fontSize: 30,
    marginVertical: 30,
    backgroundColor: "skyblue",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 50,
  },
  myBookingsBtnText: {
    fontSize: 30,
  },
  bookButtonContainer: {
    position: "absolute",
    bottom: 10, // Adjust distance from the bottom of the card
    right: 10, // Adjust distance from the right edge of the card
  },
  bookButton: {
    backgroundColor: "lightgreen",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 20,
  },
  bookButtonText: {
    fontSize: 20,
    // color: "#007BFF",
    fontWeight: "bold",
    // textDecorationLine: "underline",
  },
});
