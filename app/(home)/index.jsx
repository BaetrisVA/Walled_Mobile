import { Link, Stack, useRouter } from "expo-router"; // Impor useRouter
import {
  Image,
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  FlatList,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useEffect, useState } from "react";
import React from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";
// import Topup from "./topup";
// import Transfer from "./transfer";

function LogoTitle({ user }) {
  const [isAvatarActive, setIsAvatarActive] = useState(false);

  console.log("USER", user);

  return (
    <TouchableOpacity
      style={[
        styles.avatarContainer,
        { borderColor: isAvatarActive ? "#178F8D" : "#fafbfd" },
      ]}
      onPress={() => setIsAvatarActive((prev) => !prev)}
      activeOpacity={0.8}
    >
      <Image style={styles.image} source={{ uri: user?.avatar_url }} />
    </TouchableOpacity>
  );
}

export default function Home() {
  const [showBalance, setShowBalance] = useState(true);
  const [user, setUser] = useState({});
  const [refreshing, setRefreshing] = useState(false); // State untuk refreshing
  const [transactions, setTransactions] = useState([]); // State untuk riwayat transaksi
  const router = useRouter(); // Dapatkan fungsi navigasi
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("token");
      if (value !== null) {
        const res = await axios.get("https://walled-api.vercel.app/profile", {
          headers: {
            Authorization: `Bearer ${value}`,
          },
        });
        const user = res.data.data;
        setUser(user);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const fetchTransactionHistory = async () => {
    try {
      const value = await AsyncStorage.getItem("token");
      const response = await axios.get(
        "https://walled-api.vercel.app/transactions",
        {
          headers: {
            Authorization: `Bearer ${value}`,
          },
        }
      );
      console.log(response.data.data);
      setTransactions(response.data.data); // Set data transaksi
    } catch (error) {
      console.error("Fetch transactions error:", error);
    }
  };

  const onTransactionComplete = (newTransaction) => {
    setTransactions((prevTransactions) => [
      newTransaction,
      ...prevTransactions,
    ]); // Tambahkan transaksi baru ke riwayat
  };

  useEffect(() => {
    getData();
    fetchTransactionHistory();
    onTransactionComplete();
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getData();

    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <ScrollView
      containerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} /> // Tambahkan RefreshControl
      }
    >
      <View style={styles.header}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <LogoTitle user={user} />
          <View>
            {user?.fullname && (
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                {user.fullname}
              </Text>
            )}
            {/* <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{user.fullname}</Text> */}
            <Text style={{ fontSize: 18, width: "100%" }}>
              Personal Account
            </Text>
            <Text style={{ fontSize: 18 }}>{user.typeofaccount}</Text>
          </View>
        </View>
        <Image source={require("../../assets/suntoggle.png")} />
      </View>
      <View style={{ backgroundColor: "#FAFBFD", paddingHorizontal: 23 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingTop: 25,
            justifyContent: "space-between",
          }}
        >
          <View style={{ width: "70%" }}>
            {user?.fullname && (
              <Text
                style={{ fontSize: 22, fontWeight: "bold", marginBottom: 8 }}
              >
                Good Morning, {user.fullname}
              </Text>
            )}
            <Text style={{ fontSize: 18 }}>
              Check all your incoming and outgoing transactions here
            </Text>
          </View>
          <Image
            source={require("../../assets/sun.png")}
            style={{ width: 81, height: 77 }}
          />
        </View>

        <View style={styles.accountnumber}>
          <Text style={{ color: "#fff", fontSize: 18 }}>Account No.</Text>
          <Text style={{ fontWeight: "bold", color: "#fff", fontSize: 18 }}>
            {user.wallet?.account_number}
          </Text>
        </View>

        <View style={styles.balancebox}>
          <View>
            <Text style={{ color: "black", fontSize: 18 }}>Balance</Text>
            <View style={{ gap: 2 }}>
              <Text style={{ fontSize: 22, fontWeight: "bold" }}>
                {showBalance
                  ? `Rp ${parseFloat(user.wallet?.balance).toLocaleString(
                      "id-ID",
                      { minimumFractionDigits: 2, maximumFractionDigits: 2 }
                    )}`
                  : "Rp ****"}
                <TouchableOpacity
                  onPress={() => setShowBalance((prev) => !prev)}
                >
                  <Image
                    source={require("../../assets/view.png")}
                    style={{ width: 18, height: 18, marginLeft: 10 }}
                  />
                </TouchableOpacity>
              </Text>
            </View>
          </View>
          <View>
            <View style={{ gap: 20 }}>
              <TouchableOpacity
                style={{
                  width: 40,
                  height: 40,
                  backgroundColor: "#19918F",
                  borderRadius: 10,
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onPress={() => router.push("/topup")} // Navigasi ke halaman Topup
              >
                <FontAwesome6 size={18} name="add" color={"#fff"} />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: 40,
                  height: 40,
                  backgroundColor: "#19918F",
                  borderRadius: 10,
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onPress={() => router.push("/transfer")} // Navigasi ke halaman Transfer
              >
                <FontAwesome size={18} name="send" color={"#fff"} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <ScrollView
          style={{
            flex: 1,
            backgroundColor: "#fff",
            marginTop: 40,
            borderRadius: 10,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              padding: 20,
              borderBottomColor: "#b3b3b3",
              borderBottomWidth: 0.5,
            }}
          >
            Transaction History
          </Text>
          {transactions?.map((transaction) => {
            const isTopup = transaction?.transaction_type === "top-up";
            const isTransferToUser =
              transaction?.recipient_id === transaction?.recipient_wallet_id; // Transfer masuk ke user
            const isTransferFromUser =
              transaction?.transaction_type === "transfer" &&
              transaction?.recipient_id !== transaction?.recipient_wallet_id; // Transfer keluar dari user
            let textColor = isTopup || isTransferToUser ? "green" : "red"; // Hijau untuk top-up atau transfer masuk, merah untuk transfer keluar

            let sign = isTopup || isTransferToUser ? "+" : "-";
            if (isTransferFromUser === true) {
              textColor = "green";
              sign = "+";
            } else if (isTransferToUser === true) {
              textColor = "red";
              sign = "-";
            }
            // Tanda positif untuk top-up/transfer masuk

            return (
              <View
                key={transaction?.transaction_id}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingHorizontal: 20,
                  paddingVertical: 15,
                }}
              >
                <View>
                  <Text style={{ fontSize: 18 }}>
                    {transaction?.recipient_username}
                  </Text>
                  <Text style={{ fontSize: 16 }}>
                    {transaction?.transaction_type}
                  </Text>
                  <Text style={{ fontSize: 14, color: "#b3b3b3" }}>
                    {new Date(transaction?.transaction_date).toLocaleString()}{" "}
                    {/* Format tanggal */}
                  </Text>
                </View>
                <Text
                  style={{
                    fontSize: 18,
                    color: textColor, // Menggunakan warna yang ditentukan
                  }}
                >
                  {sign} Rp{" "}
                  {parseFloat(transaction?.amount).toLocaleString("id-ID")}{" "}
                  {/* Format jumlah */}
                </Text>
              </View>
            );
          })}
        </ScrollView>
      </View>
    </ScrollView>
  );
}

// const user = {
//   fullname: "John Doe",
//   typeofaccount: "Personal Account",
//   accountnumber: "123456789",
//   balance: "10.000.000",
// };

// const transactions = [
//   {
//     id: 1,
//     date: "08 December 2024",
//     amount: "75.000",
//     name: "Indoapril",
//     type: "Topup",
//     debit: false,
//   },
//   {
//     id: 2,
//     date: "06 December 2024",
//     amount: "80.000",
//     name: "Si Fulan",
//     type: "Transfer",
//     debit: true,
//   },
// ];

const styles = StyleSheet.create({
  balancebox: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  accountnumber: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#19918F",
    marginTop: 30,
    marginBottom: 40,
    borderRadius: 10,
  },
  header: {
    width: "100%",
    flexDirection: "row",
    flex: 0,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 23,
    paddingBottom: 12,
    paddingTop: 15,
    backgroundColor: "#fff",
    marginBottom: 0,
  },
  container: {
    flex: 1,
    alignItems: "center",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 9999, // Full circle
  },
  avatarContainer: {
    borderRadius: 9999, // Full circle
    borderWidth: 6,
    cursor: "pointer", // Optional for web
    transition: "all 0.3s", // Optional for web
  },
});
