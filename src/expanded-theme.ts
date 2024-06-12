
// eslint-disable-next-line @typescript-eslint/no-unused-vars


declare module "@mui/material/styles/createPalette" {

    interface PaletteColor {
        [key: number]: string,
    }

    interface Palette {
        tertiary: PaletteColor
    }
}