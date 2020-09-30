import Link from "next/link";
import { jsx, css, keyframes } from "@emotion/core";
import {
  Box,
  Flex,
  Heading,
  useColorMode,
  Button,
  Stack,
} from "@chakra-ui/core";

const flame = keyframes`
  from {
    
  }
  to {
    transform: translateY(-240px) scale(0.1);
  }
`;

const Hero = React.forwardRef(({ ...props }, ref) => {
  const { colorMode } = useColorMode();

  return (
    <Box
      ref={ref}
      {...props}
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
        {colorMode === "dark" &&
          [...Array(10)].map((_, index) => (
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
                animation: `${flame}`,
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
        <Stack align="center" spacing="4" mt="3">
          <Heading
            as="h1"
            sx={{
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
            }}
          >
            Быстрый поиск туров по всему Кыргызстану
          </Heading>

          <Link href="/search" passHref>
            <Button
              as="a"
              colorScheme="orange"
              size="lg"
              borderRadius="10px"
              width="100%"
              border="2px solid #fff"
              width="fit-content"
            >
              Все туры
            </Button>
          </Link>
        </Stack>
      </Flex>
    </Box>
  );
});

// const wind = keyframes`
//   from {

//   }
//   33% {
//     transform-origin: 100px;
//     transform: translateX(20vw) rotate(360deg);
//   }
//   66% {
//     transform-origin: -100px;
//     transform: translateX(50vw) rotate(360deg);
//   }
//   to {
//     transform: translateX(100vw) rotate(360deg);
//   }
// `;

{
  /* {colorMode === "light" &&
          [...Array(1)].map((_, index) => (
            <Leaf
              key={index}
              sx={{
                animation: `${wind}`,
                animationIterationCount: "infinite",
                animationTimingFunction: "linear",
                animationDuration: "5s",
                position: "absolute",
                bottom: "50%",
                left: "10%",
                width: "50px",
                height: "50px",
              }}
            />

            // <Box
            //   sx={{
            //     width: "50px",
            //     height: "3px",
            //     bg: "white",
            //     position: "absolute",
            //     bottom: "50%",
            //     left: "10%",
            //     // bottom: `${20 + Math.floor(Math.random() * 10)}%`,
            //     // left: `${40 + Math.floor(Math.random() * 10)}%`,
            //     animation: `${wind}`,
            //     animationIterationCount: "infinite",
            //     animationTimingFunction: "linear",
            //     animationDuration: "5s",
            //     // animationDelay: `-${Math.floor(Math.random() * 4)}s`,
            //   }}
            //   key={index}
            // ></Box>
          ))} */
}

export default Hero;
