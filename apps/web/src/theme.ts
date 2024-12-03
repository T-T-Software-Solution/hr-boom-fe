import { createTheme } from '@mantine/core';

export const theme = createTheme({
    primaryColor: 'primary',
    primaryShade: { light: 4, dark: 6 },
    fontFamily: 'Bai Jamjuree',
    colors: {
        primary: [
            '#ffece4',
            '#ffd8cd',
            '#ffb19a',
            '#ff8663',
            '#ff6336',
            '#ff4c18',
            '#ff3f07',
            '#e43100',
            '#cc2800',
            '#b21d00',
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