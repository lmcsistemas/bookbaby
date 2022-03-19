import React, {useEffect, useState, useContext } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import firebase from '../../../firebaseConnection'
import { AuthContext } from '../../context/user';
import colors from '../themes';
import { useNavigation, useRoute } from '@react-navigation/native'
import ListaTexto from '../../components/ListaTexto';
import Header from '../../components/Header';
import Route from '../Routes';

export default function VisualizarMensagem() {
    const {criancaSelecionada} = useContext(AuthContext);
    const [mensagens, setMensagem] = useState([]);

    const route = useRoute();
    const navigation = useNavigation();

    

    useEffect(() => {        
        async function dados(){    

            console.log("route key", route.params.key);

            let crianca = criancaSelecionada.key

            console.log("criancaSelecionada mensgams", crianca);
            console.log("criancaSelecionada mensgams", route.params.key);
            
          //Listado Registros
          await firebase.database().ref(`mensagem/${crianca}/${route.params.key}`).on('value', (snapshot) => {
            setMensagem([]);
              let data = {
                key: snapshot.key,
                mensagem:snapshot.val().mensagem,
                assunto:snapshot.val().assunto,
                lida:snapshot.val().lida,
              };              
              setMensagem(data);            
          });          
        }    
        dados();
        console.log('mensagens ', mensagens);    
      }, [criancaSelecionada,route.params.key])


 return (
   <>
   <Header nomeTela="Mensagem" voltar={() => navigation.navigate('Mensagem')}/>
   <View style={styles.container}>
    <Text style={styles.titulo}>
        {mensagens.assunto}
    </Text>
    <Text style={styles.mensagem}>
        {mensagens.mensagem}
    </Text>      
   </View>
   </>  
  );
}

const styles = StyleSheet.create({
  container:{
    
    flex:1,
    backgroundColor:colors.fundo,
    alignItems:'center',
  },
  titulo:{
        marginTop:20,
        fontSize:22,
        fontWeight:'bold',
        color:'#000',
        width:'90%',
        textAlign:'center'
  },
  mensagem:{
    marginTop:10,
    fontSize:16,
    width:'85%',
    textAlign:'justify'
  }
})