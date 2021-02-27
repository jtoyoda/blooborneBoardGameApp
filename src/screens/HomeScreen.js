import {ScrollView, StyleSheet, View} from "react-native";
import * as React from "react";
import {Button, Title} from "react-native-paper";
import {useConfig} from "../configProvider";
import BackgroundImage from "../components/BackgroundImage";

export function HomeScreen({navigation}) {
    const {hunterList, enemyList} = useConfig()
    return (
        <BackgroundImage>
            <ScrollView style={[styles.container]}>
                <View style={[styles.row, styles.title]}>
                    <Title>Bloodborne The Board Game</Title>
                </View>
                <View style={[styles.row]}>
                    <Button
                        style={[styles.button]}
                        mode="contained"
                        onPress={() => navigation.navigate('Customize')}
                    >
                        Setup New Game
                    </Button>
                    <Button
                        style={[styles.button]}
                        mode="contained"
                        onPress={() => navigation.navigate('Gameplay')}
                        disabled={!hunterList && !enemyList}
                    >
                        Continue Existing Game
                    </Button>
                </View>
            </ScrollView>
        </BackgroundImage>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    row: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: 12,
    },
    button: {
        margin: 4,
        padding: 10,
    },
    title: {
        paddingLeft: 16
    }
});
