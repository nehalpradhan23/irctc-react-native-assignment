// import {
//   Alert,
//   Button,
//   Platform,
//   SafeAreaView,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import React, { useState } from "react";
// import { hp } from "@/helpers/common";

// import DateTimePicker from "@react-native-community/datetimepicker";

// const addTrain = () => {
//   const [trainName, setTrainName] = useState("");
//   const [source, setSource] = useState("");
//   const [destination, setDestination] = useState("");
//   const [capacity, setCapacity] = useState(0);

//   const [sourceArrivalDate, setSourceArrivalDate] = useState(new Date());
//   const [sourceArrivalTime, setSourceArrivalTime] = useState(new Date());
//   const [destArrivalDate, setDestArrivalDate] = useState(new Date());
//   const [destArrivalTime, setDestArrivalTime] = useState(new Date());
//   const [mode, setMode] = useState("date");
//   const [show, setShow] = useState(false);

//   const onChange = (e, selectedDate, date, setDate) => {
//     const currentDate = selectedDate || date;
//     setShow(Platform.OS === "ios");
//     setDate(currentDate);
//   };

//   const showMode = (currentMode) => {
//     setShow(true);
//     setMode(currentMode);
//   };

//   const showDatePicker = () => {
//     showMode("date");
//   };

//   const showTimePicker = () => {
//     showMode("time");
//   };

//   const handleAddTrain = () => {
//     if (
//       trainName.length < 1 ||
//       source.length < 1 ||
//       destination.length < 1 ||
//       capacity < 1
//     ) {
//       Alert.alert("Fill details");
//     }
//     console.log("details: ", trainName, source, destination, capacity);
//   };
//   // ==============================================
//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView>
//         <View style={styles.inputView}>
//           <View style={styles.fields}>
//             <Text style={styles.title}>Train name: </Text>
//             <TextInput
//               style={styles.textInput}
//               placeholder="Train name"
//               onChange={(e) => setTrainName(e.nativeEvent.text)}
//             />
//           </View>
//           <View style={styles.fields}>
//             <Text style={styles.title}>Source: </Text>
//             <TextInput
//               style={styles.textInput}
//               placeholder="Source"
//               onChange={(e) => setSource(e.nativeEvent.text)}
//             />
//           </View>
//           <View style={styles.fields}>
//             <Text style={styles.title}>Destination: </Text>
//             <TextInput
//               style={styles.textInput}
//               placeholder="Destination"
//               onChange={(e) => setDestination(e.nativeEvent.text)}
//             />
//           </View>
//           <View style={styles.fields}>
//             <Text style={styles.title}>Seat capacity: </Text>
//             <TextInput
//               style={styles.textInput}
//               placeholder="Seat capacity"
//               onChange={(e) => setCapacity(e.nativeEvent.text)}
//             />
//           </View>
//           {/* date and time ------------------------------------- */}
//           <View style={styles.fields}>
//             <Text style={styles.title}>Arrival time at source: </Text>
//             <View style={styles.timeAndDateContainer}>
//               <View style={styles.timeAndDate}>
//                 <Button title="Select date" />
//                 <Text>datehere</Text>
//               </View>
//               <View style={styles.timeAndDate}>
//                 <Button title="Select time" />
//                 <Text>datehere</Text>
//               </View>
//             </View>
//           </View>
//           <View style={styles.fields}>
//             <Text style={styles.title}>Arrival time at destination: </Text>
//             <View style={styles.timeAndDateContainer}>
//               <View style={styles.timeAndDate}>
//                 <Button title="Select date" />
//                 <Text>datehere</Text>
//               </View>
//               <View style={styles.timeAndDate}>
//                 <Button title="Select time" />
//                 <Text>datehere</Text>
//               </View>
//             </View>
//           </View>
//         </View>
//         <View style={{ paddingVertical: 20 }}>
//           <TouchableOpacity
//             style={styles.addNewTrainBtn}
//             onPress={() => handleAddTrain()}
//           >
//             <Text style={{ fontSize: 25 }}>Add Train</Text>
//           </TouchableOpacity>
//         </View>
//       </ScrollView>
//       {show && (
//         <DateTimePicker testID="datetimepicker" value={date} mode={mode} />
//       )}
//     </SafeAreaView>
//   );
// };

// export default addTrain;

// const styles = StyleSheet.create({
//   container: {
//     // padding: 15,
//     margin: 10,
//   },
//   inputView: {
//     backgroundColor: "lightgray",
//     padding: 15,
//     borderRadius: 10,
//     gap: 15,
//   },
//   fields: {
//     gap: 10,
//   },
//   title: {
//     fontSize: 20,
//   },
//   textInput: {
//     backgroundColor: "white",
//   },
//   timeAndDateContainer: {
//     // flexDirection: "row",
//     gap: 20,
//     width: "100%",
//   },
//   timeAndDate: {
//     flexDirection: "row",
//     gap: 20,
//     width: "100%",
//   },
//   addNewTrainBtn: {
//     // backgroundColor: theme.colors.primary,
//     fontSize: 25,
//     height: hp(6),
//     justifyContent: "center",
//     alignItems: "center",
//     borderCurve: "continuous",
//     borderRadius: 100,
//     // borderRadius: theme.radius.lg,
//     backgroundColor: "skyblue",
//   },
// });
