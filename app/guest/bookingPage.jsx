import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { hp } from "@/helpers/common";
import axios from "axios";

const bookingPage = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [loading, setLoading] = useState(false);
  const [selectedSeatNumber, setSelectedSeatNumber] = useState("");
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

  const handleSeatNumber = (e) => {
    setSelectedSeatNumber(e.nativeEvent.text);
  };

  const handleConfirmBooking = async () => {
    if (!selectedSeatNumber) {
      Alert.alert("Enter seat number");
      return;
    }
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
          seatNumber: selectedSeatNumber,
        }
      );
      console.log("book train response", response.data);
      if (response.data.data) {
        setLoading(false);
        Alert.alert("Train booked successfully");
        router.replace({ pathname: "/guest/myBookings", params: { username } });
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
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView style={styles.mainContainer}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Book your seat</Text>
        </View>
        {/* <View style={styles.header}>
        <Text style={styles.headerText}>{params.username}</Text>
      </View> */}
        <View style={styles.trainDetailsContainer}>
          <View style={styles.singleDetail}>
            <Text style={styles.text}>Train Name: </Text>
            <Text style={styles.text}>{trainName}</Text>
          </View>
          <View style={styles.singleDetail}>
            <Text style={styles.text}>Source: </Text>
            <Text style={styles.text}>{source}</Text>
          </View>
          <View style={styles.singleDetail}>
            <Text style={styles.text}>Destination: </Text>
            <Text style={styles.text}>{destination}</Text>
          </View>
          <View style={styles.singleDetail}>
            <Text style={styles.text}>Seat capacity: </Text>
            <Text style={styles.text}>{seatCapacity}</Text>
          </View>
          <View style={styles.singleDetail}>
            <Text style={styles.text}>Source date: </Text>
            <Text style={styles.text}>
              {new Date(sourceDate).toDateString()}
            </Text>
          </View>
          <View style={styles.singleDetail}>
            <Text style={styles.text}>Source Time: </Text>
            <Text style={styles.text}>
              {new Date(sourceTime).toLocaleTimeString()}
            </Text>
          </View>
          <View style={styles.singleDetail}>
            <Text style={styles.text}>Destination Date: </Text>
            <Text style={styles.text}>{new Date(destDate).toDateString()}</Text>
          </View>
          <View style={styles.singleDetail}>
            <Text style={styles.text}>Destination Time: </Text>
            <Text style={styles.text}>
              {new Date(destTime).toLocaleTimeString()}
            </Text>
          </View>
        </View>
        {/* selecte seat =============================== */}
        <View style={styles.seatNumberInput}>
          <Text style={styles.seatNumberText}>
            Enter seat number for booking:{" "}
          </Text>
          <TextInput
            style={styles.seatNumberInputBox}
            placeholder={`Enter seat number: 1 to ${seatCapacity}`}
            onChange={(e) => handleSeatNumber(e)}
          />
        </View>
        {/* confirm booking button ============================== */}
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
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default bookingPage;

const styles = StyleSheet.create({
  mainContainer: {
    padding: 15,
    width: "100%",
  },
  header: {
    marginVertical: 30,
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
    borderWidth: 1,
  },
  singleDetail: {
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
  seatNumberInput: {
    width: "100%",
    gap: 10,
    // flex: 1,
    marginVertical: 30,
    // flexDirection: "row",
  },
  seatNumberText: {
    fontSize: 25,
  },
  seatNumberInputBox: {
    borderWidth: 1,
    backgroundColor: "white",
    fontSize: 25,
  },
});
