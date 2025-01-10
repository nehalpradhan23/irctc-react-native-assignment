import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams, useRouter, useSearchParams } from "expo-router";
import { hp } from "@/helpers/common";
import axios from "axios";

const bookingPage = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [loading, setLoading] = useState(false);
  // console.log("booking page", params);
  const {
    trainName,
    source,
    destination,
    seatCapacity,
    sourceDate,
    sourceTime,
    destDate,
    destTime,
    username,
  } = params;

  const handleConfirmBooking = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${process.env.EXPO_PUBLIC_APIURL}/(api)/bookTrain`,
        {
          username,
          trainName,
          source,
          destination,
          seatCapacity,
          sourceDate,
          sourceTime,
          destDate,
          destTime,
        }
      );
      console.log("book train response", response.data);
      if (response.data.data) {
        setLoading(false);
        Alert.alert("Train booked successfully");
        router.replace("/guest/myBookings");
      } else {
        Alert.alert(response.data.message);
      }
    } catch (error) {
      console.log("Booking train error", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Booking page</Text>
      </View>
      {/* <View style={styles.header}>
        <Text style={styles.headerText}>{params.username}</Text>
      </View> */}
      <View style={styles.trainDetailsContainer}>
        <View style={styles.singleDatail}>
          <Text style={styles.text}>Train Name: </Text>
          <Text style={styles.text}>{params.trainName}</Text>
        </View>
        <View style={styles.singleDatail}>
          <Text style={styles.text}>Source: </Text>
          <Text style={styles.text}>{params.source}</Text>
        </View>
        <View style={styles.singleDatail}>
          <Text style={styles.text}>Destination: </Text>
          <Text style={styles.text}>{params.destination}</Text>
        </View>
        <View style={styles.singleDatail}>
          <Text style={styles.text}>Seat capacity: </Text>
          <Text style={styles.text}>{params.seatCapacity}</Text>
        </View>
        <View style={styles.singleDatail}>
          <Text style={styles.text}>Source date: </Text>
          <Text style={styles.text}>
            {new Date(params.sourceDate).toDateString()}
          </Text>
        </View>
        <View style={styles.singleDatail}>
          <Text style={styles.text}>Source Time: </Text>
          <Text style={styles.text}>
            {new Date(params.sourceTime).toLocaleTimeString()}
          </Text>
        </View>
        <View style={styles.singleDatail}>
          <Text style={styles.text}>Destination Date: </Text>
          <Text style={styles.text}>
            {new Date(params.destDate).toDateString()}
          </Text>
        </View>
        <View style={styles.singleDatail}>
          <Text style={styles.text}>Destination Time: </Text>
          <Text style={styles.text}>
            {new Date(params.destTime).toLocaleTimeString()}
          </Text>
        </View>
      </View>
      <View>
        <TouchableOpacity
          style={styles.confirmBooking}
          onPress={() => handleConfirmBooking()}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator />
          ) : (
            <Text style={styles.confirmBookingText}>Confirm booking</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default bookingPage;

const styles = StyleSheet.create({
  mainContainer: {
    padding: 15,
    width: "100%",
  },
  header: {
    marginVertical: 15,
  },
  headerText: {
    fontSize: 30,
    fontWeight: "bold",
  },
  trainDetailsContainer: {
    backgroundColor: "white",
    padding: 18,
    borderRadius: 20,
    gap: 20,
    borderColor: "black",
    marginBottom: 20,
  },
  singleDatail: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    fontSize: 20,
  },
  confirmBooking: {
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
  confirmBookingText: {
    fontSize: 25,
  },
});
