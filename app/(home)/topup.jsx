import { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import Amount from "../../components/Amount";
import Button from "../../components/Button";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Topup({ route }) {
  const [notes, setNotes] = useState("");
  const [amount, setAmount] = useState("");

  const handleNotesChange = (text) => {
    setNotes(text);
  };

  // // Fungsi untuk menambahkan titik setiap ribuan
  // const formatNumber = (text) => {
  //     const cleaned = text.replace(/\D/g, ''); // Menghapus karakter non-digit
  //     return cleaned.replace(/\B(?=(\d{3})+(?!\d))/g, '.'); // Menambahkan titik setiap ribuan
  // };

  const handleAmountChange = (text) => {
    setAmount(text);
  };

  // fungsi untuk menangani aksi saat botton Topup ditekan
  const handleTopUp = async () => {
    console.log(amount, notes, "amount dan notes");
    if (!amount || !notes) {
      Alert.alert("Error", "Please fill in both amount and notes");
      return;
    }

    try {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        console.log(token, "token");
        try {
          console.log("topup!", amount, notes);
          const response = await axios.post(
            "https://walled-api.vercel.app/transactions/topup",
            {
              amount: amount,
              description: notes,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          // if (response.status === 200) {
          //     console.log(response, "hasil response")
          // }
          // else {
          //     console.log('gagal!')
          // }
          // memeriksa respon API
          if (response.status === 201) {
            Alert.alert("Success", "Transaction succesful!");
            // console.log(result);
          } else {
            Alert.alert("Error", "Transaction failed");
            console.log(response);
          }
        } catch (error) {
          Alert.alert("Error", "Failed to perform the transaction");
          console.log(error);
        }
      }
    } catch (error) {
      console.log(error, "gagal mengambil token!");
    }
  };

  return (
    <View style={styles.container}>
      <Amount
        style={styles.inputnote}
        value={amount}
        setValue={setAmount}
        keyboardType="numeric"
      />

      <View style={styles.typebox}>
        <View>
          <Text style={{ fontSize: 20 }}>BYOND Pay</Text>
        </View>
        <View>
          <TouchableOpacity>
            <AntDesign name="down" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      {/* <View style={styles.notebox}>
                <Text style={styles.placeholder}>Amount</Text>
                <TextInput
                    style={styles.inputnote}
                    value={amount}
                    onChangeText={handleAmountChange}
                    keyboardType="numeric"
                />
            </View> */}

      <View style={styles.notebox}>
        <Text style={styles.placeholder}>Notes</Text>
        <TextInput
          style={styles.inputnote}
          value={notes}
          onChangeText={handleNotesChange}
        />
      </View>

      <Button text={"Top Up"} onPress={handleTopUp} marginTop={150} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 20,
    backgroundColor: "#fff",
  },
  notebox: {
    width: "100%",
    padding: 20,
    backgroundColor: "white",
    marginTop: 25,
  },
  typebox: {
    width: "100%",
    backgroundColor: "white",
    padding: 20,
    marginTop: 25,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  placeholder: {
    color: "#B3b3b3",
    fontSize: 16,
  },
  inputnote: {
    fontSize: 16,
    borderBottomColor: "#B3B3B3",
    borderBottomWidth: 0.5,
    width: "100%",
  },
});
