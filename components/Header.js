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

import { signIn, signOut, useSession, getSession } from "next-auth/client";

const Header = () => {
  const [session, loading] = useSession();

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
          <ChakraLink href="/">
            <Image
              src="/logo/logo.png"
              objectFit="contain"
              width={["100px", "130px"]}
              alt="demaloo logo"
            />
          </ChakraLink>

          <Flex>
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
                {/* <pre>{JSON.stringify(session, null, 2)}</pre> */}
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
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};

export default Header;
