import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import colors from '../../pages/themes';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import AntDesign from 'react-native-vector-icons/AntDesign';
//plussquare
export default function Header(props) {

 return (
   <View style={styles.container}>       
        <TouchableOpacity style={styles.voltar}  onPress={  props.voltar  }>
            <MaterialIcons name="arrow-back" size={25} color="#ffffff"/>
        </TouchableOpacity>       
        <View style={styles.nomeTela}>
            <Text style={styles.txt}>{props.nomeTela}</Text>
        </View>       
        <TouchableOpacity style={styles.alertaHeader} onPress={props.lista}>
            <Text style={styles.txt}>{props.nomeButton}</Text>
        </TouchableOpacity>
   </View>
  );
}

const styles = StyleSheet.create({
    container:{
        width:'100%',
        flexDirection:'row',
        height:50,
        backgroundColor:colors.textoEscuro,
        padding:10,
        justifyContent:'space-between',
        elevation:2

    },
    txt:{
      color:'#fff',
      fontSize:16,
      fontWeight:'bold'
    }

})