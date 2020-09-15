import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/core";
import theme from "../theme";

function MyApp({ Component, pageProps }) {
   return (
      <ChakraProvider resetCSS>
         <Component {...pageProps} />
      </ChakraProvider>
   );
}

export default MyApp;