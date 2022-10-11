import * as React from "react";
import { View, TextInput, StyleSheet, Button, Alert, Text } from "react-native";

const Screen2 = ({ route, navigation }: any) => {
  const { item } = route.params;
  return (
    <View testID="Raw JSON" style={styles.screen}>
      <Text style={styles.heading}>Raw Json</Text>
      <Text> {item}</Text>
    </View>
  );
};
export default Screen2;

const styles = StyleSheet.create({
  screen: {
    padding: 10,
    backgroundColor: "white",
    // flexDirection: "row",
    // justifyContent: "space-evenly",
    // alignItems: "center",
    // marginVertical: 10,
    // flexWrap: "wrap",
  },
  heading: {
    color: "black",
    marginTop: 20,
    fontWeight: "bold",
    fontSize: 20,
    marginLeft: 130,
  },
});
