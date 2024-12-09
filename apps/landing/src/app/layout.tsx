import { createTheme, MantineProvider } from "@mantine/core";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = createTheme({
    primaryColor: 'primary',
    // primaryShade: { light: 9, dark: 7 },
    primaryShade: { light: 4, dark: 6 },
    colors: {
      // primary: [
      //   "#ebfff4",
      //   "#d6fde7",
      //   "#a7fbcc",
      //   "#76fab0",
      //   "#52f998",
      //   "#41f888",
      //   "#37f980",
      //   "#2cdd6d",
      //   "#20c460",
      //   "#04aa50"
      // ],
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
  return (
    <MantineProvider theme={theme}>
      {children}
    </MantineProvider>
  );
}