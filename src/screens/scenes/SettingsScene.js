import {ScrollView, StyleSheet} from "react-native";
import * as React from "react";
import BackgroundImage from "../../components/BackgroundImage";
import {Button, Card} from "react-native-paper";
import {useConfig} from "../../configProvider";
import {BoxRequirements} from "../../components/BoxRequirements";
import {useNavigation} from "@react-navigation/core";

export function SettingsScene() {
    const {
        hunterList,
        enemyList,
        resetHunterList,
        resetEnemyList,
        resetBoss,
        resetChaliceRiteCount,
        resetEnemyCardDeck,
        resetTileDeck
    } = useConfig()
    const navigation = useNavigation()
    const restartAll = () => {
        resetTileDeck()
        resetEnemyCardDeck()
        resetBoss()
        resetHunterList()
        resetEnemyList()
        resetChaliceRiteCount()
        navigation.navigate('Customize')
    }
    const restartCurrent = () => {
        resetTileDeck(true)
        resetEnemyCardDeck()
        navigation.jumpTo('Tiles');
    }
    return (
        <BackgroundImage>
            <ScrollView style={[styles.container]}>
                <Card style={styles.card}>
                    <BoxRequirements
                        boxTitle={'Current Settings'}
                        hunters={hunterList}
                        enemies={enemyList}
                        miscellaneous={[]}
                        parts={false}
                    />
                </Card>
                <Button
                    style={[styles.button]}
                    mode="contained"
                    colour='#9A1818'
                    onPress={restartAll}
                >
                    Restart from Setup
                </Button>
                <Button
                    style={[styles.button]}
                    mode="contained"
                    colour='#9A1818'
                    onPress={restartCurrent}
                >
                    Restart Current Game
                </Button>
            </ScrollView>
        </BackgroundImage>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    button: {
        margin: 4,
        padding: 10,
    },
    card: {
        margin: 10
    }
});
