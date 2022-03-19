import React, {useContext, useState} from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import firebase from '../../../firebaseConnection'
import colors from '../themes';
import { AuthContext } from '../../context/user';
import Header from '../../components/Header';
import { useNavigation } from '@react-navigation/native'
import { Snackbar } from 'react-native-paper';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

export default function CadastroUsuario() {

    const navigation = useNavigation();

    const {user} = useContext(AuthContext);
    const [nome, setNome] = useState(null);
    const [email, setEmail] = useState(null);
    const [senha, setSenha] = useState(null);
    const [loading, setLoading] = useState(false);

    const [txtMensagem, setTxtMensagem] = useState('nononono');    

    const [visible, setVisible] = useState(false);
    const [color, setColor] = useState('blue');
    const [duration, setDuration] = useState(3000);
    const onToggleSnackBar = (visivel, mensagem, color=null, duration=null) => { 
        console.log('teste')
        setVisible(!visible)
        setTxtMensagem(mensagem);
        setColor(color);
        if(duration !=null){
            setDuration(duration);
        }
    };
    const onDismissSnackBar = () => setVisible(false);

       
    async function criarUsuario(uid){       

        let usuario = await firebase.database().ref(`usuarios/${uid}`);
        usuario.set({
            nome:nome,
            email:email,
            type:'parents'
        })              
    }

    async function grava(){
        console.log("nome", nome);
        console.log("email", email);
        console.log("senha", senha);      
        
        if(nome !== null && email !== null && senha !== null){
            setLoading(true);
                await firebase.auth().createUserWithEmailAndPassword(email, senha)
                .then((value) => {
                    console.log(value.user.uid);
                    criarUsuario(value.user.uid);
                    setLoading(false);
                    
                    setNome(null)
                    setSenha(null)
                    setEmail(null);
                    onToggleSnackBar(true,'Cadastrado com sucesso!', 'green');  
                })
                .catch((error) => {
                    onToggleSnackBar(true, 'Falha ao cadastrar usuário', 'red');
                    setLoading(false);
                    return
                })            

        }else{
            
            onToggleSnackBar(true,'Todos os campos são obrigatórios', 'red');
        }        
    }
    
 return (
    
   <KeyboardAwareScrollView style={styles.container} behavior="padding">
    <View style={styles.geral}>
     <Snackbar   
            visible={visible}
            onDismiss={onDismissSnackBar}
            style={{backgroundColor:color, justifyContent:'center', alignItems:'center'}}
            duration={duration}
            >
        {txtMensagem}
        </Snackbar>

       <Header nomeTela="Cadastro de Usuário" voltar={() => { navigation.navigate("Login") }} />
       <View style={styles.areacampos} >
            <Text style={styles.label}>Nome:</Text>
            <TextInput 
                style={ styles.input}
                underlineColorAndroid='transparent'
                onChangeText={ (texto) => setNome(texto) }
                value={nome}
            />
            <Text style={styles.label}>Email:</Text>
            <TextInput 
                autoCapitalize='none'
                style={styles.input }
                underlineColorAndroid='transparent'
                onChangeText={ (texto) => setEmail(texto) }
                value={email}
            />
            <Text style={styles.label}>Senha:</Text>
            <TextInput 
                secureTextEntry={true}
                style={styles.input }
                underlineColorAndroid='transparent'
                onChangeText={ (texto) => setSenha(texto) }
                value={senha}
            />
            <View style={styles.areabtn}>
                {(!loading) ?

                    <TouchableOpacity style={styles.btn} onPress={ () => grava()}>
                        <Text style={styles.txtbtn}>
                            Gravar
                        </Text>
                    </TouchableOpacity>
                :
                <ActivityIndicator style={{marginTop:20}} size={30} color={colors.textoEscuro}/>      
                }
            </View>    
       </View>      
       </View>
   </KeyboardAwareScrollView>
       
   
  );
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colors.fundo,        
    },
    geral:{
        alignItems:'center',
        justifyContent:'center'
    },
    areacampos:{
        marginTop:15,
        width:'90%',
    },
    input:{
        borderWidth:1,
        height:40,
        fontSize:14,
        borderColor:'#236060',
        width:'100%',        
        borderRadius:10,
        backgroundColor:'#fff',
        elevation:2,
        
      },
    label:{        
        marginLeft:10,
        fontWeight:'bold',        
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



    txt:{
        padding:20,
        fontSize:30
    }
})