import {
  Alert,
  Button,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { hp } from "@/helpers/common";

import DateTimePicker from "@react-native-community/datetimepicker";
import axios from "axios";
import { useRouter } from "expo-router";

const addTrain = () => {
  const [trainName, setTrainName] = useState("");
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [seatCapacity, setSeatCapacity] = useState(0);

  const [sourceDate, setSourceDate] = useState(new Date());
  const [sourceTime, setSourceTime] = useState(new Date());
  const [destDate, setDestDate] = useState(new Date());
  const [destTime, setDestTime] = useState(new Date());

  const [showSourceDatePicker, setShowSourceDatePicker] = useState(false);
  const [showSourceTimePicker, setShowSourceTimePicker] = useState(false);
  const [showDestinationDatePicker, setShowDestinationDatePicker] =
    useState(false);
  const [showDestinationTimePicker, setShowDestinationTimePicker] =
    useState(false);

  // console.log(sourceDate);
  const router = useRouter();

  // ============================
  const onDateChange = (
    event,
    selectedDate,
    setDateCallback,
    setShowCallback
  ) => {
    if (Platform.OS === "android") setShowCallback(false); // Close the picker on Android
    if (selectedDate) setDateCallback(selectedDate);
  };

  // ====================================================
  const handleAddTrain = async () => {
    if (
      trainName.length < 1 ||
      source.length < 1 ||
      destination.length < 1 ||
      seatCapacity < 1
    ) {
      Alert.alert("Fill details");
      return;
    }

    console.log(
      "details: ",
      trainName,
      source,
      destination,
      seatCapacity,
      sourceDate.toDateString(),
      sourceTime.toLocaleTimeString(),
      destDate.toDateString(),
      destTime.toLocaleTimeString()
    );

    try {
      const response = await axios.post(
        "http://192.168.0.108:8081/(api)/addTrain",
        {
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
      console.log("add train response", response.data);
      if (response.data.data) {
        Alert.alert("Train added successfully");
        router.replace("/admin/adminHome");
      } else {
        Alert.alert(response.data.message);
      }
    } catch (error) {
      console.log("adding train error", error.message);
    }
  };
  // ==============================================
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.inputView}>
          <View style={styles.fields}>
            <Text style={styles.title}>Train name: </Text>
            <TextInput
              style={styles.textInput}
              placeholder="Train name"
              onChange={(e) => setTrainName(e.nativeEvent.text)}
            />
          </View>
          <View style={styles.fields}>
            <Text style={styles.title}>Source: </Text>
            <TextInput
              style={styles.textInput}
              placeholder="Source"
              onChange={(e) => setSource(e.nativeEvent.text)}
            />
          </View>
          <View style={styles.fields}>
            <Text style={styles.title}>Destination: </Text>
            <TextInput
              style={styles.textInput}
              placeholder="Destination"
              onChange={(e) => setDestination(e.nativeEvent.text)}
            />
          </View>
          <View style={styles.fields}>
            <Text style={styles.title}>Seat capacity: </Text>
            <TextInput
              style={styles.textInput}
              placeholder="Seat capacity"
              onChange={(e) => setSeatCapacity(e.nativeEvent.text)}
            />
          </View>
          {/* date and time ------------------------------------- */}
          <View style={styles.fields}>
            <Text style={styles.title}>Arrival time at source: </Text>
            <View style={styles.timeAndDateContainer}>
              <View style={styles.timeAndDate}>
                <Button
                  title="Select date"
                  onPress={() => setShowSourceDatePicker(true)}
                />
                <Text>{sourceDate.toDateString()}</Text>
                {showSourceDatePicker && (
                  <DateTimePicker
                    value={sourceDate}
                    mode="date"
                    display="default"
                    onChange={(e, date) =>
                      onDateChange(
                        e,
                        date,
                        setSourceDate,
                        setShowSourceDatePicker
                      )
                    }
                  />
                )}
              </View>
              {/* arrival time at source ------------------- */}
              <View style={styles.timeAndDate}>
                <Button
                  title="Select time"
                  onPress={() => setShowSourceTimePicker(true)}
                />
                <Text>{sourceTime.toLocaleTimeString()}</Text>
              </View>
              {showSourceTimePicker && (
                <DateTimePicker
                  value={sourceTime}
                  mode="time"
                  display="default"
                  onChange={(e, time) =>
                    onDateChange(
                      e,
                      time,
                      setSourceTime,
                      setShowSourceTimePicker
                    )
                  }
                />
              )}
            </View>
          </View>
          {/* ====================================== */}
          <View style={styles.fields}>
            <Text style={styles.title}>Arrival time at destination: </Text>
            <View style={styles.timeAndDateContainer}>
              <View style={styles.timeAndDate}>
                {/* dest time ======================= */}
                <Button
                  title="Select date"
                  onPress={() => setShowDestinationDatePicker(true)}
                />
                <Text>{destDate.toDateString()}</Text>
                {showDestinationDatePicker && (
                  <DateTimePicker
                    value={destDate}
                    mode="date"
                    display="default"
                    onChange={(e, date) =>
                      onDateChange(
                        e,
                        date,
                        setDestDate,
                        setShowDestinationDatePicker
                      )
                    }
                  />
                )}
              </View>
              <View style={styles.timeAndDate}>
                <Button
                  title="Select time"
                  onPress={() => setShowDestinationTimePicker(true)}
                />
                <Text>{destTime.toLocaleTimeString()}</Text>
                {showDestinationTimePicker && (
                  <DateTimePicker
                    value={destTime}
                    mode="time"
                    display="default"
                    onChange={(e, time) =>
                      onDateChange(
                        e,
                        time,
                        setDestTime,
                        setShowDestinationTimePicker
                      )
                    }
                  />
                )}
              </View>
            </View>
          </View>
        </View>
        <View style={{ paddingVertical: 20 }}>
          <TouchableOpacity
            style={styles.addNewTrainBtn}
            onPress={() => handleAddTrain()}
          >
            <Text style={{ fontSize: 25 }}>Add Train</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default addTrain;

const styles = StyleSheet.create({
  container: {
    // padding: 15,
    margin: 10,
  },
  inputView: {
    backgroundColor: "lightgray",
    padding: 15,
    borderRadius: 10,
    gap: 15,
  },
  fields: {
    gap: 10,
  },
  title: {
    fontSize: 20,
  },
  textInput: {
    backgroundColor: "white",
  },
  timeAndDateContainer: {
    // flexDirection: "row",
    gap: 20,
    width: "100%",
  },
  timeAndDate: {
    flexDirection: "row",
    gap: 20,
    width: "100%",
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
    backgroundColor: "skyblue",
  },
});
