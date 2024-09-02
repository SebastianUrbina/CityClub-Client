import { StyleSheet, View } from "react-native";
import React, { useContext } from "react";
import Register from "../../screens/auth/Register";
import Login from "../../screens/auth/Login";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../../screens/Home";
import { AuthContext } from "../../context/authContext";
import HeaderMenu from "./HeaderMenu";
import Post from "../../screens/Post";
import Account from "../../screens/Account";
import Myparties from "../../screens/Myparties";

const ScreenMenu = () => {
  //Global State
  const [state] = useContext(AuthContext);
  //auth condition true false
  const authenticatedUser = state?.user && state?.token;

  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator initialRouteName="Login">
      {authenticatedUser ? (
        <>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ 
              title: "City Club",
              headerStyle: {
                backgroundColor: "#240747",
              },
              headerTintColor: "#0092ca",
              headerRight: () => <HeaderMenu />,
             }}
          />
          <Stack.Screen
            name="Post"
            component={Post}
            options={{ 
              title: "Add",
              headerStyle: {
                backgroundColor: "#240747",
              },
              headerTintColor: "#0092ca",
              headerRight: () => <HeaderMenu />,
             }}
          />
          <Stack.Screen
            name="Myparties"
            component={Myparties}
            options={{ 
              title: "My Parties",
              headerStyle: {
                backgroundColor: "#240747",
              },
              headerTintColor: "#0092ca",
              headerRight: () => <HeaderMenu />,
             }}
          />
          <Stack.Screen
            name="Account"
            component={Account}
            options={{ 
              title: "Account",
              headerStyle: {
                backgroundColor: "#240747",
              },
              headerTintColor: "#0092ca",
              headerRight: () => <HeaderMenu />,
             }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Register"
            component={Register}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default ScreenMenu;

const styles = StyleSheet.create({});
