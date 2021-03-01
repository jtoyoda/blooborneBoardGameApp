import {ScrollView, StyleSheet, View} from "react-native";
import * as React from "react";
import BackgroundImage from "../../components/BackgroundImage";
import {Button, Card, Dialog, Divider, Paragraph, Portal, Subheading, Title, useTheme} from "react-native-paper";
import {useConfig} from "../../configProvider";
import useWindowDimensions from "../../windowHeight";

export function TileScene() {
    const {
        boss,
        tileDeckState: state,
        setTileDeckState: setState,
        drawTile
    } = useConfig()
    const theme = useTheme()
    const {height} = useWindowDimensions()

    const flipArenaLever = () => {
        setState(prevState => {
                return {
                    ...prevState,
                    arenaLeversFlipped: prevState.arenaLeversFlipped >= 2 ? 2 : prevState.arenaLeversFlipped + 1
                }
            }
        )
    }

    const closeDialogArenaGate = () => {
        setState(prevState => {
            return {
                ...prevState,
                tileCount: prevState.tileCount - 1,
                arenaGateFound: true,
                dialogTileNumber: undefined
            }
        })
    }

    const closeDialogArenaLever = () => {
        setState(prevState => {
            return {
                ...prevState,
                tileCount: prevState.tileCount - 1,
                arenaLeversFound: prevState.arenaLeversFound >= 2 ? 2 : prevState.arenaLeversFound + 1,
                dialogTileNumber: undefined
            }
        })
    }

    const closeDialog = () => {
        if (!canBeOther()) {
            return
        }
        setState(prevState => {
            return {
                ...prevState,
                tileCount: prevState.tileCount - 1,
                dialogTileNumber: undefined
            }
        })
    }

    const revealBoss = () => {
        setState(prevState => {
            return {
                ...prevState,
                revealBoss: 'reveal'
            }
        })
    }

    const setBossRevealed = () => {
        setState(prevState => {
            return {
                ...prevState,
                revealBoss: 'revealed'
            }
        })
    }

    const canBeOther = () => {
        return state.tileCount > 2 - state.arenaLeversFound + (state.arenaGateFound ? 0 : 1)
    }
    const arenaAvailable = state.arenaGateFound && state.arenaLeversFlipped >= 2
    const tilesDrawnCard = (
        <Card style={styles.cardsDrawnTile}>
            <Title>{`Tiles Remaining: ${state.tileCount}`}</Title>
            <Subheading>{`Arena Gate ${state.arenaGateFound ? 'Found!' : 'Not Found'}`}</Subheading>
            <Subheading>{`Arena Levers Found: ${state.arenaLeversFound}`}</Subheading>
            <Subheading>{`Arena Levers Flipped: ${state.arenaLeversFlipped}`}</Subheading>
            <Title>Tile Odds</Title>
            {state.arenaLeversFound < 2 ?
                <Subheading>{`Arena Lever: ${((2 - state.arenaLeversFound) / state.tileCount * 100).toPrecision(4)}%`}</Subheading>
                :
                <Subheading>All Arena Levers Found</Subheading>
            }
            {state.arenaGateFound ?
                <Subheading>Arena Gate Found</Subheading>
                :
                <Subheading>{`Arena Gate: ${(1 / state.tileCount * 100).toPrecision(4)}%`}</Subheading>

            }
        </Card>
    )
    const trapCardsCard = (
        <Card style={styles.cardsDrawnTrap}>
            <Title>Trap Deck Odds</Title>
            <Subheading>{`Nothing: ${
                (state.deck.filter(card => card.title === 'NOTHING').length / state.deck.length * 100).toPrecision(4)
            }%`}
            </Subheading>
            <Subheading>{`Ambush: ${
                (state.deck.filter(card => card.title === 'AMBUSH').length / state.deck.length * 100).toPrecision(4)
            }%`}
            </Subheading>
            <Subheading>{`Guillotine: ${
                (state.deck.filter(card => card.title === 'GUILLOTINE').length / state.deck.length * 100).toPrecision(4)
            }%`}
            </Subheading>
            <Subheading>{`Arrow Trap: ${
                (state.deck.filter(card => card.title === 'ARROW TRAP').length / state.deck.length * 100).toPrecision(4)
            }%`}
            </Subheading>
            <Subheading>{`Empowered Trap: ${
                (state.deck.filter(card => card.title === 'EMPOWERED TRAP').length / state.deck.length * 100).toPrecision(4)
            }%`}
            </Subheading>
        </Card>
    )
    const arenaAvailableCard = (
        <Card style={styles.arenaAvailable}>
            <Title>Arena {arenaAvailable ? 'Available!' : 'Unavailable'}</Title>
            {state.revealBoss !== 'revealed' ?
                <Button
                    style={styles.importantButton}
                    mode="contained"
                    onPress={revealBoss}
                    disabled={!arenaAvailable}
                    color={theme.colors.accent}
                >
                    <Title>Reveal Boss</Title>

                </Button>
                :
                <Subheading>The Boss is {boss.name}</Subheading>
            }

        </Card>
    )
    const buttons = (
        <View style={styles.containerRow}>
            <Button
                style={[styles.button]}
                mode="contained"
                onPress={drawTile}
                compact={true}
                disabled={state.tileCount<=0}
            >
                Draw Tile
            </Button>
            <Button
                style={[styles.button]}
                mode="contained"
                color={'#4F6272'}
                disabled={state.arenaLeversFound <= 0 || state.arenaLeversFlipped >= state.arenaLeversFound}
                onPress={flipArenaLever}
                compact={true}
            >
                Flip Arena Lever
            </Button>
        </View>
    )
    return (
        <BackgroundImage>
            {height <= 700 ?
                <ScrollView style={styles.scrollContainer}>
                    {tilesDrawnCard}
                    {trapCardsCard}
                    {arenaAvailableCard}
                    {buttons}
                </ScrollView>
                :
                <View style={styles.container}>
                    {tilesDrawnCard}
                    {trapCardsCard}
                    {arenaAvailableCard}
                    {buttons}
                </View>
            }
            <Portal>
                <Dialog
                    onDismiss={closeDialog}
                    visible={!!state.dialogTileNumber}
                >
                    <Dialog.Content>
                        <Title>
                            Draw Tile {state.dialogTileNumber}
                        </Title>
                        <Divider/>
                        <Subheading>
                            Drawn Trap Card: {state.dialogCard && state.dialogCard.title}
                        </Subheading>
                        <Paragraph>
                            {state.dialogCard && state.dialogCard.description}
                        </Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button disabled={state.arenaGateFound} mode="outlined" style={styles.dialogButton}
                                onPress={closeDialogArenaGate}>
                            Gate
                        </Button>
                        <Button disabled={state.arenaLeversFound >= 2} mode="outlined" style={styles.dialogButton}
                                onPress={closeDialogArenaLever}>
                            Lever
                        </Button>
                        <Button disabled={!canBeOther()}
                                mode="outlined" style={styles.dialogButton} onPress={closeDialog}>
                            Other
                        </Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
            <Portal>
                <Dialog
                    onDismiss={setBossRevealed}
                    visible={state.revealBoss === 'reveal'}
                >
                    <Dialog.Content>
                        <Subheading>
                            The Boss is
                        </Subheading>
                        <Title>
                            {boss.name}
                        </Title>
                        <Subheading>
                            From {boss.box}
                        </Subheading>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button mode="outlined" style={styles.dialogButton} onPress={setBossRevealed}>
                            Ok
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
    scrollContainer: {
        flex: 1,
    },
    containerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    arenaAvailable: {
        flex: 3,
        marginHorizontal: 12,
        marginVertical: 6,
        paddingLeft: 12,
    },
    cardsDrawnTile: {
        flex: 6,
        marginHorizontal: 12,
        marginVertical: 6,
        paddingLeft: 12,
    },
    cardsDrawnTrap: {
        flex: 5,
        marginHorizontal: 12,
        marginVertical: 6,
        paddingLeft: 12,
    },
    button: {
        flex: 1,
        margin: 4,
        padding: 10,
    },
    importantButton: {
        flex: 1,
        margin: 4,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        margin: 10
    },
    dialogButton: {
        flex: 1,
        margin: 4,
    }
});
