import {Checkbox, Paragraph, TouchableRipple} from "react-native-paper";
import {StyleSheet, View} from "react-native";
import * as React from "react";

export function RippleCheckbox({title, status, onPress}) {
    return (
        <TouchableRipple onPress={onPress}>
            <View style={styles.checkbox}>
                <Paragraph>{title}</Paragraph>
                <View pointerEvents="none">
                    <Checkbox status={status ? 'checked' : 'unchecked'}/>
                </View>
            </View>
        </TouchableRipple>
    )
}

const styles = StyleSheet.create({
    checkbox: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: 12,
        justifyContent: 'space-between',
        marginLeft: 10
    },
});
