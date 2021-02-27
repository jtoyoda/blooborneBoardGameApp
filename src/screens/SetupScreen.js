import {ScrollView, StyleSheet} from "react-native";
import * as React from "react";
import {useConfig} from "../configProvider";
import BackgroundImage from "../components/BackgroundImage";
import {BoxRequirements} from "../components/BoxRequirements";
import {boxes} from "../boxInfo";
import {Button, Card} from "react-native-paper";

export function SetupScreen({navigation}) {
    const {hunterList, enemyList, chaliceRiteCount, resetEnemyCardDeck, resetTileDeck} = useConfig()
    const generateBoxRequirements = (boxName) => {
        const box = boxes[boxName]
        const miscellaneous = box.miscellaneous.map(it => it)
        if (boxName === 'Chalice Dungeon') {
            miscellaneous.push("Arena Tile")
            miscellaneous.push("Arena Gate Tile")
            miscellaneous.push("Arena Level Tile x2")
            miscellaneous.push(`Random Arena Tiles x${hunterList.length + 3}`)
            if (chaliceRiteCount > 0) {
                miscellaneous.push(`Chalice Rite Cards x${chaliceRiteCount}`)
            }
        }
        const hunters = box.hunters.filter(hunter => hunterList.includes(hunter))
        const enemies = box.enemies.filter(enemy => enemyList.includes(enemy))
        if (hunters.length > 0 || enemies.length > 0 || miscellaneous.length > 0) {
            return (
                <Card key={boxName} style={styles.card}>
                    <BoxRequirements
                        boxTitle={boxName}
                        hunters={hunters}
                        enemies={enemies}
                        miscellaneous={miscellaneous}
                    />
                </Card>
            )
        }
    }

    function startGame() {
        resetEnemyCardDeck()
        resetTileDeck(true)
        navigation.navigate('Gameplay')
    }

    return (
        <BackgroundImage>
            <ScrollView style={[styles.container]}>
                {Object.keys(boxes).map(generateBoxRequirements)}
                <Button
                    style={[styles.button]}
                    mode="contained"
                    onPress={startGame}
                >
                    Start Game
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
