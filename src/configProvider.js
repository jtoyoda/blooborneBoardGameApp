import * as React from "react";
import {createContext, useContext, useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {getRandom, shuffleArray} from "./randomNumberUtils";

const BBBG_PREFIX = 'BBBG_APP'

const ConfigContext = createContext({});

export const useConfig = () => useContext(ConfigContext);

const defaultBoss = {name: '', box: ''}

const defaultDeck = [
    {
        title: 'BASIC',
        key: '1BASIC1'
    },
    {
        title: 'BASIC',
        key: '1BASIC2'
    },
    {
        title: 'BASIC',
        key: '1BASIC3'
    },
    {
        title: 'SPECIAL',
        key: '2SPECIAL1'
    },
    {
        title: 'SPECIAL',
        key: '2SPECIAL2'
    },
    {
        title: 'ABILITY',
        key: '3ABILITY'
    },
]

const defaultTileDeckState = {
    tileCount: 0,
    dialogTileNumber: undefined,
    arenaGateFound: false,
    arenaLeversFound: 0,
    arenaLeversFlipped: 0,
    revealBoss: 'unrevealed'
}

export const ConfigContextProvider = ({children}) => {
    const [hunterList, setHunterList] = useState([]);
    const [enemyList, setEnemyList] = useState([]);
    const [chaliceRiteCount, setChaliceRiteCount] = useState(0)
    const [boss, setBoss] = useState(defaultBoss)
    const [enemyDeckState, setEnemyDeckState] = React.useState(undefined);

    const [tileDeckState, setTileDeckState] = React.useState(undefined);

    const resetHunterList = () => {
        setHunterList([])
    }

    const resetEnemyList = () => {
        setEnemyList([])
    }

    const resetChaliceRiteCount = () => {
        setChaliceRiteCount(0)
    }

    const resetBoss = () => {
        setBoss(defaultBoss)
    }

    const shuffleEnemyDeck = () => {
        setEnemyDeckState(prevState => {
            return {
                ...prevState,
                drawnCards: [],
                deck: [...shuffleArray(defaultDeck)],
            }
        })
    }

    const drawEnemyDeckCard = () => {
        let deck = enemyDeckState.deck
        let shuffled = false
        if (deck.length <= 0) {
            deck = shuffleArray(defaultDeck)
            shuffled = true
        }
        const drawnCard = getRandom(deck)
        const drawnCards = shuffled ? [drawnCard] : [...enemyDeckState.drawnCards, drawnCard]
        const postDrawDeck = deck.filter(it => it.key !== drawnCard.key)
        setEnemyDeckState(
            {
                drawnCards,
                deck: postDrawDeck,
                dialogCard: drawnCard
            }
        )
    }

    const resetEnemyCardDeck = () => {
        setEnemyDeckState(
            {
                drawnCards: [],
                deck: [...shuffleArray(defaultDeck)],
                dialogCard: undefined,
            }
        )
    }

    const resetTileDeck = (setTileCount = false) => {
        if (setTileCount) {
            setTileDeckState({
                ...defaultTileDeckState,
                tileCount: hunterList.length + 6,
            })

        } else {
            setTileDeckState(defaultTileDeckState)
        }
    }

    useEffect(() => {
        if (hunterList.length > 0) {
            const jsonHunterList = JSON.stringify(hunterList)
            AsyncStorage.setItem(`${BBBG_PREFIX}::HUNTER_LIST`, jsonHunterList);
        }
    }, [hunterList]);

    useEffect(() => {
        AsyncStorage.getItem(`${BBBG_PREFIX}::HUNTER_LIST`).then((value) => {
            if (value) {
                setHunterList(JSON.parse(value));
            }
        });
    }, []);

    useEffect(() => {
        if (enemyList.length > 0) {
            const jsonEnemyList = JSON.stringify(enemyList)
            AsyncStorage.setItem(`${BBBG_PREFIX}::ENEMY_LIST`, jsonEnemyList);
        }
    }, [enemyList]);

    useEffect(() => {
        AsyncStorage.getItem(`${BBBG_PREFIX}::ENEMY_LIST`).then((value) => {
            if (value) {
                setEnemyList(JSON.parse(value));
            }
        });
    }, []);

    useEffect(() => {
        if (boss.name !== '') {
            const jsonBoss = JSON.stringify(boss)
            AsyncStorage.setItem(`${BBBG_PREFIX}::BOSS`, jsonBoss);
        }
    }, [boss]);

    useEffect(() => {
        AsyncStorage.getItem(`${BBBG_PREFIX}::BOSS`).then((value) => {
            if (value) {
                setBoss(JSON.parse(value));
            }
        });
    }, []);

    useEffect(() => {
        if (enemyDeckState !== undefined) {
            const jsonEnemyDeckState = JSON.stringify(enemyDeckState)
            AsyncStorage.setItem(`${BBBG_PREFIX}::ENEMY_DECK`, jsonEnemyDeckState);
        }
    }, [enemyDeckState]);

    useEffect(() => {
        AsyncStorage.getItem(`${BBBG_PREFIX}::ENEMY_DECK`).then((value) => {
            if (value) {
                setEnemyDeckState(JSON.parse(value));
            }
        });
    }, []);

    useEffect(() => {
        if (tileDeckState !== undefined) {
            const jsonTileDeckState = JSON.stringify(tileDeckState)
            AsyncStorage.setItem(`${BBBG_PREFIX}::TILE_DECK`, jsonTileDeckState);
        }
    }, [tileDeckState]);

    useEffect(() => {
        AsyncStorage.getItem(`${BBBG_PREFIX}::TILE_DECK`).then((value) => {
            if (value) {
                setTileDeckState(JSON.parse(value));
            }
        });
    }, []);

    return (
        <ConfigContext.Provider value={{
            hunterList,
            enemyList,
            chaliceRiteCount,
            boss,
            enemyDeckState,
            tileDeckState,
            setHunterList,
            setEnemyList,
            setChaliceRiteCount,
            setBoss,
            setEnemyDeckState,
            setTileDeckState,
            resetHunterList,
            resetEnemyList,
            resetChaliceRiteCount,
            resetBoss,
            resetEnemyCardDeck,
            resetTileDeck,
            shuffleEnemyDeck,
            drawEnemyDeckCard
        }}>
            {children}
        </ConfigContext.Provider>
    );
};
