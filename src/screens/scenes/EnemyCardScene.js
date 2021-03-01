import {StyleSheet, View} from "react-native";
import * as React from "react";
import BackgroundImage from "../../components/BackgroundImage";
import {Button, Card, Dialog, Paragraph, Portal, Subheading, Title} from "react-native-paper";
import {useConfig} from "../../configProvider";
import useWindowDimensions from "../../windowHeight";

export function EnemyCardScene() {
    const {
        enemyDeckState: state,
        setEnemyDeckState: setState,
        shuffleEnemyDeck: shuffleDeck,
        drawEnemyDeckCard: drawCard
    } = useConfig()
    const {height} = useWindowDimensions()

    function createCardItem(card) {
        if (height <= 600) {
            return (
                <Paragraph key={card.key}>{card.title}</Paragraph>
            )
        } else {
            return (
                <Subheading key={card.key}>{card.title}</Subheading>
            )
        }
    }

    const closeDialog = () => {
        setState(prevState => {
            return {
                ...prevState,
                dialogCard: undefined
            }
        })
    }

    return (
        <BackgroundImage>
            <View style={styles.container}>
                <Card style={styles.cardsDrawn}>
                    <Title>{'Cards Remaining:'}</Title>
                    {state.deck.sort(((a, b) => {
                        return a.key > b.key ? 1 : -1
                    })).map(createCardItem)}
                </Card>
                <Card style={styles.cardsDrawn}>
                    <Title>{'Cards Drawn:'}</Title>
                    {state.drawnCards.map(createCardItem)}
                </Card>
                <View style={styles.containerRow}>
                    <Button
                        style={[styles.button]}
                        mode="contained"
                        onPress={drawCard}
                        compact={true}
                    >
                        Draw Card
                    </Button>
                    <Button
                        style={[styles.button]}
                        mode="contained"
                        color={'#4F6272'}
                        onPress={shuffleDeck}
                        compact={true}
                    >
                        Re-Shuffle Deck
                    </Button>
                </View>
            </View>
            <Portal>
                <Dialog
                    onDismiss={closeDialog}
                    visible={!!state.dialogCard}
                >
                    <Dialog.Content>
                        <Title>
                            {state.dialogCard && state.dialogCard.title}
                        </Title>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button mode="outlined" style={{flex: 1}} onPress={closeDialog}>
                            OK
                        </Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </BackgroundImage>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between'
    },
    containerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    cardsDrawn: {
        flex: 1,
        marginHorizontal: 12,
        marginVertical: 4,
        paddingLeft: 12,
    },
    button: {
        flex: 1,
        margin: 4,
        padding: 10,
    },
    card: {
        margin: 10
    },
});
