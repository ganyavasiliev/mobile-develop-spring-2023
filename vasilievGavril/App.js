import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  Modal,
  StyleSheet,
  Button,
  Text,
  Pressable,
  SafeAreaView,
  View,
  Image,
  Alert,
} from "react-native";
import Ionic from "react-native-vector-icons/Ionicons";
import HomeScreen from "./screens/HomeScreen";
import GiftScreen from "./screens/GiftScreen";
import ClickerScreen from "./screens/ClickerScreen";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import apollo from "./apollo";
import { Provider } from "react-redux";
import store from "./redux/store";

const client = new ApolloClient({
  uri: "https://countries.trevorblades.com/graphql",
  cache: new InMemoryCache(),
});

const App = () => {
  const Tab = createBottomTabNavigator();
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, size, colour }) => {
                let iconName;
                if (route.name === "Home") {
                  iconName = focused ? "ios-home" : "ios-home-outline";
                  size = focused ? size + 8 : size + 5;
                } else if (route.name === "Gifts") {
                  iconName = focused ? "aperture-sharp" : "aperture-outline";
                  size = focused ? size + 8 : size + 5;
                } else if (route.name === "Clicker") {
                  iconName = focused
                    ? "ios-paper-plane-sharp"
                    : "ios-paper-plane-outline";
                  size = focused ? size + 8 : size + 5;
                } else if (route.name === "Apollo") {
                  iconName = focused ? "airplane-sharp" : "airplane-outline";
                  size = focused ? size + 8 : size + 5;
                }

                return <Ionic name={iconName} size={size} colour={colour} />;
              },
            })}
            tabBarOptions={{
              activeTintColor: "black",
              inactiveTintColor: "black",
              showLabel: true,
            }}
          >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Gifts" component={GiftScreen} />
            <Tab.Screen name="Clicker" component={ClickerScreen} />
            <Tab.Screen name="Apollo" component={apollo} />
          </Tab.Navigator>
        </NavigationContainer>
      </Provider>
    </ApolloProvider>
  );
};

export default App;
