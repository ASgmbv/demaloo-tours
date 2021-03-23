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
} from "@chakra-ui/react";
import Link from "next/link";
import LogoIcon from "../icons/Logo";
import { FeedbackForm } from "feedback-fish";

const FeedbackFishButton = (props) => {
  return (
    <Button
      mt={[4, 0]}
      {...props}
      bg="white"
      color="primary.500"
      borderRadius="10px"
    >
      Оставьте отзыв
    </Button>
  );
};

const Footer = () => {
  return (
    <Box as="footer" sx={{ width: "100%", bg: "blue.600" }}>
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
          <LogoIcon
            width={["100px", "130px"]}
            height={["40px"]}
            color={"#fff"}
            mb={["20px", 0]}
          />
          {/* 
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
          </Button> */}

          {/* <FeedbackForm
            projectId={"9c2cf5932ba675"}
            triggerComponent={FeedbackFishButton}
          /> */}
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
                <ChakraLink
                  href="tel:+996706100901"
                  target="_blank"
                  color="white"
                >
                  +996 706 100 901
                </ChakraLink>
              </ListItem>

              <ListItem>
                <ChakraLink
                  href="tel:+996702308926"
                  target="_blank"
                  color="white"
                >
                  +996 702 308 926
                </ChakraLink>
              </ListItem>

              <ListItem>
                <ChakraLink
                  href="mailto:demaloo.dev@gmail.com"
                  target="_blank"
                  color="white"
                >
                  demaloo.dev@gmail.com
                </ChakraLink>
              </ListItem>
            </List>
          </Stack>

          <Stack spacing="15px" mt={["20px", 0]}>
            <Text sx={{ color: "white", fontSize: "lg" }}>СОЦИАЛЬНЫЕ СЕТИ</Text>
            <List spacing="5px">
              <ListItem>
                <ChakraLink
                  href="https://docs.google.com/document/d/1p4FYzcMEnk2GlJRbZNEk85sUJTK9m7_w2mEak_6ILXk/edit?usp=sharing"
                  isExternal
                  color="white"
                >
                  Публичная оферта
                </ChakraLink>
              </ListItem>
              <ListItem>
                <ChakraLink
                  href="https://docs.google.com/document/d/1CGGiSYGTTu-gc7DktnD1WXW2tn-F-_tAH6A4KsptmmI/edit?usp=sharing"
                  isExternal
                  color="white"
                >
                  Политика конфиденциальности
                </ChakraLink>
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
