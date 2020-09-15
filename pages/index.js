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
// Tour Page

export default function Home() {
  const router = useRouter();

  return (
    <Box as="main" sx={{ width: "100%" }}>
      <Header />
      <Box as="section" sx={{ width: "100%", position: "relative" }}>
        <Image
          src="background.jpg"
          sx={{
            objectFit: "cover",
            width: "100%",
            height: ["300px", "350px", "400px", "450px"],
          }}
        />
        <Flex
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            alignItems: "center",
            justifyContent: "start",
            flexDirection: "column",
            p: 8,
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
              mb: 4,
            }}
          >
            Быстрый поиск туров по всему Кыргызстану
          </Heading>
          <Link href="/search" passHref>
            <Button as="a" colorScheme="teal">
              Поиск
            </Button>
          </Link>
        </Flex>
      </Box>
      <Container as="section" maxW="lg">
        <Flex
          sx={{
            py: [8, 12],
            width: "100%",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Heading
            as="h2"
            sx={{ fontSize: ["xl", "2xl"], textAlign: "center", mb: [4, 8] }}
          >
            Бронируйте туры быстро и легко!
          </Heading>
          <Flex sx={{ width: "100%" }}>
            <Stack
              direction={["column", null, "row"]}
              spacing={[3, null, 8]}
              sx={{ width: "100%" }}
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
                  Найдите тур
                </Heading>
                <Text sx={{ textAlign: "center", maxW: "md" }}>
                  Введите название интересующего вас места в поисковик, что бы
                  найти подходящий тур
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
                  Забронируйте
                </Heading>
                <Text sx={{ textAlign: "center", maxW: "md" }}>
                  Введите название интересующего вас места в поисковик, что бы
                  найти подходящий тур
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
                  Отдыхайте!
                </Heading>
                <Text sx={{ textAlign: "center", maxW: "md" }}>
                  Введите название интересующего вас места в поисковик, что бы
                  найти подходящий тур
                </Text>
              </Center>
            </Stack>
          </Flex>
        </Flex>
      </Container>

      <Container as="section" maxW="lg">
        Section
      </Container>
    </Box>
  );
}

// TODO add brand color scheme - "#20C4CE"
