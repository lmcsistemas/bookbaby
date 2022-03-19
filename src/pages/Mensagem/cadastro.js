import React, { useState, useContext } from 'react';
import { Text, View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import firebase from '../../../firebaseConnection'
import Header from '../../components/Header';
import colors from '../themes';
import { AuthContext } from '../../context/user';


export default function CadastroMensagem() {

    const {criancaSelecionada} = useContext(AuthContext);
    const navigation = useNavigation();
    const [assunto, setAssunto] = useState(null);
    const [mensagem, setMensagem] = useState(null);

    async function gravaMensagens(){

        let crianca = criancaSelecionada.key;
        let message = await firebase.database().ref(`mensagem/${crianca}`);
            let chave = message.push().key;
      
            message.child(chave).set({
              assunto:assunto,
              mensagem:mensagem,
              lida:false
            })
            alert("Cadastrado com sucesso!");
            setAssunto(null)
            setMensagem(null)

    }


 return (
     <>
       <Header nomeTela="Lista de Mensagens" nomeButton="Lista" lista={() => navigation.navigate('Mensagem')} voltar={() => { navigation.goBack() }}/>
     
        <View style={styles.container}>
            
        <View style={styles.areacampos}>
            <Text style={styles.label}>Assunto:</Text>
            <TextInput 
                autoCapitalize='none'
                style={ styles.input}
                underlineColorAndroid='transparent'
                onChangeText={ (texto) => setAssunto(texto) }
                value={assunto}
            />

            <Text style={styles.label}>Mensagem:</Text>
            <TextInput 
                style={styles.inputMSG }
                underlineColorAndroid='transparent'
                onChangeText={ (texto) => setMensagem(texto) }
                value={mensagem}
                multiline={true}
                numberOfLines={5}
            />     
          
            <View style={styles.areabtn}>
                <TouchableOpacity style={styles.btn} onPress={ () => gravaMensagens()}>
                    <Text style={styles.txtbtn}>
                        Gravar
                    </Text>
                </TouchableOpacity>
            </View>
       </View> 
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
    areacampos:{
        marginTop:20,
        width:'90%',
        height:'100%'
    },
    input:{
        borderWidth:1,
        height:40,
        fontSize:14,
        borderColor:'#236060',
        width:'100%',
        
        borderRadius:10,
        backgroundColor:'#fff',
        elevation:2
      },
      inputMSG:{
        borderWidth:1,
        height:100,
        fontSize:14,
        borderColor:'#236060',
        width:'100%',
        
        borderRadius:10,
        backgroundColor:'#fff',
        elevation:2
      },
    label:{
        
        marginLeft:10,
        fontWeight:'bold',
        marginTop:10,
    },
    btn:{
        backgroundColor:colors.textoEscuro,
        width:100,
        height:40,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:7,
        marginBottom:10,
        marginTop:20
        
    },
    txtbtn:{
        color:'#fff',
        fontWeight:'bold'
    },
    areabtn:{
        width:'100%',
        alignItems:'center',
        justifyContent:'center'
    },
})