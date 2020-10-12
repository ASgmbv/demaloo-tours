import { theme } from "@chakra-ui/core";
import { merge } from "@chakra-ui/utils";

const customTheme = merge(theme, {
  fonts: {
    body: "Comfortaa, sans-serif",
    heading: "Comfortaa, sans-serif",
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
          fontFamily: "Comfortaa, sans-serif",
          fontSize: "18px",
          lineHeight: "32px",
          marginBottom: "30px",
        },
        a: {
          textDecoration: "underline",
        },
      },
    },
  },
});

export default customTheme;
