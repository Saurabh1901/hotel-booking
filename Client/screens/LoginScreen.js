import React, { useState, useLayoutEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { Button, Input, Image } from "react-native-elements";
import { StyleSheet, KeyboardAvoidingView, View } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const signIn = () => {
    axios
      .post("http://localhost:8080/users/verify", {
        username,
        password,
      })
      .then((response) => {
        if (response && response.data && response.data.success) {	
          AsyncStorage.setItem("user_id", response.data.payload._id);
          navigation.navigate("DateAndHistory");
        }
      })
      .catch(() => {
	      console.warn("Invalid Username or Password!")
      });
  };
  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.inputContainer}>
        <Input
          placeholder="Username"
          autoFocus
          type="text"
          value={username}
          onChangeText={(text) => setUsername(text)}
        />
        <Input
          placeholder="Password"
          secureTextEntry
          type="password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          onSubmitEditing={signIn}
        />
      </View>
      <Button
        containerStyle={styles.button}
        disabled={!username || !password}
        onPress={signIn}
        title="Login"
      />
      <Button
        containerStyle={styles.button}
        onPress={() => navigation.navigate("Register")}
        type="outline"
        title="Register"
      />
      <View style={{ height: 100 }}></View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
