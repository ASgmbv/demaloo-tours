import {
  Box,
  Container,
  Flex,
  Image,
  Link as ChakraLink,
  Stack,
  ListItem,
} from "@chakra-ui/core";
import Link from "next/link";

const Header = () => {
  return (
    <Box
      as="header"
      sx={{
        borderBottom: "1px solid",
        borderBottomColor: "gray.300",
        bg: "white",
      }}
    >
      <Container maxW="lg">
        <Flex
          sx={{
            width: "100%",
            height: "64px",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Link href="/" passHref>
            <ChakraLink>
              <Image src="/logo.png" objectFit="contain" width="150px" />
            </ChakraLink>
          </Link>
        </Flex>
      </Container>
    </Box>
  );
};

export default Header;
