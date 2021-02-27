import * as React from "react";
import {StyleSheet, View} from "react-native";
import {Button, IconButton, Paragraph, Title} from "react-native-paper";

export function Counter({value, min, max, setCount, title}) {
    function increment() {
        if(value + 1 <= max) {
            setCount(value + 1)
        }
    }

    function decrement() {
        if(value - 1 >= min) {
            setCount(value -1)
        }
    }
    return (
        <View style={styles.counter}>
            <Title>
                {title}
            </Title>
            <View style={styles.numericControl}>
                <IconButton onPress={increment} icon="plus"/>
                <Title style={{"paddingHorizontal": 10}}>{value}</Title>
                <IconButton onPress={decrement} icon="minus"/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    counter: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 12,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    numericControl: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-end',
        alignItems: 'center',
    }
});
