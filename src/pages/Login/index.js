import React, {useState, useContext } from 'react';
import { LogBox, View, Text, TextInput, StyleSheet, Image, ActivityIndicator, TouchableOpacity, Button } from 'react-native';

import { useNavigation } from '@react-navigation/native'
import firebase from '../../../firebaseConnection';
import 'firebase/auth';
import colors from '../themes';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { AuthContext } from '../../context/user';


import { Snackbar } from 'react-native-paper';

LogBox.ignoreAllLogs();
export default function Login() {

    const {user, signed, insertDados} = useContext(AuthContext);
    console.log('signed login', signed);
    console.log('user2', user);


    const [email, setEmail] = useState('lucas@gmail.com.br');//
    const [senha, setSenha] = useState('123456');//123456
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


    const navigation = useNavigation();

    async function entrar(){
        if(email == null || senha == null){
            console.log('validacao');
            onToggleSnackBar(true,'Os campos E-mail e Senha devem ser preenchido', 'red')            
        }else{
                 setLoading(true);
            await firebase.auth().signInWithEmailAndPassword(email, senha)
            .then((value) => {
                console.log(value);

                console.log(value.user.email);
                // alert('bem vindo : '+value.user.email);
                insertDados(value.user.email, value.user.uid);
                setLoading(false);
            })
            .catch((error) => {
                console.log("errror rrrr", error)
                onToggleSnackBar(true,'Email ou Senha inválidos', 'red')            
                setLoading(false);
                return
            })    
        }
    }

    

    function esqueciSenha(){
        alert('esquecisenha');
    }

 return (
    <KeyboardAwareScrollView>
   <View style={styles.container}>

        {/* <Button title='botao'  onPress={onToggleSnackBar} /> */}
        <Snackbar   
            visible={visible}
            onDismiss={onDismissSnackBar}
            style={{backgroundColor:color, justifyContent:'center', alignItems:'center'}}
            duration={duration}
            
            action={{
                label: 'OK',
                onPress: () => {
                // Do something
                },
            }}>
        {txtMensagem}
        </Snackbar>
       <View style={styles.arealogo}>
            <View style={styles.logo}>
             <Image 
                source={require('../../assets/baby.jpeg')}
                style={styles.logoIMG}
                />
                <Text style={styles.txtLogo}>BookBady</Text>
            </View>
       </View>

       <View style={styles.areacampos}>
            
            <View style={styles.campos}>

            <Text style={styles.label}>E-Mail:</Text>
            <TextInput 
                autoCapitalize='none'
                style={ styles.input}
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

            </View>
            {
                loading === true ? 
                <ActivityIndicator size="large" style={styles.ActivityIndicator} color={colors.textoEscuro} /> :  
                <TouchableOpacity style={styles.btnEntrar} onPress={entrar}>
                    <Text style={styles.txtBtnEntrar}>Entrar</Text>
                </TouchableOpacity>          
            }            
            <TouchableOpacity onPress={() => {  navigation.navigate('CadastroUsuario') }}>
                <Text style={styles.txtLinks}>Criar Usuário</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={esqueciSenha}>
                <Text style={styles.txtLinks}>Esqueci minha senha</Text>
            </TouchableOpacity>
       </View>
       
   </View>
   </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
    keyb:{
        flex:1,
    },
    container:{        
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:colors.fundo
    },
    arealogo:{
        flex:1,        
        width:'100%',
        alignItems:'center',
        justifyContent:'center',
    },
    logo:{        
        height:'90%',
        width:'90%',
        marginTop:60,
        borderRadius:100,
        alignItems:'center',
        justifyContent:'center',
        
    },
    logoIMG:{
        width:200,
        height:200,
        borderRadius:100
    },
    txtLogo:{
        fontSize:35,
        fontWeight:'bold'
    },
    areacampos:{
        flex:2,
        width:'100%',
        alignItems:'center',
        justifyContent:'center'
    },
    campos:{
        width:'90%',
    },
    input:{
        borderWidth:1,
        height:40,
        fontSize:14,
        borderColor:'#236060',
        width:'100%',
        marginBottom:5,
        borderRadius:10,
        backgroundColor:'#fff',
        elevation:5
      },
    label:{
        marginTop:10,
        marginLeft:10,
        fontWeight:'bold'
    },
    txtLinks:{
        color:'#236060',
        marginBottom:10        
    },
    btnEntrar:{
        marginTop:15,
        marginBottom:10,
        height:40,
        width:150,
        backgroundColor:'#236060',
        borderRadius:7,
        alignItems:'center',
        justifyContent:'center',
        elevation:5
    },
    ActivityIndicator:{
        marginTop:15
    },
    txtBtnEntrar:{
        color:'#fff',
        fontWeight:'bold'
    }

})