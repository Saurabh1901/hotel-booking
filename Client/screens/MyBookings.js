import React, { useEffect, useState } from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import { Button, Text, ListItem, Avatar } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
const MyBookings = ({ navigation }) => {
  const [bookings, setBookings] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      const userId = await AsyncStorage.getItem("user_id");
      axios
        .get(`http://localhost:8080/bookings/${userId}`)
        .then((response) => {
          if (response && response.data && response.data.success) {
            setBookings(response.data.payload);
            setIsLoading(false);
          }
        })
        .catch(console.error);
    };
    fetchBookings();
  }, []);

  return isLoading ? (
    <View
      style={{
        backgroundColor: "white",
        flex: 1,
        paddingTop: 50,
        paddingBottom: 20,
        alignItems: "center",
      }}
    >
      <Text h3 style={{ marginBottom: 50 }}>
        My Bookings
      </Text>
      <Text>Loading...</Text>
    </View>
  ) : (
    <View
      style={{
        backgroundColor: "white",
        flex: 1,
        paddingTop: 50,
        paddingBottom: 20,
        alignItems: "center",
      }}
    >
      <Text h3 style={{ marginTop: 15, marginBottom: 40 }}>
        My Bookings
      </Text>
      {bookings.map(
        ({ hotel: { name, city, country, bannerImage } }) => (
          <>
            <ListItem bottomDivider>
              <Avatar
                rounded
                source={{
                  uri: bannerImage,
                }}
              />
              <ListItem.Title style={{ fontWeight: "800" }}>
                {name}
              </ListItem.Title>
              <ListItem.Subtitle>
              {city }, {country}
              </ListItem.Subtitle>
              <View style={{ marginBottom: 20 }} />
            </ListItem>
          </>
        )
      )}
      <View style={styles.buttonContainer}>
        <Button
          title="Go Back"
          onPress={() => {
            navigation.goBack();
          }}
        />
      </View>
    </View>
  );
};

export default MyBookings;

const styles = StyleSheet.create({
  buttonContainer: {
    position: "absolute",
    bottom: 50,
    borderRadius: 20,
    width: 300,
    backgroundColor: "#FFFFFFA6",
    color: "#ffffff",
  }
});
