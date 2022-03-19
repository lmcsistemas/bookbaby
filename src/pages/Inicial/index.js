import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useNavigation } from '@react-navigation/native'


import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import colors from '../themes';
import { AuthContext } from '../../context/user';
import { ScrollView } from 'react-native-gesture-handler';

export default function Inicial() {
    const navigation = useNavigation();
    const {user, criancaSelecionada} = useContext(AuthContext);
    const [child, setchild] = useState(null);

    const getData = async () => {
        try {
          const uid_usuario = await AsyncStorage.getItem('@uid_usuario')
          const email_usuario = await AsyncStorage.getItem('@email_usuario')

            let dadoschild = {
                email:email_usuario,
                uid:uid_usuario
            }
            setchild(dadoschild);

          if(uid_usuario !== null) {
            console.log("getData ",uid_usuario)
          }

          if(email_usuario !== null) {
            console.log("getData ",email_usuario)
          }
        } catch(e) {
          // error reading value
        }
      }

    useEffect(() =>{        
        console.log('criancaSelecionada home', criancaSelecionada);
        getData();
        

    }, [criancaSelecionada])
   
 return (
   <View style={styles.container}>       

        <View style={styles.header}>
            <View style={styles.logo}>
                <Image 
                source={require('../../assets/logo_lmc.jpg')}
                style={styles.logoEmpresa}
                />    
            </View>
            <TouchableOpacity style={styles.areausuario} onPress={() => {navigation.navigate('Perfis')}}>
                <Text style={styles.nomecrianca}>Bem-Vindo(a) { (criancaSelecionada !== null) ? criancaSelecionada.nome: ''} </Text>
                <Image 
                source={require('../../assets/baby.jpeg')}
                style={styles.babyIMG}
                />
            </TouchableOpacity>            
        </View>        
        <View style={styles.alerta}>
            <Text>Nenhum alerta da escola</Text>
        </View>
        <ScrollView style={styles.corpo}>
            <View style={styles.areafunctions}>
                <TouchableOpacity style={styles.btnFunc} onPress={() => {navigation.navigate('Agenda')}}>
                    <View style={styles.iconeFunc}>
                        <MaterialIcons name="event" size={65} color={colors.textoEscuro}/>
                    </View>
                    <Text style={styles.txtbtn}>Agenda</Text>                    
                </TouchableOpacity>
            </View>
            {/* <View style={styles.areafunctions}>
                <TouchableOpacity style={styles.btnFunc} onPress={() => {navigation.navigate('Mensagem')}}>
                    <View style={styles.iconeFunc}>
                        <AntDesign name="message1" size={65} color={colors.textoEscuro}/>
                    </View>
                    <Text style={styles.txtbtn}>Mensagens</Text>
                </TouchableOpacity>
            </View> */}
            <View style={styles.areafunctions}>
                <TouchableOpacity style={styles.btnFunc} onPress={() => {navigation.navigate('Criancas')}}>
                    <View style={styles.iconeFunc}>
                        <MaterialIcons name="child-care" size={65} color={colors.textoEscuro}/>
                    </View>
                    <Text style={styles.txtbtn}>Criança</Text>
                    
                </TouchableOpacity>
            </View>
            {/* <View style={styles.areafunctions}>
                <TouchableOpacity style={styles.btnFunc}>
                    <View style={styles.iconeFunc}>
                        <FontAwesome name="calendar" size={65} color={colors.textoEscuro}/>
                    </View>
                    <Text style={styles.txtbtn}>Calendário</Text>
                </TouchableOpacity>
            </View> */}
        </ScrollView>        
   </View>
  );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colors.fundo,
        alignItems:'center',
        justifyContent:'flex-start',
    },
    header:{
        flexDirection:'row',
        backgroundColor:'#fff',
        width:'95%',
        height:'12%',
        alignItems:'center',
        justifyContent:'space-around',
        marginTop:10,
        borderRadius:7,
        elevation:2
    },    
    areausuario:{
      flexDirection:'row',
      width:'70%',      
      alignItems:'center',
      justifyContent:'center',
    },
    babyIMG:{
      width:50,
      height:50,
      borderRadius:25,
      marginLeft:10
    },
    logoEmpresa:{
        width:90,
        height:35,
    },
    nomecrianca:{
        fontSize:16,
        fontWeight:'bold',
        color:'#236060'
    },
    corpo:{
        width:'95%',
        height:'100%',
        marginTop:10        
    },
    alerta:{
        marginTop:5,
        width:'95%',
        height:'15%',
        elevation:2,
        backgroundColor:'#fff',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:10
    },
    areafunctions:{
        flex:1,
        flexDirection:'column',
        width:'100%',      
        alignItems:'center',
        justifyContent:'center',
        marginBottom:20,
    },
    btnFunc:{
        width:'100%',
        height:150,
        alignItems:'center',
        justifyContent:'space-around',
        borderRadius:7,
        backgroundColor:'#fff',
        padding:10,
        elevation:3,
    },
    iconeFunc:{
        width:70,
        height:70,
        borderRadius:10,
        alignItems:'center',
        justifyContent:'center',      
    },
    txtbtn:{
        color:colors.textoEscuro,
        fontWeight:'bold',
        fontSize:16
    },
    msg:{
        flex:1,
        justifyContent:'space-between'
    }    
});