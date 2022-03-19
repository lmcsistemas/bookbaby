import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import colors from '../../pages/themes';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons'


export default function ListaTexto(props) {

    let lida = props.lida;
    
 return (    
      <TouchableOpacity style={styles.areamensagem} onPress={props.link}>
        <View style={styles.mensgagem}>
          <Text style={ lida ? styles.tituloMensagemLida : styles.tituloMensagem }>{props.titulo}</Text>
          <Text style={styles.txtMensagem}> {props.mensagem.substring(0,50)} </Text>
        </View>
        <View style={styles.btn}>
            <MaterialIcons name="chevron-right" size={25} color="#000"/>
        </View>
      </TouchableOpacity>   
  );
}

const styles = StyleSheet.create({
    areamensagem:{ 
      marginTop:10,
      width:'90%',
      flexDirection:'row',
      borderBottomColor:'#a9a9a9',
      borderBottomWidth:1,
      paddingBottom:10,
      justifyContent:'space-between'
    },
    mensgagem:{
      width:'93%',
      height:60,
      overflow:'hidden'
    },
    btn:{
      paddingTop:20,
      fontSize:18,
      fontWeight:'bold'
    },
    tituloMensagemLida:{
      fontSize:18,
      fontWeight:'bold',
      color:'#a9a9a9',
    },
    tituloMensagem:{
        fontSize:18,
        fontWeight:'bold',
        color:'#000',
      },
    txtMensagem:{
      marginTop:10,
      fontSize:14,
      color:'#a9a9a9'    
    }
  })