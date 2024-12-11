import { createTheme } from '@mantine/core';

export const theme = createTheme({
    scale: 1,
    primaryColor: 'primary',
    primaryShade: { light: 4, dark: 6 },
    fontFamily: 'Bai Jamjuree',
    colors: {
        primary: [
            "#e1f8ff",
            "#cbedff",
            "#9ad7ff",
            "#64c1ff",
            "#3aaefe",
            "#20a2fe",
            "#099cff",
            "#0088e4",
            "#0079cd",
            "#0068b6"
        ],
        slate: [
            '#f1f5f9',
            '#e2e6ec',
            '#c0ccd9',
            '#9bb1c8',
            '#7c99b9',
            '#688ab0',
            '#5e83ac',
            '#4d7098',
            '#426588',
            '#345779',
        ],
    },
    /** Your theme override here */
});