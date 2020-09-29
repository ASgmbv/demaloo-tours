import Link from "next/link";
import { jsx, css, keyframes } from "@emotion/core";
import { Box, Flex, Heading, useColorMode, Button } from "@chakra-ui/core";

const randomWalk = keyframes`
  from {
    
  }
  to {
    transform: translateY(-240px) scale(0.1);
  }
`;

const Hero = (params) => {
  const { colorMode } = useColorMode();
  return (
    <Box
      as="section"
      sx={{
        width: "100%",
        position: "relative",
        height: ["400px", "400px", "500px"],
        bg: colorMode === "dark" ? "#0B3372" : "#91DEDB",
        backgroundImage: `url(${
          colorMode === "dark"
            ? "/heroes/herodark.png"
            : "/heroes/herolight.png"
        })`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      >
        {[...Array(10)].map((_, index) => (
          <Box
            key={index}
            sx={{
              width: "4px",
              height: "4px",
              borderRadius: "50%",
              bg: "#E5B908",
              position: "absolute",
              bottom: `${50 + Math.floor(Math.random() * 50)}px`,
              left: `${43 + Math.floor(Math.random() * 10)}%`,
              animation: `${randomWalk}`,
              animationDuration: `${3 + Math.floor(Math.random() * 10)}s`,
              animationDelay: `-${Math.floor(Math.random() * 10)}s`,
              animationIterationCount: "infinite",
              animationTimingFunction: "linear",
            }}
          ></Box>
        ))}
      </Box>

      <Flex
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "top",
          flexDirection: "column",
          bg: "rgba(0, 0, 0, 0.1)",
        }}
      >
        <Heading
          as="h1"
          sx={{
            mb: 4,
            mt: 6,
            color: "white",
            fontSize: ["2xl", "4xl"],
            textAlign: "center",
            transition: "opacity .3s, transform .6s",
            transitionDelay: ".4s",
          }}
        >
          Путешествуйте с нами!
        </Heading>
        <Heading
          as="h2"
          sx={{
            color: "white",
            maxW: "300px",
            textAlign: "center",
            fontSize: ["lg", "xl"],
            lineHeight: "tall",
            mb: 8,
          }}
        >
          Быстрый поиск туров по всему Кыргызстану
        </Heading>

        <Box
          sx={{
            bg: "rgba(255, 255, 255, 0.8)",
            borderRadius: "10px",
            border: "3px solid",
            borderColor: "white",
          }}
        >
          <Link href="/search" passHref>
            <Button as="a" colorScheme="orange" size="lg" borderRadius="10px">
              Все туры
            </Button>
          </Link>
        </Box>
      </Flex>
    </Box>
  );
};

export default Hero;
