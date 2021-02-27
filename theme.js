import {DarkTheme as PaperDarkTheme} from "react-native-paper";
import {DarkTheme as NavigationDarkTheme} from "@react-navigation/native";
import merge from 'deepmerge';

const CombinedDarkTheme = merge(PaperDarkTheme, NavigationDarkTheme);

export const theme = {
    ...CombinedDarkTheme,
    colors: {
        ...CombinedDarkTheme.colors,
        primary: '#B7C3F3',
        accent: '#9A1818',
    },
};
