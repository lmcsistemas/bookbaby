import React, {useState, useContext } from 'react';
import { StyleSheet, View, Text, Switch, TextInput, ScrollView, TouchableOpacity } from 'react-native';

import colors from '../themes';
import Header from '../../components/Header'

import firebase from '../../../firebaseConnection';
import { useNavigation } from '@react-navigation/native'

import { AuthContext } from '../../context/user';


export default function Agenda() {

    const navigation = useNavigation();

    const [almoco, setAlmoco] = useState('');
    const [lanche, setLanche] = useState('');
    const [janta, setJanta] = useState('');
    const [mamou, setMamou] = useState('');
    const [observacoes, setObservacoes] = useState('');

    const {user, criancaSelecionada} = useContext(AuthContext);

    console.log('criancaSelecionada', criancaSelecionada);

    async function gravar(){       

        console.log('criancaSelecionada gravar', criancaSelecionada);
    
        if(almoco == '' && lanche == '' && janta == '' && mamou == '' && observacoes == ''){
            alert("Preencha um campo!");      
        }else{
            let usuarios = await firebase.database().ref(`agenda/${criancaSelecionada.key}`);
            let chave = usuarios.push().key;
      
            usuarios.child(chave).set({
              almoco:almoco,
              janta:janta,
              lanche:lanche,
              mamou:mamou,
              observacoes:observacoes
            })      
            alert("Cadastrado com sucesso!");      
          }    
    }    
 return (
   <View style={styles.container}>
       <Header nomeTela="Cadastro de Agenda" nomeButton="Lista" lista={() => navigation.navigate('AgendaLista')} voltar={() => { navigation.navigate("Inicial") }} />
       <ScrollView style={styles.formulario}>
    
            <Text style={styles.label}>Almoçou:</Text>
            <TextInput 
                multiline={true}
                numberOfLines={5}
                style={ styles.input}
                underlineColorAndroid='transparent'
                onChangeText={ (texto) => { setAlmoco(texto) } }
                value={almoco}
            />

            <Text style={styles.label}>Jantou:</Text>
            <TextInput 
                multiline={true}
                numberOfLines={5}
                style={ styles.input}
                underlineColorAndroid='transparent'
                onChangeText={ (texto) => { setJanta(texto) } }
                value={janta}
            />

            <Text style={styles.label}>Lanche:</Text>
            <TextInput 
                multiline={true}
                numberOfLines={5}
                style={ styles.input}
                underlineColorAndroid='transparent'
                onChangeText={ (texto) => { setLanche(texto) } }
                value={lanche}
            />

            <Text style={styles.label}>Mamou:</Text>
            <TextInput 
                multiline={true}
                numberOfLines={5}
                style={ styles.input}
                underlineColorAndroid='transparent'
                onChangeText={ (texto) => { setMamou(texto) } }
                value={mamou}
            />

            <Text style={styles.label}>observações :</Text>
            <TextInput 
                multiline={true}
                numberOfLines={5}
                style={ styles.input}
                underlineColorAndroid='transparent'
                onChangeText={ (texto) => { setObservacoes(texto) } }
                value={observacoes}
            />
            <View style={styles.areabtn}>
                <TouchableOpacity style={ styles.btn } onPress={gravar}>
                    <Text style={styles.txtbtn}>Gravar</Text>
                </TouchableOpacity>
            </View>
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
        padding:10
    },
    input:{
        borderWidth:1,
        height:100,
        fontSize:14,
        borderColor:'#236060',
        width:'100%',
        marginBottom:5,
        borderRadius:10,
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