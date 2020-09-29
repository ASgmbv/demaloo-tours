import {
  Box,
  Container,
  Flex,
  Link as ChakraLink,
  useColorMode,
  IconButton,
} from "@chakra-ui/core";
import LogoIcon from "../icons/Logo";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

// import { signIn, signOut, useSession, getSession } from "next-auth/client";

const Header = () => {
  // const [session, loading] = useSession();
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box
      as="header"
      sx={{
        borderBottom: "1px solid",
        borderBottomColor: "gray.300",
        // bg: "white",
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
          <ChakraLink href="/">
            <LogoIcon
              width={["100px", "130px"]}
              height={["40px"]}
              color={colorMode === "dark" && "#fff"}
            />
          </ChakraLink>

          <IconButton
            onClick={() => {
              toggleColorMode();
            }}
            aria-label="Search database"
            icon={colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
          />

          {/* <Flex>
            {!session && (
              <>
                <a
                  href={`/api/auth/signin`}
                  onClick={(e) => {
                    e.preventDefault();
                    signIn();
                  }}
                >
                  Sign in
                </a>
              </>
            )}
            {session && (
              <>
                <a
                  href={`/api/auth/signout`}
                  onClick={(e) => {
                    e.preventDefault();
                    signOut();
                  }}
                >
                  Sign out
                </a>
              </>
            )}
          </Flex> */}
        </Flex>
      </Container>
    </Box>
  );
};

export default Header;
