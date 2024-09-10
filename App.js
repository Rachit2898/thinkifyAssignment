import React from "react";
import { StyleSheet, AppRegistry, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Provider } from "react-redux";
import store from "./src/redux/store/store";
import DashBoard from "./src/dashBoard";
import Matches from "./src/matches";
import PointsTable from "./src/pointsTable";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const DashboardStack = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Dashboard"
        component={DashBoard}
        options={{
          headerLeft: () => (
            <Button onPress={() => navigation.toggleDrawer()} title="Menu" />
          ),
        }}
      />
      <Stack.Screen
        name="matches"
        component={Matches}
        options={{
          headerLeft: () => (
            <Button onPress={() => navigation.goBack()} title="Back" />
          ),
          title: "Matches",
        }}
      />
    </Stack.Navigator>
  );
};

const AppDrawer = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        gestureEnabled: false,
        headerShown: false,

        drawerType: "front",
      }}
    >
      <Drawer.Screen name="Home" component={DashboardStack} />
      <Drawer.Screen
        options={({ navigation }) => ({
          headerShown: true,
          headerTitle: "Points Table",
          headerLeft: () => (
            <Button onPress={() => navigation.goBack()} title="Back" />
          ),
          swipeEnabled: false,
        })}
        name="Points Table"
        component={PointsTable}
      />
    </Drawer.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <AppDrawer />
      </Provider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
