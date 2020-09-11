import Head from "next/head";
import { useRouter } from "next/router";
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
  Link as ChakraLink,
  Grid,
} from "@chakra-ui/core";
import Link from "next/link";

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

import GuideCard from "../../components/GuideCard";
import { useBreakpointValue } from "@chakra-ui/media-query";
import Carousel from "../../components/Carousel";
import Header from "../../components/Header";

// server
// import { getAllTours } from "../api/tours/index";
import { daysRus } from "../../utils/ruswords";

const Main = ({
  name,
  description,
  organizer,
  categories = [],
  duration = 0,
  services = [],
  whatToBring = [],
  price,
  groupDiscounts = [],
  guides = [],
  maxGroupCount,
  days = [],
  distance,
  transportation,
  dates = [],
  photos = [],
}) => {
  // const TourPage = ({ tour }) => {
  const buttonVariant = useBreakpointValue({ base: "md", sm: "lg" });

  return (
    <>
      <Header />
      <Box
        sx={{
          width: "100%",
          bg: "#F6F6F6",
          py: 4,
        }}
      >
        <Container
          maxW="xl"
          centerContent
          sx={{
            bg: "white",
            p: [4, 6],
            borderRadius: ["10px", "20px"],
          }}
        >
          <Heading as="h1" fontSize={["xl", "2xl"]}>
            {name}
          </Heading>
        </Container>

        <Container
          maxW="xl"
          sx={{
            borderRadius: ["10px", "20px"],
            p: [4, 10],
            bg: "white",
            mt: 4,
          }}
        >
          <Stack
            direction={["column", null, null, "row"]}
            spacing={["6", null, null, "16"]}
          >
            <Flex sx={{ flex: 1, alignItems: "center" }}>
              <Carousel photos={photos} />
            </Flex>
            <Flex
              sx={{
                flex: 1,
                flexDirection: "column",
              }}
            >
              <Stack direction="column" spacing="20px">
                <Wrap>
                  {categories.map((category, index) => (
                    <Tag
                      variant="solid"
                      colorScheme="teal"
                      key={index}
                      size="lg"
                    >
                      {category}
                    </Tag>
                  ))}
                  {duration === undefined ? null : (
                    <Tag variant="solid" colorScheme="green" size="lg">
                      {`${duration} ${daysRus(duration)}`}
                    </Tag>
                  )}
                  {maxGroupCount === undefined ? null : (
                    <Tag variant="solid" colorScheme="yellow" size="lg">
                      {`${maxGroupCount} чел`}
                    </Tag>
                  )}
                  {distance === undefined ? null : (
                    <Tag variant="solid" colorScheme="orange" size="lg">
                      {`${distance} км`}
                    </Tag>
                  )}
                  {transportation === undefined ? null : (
                    <Tag variant="solid" colorScheme="blue" size="lg">
                      {transportation}
                    </Tag>
                  )}
                </Wrap>

                {description === undefined ? null : (
                  <Text
                    // fontSize={["sm", "lg"]}
                    as="p"
                    sx={{ textAlign: "start", lineHeight: "taller" }}
                  >
                    {description}
                  </Text>
                )}

                <Divider />

                <Flex
                  sx={{
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Flex
                    sx={{
                      alignItems: "center",
                      height: "100%",
                    }}
                  >
                    <Image
                      objectFit="cover"
                      boxSize={["50px", "70px"]}
                      src={organizer.logo}
                      borderRadius="full"
                      border="1px solid #20C4CE"
                      alt="icon"
                    />
                    <Text
                      sx={{
                        fontWeight: "normal",
                        fontSize: ["xl", "2xl"],
                        ml: 3,
                      }}
                    >
                      {organizer.name}
                    </Text>
                    {/* <Flex
                              sx={{
                                 flexDirection: "column",
                                 height: "100%",
                                 ml: 3,
                                 justifyContent: "space-between",
                              }}
                           >
                              <Flex>
                                 <Stack
                                    direction="row"
                                    align="baseline"
                                    spacing="5px"
                                 >
                                    <Text
                                       sx={{
                                          fontSize: "2xl",
                                       }}
                                    >
                                       {rating}
                                    </Text>
                                    <StarIcon color="yellow.400" />
                                 </Stack>
                              </Flex>
                           </Flex> */}
                  </Flex>
                  <Button
                    colorScheme="teal"
                    size={buttonVariant}
                    sx={{
                      borderRadius: "full",
                    }}
                  >
                    Поехали
                  </Button>
                </Flex>
              </Stack>
            </Flex>
          </Stack>
        </Container>

        <Container
          maxW="xl"
          sx={{
            mt: 4,
            px: [4, 10],
            py: 2,
            position: "sticky",
            top: 0,
            left: 0,
            bg: "white",
            borderBottomLeftRadius: "lg",
            borderBottomRightRadius: "lg",
            boxShadow: "base",
            zIndex: 100,
          }}
        >
          <List sx={{ d: "flex", overflow: "hidden" }}>
            <ListItem>
              <Link href="/#about-tour">
                <ChakraLink sx={{ fontSize: ["lg", "xl"] }}>О Туре</ChakraLink>
              </Link>
            </ListItem>

            <ListItem>
              <Link href="/#days-description">
                <ChakraLink sx={{ fontSize: ["lg", "xl"], ml: 4 }}>
                  Дни
                </ChakraLink>
              </Link>
            </ListItem>

            <ListItem>
              <Link href="/#coming-dates">
                <ChakraLink sx={{ fontSize: ["lg", "xl"], ml: 4 }}>
                  Даты
                </ChakraLink>
              </Link>
            </ListItem>

            <ListItem>
              <Link href="/#guides">
                <ChakraLink sx={{ ml: 4, fontSize: ["lg", "xl"] }}>
                  Гиды
                </ChakraLink>
              </Link>
            </ListItem>
          </List>
        </Container>

        <Box
          id="about-tour"
          sx={{
            position: "relative",
            top: ["-20px", 0],
          }}
        />

        <Container
          maxW="xl"
          sx={{
            mt: 4,
            p: 0,
          }}
        >
          <Flex sx={{ flexDirection: ["column-reverse", null, null, "row"] }}>
            <Box
              sx={{
                borderRadius: ["10px", "20px"],
                p: [4, 10],
                bg: "white",
                flex: 1,
                width: "100%",
              }}
            >
              <Stack spacing={["4", "8"]}>
                <Heading
                  as="h3"
                  sx={{ color: "teal.500", fontSize: ["lg", "xl"] }}
                >
                  О Туре
                </Heading>

                <Stack direction={["column", "row"]} spacing={10}>
                  <Flex sx={{ flexDirection: "column", flex: 1 }}>
                    <Heading as="h4" sx={{ mb: 4, fontSize: ["md", "lg"] }}>
                      Включено
                    </Heading>
                    <List spacing="3">
                      {services.map((item, index) => (
                        <ListItem key={index}>
                          <ListIcon as={CheckIcon} color="teal.500" />
                          {item}
                        </ListItem>
                      ))}
                    </List>
                  </Flex>
                  <Flex sx={{ flexDirection: "column", flex: 1 }}>
                    <Heading as="h4" sx={{ mb: 4, fontSize: ["md", "lg"] }}>
                      Взять с собой
                    </Heading>
                    <List spacing="3">
                      {whatToBring.map((item, index) => (
                        <ListItem key={index}>
                          <ListIcon as={InfoIcon} color="teal.500" />
                          {item}
                        </ListItem>
                      ))}
                    </List>
                  </Flex>
                  <Flex sx={{ flexDirection: "column", flex: 1 }}>
                    <Heading as="h4" sx={{ mb: 4, fontSize: ["md", "lg"] }}>
                      Занятия
                    </Heading>
                    <List spacing="3">
                      {services.map((item, index) => (
                        <ListItem key={index}>
                          <ListIcon as={AtSignIcon} color="teal.500" />
                          {item}
                        </ListItem>
                      ))}
                    </List>
                  </Flex>
                </Stack>
              </Stack>
            </Box>
            <Box
              sx={{
                borderRadius: ["10px", "20px"],
                p: [3, 6],
                bg: "white",
                ml: [0, null, null, 4],
                mb: [4, null, null, 0],
                minW: "xs",
                maxW: [null, "sm"],
              }}
            >
              <Stack direction="column" align="center">
                <Text>(цена за человека)</Text>
                <Text
                  fontSize={["3xl", "4xl"]}
                  sx={{ textAlign: "center", fontWeight: "bold" }}
                >
                  {price}{" "}
                  <Text as="span" fontSize="xl">
                    сом
                  </Text>
                </Text>

                {groupDiscounts === undefined ? null : (
                  <>
                    <Text>Групповые скидки</Text>
                    {groupDiscounts.map(({ count, price }, index) => (
                      <Text
                        fontSize={["xl", "2xl"]}
                        sx={{ textAlign: "center" }}
                        key={index}
                      >
                        <Text
                          as="span"
                          fontSize="lg"
                        >{`до ${count} чел. - `}</Text>
                        {`${price} `}
                        <Text as="span" fontSize="lg">
                          сом
                        </Text>
                      </Text>
                    ))}
                  </>
                )}
              </Stack>
            </Box>
          </Flex>
        </Container>

        <Box
          id="days-description"
          sx={{
            position: "relative",
            top: ["-20px", 0],
          }}
        />

        <Container
          maxW="xl"
          centerContent
          sx={{
            bg: "white",
            borderRadius: ["10px", "20px"],
            mt: 4,
            p: [4, 10],
          }}
        >
          <Flex sx={{ width: "100%", flexDirection: "column" }}>
            <Heading
              as="h3"
              sx={{ color: "teal.500", mb: [4, 8], fontSize: ["lg", "xl"] }}
            >
              Дни
            </Heading>
            <Accordion defaultIndex={[0]} allowToggle={true}>
              {days.map(({ description, locations }, index) => (
                <AccordionItem key={index}>
                  <AccordionButton>
                    <CalendarIcon color="teal.500" />
                    <Box flex="1" textAlign="left" ml="4" py="2">
                      <Heading
                        as="h4"
                        sx={{
                          fontSize: ["md", "lg"],
                          fontWeight: "normal",
                        }}
                      >
                        {`День ${index + 1} | ${locations
                          .map((location) => location.name)
                          .join(" - ")}`}
                      </Heading>
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel>
                    <Container maxW="lg">
                      <Text
                        sx={{
                          lineHeight: "taller",
                          fontSize: ["sm", "md"],
                        }}
                      >
                        {description}
                      </Text>
                    </Container>
                  </AccordionPanel>
                </AccordionItem>
              ))}
            </Accordion>
          </Flex>
        </Container>

        <Box
          id="coming-dates"
          sx={{
            position: "relative",
            top: ["-20px", 0],
          }}
        />

        <Container
          maxW="xl"
          centerContent
          sx={{
            bg: "white",
            borderRadius: ["10px", "20px"],
            mt: 4,
            p: [4, 10],
          }}
        >
          <Flex sx={{ width: "100%", flexDirection: "column" }}>
            <Heading
              as="h3"
              sx={{ color: "teal.500", mb: [4, 8], fontSize: ["lg", "xl"] }}
            >
              Даты
            </Heading>
            <List spacing="4">
              {dates.map((date, index) => (
                <ListItem key={index} sx={{ fontSize: ["md", "lg"] }}>
                  <ListIcon
                    as={CalendarIcon}
                    color="teal.500"
                    sx={{ verticalAlign: "middle" }}
                  />
                  {date}
                </ListItem>
              ))}
            </List>
          </Flex>
        </Container>

        <Box
          id="guides"
          sx={{
            position: "relative",
            top: ["-20px", 0],
          }}
        />

        <Container
          maxW="xl"
          centerContent
          sx={{
            bg: "white",
            borderRadius: ["10px", "20px"],
            mt: 4,
            p: [4, 10],
          }}
        >
          <Flex sx={{ width: "100%", flexDirection: "column" }}>
            <Heading
              as="h3"
              sx={{ color: "teal.500", mb: [4, 8], fontSize: ["lg", "xl"] }}
            >
              Гиды
            </Heading>

            <Grid
              width="100%"
              sx={{
                gridTemplateColumns: ["1fr", null, null, "repeat(2, 1fr)"],
              }}
              gap={6}
            >
              {guides.map(({ name, age, experience, languages }, index) => (
                <GuideCard
                  key={index}
                  name={name}
                  age={age}
                  experience={experience}
                  languages={languages}
                  photo={"/test/27.jpeg"}
                />
              ))}
            </Grid>
          </Flex>
        </Container>
      </Box>
    </>
  );
};

export default function TourPage({ tour }) {
  const router = useRouter();
  // TODO: add better error, loading components
  if (router.isFallback) {
    return <div>Loading ...</div>;
  }

  if (!tour) {
    return <div>Something went wrong!</div>;
  }

  return <Main {...tour} />;
}

export async function getStaticPaths() {
  const getAllTours = require("../api/tours/index").getAllTours;
  const tours = await getAllTours();
  let paths = tours.map(({ _id }) => ({ params: { id: String(_id) } }));

  // pre-rendering all the individual tour pages

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps(context) {
  let tour = null;
  try {
    const getTour = require("../api/tours/index").getTour;
    tour = await getTour(context?.params?.id);
  } catch (error) {
    tour = null;
  }

  return {
    props: {
      tour: JSON.parse(JSON.stringify(tour)),
    },
    revalidate: 1,
  };
}

// first place is starting point
// starting point - next point
// next point - next next point

// add transportation
// add starting point
// do something with icons
// add images carousel
// add as='section', 'main'
// fix prices

// TODO mobile smooth scroll behavior
// change icons
// add image names
// add seasons
