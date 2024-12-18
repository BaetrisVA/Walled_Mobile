import { useState } from "react";
import { View, Text, StyleSheet, TextInput, ScrollView, Alert } from "react-native";
import Input from "../../components/Input"; 
import Amount from "../../components/Amount"; 
import Button from "../../components/Button"; 
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from "expo-router";

export default function Transfer({ route }) {
    const [accountNumber, setAccountNumber] = useState('');
    const [notes, setNotes] = useState('');
    const [amount, setAmount] = useState('');

    const handleTransfer = async () => {
        console.log(amount, notes,accountNumber, "amount dan notes");
    if (!amount || !notes || !accountNumber) {
      Alert.alert("Error", "Please fill in both accountNumber, amount, and notes");
      return;
    }

        try {
        const token = await AsyncStorage.getItem("token");
        if (token){
            console.log(token, "token");
            try {
                console.log("transfer!", amount, notes, accountNumber);
                const response = await axios.post("https://walled-api.vercel.app/transactions/transfer", {
                amount: amount,
                recipientWalletId: accountNumber,
                description: notes,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 201) {
                Alert.alert("Success", "Transaction succesful!");
                router.navigate("/(home)")
              } else {
                Alert.alert("Error", "Transaction failed");
                console.log(response);
              }
            } catch (error) {
                console.log("error", error.response)
              Alert.alert("Error", "Failed to perform the transaction");
              console.log(error);
            }
          }
        } catch (error) {
          console.log(error, "gagal mengambil token!");
        }
      };
    

    return (
        <ScrollView style={{ flex: 1, backgroundColor: '#ddd' }}>
            <View style={{ backgroundColor: '#19918F', paddingHorizontal: 20, paddingVertical: 8, width: '100%', flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ color: '#fff', fontSize: 18 }}>To:</Text>
                <TextInput
                    style={{ fontSize: 18, color: '#fff', flex: 1, marginLeft: 10 }}
                    keyboardType="number-pad"
                    placeholder="insert account number"
                    placeholderTextColor={'#fff'}
                    value={accountNumber}
                    onChangeText={setAccountNumber}
                />
            </View>
            <View style={styles.container}>
                <View>
                    <Amount showBalance={true} marginBottom={24} balance={"10.000.000"} 
                    text={"Amount"}
                    value={amount}
                    setValue={setAmount}
                    keyboardType="numeric"/>
                    <Input
                        text={"Notes"}
                        value={notes}
                        onChangeText={(text) => setNotes(text)}
                    />
                    {/* <Input
                        text={"Amount"}
                        value={amount}
                        onChangeText={setAmount}
                        keyboardType="numeric"
                    /> */}
                </View>
                <Button marginTop={240} marginBottom={20} text="Transfer" onPress={handleTransfer} />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'space-between',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },
});