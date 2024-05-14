import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

//CONTEXT
const PartyContext = createContext();

const PartyProvider = ({ children }) => {
  //STATE
  const [loading, setLoading] = useState(false);
  const [party, setParty] = useState([]);

  //Get Parties
  const getAllParties = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("/party/get-all-parties");
      setLoading(false);
      setParty(data?.parties);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  //Initial Parties
  useEffect(() => {
    getAllParties();
  }, []);

  return (
    <PartyContext.Provider value={[party, setParty, getAllParties]}>
      {children}
    </PartyContext.Provider>
  );
};

export { PartyContext, PartyProvider };
