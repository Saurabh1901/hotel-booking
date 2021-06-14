import axios from "axios";
import React, { useEffect, useState } from "react";
import { Text, View, FlatList, Dimensions } from "react-native";
import HotelItem from "../HotelItem";
import styles from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HotelList = ({ navigation }) => {
  const [hotels, setHotels] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHotels = async () => {
      const selectedDate = await AsyncStorage.getItem("date");
      axios
        .get(`http://localhost:8080/hotels/${selectedDate}`)
        .then((response) => {
          if (response && response.data && response.data.success) {
            setHotels(response.data.payload);
            setIsLoading(false);
          }
        })
        .catch(console.error);
    };
    fetchHotels();
  }, []);

  return isLoading ? (
    <View style={{ marginTop: 150, alignItems: "center" }}>
      <Text>Loading...</Text>
    </View>
  ) : (
    <View>
      <FlatList
        data={hotels}
        renderItem={({ item }) => (
          <HotelItem hotel={item} navigation={navigation} />
        )}
        snapToAlignment={"start"}
        showsVerticalScrollIndicator={"none"}
        decelerationRate={"fast"}
        snapToInterval={Dimensions.get("window").height}
      />
    </View>
  );
};
export default HotelList;
