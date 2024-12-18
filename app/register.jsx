import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Modal, Pressable, Alert, ScrollView } from 'react-native';
// import HelloWorld from './components/HelloWorld';
import Button from '../components/Button';
import { useNavigation } from '@react-navigation/native';
import {Link} from 'expo-router';
import Checkbox from 'expo-checkbox';
import { useState } from 'react';

export default function App() {
    const [isChecked, setChecked] = useState(false);
    const navigation = useNavigation(); // Dapatkan objek navigasi
    const [modalVisible, setModalVisible] = useState(false);

    const handleRegister = () => {
      // Logika pendaftaran dapat ditambahkan di sini
      // Setelah pendaftaran berhasil, navigasi kembali ke halaman login
      navigation.navigate('index'); // Ganti 'index' dengan nama rute halaman login Anda
    };
    const handleTnc = () => {
      // Logika pendaftaran dapat ditambahkan di sini
      // Setelah pendaftaran berhasil, navigasi kembali ke halaman login
      navigation.navigate('register'); // Ganti 'index' dengan nama rute halaman login Anda
    };

  return (
    <View style={styles.container}>
      

      <Image source={require('../assets/logo.png')} style={styles.logo} resizeMode='stretch'/>
      

      {/* <HelloWorld/> */}
      <TextInput 
        style={styles.input} 
        placeholder="Full Name" 
        placeholderTextColor="#aaa" 
      />
      
      <TextInput 
        style={styles.input} 
        placeholder="Email" 
        placeholderTextColor="#aaa"  
        keyboardType='email-address'
      />
      <TextInput 
        style={styles.input} 
        placeholder="Password" 
        placeholderTextColor="#aaa" 
        secureTextEntry={true}
      />
      <TextInput 
        style={styles.input} 
        placeholder="Avatar Url" 
        placeholderTextColor="#aaa" 
        
      />
       <View style={styles.tnc}>
        <Checkbox
          style={styles.checkbox}
          value={isChecked}
          onValueChange={setChecked}
          color={isChecked ? "#4630EB" : undefined}
        />
        <Text style={styles.tncText}>I have read and agreee to the </Text>
        <Link href="/tnc">
          <Text style={styles.tncLink}>Terms and Conditions</Text>
          <Text style={styles.bintang}>*</Text>
        </Link>
      </View>
      {/* <Link href="/home">Ke Home</Link> */}
      <Button text="Register" onPress={handleRegister}/>
      <Text style={styles.linkText}>
        Have an account? 
        <Link href="/" style={styles.link}> Login here</Link>
      </Text>
  
      <StatusBar style="auto" hidden/>

      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: 233,
    height: 57,
    marginBottom: 30,
  },
  link:{
    color: '#19918F'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
    fontSize: 16,
  },
  tnc: {
    width: "100%",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flext-start",
    flexWrap: "nowrap",
    textAlign: "left",
    paddingTop: 10,
    paddingBottom: 10,
  },
  tncText: {
    marginLeft: 10,
    fontSize: 12,
  },
  tncLink: {
    color: "#19918F",
    fontSize: 12,
  },
  bintang:{
    color: 'red'
  },
 

  
});
