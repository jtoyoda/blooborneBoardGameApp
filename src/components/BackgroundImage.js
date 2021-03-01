import {ImageBackground, StyleSheet, View} from "react-native";
import * as React from "react";

export default function ({children}) {
    return (
        <View style={[styles.container]}>
            <ImageBackground
                source={require('../../assets/bloodborne.jpg')}
                style={{
                    height: '100%',
                    width: '100%',
                    position: 'relative',
                    top: 0,
                    left: 0,
                    flex: 1
                }}
            >
                {children}
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
