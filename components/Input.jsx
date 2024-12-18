import { View, StyleSheet, TextInput, Text } from "react-native";

function Input({onChangeText}) {
  return (
    <View style={style.container}>
      <Text style={style.Placeholder}>Notes</Text>
      <TextInput onChangeText={onChangeText} style={style.input} />
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "white",
    width: "100%",
  },
  Placeholder: {
    color: "#B3b3b3",
  },
  input: {
    borderBottomColor: "B3b3b3",
    borderBottomWidth: 0.5,
  },
});

export default Input;
