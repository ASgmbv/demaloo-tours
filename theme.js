import { extendTheme } from "@chakra-ui/react";

// useSystemColorMode: false,
// initialColorMode: "light",

const customTheme = extendTheme({
  fonts: {
    body: "Raleway, sans-serif",
    heading: "Raleway, sans-serif",
  },
  colors: {
    primary: {
      50: "#dbfdff",
      100: "#b5f3f7",
      200: "#8ceaef",
      300: "#61e0e8",
      400: "#38d6e0",
      500: "#1fbdc7",
      600: "#0d939c",
      700: "#006a6f",
      800: "#004044",
      900: "#001719",
    },
  },
  styles: {
    global: {
      ".blog-content": {
        p: {
          fontFamily: "Raleway, sans-serif",
          fontSize: "18px",
          lineHeight: "32px",
          paddingBottom: "30px",
        },
        a: {
          textDecoration: "underline",
        },
      },
    },
  },
});

export default customTheme;
