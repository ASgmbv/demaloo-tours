import React from "react";
import {
  Box,
  Image,
  Container,
  Flex,
  Text,
  Divider,
  Button,
  Stack,
  List,
  ListItem,
  Link as ChakraLink,
} from "@chakra-ui/core";
import Link from "next/link";

const Footer = () => {
  return (
    <Box as="footer" sx={{ width: "100%", bg: "#20C4CE" }}>
      <Container
        maxW="xl"
        sx={{
          display: "flex",
          pt: "50px",
          pb: "20px",
          flexDirection: ["column"],
        }}
      >
        <Flex
          sx={{
            justifyContent: "space-between",
            flexDirection: ["column", "row"],
          }}
        >
          <Image
            src="/logo/logo_white.png"
            objectFit="contain"
            width={["100px", "130px"]}
            mb={["20px", 0]}
            alt="demaloo logo"
          />

          <Button
            as="a"
            target="_blank"
            href="https://forms.gle/c17giajCUDcqoupi8"
            rel="noopener"
            bg="white"
            color="primary.500"
            // size="lg"
            borderRadius="10px"
          >
            СОТРУДНИЧЕСТВО
          </Button>
        </Flex>
        <Flex
          sx={{
            justifyContent: "space-between",
            mt: ["20px", "50px"],
            flexDirection: ["column", "row"],
          }}
        >
          <Stack spacing="15px">
            <Text sx={{ color: "white", fontSize: "lg" }}>КОНТАКТЫ</Text>
            <List spacing="5px">
              <ListItem>
                <Link href="tel:+996706100901" passHref>
                  <ChakraLink target="_blank" color="white">
                    +996 706 100 901
                  </ChakraLink>
                </Link>
              </ListItem>

              <ListItem>
                <Link href="tel:+996702308926" passHref>
                  <ChakraLink target="_blank" color="white">
                    +996 702 308 926
                  </ChakraLink>
                </Link>
              </ListItem>

              <ListItem>
                <Link href="mailto:demaloo.dev@gmail.com" passHref>
                  <ChakraLink target="_blank" color="white">
                    demaloo.dev@gmail.com
                  </ChakraLink>
                </Link>
              </ListItem>
            </List>
          </Stack>

          <Stack spacing="15px" mt={["20px", 0]}>
            <Text sx={{ color: "white", fontSize: "lg" }}>СОЦИАЛЬНЫЕ СЕТИ</Text>
            <List spacing="5px">
              <ListItem>
                <Link href="/" passHref>
                  <ChakraLink target="_blank" color="white">
                    FACEBOOK
                  </ChakraLink>
                </Link>
              </ListItem>
              <ListItem>
                <Link href="/" passHref>
                  <ChakraLink target="_blank" color="white">
                    TWITTER
                  </ChakraLink>
                </Link>
              </ListItem>
            </List>
          </Stack>
        </Flex>
        <Divider my="20px" />
        <Flex sx={{ justifyContent: "center", color: "white" }}>
          ©Demaloo 2020
        </Flex>
      </Container>
    </Box>
  );
};

export default Footer;
