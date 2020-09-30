import Head from "next/head";
import {
  Box,
  Image,
  Heading,
  Container,
  Flex,
  Text,
  Button,
  Stack,
  Wrap,
  Center,
  Grid,
  Alert,
  CloseButton,
  Link as ChakraLink,
  useColorMode,
} from "@chakra-ui/core";

import Hero from "../components/Hero";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { partners, places } from "../utils/data";
import { useRef, useEffect } from "react";
// Tour Page

export default function Home() {
  // useEffect(() => {
  //   let observer = new IntersectionObserver(
  //     (entries, observer) => {
  //       // console.log("hurray!", entries, observer);
  //       console.log("threshold!");
  //     },
  //     {
  //       root: null,
  //       rootMargin: "0px",
  //       threshold: 0,
  //     }
  //   );

  //   observer.observe(heroRef.current);

  //   return () => {};
  // }, [headerRef]);

  return (
    <>
      <Head>
        <title>
          Туры по низким ценам от ведущих турагенств и гидов | Demaloo
        </title>
        <meta
          name="description"
          content="Приобретите горящие туры, экскурсии, отдых за городом, на выходные и.т.д. 5% от суммы покупки накапливаются у вас! Туризм Кыргызстана"
        />
        <meta
          name="keywords"
          content="туры, экскурсии, горящие туры, турагентство ,отдых за городом, тур пакеты, туристические пакеты"
        />
      </Head>
      <Box as="main" sx={{ width: "100%" }}>
        <Alert
          status="info"
          sx={{
            textAlign: "center",
            justifyContent: "center",
            alignItems: "center",
            py: "10px",
            fontSize: "14px",
            textDecoration: "underline",
          }}
        >
          <ChakraLink href="https://covid.kg" rel="noopener" target="_blank">
            Актуальная информация о COVID-19 в Кыргызстане
          </ChakraLink>
        </Alert>
        <Header />

        <Hero />

        <Container as="section" maxW="xl" sx={{ my: ["50px", "100px"] }}>
          <Heading
            as="h2"
            sx={{
              fontSize: ["xl", "2xl"],
              textAlign: "center",
              mb: "10px",
              mx: "auto",
            }}
          >
            Бронируйте туры быстро и легко!
          </Heading>
          <Box
            sx={{
              width: "50px",
              height: "4px",
              backgroundColor: "#20C4CE",
              mx: "auto",
            }}
          />
          <Stack
            direction={["column", null, "row"]}
            spacing={[8]}
            sx={{ width: "100%", marginTop: "50px" }}
          >
            <Flex
              sx={{
                p: [0, 4],
                flex: 1,
                flexDirection: "column",
                minW: 56,
                alignItems: ["start", "center"],
              }}
            >
              <Heading
                as="h3"
                fontSize={["18px", "22px"]}
                sx={{
                  textAlign: "center",
                  mb: 3,
                }}
              >
                О нас 🤘
              </Heading>
              <Text sx={{ textAlign: ["start", "center"], maxW: "md" }}>
                Сотрудничаем с более <strong>13-ти турфирмами.</strong>
                <br />
                Около <strong>50 туров</strong> и экскурсий по всем
                достопримечательностям Бишкека, Каракола, Нарына и т.д.
              </Text>
            </Flex>

            <Flex
              sx={{
                p: [0, 4],
                flex: 1,
                flexDirection: "column",
                minW: 56,
                alignItems: ["start", "center"],
              }}
            >
              <Heading
                as="h3"
                fontSize={["18px", "22px"]}
                sx={{ textAlign: "center", mb: 3 }}
              >
                Почему мы? 👊
              </Heading>
              <Text sx={{ textAlign: ["start", "center"], maxW: "md" }}>
                Те же цены что и у турагенств
                <br />
                Накопительная система - <strong>5% от суммы покупки.</strong>
                Накопив достаточно, вы сможете получить бесплатный тур от любого
                туроператора.
              </Text>
            </Flex>

            <Flex
              sx={{
                p: [0, 4],
                flex: 1,
                flexDirection: "column",
                minW: 56,
                alignItems: ["start", "center"],
              }}
            >
              <Heading
                as="h3"
                fontSize={["18px", "22px"]}
                sx={{ textAlign: "center", mb: 3 }}
              >
                Как это работает? 👏
              </Heading>
              <Text sx={{ textAlign: ["start", "center"], maxW: "md" }}>
                1) Выберите тур.
                <br />
                2) Заполните форму.
                <br />
                3) Ожидайте подтверждения от турагенства
                <br />
                4) Приятного отдыха!
              </Text>
            </Flex>
          </Stack>
        </Container>

        <Container as="section" maxW="xl" sx={{ my: ["50px", "100px"] }}>
          <Heading
            as="h2"
            sx={{
              fontSize: ["xl", "2xl"],
              textAlign: "center",
              mb: "10px",
            }}
          >
            Популярные места
          </Heading>
          <Box
            sx={{
              width: "50px",
              height: "4px",
              backgroundColor: "#20C4CE",
              mx: "auto",
            }}
          />

          <Grid
            templateColumns={["repeat(2, 1fr)", null, "repeat(4, 1fr)"]}
            gap={["10px", "20px"]}
            sx={{ marginTop: "50px" }}
          >
            {places.map(({ title, image, isWide }, index) => (
              <Box
                sx={{
                  width: "100%",
                  position: "relative",
                  borderRadius: "10px",
                  gridColumn: isWide ? "span 2" : "span 1",
                  bg: "gray.50",
                }}
                key={index}
              >
                <Image
                  src={image}
                  objectFit="cover"
                  boxSize="100%"
                  borderRadius="10px"
                  alt={`${title} | demaloo`}
                />
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    bg: "rgba(0, 0, 0, 0.2)",
                    color: "white",
                    borderRadius: "10px",
                    display: "flex",
                    alignItems: "flex-end",
                    padding: "20px",
                  }}
                >
                  <Text fontSize="20px">{title}</Text>
                </Box>
              </Box>
            ))}
          </Grid>
        </Container>

        <Container as="section" maxW="xl" sx={{ my: ["50px", "100px"] }}>
          <Heading
            as="h2"
            sx={{
              fontSize: ["xl", "2xl"],
              textAlign: "center",
              mb: "10px",
            }}
          >
            Наши партнеры
          </Heading>
          <Box
            sx={{
              width: "50px",
              height: "4px",
              backgroundColor: "#20C4CE",
              mx: "auto",
            }}
          />

          <Wrap
            sx={{
              marginTop: "50px",
            }}
            justify="center"
            spacing="8"
          >
            {partners.map(({ title, logo }, index) => (
              <Flex
                sx={{
                  flexDirection: "column",
                  alignItems: "center",
                  width: "150px",
                }}
                key={index}
              >
                <Image
                  src={logo || "./test/download.png"}
                  boxSize="95px"
                  alt={`${title} | demaloo`}
                />
                <Text
                  sx={{
                    fontWeight: "bold",
                    fontSize: "lg",
                    mt: "10px",
                    textAlign: "center",
                  }}
                >
                  {title}
                </Text>
              </Flex>
            ))}
          </Wrap>
        </Container>
        <Footer />
      </Box>
    </>
  );
}

// export async function getStaticProps(context) {
//   const getCompanies = require("./api/companies/index").getCompanies;
//   let companies = null;

//   try {
//     companies = await getCompanies();
//   } catch (error) {
//     companies = null;
//   }

//   return {
//     props: {
//       companies: JSON.parse(JSON.stringify(companies)),
//     },
//     revalidate: 1,
//   };
// }
