import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import axios from "axios";
import { signout } from "@/constants/signout";

const myBookings = () => {
  const params = useLocalSearchParams();
  const { username } = params;
  const [bookingsData, setBookingsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const getMyBookings = async () => {
    try {
      const response = await axios.post(
        `${process.env.EXPO_PUBLIC_APIURL}/(api)/getMyBookings`,
        { username }
      );
      console.log("bookings: ", response.data);
      setBookingsData(response.data.data);
      setLoading(false);
    } catch (error) {
      console.log("fetch bookings error", error);
    }
  };

  useEffect(() => {
    getMyBookings();
    console.log("username booking: ", username);
  }, [username]);

  useEffect(() => {
    setLoading(true);
  }, []);

  // ==========================================
  const renderBookings = ({ item }) => (
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
      <View style={styles.singleDetail}>
        <Text style={styles.text}>Seat number: </Text>
        <Text style={styles.text}>{item.seatNumber}</Text>
      </View>
    </View>
  );
  // ==============================
  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Welcome, {username}</Text>
          <TouchableOpacity
            onPress={() => {
              signout();
              router.replace("/");
            }}
          >
            <Text style={[styles.headerText, { color: "red" }]}>Logout</Text>
          </TouchableOpacity>
        </View>
        {/* show all trains */}
        <View style={styles.allTrainsView}>
          <Text style={styles.allTrains}>My bookings</Text>
          <View style={styles.trainContainer}>
            {loading ? (
              <ActivityIndicator size="large" color="#007bff" />
            ) : (
              <View>
                {bookingsData && (
                  <FlatList
                    data={bookingsData}
                    renderItem={renderBookings}
                    keyExtractor={(item) => item._id}
                    contentContainerStyle={styles.listContainer}
                    showsVerticalScrollIndicator={false}
                  />
                )}
                {bookingsData.length === 0 && (
                  <View style={styles.noBookingsContainer}>
                    <Text style={styles.noBookings}>No bookings</Text>
                  </View>
                )}
              </View>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

export default myBookings;

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
    marginVertical: 30,
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
    marginBottom: 15,
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
    // backgroundColor: "#f8f9fa",
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
  noBookingsContainer: {
    // flex: 1,
    height: "100%",
    width: "100%",
    // backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
    // marginTop: 100,
  },
  noBookings: {
    fontSize: 40,
  },
  trainDetailsContainer: {
    backgroundColor: "white",
    padding: 18,
    borderRadius: 20,
    gap: 10,
    borderColor: "black",
    marginBottom: 20,
    borderWidth: 1,
  },
  singleDetail: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    fontSize: 18,
  },
});
