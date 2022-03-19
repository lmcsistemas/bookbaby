import React, {useEffect, useState, useContext} from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, Button } from 'react-native';
import firebase from '../../../firebaseConnection'
import colors from '../themes';
import { AuthContext } from '../../context/user';
import { useNavigation } from '@react-navigation/native';

export default function Perfis() {

    const {user, gravaCrianca} = useContext(AuthContext);
    console.log('no perfil user ', user.uid);
    const [criancas, setCriancas] = useState(null);
    const [create, setCreate] = useState(true);

    const navigation = useNavigation();
   
    useEffect(() => {        
        async function dados(){    
          //Listado Registros
          await firebase.database().ref(`usuario-crianca/${user.uid}`).on('value', (snapshot) => {
                  
            setCriancas([]);
            setCreate(true);
            snapshot.forEach((childItem) => {
              let data = {
                key: childItem.key,
                nome:childItem.val(),                
              };              
              setCriancas(oldArray => [...oldArray, data]);
              setCreate(false);
            })    
          });          
        }    
        dados();
        console.log('crianca ', criancas);    
      }, [])

 return (
   <View style={styles.container}>   
        {
            create 
            ?             
            <View style={styles.flatList}>
                <View style={styles.areacard}>
                    <View style={styles.areafoto}>
                        <Image 
                            source={require('../../assets/baby.jpeg')}
                            style={styles.babyIMG}
                        />
                    </View>
                    <View style={styles.areatxt}>
                        <Text style={styles.txtnome}>Cadastre a Criança</Text>
                        <TouchableOpacity style={styles.btn} onPress={ () => navigation.navigate('Criancas')}>
                            <Text style={styles.txtbtn}>
                                Selecionar
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>            
            </View>
            :        
            <FlatList style={styles.flatList}
                data={criancas}
                keyExtractor={item => String(item.key)}
                renderItem={({item}) => (
                    <View style={styles.areacard}>
                        <View style={styles.areafoto}>
                            <Image 
                                source={require('../../assets/baby.jpeg')}
                                style={styles.babyIMG}
                            />
                        </View>
                        <View style={styles.areatxt}>
                            <Text style={styles.txtnome}>{item.nome}</Text>
                            <TouchableOpacity style={styles.btn} onPress={ () => gravaCrianca(item.key, item.nome)}>
                                <Text style={styles.txtbtn}>
                                    Selecionar
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}        
            /> 
        }
   </View>
  );
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center'
    },
    flatList:{
        width:'90%',
        flex:1,
    },
    babyIMG:{
        width:120,
        height:120,
        borderRadius:25,
        marginTop:10
        
      },
    areacard:{
        width:'100%',
        marginTop:15,
        elevation:2,
        backgroundColor:'#ffffff',
        borderRadius:7,
        alignItems:'center',
        justifyContent:'center'
    },
    txtnome:{
        color:'#000',
        fontSize:20,
        marginTop:10,
        marginBottom:10
    },
    areatxt:{
        width:'100%',
        alignItems:'center',
        justifyContent:'center'
    },
    btn:{
        backgroundColor:colors.textoEscuro,
        width:100,
        height:40,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:7,
        marginBottom:10
    },
    txtbtn:{
        color:'#fff',
        fontWeight:'bold'
    }
    

})