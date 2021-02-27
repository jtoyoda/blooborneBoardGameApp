import {StyleSheet, View} from "react-native";
import * as React from "react";
import BackgroundImage from "../components/BackgroundImage";
import {EnemyCardScene} from "./scenes/EnemyCardScene";
import {TileScene} from "./scenes/TileScene";
import {SettingsScene} from "./scenes/SettingsScene";
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const Tab = createMaterialBottomTabNavigator();

export function GameplayScreen() {
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        {
            key: 'enemyCards',
            title: 'Enemy Cards',
            icon: 'sword-cross',
        },
        {
            key: 'tiles',
            title: 'Tiles',
            icon: 'checkbox-multiple-blank-outline',
        },
        {
            key: 'settings',
            title: 'Settings',
            icon: 'cog',
        },
    ]);
    return (
        <BackgroundImage>
            <View style={styles.container}>
                <Tab.Navigator>
                    <Tab.Screen
                        name="Tiles"
                        component={TileScene}
                        options={{
                            tabBarLabel: 'Tiles',
                            tabBarIcon: ({color}) => (
                                <MaterialCommunityIcons name="checkbox-multiple-blank-outline" color={color} size={26}/>
                            ),
                        }}/>
                    <Tab.Screen
                        name="Enemy Cards"
                        component={EnemyCardScene}
                        options={{
                            tabBarLabel: 'Enemy Cards',
                            tabBarIcon: ({color}) => (
                                <MaterialCommunityIcons name="sword-cross" color={color} size={26}/>
                            ),
                        }}/>
                    <Tab.Screen
                        name="Settings"
                        component={SettingsScene}
                        options={{
                            tabBarLabel: 'Settings',
                            tabBarIcon: ({color}) => (
                                <MaterialCommunityIcons name="cog" color={color} size={26}/>
                            ),
                        }}/>
                </Tab.Navigator>
            </View>
        </BackgroundImage>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerRow: {
        flex: 1,
        flexDirection: 'row',
    },
    button: {
        margin: 4,
        padding: 10,
    },
    card: {
        margin: 10
    }
});
