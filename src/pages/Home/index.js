import React, {useState} from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

import { useNavigation } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Button, Snackbar } from 'react-native-paper';



export default function Home() {

    const navigation = useNavigation();
    const [visible, setVisible] = useState(false);
    const onToggleSnackBar = () => setVisible(!visible);
    const onDismissSnackBar = () => setVisible(false);

 return (
   <View style={styles.container}>
      <View style={styles.card}>
        
        <View style={styles.areausuario}>
          <Image 
              source={require('../../assets/baby.jpeg')}
              style={styles.babyIMG}
          />          
          <Text style={styles.nomecrianca}>Area usuario</Text>

        </View>

       

        <View style={styles.areabookchat}>
          <TouchableOpacity style={styles.btnBC}>
              <View style={styles.icone}>
                  <Text style={styles.qtdeIcone}>7</Text>
              </View>
              <Text>Agenda</Text>
              
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnBC}>
              <View style={styles.icone}>
                <Text style={styles.qtdeIcone}>5</Text>
              </View>
              <Text>Recados</Text>
          </TouchableOpacity>


        </View>

      </View>

      <View style={styles.functions}>
        
      <View style={styles.areafunctions}>
          <TouchableOpacity style={styles.btnFunc}>
              <View style={styles.iconeFunc}>
                  <Text style={styles.qtdeIcone}>7</Text>
              </View>
              <Text style={styles.txtbtn}>Agenda</Text>
              
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnFunc}>
              <View style={styles.iconeFunc}>
                <Text style={styles.qtdeIcone}>5</Text>
              </View>
              <Text style={styles.txtbtn}>Recados</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.areafunctions}>
          <TouchableOpacity style={styles.btnFunc}>
              <View style={styles.iconeFunc}>
                  <Text style={styles.qtdeIcone}>7</Text>
              </View>
              <Text style={styles.txtbtn}>Agenda</Text>
              
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnFunc}>
              <View style={styles.iconeFunc}>
                <Text style={styles.qtdeIcone}>5</Text>
              </View>
              <Text style={styles.txtbtn}>Recados</Text>
          </TouchableOpacity>


        </View>


      </View>



       {/* <Text>Tela home</Text>
       <Button title='sobre' onPress={() => { navigation.navigate('Sobre', {nome:"Lucas", email:'teste@teste.com'}) }}/> */}
   </View>
  );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#84ecec',
        alignItems:'center',
        justifyContent:'center',
    },
    card:{
      flex:1,
      width:'95%',
      backgroundColor:'#fff',
      alignItems:'center',
      justifyContent:'center',
      marginTop:10,
      borderTopRightRadius:50,
      borderTopLeftRadius:50,
    },
    functions:{
      flex:2,
      width:'95%',
      
      alignItems:'center',
      justifyContent:'center',
      marginTop:10,
    },
    areausuario:{
      flex:1,
      flexDirection:'row',
      width:'80%',      
      alignItems:'center',
      justifyContent:'center',
    },
    babyIMG:{
      width:70,
      height:70,
      borderRadius:35,
      marginRight:10
    },
    nomecrianca:{
        fontSize:20,
        fontWeight:'bold'
    },
    areabookchat:{
      flex:1,
      flexDirection:'row',
      width:'100%',      
      alignItems:'center',
      justifyContent:'space-around',
    },
    areafunctions:{
      flex:1,
      flexDirection:'row',
      width:'100%',      
      alignItems:'center',
      justifyContent:'space-around',
      marginBottom:5,
    },
    btnBC:{
      backgroundColor:'#fff',
      width:150,
      alignItems:'center',
      justifyContent:'center',
      borderRadius:7,
      borderColor:'#c6c6c6',
      borderWidth:1,
      padding:10,
    },
    btnFunc:{
      width:150,
      height:150,
      alignItems:'center',
      justifyContent:'space-around',
      borderRadius:7,
      borderColor:'#c6c6c6',
      backgroundColor:'#fff',
      borderWidth:1,
      padding:10,
    },
    icone:{
      backgroundColor:'#ff0000',
      width:20,
      height:20,
      borderRadius:10,
      alignItems:'center',
      justifyContent:'center',      
    },
    qtdeIcone:{
      color:'#fff',
      fontSize:16,
      fontWeight:'bold'     
    },
    iconeFunc:{
      backgroundColor:'#84ecec',
      width:70,
      height:70,
      borderRadius:10,
      alignItems:'center',
      justifyContent:'center',      
    },
    txtbtn:{
      color:'#236060',
      fontWeight:'bold',
      fontSize:16
    }
});