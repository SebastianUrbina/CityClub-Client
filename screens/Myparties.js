import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import FooterMenu from "../components/Menus/FooterMenu";
import axios from "axios";
import PartyCard from "../components/PartyCard";

const Myparties = () => {
  //State
  const [parties, setParties] = useState([]);
  const [loadin, setLoading] = useState(false);

  //Get Parties
  const getUserParties = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/party/get-user-parties");
      setLoading(false);
      setParties(data?.userParties);
    } catch (error) {
      setLoading(false);
      console.log(error);
      alert(error);
    }
  };

  //Initial
  useEffect(() => {
    getUserParties();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.secondContainer}>
        <PartyCard parties={parties} myPartyScreen={true}></PartyCard>
        {/*<Text>{JSON.stringify(parties, null, 4)}</Text>*/}
      </ScrollView>
      <View>
        <FooterMenu />
      </View>
    </View>
  );
};

export default Myparties;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#430f58",
  },
  secondContainer: {
    margin: 10,
  },
});
