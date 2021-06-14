import React, { useState, useLayoutEffect } from "react";
import { StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Button, Input, Text } from "react-native-elements";
import { KeyboardAvoidingView } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const register = () => {
    axios
      .post("http://localhost:8080/users", {
        username,
        password,
      })
      .then((response) => {
        if (response && response.data && response.data.success) {
          AsyncStorage.setItem("user_id", response.data.payload._id);
          navigation.navigate("DateAndHistory");
        }
      })
      .catch(console.warn);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "position"}
      style={styles.container}
    >
      <StatusBar style="light" />
      <Text h3 style={{ marginBottom: 50 }}>
        Create an Account
      </Text>
      <View style={styles.inputContainer}>
        <Input
          placeholder="Username"
          type="text"
          autoFocus
          value={username}
          onChangeText={(text) => setUsername(text)}
        />
        <Input
          placeholder="Password"
          type="password"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
          onSubmitEditing={register}
        />
      </View>
      <Button
        containerStyle={styles.button}
        raised
        title="Register"
        onPress={register}
        disabled={!username || !password}
      />
      <View style={{ height: 100 }} />
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    padding: 10,
  },
  inputContainer: {
    width: 300,
  },
  button: {
    width: 200,
    marginTop: 10,
  },
});
