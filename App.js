import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {HomeScreen} from "./src/screens/HomeScreen";
import {CustomizeScreen} from "./src/screens/CustomizeScreen";
import {GameplayScreen} from "./src/screens/GameplayScreen";
import {Provider as PaperProvider} from 'react-native-paper';
import {theme} from "./theme";
import {ConfigContextProvider} from "./src/configProvider";
import {SetupScreen} from "./src/screens/SetupScreen";


const Stack = createStackNavigator();

function App() {
    return (
        <ConfigContextProvider>
            <PaperProvider theme={theme}>
                <NavigationContainer theme={theme}>
                    <Stack.Navigator>
                        <Stack.Screen name="Home" component={HomeScreen}/>
                        <Stack.Screen name="Customize" component={CustomizeScreen}/>
                        <Stack.Screen name="Setup" component={SetupScreen}/>
                        <Stack.Screen name="Gameplay" component={GameplayScreen}/>
                    </Stack.Navigator>
                </NavigationContainer>
            </PaperProvider>
        </ConfigContextProvider>
    );
}

export default App;
