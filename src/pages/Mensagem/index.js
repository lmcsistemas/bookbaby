import React, {useEffect, useState, useContext } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import firebase from '../../../firebaseConnection'
import { AuthContext } from '../../context/user';
import colors from '../themes';
import { useNavigation } from '@react-navigation/native'
import ListaTexto from '../../components/ListaTexto';
import Header from '../../components/Header';

export default function Mensagem() {
    const {criancaSelecionada} = useContext(AuthContext);
    const [mensagens, setMensagem] = useState([]);

    const navigation = useNavigation();

    useEffect(() => {        
        async function dados(){    

            let crianca = criancaSelecionada.key

            console.log("criancaSelecionada mensgams", crianca);
          //Listado Registros
          await firebase.database().ref(`mensagem/${crianca}`).on('value', (snapshot) => {
                  
            setMensagem([]);
            
            snapshot.forEach((childItem) => {
              let data = {
                key: childItem.key,
                mensagem:childItem.val().mensagem,
                assunto:childItem.val().assunto,
                lida:childItem.val().lida,
              };              
              setMensagem(oldArray => [...oldArray, data]);
              
            })    
          });          
        }    
        dados();
        console.log('mensagens ', mensagens);    
      }, [criancaSelecionada])


 return (
   <>
      <Header nomeTela="Lista de Mensagens" nomeButton="Novo" lista={() => navigation.navigate('CadastroMensagem')} voltar={() => { navigation.goBack() }}/>
      <View style={styles.container} >
      
          {mensagens.map(function(value){
              return (<ListaTexto lida={value.lida} titulo={value.assunto} mensagem={value.mensagem} link={() => navigation.navigate('VisualizarMensagem',{key:value.key} )}/>)
          })}
      
      </View> 
   </>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:colors.fundo,
    alignItems:'center',
  }
})