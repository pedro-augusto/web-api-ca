// REFERENCES: 
// https://muhimasri.com/blogs/how-to-customize-theme-and-colors-in-material-ui/#introduction
// https://colorhunt.co/palette/309898ff9f00f4631ecb0404
// https://blog.logrocket.com/add-custom-fonts-mui
// https://mui.com/material-ui/customization/typography
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        primary: {
            main: "#CB0404"
        },
        secondary: {
            main: "#309898"
        },
        tertiary: {
            main: "#FF9F00"
        }
    },
    typography: {
        fontFamily: '"Montserrat", sans-serif',
        h1: { fontFamily: '"Bebas Neue", sans-serif' },
        h2: { fontFamily: '"Poppins", sans-serif' },
        h3: { fontFamily: '"Poppins", sans-serif' },
        h4: {
            fontFamily: '"Bebas Neue", sans-serif',
            letterSpacing: 2
        },
        h5: { fontFamily: '"Poppins", sans-serif' , textTransform: "uppercase"},
        button: { textTransform: "none" },
    },
});

export default theme;