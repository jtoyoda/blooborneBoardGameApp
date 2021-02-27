import {List} from "react-native-paper";
import {StyleSheet, View} from "react-native";
import * as React from "react";

export function BoxRequirementsItem({title, items, icon}) {
    return (
        <View style={styles.item}>
            <List.Subheader>{title}</List.Subheader>
            {items.length > 0 ? items.map(it => (<List.Item key={it} title={it}/>)) : <List.Item title={'None'}/>}
        </View>
    )
}

const styles = StyleSheet.create({
    item: {
        flex: 1,
        padding: 5
    }
});
