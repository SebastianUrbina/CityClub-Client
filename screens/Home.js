import { ScrollView, StyleSheet, View, RefreshControl } from "react-native";
import React, { useContext, useState, useCallback, useEffect } from "react";
import FooterMenu from "../components/Menus/FooterMenu";
import { PartyContext } from "../context/partyContext";
import PartyCard from "../components/PartyCard";

const Home = () => {
  //Global State
  const [parties, getAllParties] = useContext(PartyContext);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {}, [getAllParties]);

  //Refresh Control
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getAllParties();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.containerTwo}
        /*refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }*/
      >
        <PartyCard parties={parties} />
        {/*<Text style={{ color: "#59a985" }}>{JSON.stringify(parties, null, 4)}</Text>*/}
      </ScrollView>
      <View>
        <FooterMenu />
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#430f58",
  },
  containerTwo: {
    margin: 10,
  },
});
