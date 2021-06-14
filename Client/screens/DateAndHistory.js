import React, { useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { Button, Text } from "react-native-elements";
import DatePicker from "@dietime/react-native-date-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
const DateAndHistory = ({ navigation }) => {
  const [date, setDate] = useState();
  const dateSelected = () => {
    AsyncStorage.setItem("date", date.toISOString());
    navigation.navigate("Home");
  };
  const seeBookingHistory = () => {
    navigation.navigate("MyBooking");
  };
  return (
    <ScrollView
      contentContainerStyle={{
        backgroundColor: "white",
        flex: 1,
        marginTop: 0,
        paddingBottom: 20,
        justifyContent: "center",
        padding: 50,
      }}
    >
      <Text h4 style={{ textAlign: "center" }}>
        Choose a date to book or check your previous bookings!
      </Text>
      <View style={{ height: 40 }} />
      <View style={styles.dateContainer}>
        <DatePicker
          value={date}
          onChange={(value) => setDate(value)}
          format="yyyy-mm-dd"
          // startYear = "2021"
          endYear="2121"
        />
        <Text>
          {date
            ? `Selected: ${date.toDateString()}`
            : "Please select a date to proceed with the booking!"}
        </Text>
        <View style={{ height: 40 }} />
      </View>
      <View>
        <Button title="Book a Hotel" onPress={dateSelected} disabled={!date} />
        <View style={{ height: 20 }} />
        <Button title="See Booking History" onPress={seeBookingHistory} />
      </View>
    </ScrollView>
  );
};

export default DateAndHistory;

const styles = StyleSheet.create({
  dateContainer: {},
});
