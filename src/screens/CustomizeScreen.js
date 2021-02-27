import * as React from "react";
import {useState} from "react";
import BackgroundImage from "../components/BackgroundImage";
import {Button, Card, Divider, List, Title} from "react-native-paper";
import {ScrollView, StyleSheet} from "react-native";
import {RippleCheckbox} from "../components/RippleCheckbox";
import {Counter} from "../components/Counter"
import {boxes} from "../boxInfo";
import {useConfig} from "../configProvider";
import {getRandom, getRandomSubset} from "../randomNumberUtils";

const defaultHunters = {
    "Hunter Axe": true,
    "Ludwig's Holy Blade": true,
    "Saw Cleaver": true,
    "Threaded Cane": true,
    "Blade of Mercy": true,
    "Burial Blade": true,
    "Kirkhammer": true,
    "Logarius' Wheel": true,
    "Tonitrus": true,
    "Beast Claw": true,
    "Chikage": true,
    "Rifle Spear": true,
    "Stake Drive": true,
}
const defaultEnemies = {
    "Beast Patient (Female)": true,
    "Beast Patient (Male)": true,
    "Church Giant": true,
    "Church Servant": true,
    "Hunter Mob": true,
    "Huntman's Minion": true,
    "Scourge Beast": true,
    "Giant Lost Child": true,
    "Large Huntsmen": true,
    "Loran Silverbeast": true,
    "Merciless Watcher": true,
    "Nightmare Apostle": true,
    "Fluorescent Flowers": true,
    "Gravekeeper Scorpion": true,
    "Hunting Dogs": true,
    "Keeper of the Old Lords": true,
    "Labyrinth Rat": true,
    "Rabid Dog": true,
    "Garden of Eyes": false,
    "Roms Children": false,
    "Scholar": false,
    "Bloodlicker": false,
    "Cain's Servant": false,
    "Forsaken Castle Spirit": false,
    "Lost Child of Antiquity": false,
    "Vileblood Knight": false,
    "Executioner": false,
    "Winter Lantern": false,
    "Mergo's Attendants": false,
    "Mergo's Chief Attendants": false,
    "Brainsucker": false,
    "Small Celestial Emissary": false,
    "Hemwick Grave Woman": false,
    "Mad One": false,
    "Maneater Boar": false,
    "Snake Parasite": false,
    "Snakeball": false,
    "Cramped Casket": false,
    "Kidnapper": false
}
const defaultBosses = {
    "Blood-Starved Beast": true,
    "Cleric Beast": true,
    "Father Gascoigne(normal)": true,
    "Father Gascoigne(transformed)": true,
    "Vicar Amelia": true,
    "Large Nightmare Apostle": true,
    "Beast-possessed Soul": true,
    "Pthumerian Descendant": true,
    "Undead Giant": true,
    "Watchdog of the Old Lords": true,
    "Yharnam, Pthumerian Queen": true,
    "Rom, the Vacuous Spider": false,
    "Martyr Logarius": false,
    "Gehrman": false,
    "Moon Presence": false,
    "Mergo's Wet Nurse": false,
    "Eberietas, Daughter of the Cosmos": false,
    "Shadows of Yharnam": false,
    "The Witch of Hemwick": false,
    "The One Reborn": false

}

export function CustomizeScreen({navigation}) {
    const [hunters, setHunters] = useState(defaultHunters)
    const [bosses, setBosses] = useState(defaultBosses)
    const [enemies, setEnemies] = useState(defaultEnemies)
    const [chaliceRitesCount, setStateChaliceRiteCount] = useState(0)
    const [numHunters, setNumHunters] = useState(2)

    const {setHunterList, setEnemyList, setBoss, setChaliceRiteCount} = useConfig()

    const setHunterValue = (name, value) => () => {
        setHunters({
            ...hunters,
            [name]: value
        })
    }

    const setAllHunters = (value) => () => {
        const allHunters = {}
        Object.keys(hunters).forEach((hunter) =>
            allHunters[hunter] = value
        )
        setHunters({
                ...hunters,
                ...allHunters
            }
        )
    }

    function generateHunterCheckbox(hunter) {
        return (
            <RippleCheckbox
                key={hunter}
                title={hunter}
                onPress={setHunterValue(hunter, !hunters[hunter])}
                status={hunters[hunter]}
            />
        )
    }

    function generateHunters(box) {
        if (boxes[box].hunters.length > 0) {
            return (
                <List.Accordion key={box} title={box}>
                    {boxes[box].hunters.map(generateHunterCheckbox)}
                </List.Accordion>
            )
        }
    }

    const setEnemyValue = (name, value) => () => {
        setEnemies({
            ...enemies,
            [name]: value
        })
    }

    const setAllBoxEnemies = (box, value) => () => {
        const allBoxEnemies = {}
        boxes[box].enemies.forEach((enemy) =>
            allBoxEnemies[enemy] = value
        )
        setEnemies({
                ...enemies,
                ...allBoxEnemies
            }
        )
    }

    const setAllEnemies = (value) => () => {
        const allEnemies = {}
        Object.keys(enemies).forEach((enemy) =>
            allEnemies[enemy] = value
        )
        setEnemies({
                ...enemies,
                ...allEnemies
            }
        )
    }

    function generateEnemyCheckbox(enemy) {
        return (
            <RippleCheckbox
                key={enemy}
                title={enemy}
                onPress={setEnemyValue(enemy, !enemies[enemy])}
                status={enemies[enemy]}
            />
        )
    }

    function generateEnemies(box) {
        const allBoxEnemiesTrue = boxes[box].enemies.every(enemy => enemies[enemy])
        return (
            <List.Accordion key={box} title={box}>
                <RippleCheckbox
                    title={`Select All ${box} Enemies`}
                    onPress={setAllBoxEnemies(box, !allBoxEnemiesTrue)}
                    status={allBoxEnemiesTrue}
                />
                <Divider/>
                {boxes[box].enemies.map(generateEnemyCheckbox)}
            </List.Accordion>
        )
    }


    const setBossValue = (name, value) => () => {
        setBosses({
            ...bosses,
            [name]: value
        })
    }

    const setAllBoxBosses = (box, value) => () => {
        const allBoxBosses = {}
        boxes[box].bosses.forEach((boss) =>
            allBoxBosses[boss] = value
        )
        setBosses({
                ...bosses,
                ...allBoxBosses
            }
        )
    }

    const setAllBosses = (value) => () => {
        const allBosses = {}
        Object.keys(bosses).forEach((boss) =>
            allBosses[boss] = value
        )
        setBosses({
                ...bosses,
                ...allBosses
            }
        )
    }

    function generateBossCheckbox(boss) {
        return (
            <RippleCheckbox
                key={boss}
                title={boss}
                onPress={setBossValue(boss, !bosses[boss])}
                status={bosses[boss]}
            />
        )
    }

    function generateBosses(box) {
        const allBoxBossesTrue = boxes[box].bosses.every(boss => bosses[boss])
        return (
            <List.Accordion key={box} title={box}>
                {boxes[box].bosses.length > 1 &&
                <RippleCheckbox
                    title={`Select All ${box} Bosses`}
                    onPress={setAllBoxBosses(box, !allBoxBossesTrue)}
                    status={allBoxBossesTrue}
                />
                }
                {boxes[box].bosses.length > 1 &&
                <Divider/>
                }
                {boxes[box].bosses.map(generateBossCheckbox)}
            </List.Accordion>
        )
    }

    function saveAndNavigate() {
        setEnemyList(getRandomSubset(Object.keys(enemies).filter(enemy => enemies[enemy]), 3))
        setHunterList(getRandomSubset(Object.keys(hunters).filter(hunter => hunters[hunter]), numHunters))
        setChaliceRiteCount(chaliceRitesCount)
        const possibleBosses = Object.keys(bosses).filter(boss => bosses[boss])
        const boss = getRandom(possibleBosses)
        const bossBox = Object.keys(boxes).find(box => boxes[box].bosses.indexOf(boss) > -1)
        setBoss({
            name: boss,
            box: bossBox
        })
        navigation.navigate('Setup')
    }

    function notEnoughHunters() {
        return Object.values(hunters).filter((hunter) => hunter).length < numHunters;

    }

    function notEnoughEnemies() {
        return Object.values(enemies).filter((enemy) => enemy).length < 3
    }

    const allHuntersSelected = Object.values(hunters).every((it) => it)
    const allEnemiesSelected = Object.values(enemies).every((it) => it)
    const allBossesSelected = Object.values(bosses).every((it) => it)
    return (
        <BackgroundImage>
            <ScrollView style={styles.container}>
                <Card style={styles.card}>
                    <Counter
                        title={"Hunter Count"}
                        max={4}
                        min={1}
                        value={numHunters}
                        setCount={setNumHunters}
                    />
                </Card>
                <Card style={styles.card}>
                    <List.Accordion title={<Title>Hunters</Title>}>
                        <RippleCheckbox
                            title='Select All Hunters'
                            onPress={setAllHunters(!allHuntersSelected)}
                            status={allHuntersSelected}
                        />
                        <Divider/>
                        {Object.keys(boxes).map(generateHunters)}
                    </List.Accordion>
                </Card>
                <Card style={styles.card}>
                    <List.Accordion title={<Title>Enemies</Title>}>
                        <RippleCheckbox
                            title='Select All Enemies'
                            onPress={setAllEnemies(!allEnemiesSelected)}
                            status={allEnemiesSelected}
                        />
                        <Divider/>
                        {Object.keys(boxes).map(generateEnemies)}
                    </List.Accordion>
                </Card>
                <Card style={styles.card}>
                    <List.Accordion title={<Title>Bosses</Title>}>
                        <RippleCheckbox
                            title='Select All Bosses'
                            onPress={setAllBosses(!allBossesSelected)}
                            status={allBossesSelected}
                        />
                        <Divider/>
                        {Object.keys(boxes).map(generateBosses)}
                    </List.Accordion>
                </Card>
                <Card style={styles.card}>
                    <Counter
                        title={"Number of Chalice Rites"}
                        max={5}
                        min={0}
                        value={chaliceRitesCount}
                        setCount={setStateChaliceRiteCount}
                    />
                </Card>
                <Button
                    style={[styles.button]}
                    mode="contained"
                    onPress={saveAndNavigate}
                    disabled={notEnoughEnemies() || notEnoughHunters()}
                >
                    {notEnoughHunters() ? `Select at least ${numHunters} Hunter${numHunters === 1 ? '' : 's'}` :
                        notEnoughEnemies() ? 'Select at least 3 Enemies' : 'Generate Chalice Game'}
                </Button>
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
    card: {
        margin: 4,
    }
});
