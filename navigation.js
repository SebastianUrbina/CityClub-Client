import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { AuthProvider } from "./context/authContext";
import ScreenMenu from "./components/Menus/ScreenMenu";
import { PartyProvider } from "./context/partyContext";

const RootNavigation = () => {
  return (
    <AuthProvider>
      <PartyProvider>
        <ScreenMenu />
      </PartyProvider>
    </AuthProvider>
  );
};

export default RootNavigation;

const styles = StyleSheet.create({});
