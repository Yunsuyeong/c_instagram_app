import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { LogUserOut } from "../apollo";

const Search = ({ navigation }) => {
  return (
    <View
      style={{
        backgroundColor: "black",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TouchableOpacity onPress={() => LogUserOut()}>
        <Text style={{ color: "white" }}>Photo</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Search;
