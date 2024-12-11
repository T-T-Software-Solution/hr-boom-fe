import { type MantineColorsTuple, createTheme } from "@mantine/core";

const bkkGreen: MantineColorsTuple = [
    '#f2f9f6',
    '#dff0e8',
    '#b3d9c8',
    '#87c2a8',
    '#006B3E',
    '#005a34',
    '#004829',
    '#00371f',
    '#002515',
    '#00140b'
]

const mantineSkyBlue: MantineColorsTuple = [
    '#e1f8ff',
    '#cbedff',
    '#9ad7ff',
    '#64c1ff',
    '#3aaefe',
    '#20a2fe',
    '#099cff',
    '#0088e4',
    '#0079cd',
    '#0068b6'
]

export const theme = createTheme({
    scale: 1,
    fontFamily: 'IBM Plex Sans Thai',
    // primaryShade: { light: 9, dark: 7 },
    colors: {
        primary: bkkGreen,
        mantineSkyBlue,
    },
    /** Your theme override here */
});