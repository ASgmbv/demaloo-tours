import {
  Box,
  Container,
  Flex,
  Link as ChakraLink,
  useColorMode,
  IconButton,
  Button,
  Text,
} from "@chakra-ui/react";
import LogoIcon from "../icons/Logo";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { keyframes } from "@emotion/core";
import Link from "next/link";

const Header = React.forwardRef(({ isVisible = false, ...props }, ref) => {
  const { colorMode, toggleColorMode } = useColorMode();

  const button = keyframes`
      from {
        transform: scale(2) translateY(10px);
      }
      to {
        transform: scale(1) translateY(0px);
      }
    `;

  return (
    <Box
      ref={ref}
      {...props}
      as="header"
      sx={{
        borderBottom: "1px solid",
        borderBottomColor: "gray.300",
        position: "sticky",
        top: 0,
        // TODO these may lead to unexpected bugs, research
        zIndex: 100,
        bg: colorMode === "dark" ? "#1A202C" : "white",
        // marginBottom: "-65px",
      }}
    >
      <Container maxW="7xl">
        <Flex
          sx={{
            width: "100%",
            height: "64px",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <ChakraLink href="/" sx={{ justifySelf: "flex-start" }}>
            <LogoIcon
              width={["100px", "130px"]}
              height={["40px"]}
              color={colorMode === "dark" && "#fff"}
            />
          </ChakraLink>

          <Text
            flex="1"
            textAlign="end"
            px="3"
            href="https://wa.me/+996500100901?text=Здравствуйте"
            as="a"
          >
            0500 100 901 (WhatsApp)
          </Text>

          <IconButton
            sx={{
              justifySelf: "flex-end",
            }}
            onClick={() => {
              toggleColorMode();
            }}
            aria-label="Search database"
            icon={colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
          />
        </Flex>
      </Container>
    </Box>
  );
});

export default Header;
