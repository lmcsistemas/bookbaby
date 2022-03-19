import React, {useContext, useState} from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import firebase from '../../../firebaseConnection'
import colors from '../themes';
import { AuthContext } from '../../context/user';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import { Snackbar } from 'react-native-paper';

export default function Criancas() {

    const {user} = useContext(AuthContext);
    const [nome, setNome] = useState(null);
    const [idade, setIdade] = useState(null);
    const [responsavel, setResponsavel] = useState(null);

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

   // const [escola, setEscola] = useState(null);
   // const [escolas, setEscolas] = useState([]);

    // useEffect(()=>{

    //     async function pegarEscolas(){
    //         console.log('Listando escolas...'); 
        
    //         setEscolas([]);

    //          //Listado Registros
    //       await firebase.database().ref(`escola`).on('value', (snapshot) => {
                  
            
    //         snapshot.forEach((childItem) => {
    //           let data = {
    //             key: childItem.key,
    //             nome:childItem.val(),                
    //           };   
              
    //           setEscolas(oldArray => [...oldArray, data]);
              
    //         })    
    //       });     
    //     }

    //     pegarEscolas();
    //     console.log('escolas', escolas);


    //     escolas.map(function(value){
    //         console.log('key', value.key)
    //         console.log('nome', value.nome.nome)
    //     })
    // }, [])

  
    
    async function grava(){

        console.log("nome", nome);
        console.log("idade", idade);
        console.log("responsavel", responsavel);        
        //console.log("escola", escola); 
        
        if(nome !== null && idade !== null && responsavel !== null){

            
            let crianca = await firebase.database().ref('crianca');
            let chave = crianca.push().key;
      
            crianca.child(chave).set({
              nome:nome,
              idade:idade,
              responsavel:responsavel
            })

            let usuario = await firebase.database().ref(`usuario-crianca/${user.uid}/${chave}`)
                usuario.set(nome);        

            if(usuario != null){
                setNome(null);
                setIdade(null);
                setResponsavel(null);
                onToggleSnackBar(true,'Criança cadastrada com sucesso', 'green') 
                return 
            }else{
                onToggleSnackBar(true,'Falha ao cadastrar', 'red') 
                return 
            }            
      
          }else{
            onToggleSnackBar(true,'Todos os campos devem ser preenchido', 'red') 
            return 
          }

    }
    
 return (
    <KeyboardAwareScrollView style={styles.geral}>
        <View style={styles.container}>
        <Snackbar   
            visible={visible}
            onDismiss={onDismissSnackBar}
            style={{backgroundColor:color, justifyContent:'center', alignItems:'center'}}
            duration={duration}            >
        {txtMensagem}
        </Snackbar>
            <View style={styles.areacampos}>
                    <Text style={styles.label}>Nome:</Text>
                    <TextInput 
                        autoCapitalize='none'
                        style={ styles.input}
                        underlineColorAndroid='transparent'
                        onChangeText={ (texto) => setNome(texto) }
                        value={nome}
                    />

                    <Text style={styles.label}>Idade:</Text>
                    <TextInput 
                        style={styles.input }
                        underlineColorAndroid='transparent'
                        onChangeText={ (texto) => setIdade(texto) }
                        value={idade}
                    />     

                    <Text style={styles.label}>Responsável:</Text>
                    <TextInput 
                        style={styles.input }
                        underlineColorAndroid='transparent'
                        onChangeText={ (texto) => setResponsavel(texto) }
                        value={responsavel}
                    /> 
            
                    <View style={styles.areabtn}>
                        <TouchableOpacity style={styles.btn} onPress={ () => grava()}>
                            <Text style={styles.txtbtn}>
                                Gravar
                            </Text>
                        </TouchableOpacity>
                    </View>
            </View>       
        </View>
    </KeyboardAwareScrollView>
  );
}


const styles = StyleSheet.create({
    geral:{
        flex:1
    },
    container:{
        backgroundColor:colors.fundo,
        alignItems:'center',
        justifyContent:'center'
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