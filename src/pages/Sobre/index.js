import React, { useLayoutEffect } from 'react';
import { View, Text, Button} from 'react-native';

//a questão do route pode ser usada por paramentro no classe ou instanciando o hook useRoute. 
import { useRoute, useNavigation } from '@react-navigation/native';

export default function Sobre(){

  const route = useRoute();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: route.params?.nome === '' ? "Pagina Sobre" : route.params?.nome
    })
  }, [navigation])

 return (
   <View >
       <Text>Tela home</Text>
       <Text>{route.params?.nome}</Text>
       <Text>{route.params?.email}</Text>
       <Button title='Contato' onPress={() =>{ navigation.navigate('Contato') }}/>
       <Button title='Voltar Tela' onPress={() =>{ navigation.goBack() }}/>
   </View>
  );
}