import React, { useState, createContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

import { useNavigation } from '@react-navigation/native'

import firebase from '../../firebaseConnection';
import 'firebase/auth';

export const AuthContext = createContext({});

export default function AuthProvider({ children }) {

    const navigation = useNavigation();

    const [user, setUser] = useState(null)
    const [criancaSelecionada, setCriancaSelecionada] = useState(null); 
    
    function gravaCrianca(key, nome){
        let dadosCrianca = {
            key:key,
            nome:nome
        }
        console.log(dadosCrianca)
        setCriancaSelecionada(dadosCrianca);        
        navigation.navigate('Inicial');
    }  

    async function insertDados(email, uid){
        //carrega os dados o usuario
        
        console.log('passou aqui ');

        let dados = {};
        await firebase.database().ref(`usuarios/${uid}`).once('value', (snapshot) => {
            dados = {
                email:email,
                uid:uid,
                type:snapshot.val().type
            } 
        });
        console.log('no insert type ', dados);
        try {
            setUser(dados);
            await AsyncStorage.setItem('@email_usuario', dados.email)
            await AsyncStorage.setItem('@uid_usuario', dados.uid)
            await AsyncStorage.setItem('@type_usuario', dados.type)

            if(criancaSelecionada != null){
                navigation.navigate('Inicial')
            }else{
                navigation.navigate('Perfis')
            }            
            
            return
        } catch (e) {
            alert("Falha ao inserir dados", e);            
            console.log('erro, ', e);
            navigation.navigate('Login')
            return
        }
    }

 return (
    <AuthContext.Provider value={{ signed:!!user, user, insertDados, setCriancaSelecionada, criancaSelecionada, gravaCrianca }} >
        { children }
    </AuthContext.Provider>

  );
}