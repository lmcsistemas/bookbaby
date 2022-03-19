import React, { useContext } from 'react';
import { View, Text } from 'react-native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';


//import { createDrawerNavigator } from '@react-navigation/drawer';

import Login from '../Login';
import Agenda from '../Agenda/cadastro';
import AgendaLista from '../Agenda/lista';
import Inicial from '../Inicial';
import Cadastro from '../Usuarios/cadastro'
import { AuthContext } from '../../context/user';
import Perfis from '../Perfis/';
import Criancas from '../Criancas'
import Mensagem from '../Mensagem'
import CadastroMensagem from '../Mensagem/cadastro';
import VisualizarMensagem from '../Mensagem/visualizar';
import Contato from '../Contato';

import CadastroUsuario from '../CadastroUsuario';

//const Drawer = createDrawerNavigator(); 
const Stack = createNativeStackNavigator();

export default function Route() {
    //const { signed, user } = useContext(AuthContext);
    //console.log('nas rotas ', user);
 return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} options={{headerShown:false}}/>
      <Stack.Screen 
            name="CadastroUsuario" 
            component={CadastroUsuario} 
            options={{
                headerShown:false
            }}        
        /> 
        <Stack.Screen 
                name="Perfis" 
                component={Perfis} 
                options={{
                  headerShown:false
              }}                
            />
            <Stack.Screen 
                name="Inicial" 
                component={Inicial} 
                options={{
                    headerShown:false
                }}/>
            <Stack.Screen 
                name="Agenda" 
                component={Agenda}
                options={{
                    headerShown:false
                }}        
            />
            <Stack.Screen 
                name="AgendaLista" 
                component={AgendaLista}
                options={{
                    headerShown:false
                }}        
            />            
            <Stack.Screen 
                name="Criancas" 
                component={Criancas}   
                options={{
                  headerShown:false
              }}              
            />
            <Stack.Screen 
                name="Mensagem" 
                component={Mensagem}  
                options={{
                    headerShown:false
                }}               
            />

            <Stack.Screen 
                name="CadastroMensagem" 
                component={CadastroMensagem}  
                options={{
                    headerShown:false
                }}               
            />

            <Stack.Screen 
                name="VisualizarMensagem" 
                component={VisualizarMensagem}  
                options={{
                    headerShown:false
                }}               
            />



            <Stack.Screen name="Cadastro" component={Cadastro} />
    </Stack.Navigator>

  );
}