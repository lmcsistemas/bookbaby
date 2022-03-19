import React, {useState, useContext, useEffect } from 'react';
import { StyleSheet, View, Text, Switch, TextInput, ScrollView, TouchableOpacity } from 'react-native';

import colors from '../themes';
import Header from '../../components/Header'

import firebase from '../../../firebaseConnection';
import { useNavigation, useRoute } from '@react-navigation/native'

import { AuthContext } from '../../context/user';


export default function AgendaLista() {

    const route = useRoute();
    const navigation = useNavigation();

    const [almoco, setAlmoco] = useState('');
    const [lanche, setLanche] = useState('');
    const [janta, setJanta] = useState('');
    const [mamou, setMamou] = useState('');
    const [observacoes, setObservacoes] = useState('');

    const {user, criancaSelecionada} = useContext(AuthContext);
    
    useEffect(() =>{   

        async function carregarDados(){       
            let agenda = await firebase.database().ref(`agenda/${route.params?.crianca}/${route.params?.agenda}`).on('value', (snapshot) => {
                setAlmoco((snapshot.val().almoco)? snapshot.val().almoco : '');
                setJanta((snapshot.val().janta)? snapshot.val().janta : '');
                setLanche((snapshot.val().lanche)? snapshot.val().lanche : '');
                setMamou((snapshot.val().mamou)? snapshot.val().mamou : '');
                setObservacoes((snapshot.val().observacao)? snapshot.val().observacao : '');            
                });
            }
        carregarDados();
    }, []);
   
 return (
   <View style={styles.container}>
       <Header nomeTela="Cadastro de Agenda" voltar={() => { navigation.navigate("Agenda") }} />
       <ScrollView style={styles.formulario}>
    
            <Text style={styles.label}>Almoçou:</Text>
            <Text style={ styles.input}> {(almoco == '')? 'Nada consta' : almoco} </Text>

            <Text style={styles.label}>Jantou:</Text>
            <Text style={ styles.input}> {(janta == '')? 'Nada consta' : janta} </Text>

            <Text style={styles.label}>Lanche:</Text>
            <Text style={ styles.input}> {(lanche == '')? 'Nada consta' : lanche} </Text>

            <Text style={styles.label}>Mamou:</Text>
            <Text style={ styles.input}> {(mamou == '')? 'Nada consta' : mamou} </Text>

            <Text style={styles.label}>observações :</Text>
            <Text style={ styles.input}> {(observacoes == '')? 'Nada consta' : observacoes} </Text>

    </ScrollView>
   </View>
  );
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        width:'100%',
        alignItems:'center',
        backgroundColor:colors.fundo
    },
    formulario:{
        width:'100%',
        padding:10,
        
    },
    input:{
        
        
        fontSize:16,
        
        width:'100%',
        marginBottom:5,
        
        backgroundColor:'#fff',
        elevation:2
      },
    label:{
        marginTop:10,
        marginLeft:10,
        fontWeight:'bold'
    },
    areabtn:{
        width:'100%',
        alignItems:'center',
        justifyContent:'center'
    },
    btn:{
        width:100,
        height:40,
        marginTop:15,
        marginBottom:30,
        backgroundColor:colors.textoEscuro,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:10
    },
    txtbtn:{
        color:'#fff',
        fontWeight:'bold'
    }



})