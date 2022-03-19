import React, {useState, useContext, useEffect } from 'react';
import { StyleSheet, View, Text, Switch, TextInput, ScrollView, TouchableOpacity, FlatList } from 'react-native';

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
    const [dados, setDados] = useState([]);

    console.log('criancaSelecionada', criancaSelecionada);

    useEffect(() =>{
        console.log('no use efect index.')

        async function carregarDados(){       

            console.log('criancaSelecionada gravar', criancaSelecionada);
            //${criancaSelecionada.key}
                let usuarios = await firebase.database().ref(`agenda/${criancaSelecionada.key}`).on('value', (snapshot) => {
    
                    console.log('snapshot', snapshot);

                    
    
                    setDados([]);
                    snapshot.forEach((childItem) => {
                      let data = {
                        key: childItem.key,
                        almoco:childItem.val().almoco,
                        janta:childItem.val().janta,
                        lanche:childItem.val().lanche,
                        mamou:childItem.val().mamou,
                        observacoes:childItem.val().observacao
                      };

                      console.log('data', data);
                      setDados(oldArray => [...oldArray, data]);
                    })
            
            
                  });
              }

              carregarDados();
    }, []);

        
        
 return (
   <View style={styles.container}>
       <Header nomeTela="Cadastro de Agenda" nomeButton="Lista" lista={() => navigation.navigate('AgendaLista')} voltar={() => { navigation.navigate("Inicial") }} />
       <View style={{ width:'95%', height:200, marginTop:10 }}>

           {(dados.length > 0) ? 
            <FlatList 
                data={dados}
                keyExtractor={item => String(item.key)}
                renderItem={({item}) => (

                    <TouchableOpacity style={styles.lista} onPress={() => { navigation.navigate("AgendaLista", {crianca:criancaSelecionada.key, agenda:item.key}) }}>
                        <Text >{item.key} - Registro de atividades</Text>
                    </TouchableOpacity>                

                )}        
            />   
            : <Text>Nada consta</Text>
        }
        </View>    
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
    lista:{
        backgroundColor:'#fff',
        padding:7,
        borderRadius:7,
        elevation:2,
        marginBottom:10,
        width:'100%',

    }
})