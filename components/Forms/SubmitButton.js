import { Button, StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";

const SubmitButton = ({ handleSubmit, btnTitle, loading}) => {
  return (
    <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
      <Text style={styles.btnText}>{loading ? "Please Wait" :btnTitle}</Text>
    </TouchableOpacity>
  );
};

export default SubmitButton;

const styles = StyleSheet.create({
  submitBtn: {
    backgroundColor: "#59a985",
    height: 50,
    marginHorizontal: 25,
    borderRadius: 80,
    justifyContent: "center",
    marginBottom: 20,
  },
  btnText: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "400",
  },
});
