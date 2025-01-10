import { Stack } from "expo-router/stack";
import { theme } from "../constants/theme";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="admin/index"
        options={{
          title: "Admin",
          headerStyle: {
            backgroundColor: "#1e28ff",
          },
          headerTintColor: "white",
          headerTitleAlign: "center",
          // headerShown: false,
        }}
      />
      <Stack.Screen
        name="guest/index"
        options={{
          title: "Guest",
          headerStyle: {
            backgroundColor: theme.colors.primary,
          },
          headerTintColor: "white",
          headerTitleAlign: "center",
          // headerShown: false,
        }}
      />
      <Stack.Screen
        name="guest/register"
        options={{
          title: "Guest register",
          headerStyle: {
            backgroundColor: theme.colors.primary,
          },
          headerTintColor: "white",
          headerTitleAlign: "center",
          // headerShown: false,
        }}
      />
      <Stack.Screen
        name="guest/guestHome"
        options={{
          // title: "Guest home",
          // headerStyle: {
          //   backgroundColor: theme.colors.primary,
          // },
          // headerTintColor: "white",
          // headerTitleAlign: "center",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="admin/addTrain"
        options={{
          title: "Add train",
          // headerStyle: {
          //   backgroundColor: theme.colors.primary,
          // },
          // headerTintColor: "white",
          headerTitleAlign: "center",
          // headerShown: false,
        }}
      />
      <Stack.Screen
        name="guest/myBookings"
        options={{
          // title: "Add train",
          // headerStyle: {
          //   backgroundColor: theme.colors.primary,
          // },
          // headerTintColor: "white",
          // headerTitleAlign: "center",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="guest/bookingPage"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="admin/adminHome"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
