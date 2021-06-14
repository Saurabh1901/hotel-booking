import axios from "axios";
import React, { Component } from "react";
import {
  Text,
  View,
  ImageBackground,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Button } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HotelItem = ({ navigation, hotel }) => {
  const {
    _id: hotelId,
    name,
    price,
    city,
    bannerImage: image,
    country,
  } = hotel;

  const bookNow = async () => {
    const userId = await AsyncStorage.getItem("user_id");
    const selectedDate = await AsyncStorage.getItem("date");

    axios
      .post("http://localhost:8080/bookings", {
        hotel: hotelId,
        bookedBy: userId,
        bookedOn: selectedDate,
      })
      .then((response) => {
        if (response && response.data && response.data.success) {
          navigation.navigate("MyBooking");
        }
      });
  };

  return (
    <View style={styles.hotelContainer}>
      <ImageBackground source={{ uri: image }} style={styles.image} />

      <View style={styles.titles}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.price}>
          {price}{" "}
          <Text style={styles.place}>
            {city} {country}
          </Text>
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        {/* <StyledButton type="primary"
          content={"Pick Date"}
          onPress={() => {
            console.warn("Pick Date was pressed")
          }} /> */}
        <Button
          color="#171A20"
          type="secondary"
          containerStyle={styles.button}
          title="Book Now"
          onPress={bookNow}
        />
      </View>
    </View>
  );
};

export default HotelItem;

const styles = StyleSheet.create({
  hotelContainer: {
    width: "100%",
    height: Dimensions.get("window").height,
    alignItems: "center",
  },
  titles: {
    marginTop: "30%",
    alignItems: "center",
  },
  name: {
    fontSize: 40,
    fontWeight: "500",
  },
  price: {
    marginTop: "1 %",
    color: "#5c5e62",
  },
  place: {
    textDecorationLine: "underline",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    position: "absolute",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 50,
    borderRadius: 20,
    width: 300,
    backgroundColor: "#FFFFFFA6",
    color: "#ffffff",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    fontSize: 12,
    fontWeight: "500",
    textTransform: "uppercase",
    color: "#ffffff",
  },
});
