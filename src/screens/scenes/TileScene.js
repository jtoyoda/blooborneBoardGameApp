import {StyleSheet, View} from "react-native";
import * as React from "react";
import BackgroundImage from "../../components/BackgroundImage";
import {getRandomInt,} from "../../randomNumberUtils";
import {Button, Card, Dialog, Portal, Subheading, Title, useTheme} from "react-native-paper";
import {useConfig} from "../../configProvider";

export function TileScene() {
    const {boss, tileDeckState: state, setTileDeckState: setState} = useConfig()
    const theme = useTheme()

    const drawTile = () => {
        setState(prevState => {
                return {
                    ...prevState,
                    dialogTileNumber: getRandomInt(1, prevState.tileCount)
                }
            }
        )
    }

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
    return (
        <BackgroundImage>
            <View style={styles.container}>
                <Card style={styles.cardsDrawn}>
                    <Title>{`Tiles Remaining: ${state.tileCount}`}</Title>
                    <Subheading>{`Arena Gate ${state.arenaGateFound ? 'Found!' : 'Not Found'}`}</Subheading>
                    <Subheading>{`Arena Levers Found: ${state.arenaLeversFound}`}</Subheading>
                    <Subheading>{`Arena Levers Flipped: ${state.arenaLeversFlipped}`}</Subheading>
                </Card>
                <Card style={styles.cardsDrawn}>
                    <Title>Odds</Title>
                    {state.arenaLeversFound < 2 ?
                        <Subheading>{`Arena Lever Odds: ${((2 - state.arenaLeversFound) / state.tileCount * 100).toPrecision(4)}%`}</Subheading>
                        :
                        <Subheading>All Arena Levers Found</Subheading>
                    }
                    {state.arenaGateFound ?
                        <Subheading>Arena Gate Found</Subheading>
                        :
                        <Subheading>{`Arena Gate Odds: ${(1 / state.tileCount * 100).toPrecision(4)}%`}</Subheading>

                    }
                </Card>
                <Card style={styles.cardsDrawn}>
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
                <View style={styles.containerRow}>
                    <Button
                        style={[styles.button]}
                        mode="contained"
                        onPress={drawTile}
                    >
                        Draw Tile
                    </Button>
                    <Button
                        style={[styles.button]}
                        mode="contained"
                        color={'#4F6272'}
                        disabled={state.arenaLeversFound <= 0 || state.arenaLeversFlipped >= state.arenaLeversFound}
                        onPress={flipArenaLever}
                    >
                        Flip Arena Lever
                    </Button>
                </View>

            </View>
            <Portal>
                <Dialog
                    onDismiss={closeDialog}
                    visible={!!state.dialogTileNumber}
                >
                    <Dialog.Content>
                        <Title>
                            Draw Tile {state.dialogTileNumber}
                        </Title>
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
    containerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    cardsDrawn: {
        flex: 1,
        margin: 12,
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
