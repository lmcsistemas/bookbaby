import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, SnapshotViewIOSBase, FlatList } from 'react-native';
import firebase from '../../../firebaseConnection';
import 'firebase/auth';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Cadastro() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [usuarios, setUsuarios] = useState([]);

 // LogBox.ignoreAllLogs(disable);

  async function cadastrar(){
    await firebase.auth().createUserWithEmailAndPassword(email, senha)
    .then( (value) => {
        alert('Usuário cadastrado '+ value.user.email );
    })
    .catch( (error) => {
       console.log('errors ', error);
       alert('Algo deu errado.');
    })
    
  }

  async function login(){

    await firebase.auth().signInWithEmailAndPassword(email, senha)
    .then((value) => {
        alert('bem vindo : '+value.user.email);
    })
    .catch((error) => {
        alert('usuario inválido')
        return
    })    
  }

 return (
   <View style={styles.container}>
    
    <View style={styles.areaCampos}>
      <Text style={styles.label}>Email:</Text>
      <TextInput 
        autoCapitalize='none'
        style={ styles.input}
        underlineColorAndroid='transparent'
        onChangeText={ (texto) => setEmail(texto) }
      />

      <Text style={styles.label}>Senha:</Text>
      <TextInput 
        secureTextEntry={true}
        style={styles.input }
        underlineColorAndroid='transparent'
        onChangeText={ (texto) => setSenha(texto) }
      />
      <TouchableOpacity style={styles.btn} onPress={cadastrar}>
        <Text style={styles.txtBtn}>Gravar</Text>
      </TouchableOpacity>
    </View>

   </View>
  );
}

const styles = StyleSheet.create({
  container:{
      padding:10,
      backgroundColor:'#fff',
      flex:1
  },
  areaCampos:{
    padding:10,
    justifyContent:'center'
  },
  input:{
    borderWidth:1,
    borderColor:'#ccc',
    width:'100%',
    marginBottom:5,
    borderRadius:10
  },
  label:{
      marginTop:5,
      marginLeft:10,
      fontWeight:'bold'
  },
  btn:{
    height:40,
    width:'100%',
    backgroundColor:'#ccc',
    borderRadius:7,
    marginTop:15,
    alignItems:'center',
    justifyContent:'center'
  },
  txtBtn:{
      color:'#000',
      fontWeight:'bold'
  }
})