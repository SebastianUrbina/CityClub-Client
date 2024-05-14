import { StyleSheet, Text, View } from "react-native";
import React from "react";
import FooterMenu from "../components/Menus/FooterMenu";

const About = () => {
    //Global State
  return (
    <View style={styles.container}>
        <Text>About</Text>
      <FooterMenu />
    </View>
  );
};

export default About;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#430f58",
}
});
