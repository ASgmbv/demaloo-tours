import Head from "next/head";
import {
  Box,
  Image,
  Heading,
  Container,
  Flex,
  Text,
  Divider,
  Button,
  AspectRatio,
  Stack,
  Badge,
  List,
  ListItem,
  ListIcon,
  SimpleGrid,
  Tag,
  Avatar,
  Wrap,
  Accordion,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  AccordionItem,
  Center,
  Link as ChakraLink,
  Grid,
} from "@chakra-ui/core";
import Link from "next/link";
import { useRouter } from "next/router";

import {
  StarIcon,
  CheckIcon,
  InfoIcon,
  AtSignIcon,
  CalendarIcon,
  TriangleUpIcon,
  RepeatIcon,
} from "@chakra-ui/icons";
import { useState, useEffect, useRef, createRef } from "react";

import GuideCard from "../components/GuideCard";
import { useBreakpointValue } from "@chakra-ui/media-query";
import Carousel from "../components/Carousel";
import Header from "../components/Header";
import Footer from "../components/Footer";
// Tour Page

// TODO automatic companies count
// TODO automatic

export default function Home() {
  // const router = useRouter();

  const partners = [
    {
      title: "SLM TRIP",
      logo: "/partners/slmtrip.png",
    },
    {
      title: "ASIA WAY",
      logo: "/partners/asiaway.png",
    },
    {
      title: "SAMTOUR TRAVEL",
      logo: "/partners/samtour.png",
    },
    {
      title: "COOLTOUR KG",
      logo: "/partners/cooltour.png",
    },
    {
      title: "ETHNOWAY KG",
      logo: "/partners/ethnoway.png",
    },
    {
      title: "JANNAT TRAVEL",
      logo: "/partners/jannattravel.png",
    },
  ];

  const places = [
    {
      title: "Ала Кол",
      image: "/places/alakol.png",
    },
    {
      title: "Джети-Огуз",
      image: "/places/jetioguz.png",
    },
    {
      title: "Барскоон",
      image: "/places/barskoon.png",
    },
    {
      title: "Сон-Коль",
      image: "/places/sonkol.png",
    },
    {
      title: "Сары-Челек",
      image: "/places/sarychelek.png",
      isWide: true,
    },
    {
      title: "Сказка",
      image: "/places/skazka.png",
    },
    {
      title: "Бурана",
      image: "/places/burana.png",
    },
    {
      title: "Чункурчак",
      image: "/places/chunkurchak.jpg",
    },
    {
      title: "Алтын-Арашан",
      image: "/places/altynarashan.png",
    },
    {
      title: "Коль-тор",
      image: "/places/koltor.png",
      isWide: true,
    },
  ];

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
        <Header />
        <Box as="section" sx={{ width: "100%", position: "relative" }}>
          <Image
            src="/heroes/hero.png"
            sx={{
              objectFit: "cover",
              width: "100%",
              height: ["300px", "350px", "400px", "450px"],
            }}
            alt="Demaloo"
          />
          <Flex
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              bg: "rgba(0, 0, 0, 0.1)",
            }}
          >
            <Heading
              as="h1"
              sx={{
                mb: 4,
                color: "white",
                fontSize: ["2xl", "4xl"],
                textAlign: "center",
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
                mb: "50px",
              }}
            >
              Быстрый поиск туров по всему Кыргызстану
            </Heading>

            <Box
              sx={{
                bg: "rgba(255, 255, 255, 0.4)",
                padding: "15px 20px",
                borderRadius: "10px",
              }}
            >
              <Link href="/search" passHref>
                <Button
                  as="a"
                  colorScheme="primary"
                  size="lg"
                  borderRadius="10px"
                >
                  Все туры
                </Button>
              </Link>
            </Box>
          </Flex>
        </Box>
        <Container as="section" maxW="xl" sx={{ my: "100px" }}>
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
            spacing={[3, null, 8]}
            sx={{ width: "100%", marginTop: "50px" }}
          >
            <Center
              sx={{
                p: 4,
                flex: 1,
                flexDirection: "column",
                minW: 56,
              }}
            >
              <Heading
                as="h3"
                sx={{ fontSize: ["md", "lg"], textAlign: "center", mb: 3 }}
              >
                О нас
              </Heading>
              <Text sx={{ textAlign: "center", maxW: "md" }}>
                Сотрудничаем с более <strong>13-ти турфирмами.</strong>
                <br />
                Около <strong>50 туров</strong> и экскурсий по всем
                достопримечательностям Бишкека, Каракола, Нарына и т.д.
              </Text>
            </Center>
            <Center
              sx={{
                p: 4,
                flex: 1,
                flexDirection: "column",
                minW: 56,
              }}
            >
              <Heading
                as="h3"
                sx={{ fontSize: ["md", "lg"], textAlign: "center", mb: 3 }}
              >
                Почему мы?
              </Heading>
              <Text sx={{ textAlign: "center", maxW: "md" }}>
                Те же цены что и у турагенств
                <br />
                Накопительная система - <strong>5% от суммы покупки.</strong>
                Накопив достаточно, вы сможете получить бесплатный тур от любого
                туроператора.
              </Text>
            </Center>
            <Center
              sx={{
                p: 4,
                flex: 1,
                flexDirection: "column",
                minW: 56,
              }}
            >
              <Heading
                as="h3"
                sx={{ fontSize: ["md", "lg"], textAlign: "center", mb: 3 }}
              >
                Как это работает?
              </Heading>
              <Text sx={{ textAlign: "center", maxW: "md" }}>
                1) Выберите тур.
                <br />
                2) Заполните форму.
                <br />
                3) Ожидайте подтверждения от турагенства
                <br />
                4) Приятного отдыха!
              </Text>
            </Center>
          </Stack>
        </Container>

        <Container as="section" maxW="xl" sx={{ my: "100px" }}>
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
            gap={"20px"}
            sx={{ marginTop: "50px" }}
          >
            {places.map(({ title, image, isWide }, index) => (
              <Box
                sx={{
                  width: "100%",
                  position: "relative",
                  borderRadius: "10px",
                  gridColumn: isWide ? "span 2" : "span 1",
                }}
                key={index}
              >
                <Image
                  src={image}
                  objectFit="cover"
                  boxSize="100%"
                  borderRadius="10px"
                  alt={title}
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

        <Container as="section" maxW="xl" sx={{ my: "100px" }}>
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
          >
            {partners.map(({ title, logo }, index) => (
              <Flex
                sx={{
                  flexDirection: "column",
                  // flex: 1,
                  alignItems: "center",
                  width: "200px",
                }}
                key={index}
              >
                <Image src={logo} boxSize="95px" alt={title} />
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

// TODO add brand color scheme - "#20C4CE"
// TODO change browser icon
