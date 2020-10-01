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
  Stack,
  List,
  ListItem,
  Tag,
  Wrap,
  Accordion,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  AccordionItem,
  Link as ChakraLink,
  useDisclosure,
  useColorModeValue,
  Grid,
} from "@chakra-ui/core";
import Link from "next/link";

import { useBreakpointValue } from "@chakra-ui/media-query";
import Carousel from "../../components/Carousel";
import Header from "../../components/Header";
import RegModal from "../../components/RegModal";
import ConsModal from "../../components/ConsModal";

// server
// import { getAllTours } from "../api/tours/index";
import { daysRus } from "../../utils/ruswords";
import { categoriesMap, monthsMap } from "../../utils/data";

const Section = ({ children, ...props }) => {
  const sectionBg = useColorModeValue("#fff", "#1A202C");
  return (
    <Flex
      {...props}
      sx={{
        p: [4, 10],
        width: "100%",
        border: "1px solid #e2e2e2",
        borderRadius: [0, null, null, 10],
        bg: sectionBg,
      }}
    >
      {children}
    </Flex>
  );
};

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
  activities = [],
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isConsOpen,
    onOpen: onConsOpen,
    onClose: onConsClose,
  } = useDisclosure();
  const buttonVariant = useBreakpointValue({ base: "md", sm: "lg" });
  const router = useRouter();

  const mainBg = useColorModeValue("#FAFAFA", "#1A202C");
  const sectionBg = useColorModeValue("#fff", "#1A202C");

  return (
    <>
      <Head>
        <title>{name}</title>
        <meta
          name="keywords"
          content="туры, экскурсии, горящие туры, турагентство ,отдых за городом, тур пакеты, туристические пакеты"
        />
      </Head>
      <Header />
      <RegModal
        onClose={onClose}
        isOpen={isOpen}
        tour={name}
        company={organizer.name}
      />
      <ConsModal onClose={onConsClose} isOpen={isConsOpen} />
      <Box
        sx={{
          width: "100%",
          bg: mainBg,
          py: 4,
        }}
      >
        <Container
          maxW="xl"
          centerContent
          sx={{
            p: [4, 6],
            border: "1px solid #e2e2e2",
            borderRadius: [0, 10],
            bg: sectionBg,
          }}
        >
          <Heading as="h1" fontSize={["xl", "2xl"]}>
            {name}
          </Heading>
        </Container>

        <Container
          maxW="xl"
          sx={{
            p: [4, 10],
            mt: 4,
            border: "1px solid #e2e2e2",
            borderRadius: [0, 10],
            bg: sectionBg,
          }}
        >
          <Stack
            direction={["column", null, null, "row"]}
            spacing={["6", null, null, "16"]}
          >
            <Flex sx={{ flex: 1, alignItems: "center" }}>
              <Carousel
                photos={photos.length === 0 ? ["/batken.jpg"] : photos}
                name={name}
              />
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
                      {categoriesMap[category]}
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
                    height: "100%",
                  }}
                >
                  <Image
                    objectFit="cover"
                    boxSize={["50px", "70px"]}
                    src={organizer.logo}
                    borderRadius="full"
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
                </Flex>
                <Divider />
                <Flex sx={{ justifyContent: "start" }}>
                  <Button
                    variant="ghost"
                    colorScheme="blue"
                    size={buttonVariant}
                    sx={{
                      borderRadius: "full",
                    }}
                    onClick={onConsOpen}
                  >
                    Есть вопросы?
                  </Button>
                </Flex>
              </Stack>
            </Flex>
          </Stack>
        </Container>

        <Container maxW="xl" mt="4" p="0">
          <Grid templateColumns={["1fr", null, null, "1fr auto"]} gap="4">
            <Section>
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
                        <ListItem key={index}>👌 {item}</ListItem>
                      ))}
                    </List>
                  </Flex>
                  <Flex sx={{ flexDirection: "column", flex: 1 }}>
                    <Heading as="h4" sx={{ mb: 4, fontSize: ["md", "lg"] }}>
                      Взять с собой
                    </Heading>
                    <List spacing="3">
                      {whatToBring.map((item, index) => (
                        <ListItem key={index}>✋ {item}</ListItem>
                      ))}
                    </List>
                  </Flex>
                  <Flex sx={{ flexDirection: "column", flex: 1 }}>
                    <Heading as="h4" sx={{ mb: 4, fontSize: ["md", "lg"] }}>
                      Занятия
                    </Heading>
                    <List spacing="3">
                      {activities.map((item, index) => (
                        <ListItem key={index}>⚽ {item}</ListItem>
                      ))}
                    </List>
                  </Flex>
                </Stack>
              </Stack>
            </Section>

            <Flex
              sx={{
                p: [4, 10],
                width: "330px",
                border: "1px solid #e2e2e2",
                borderRadius: [0, 10],
                bg: sectionBg,
                height: "230px",
                gridRowStart: 1,
                gridRowEnd: 4,
                gridColumnStart: 2,
                gridColumnEnd: 3,
                position: "sticky",
                top: "100px",
                boxShadow: "rgba(0, 0, 0, 0.12) 0px 6px 16px",
                border: "1px solid",
                borderColor: "gray.200",
                flexDir: "column",
                alignItems: "center",
                display: ["none", null, null, "flex"],
              }}
            >
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

              <Button
                colorScheme="teal"
                size={buttonVariant}
                borderRadius="full"
                mt="4"
                onClick={onOpen}
              >
                Поехали
              </Button>
            </Flex>

            <Section flexDir="column">
              <Heading
                as="h3"
                sx={{ color: "teal.500", mb: [4, 8], fontSize: ["lg", "xl"] }}
              >
                Даты
              </Heading>
              <List spacing="4">
                {dates.map((date, index) => {
                  const dateObj = new Date(date);
                  return (
                    <ListItem key={index} sx={{ fontSize: ["md", "lg"] }}>
                      {`📅  ${dateObj.getDate()} ${
                        monthsMap[dateObj.getMonth()]
                      }`}
                    </ListItem>
                  );
                })}
              </List>
            </Section>

            <Section flexDir="column">
              <Heading
                as="h3"
                sx={{ color: "teal.500", mb: [4, 8], fontSize: ["lg", "xl"] }}
              >
                Программа
              </Heading>
              <Accordion defaultIndex={[0]} allowToggle={true}>
                {days.map(({ description, locations }, index) => (
                  <AccordionItem key={index}>
                    <AccordionButton>
                      {/* <CalendarIcon color="teal.500" /> */}
                      👉
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
            </Section>
          </Grid>
        </Container>

        <Container maxW="xl" centerContent sx={{ mt: "50px", mb: "20px" }}>
          Demaloo 2020
        </Container>

        <Flex
          sx={{
            height: "65px",
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            boxShadow: "rgba(0, 0, 0, 0.28) 0px 8px 28px !important",
            bg: sectionBg,
            justifyContent: "space-between",
            alignItems: "center",
            px: 4,
            display: ["flex", null, null, "none"],
          }}
        >
          <Flex flexDir="column" justifyContent="center">
            <Text fontSize="sm">цена за человека</Text>
            <Text
              fontSize={["2xl"]}
              sx={{ textAlign: "center", fontWeight: "bold" }}
            >
              {price}{" "}
              <Text as="span" fontSize="xl">
                сом
              </Text>
            </Text>
          </Flex>

          <Button
            colorScheme="teal"
            size={buttonVariant}
            sx={
              {
                // borderRadius: "full",
              }
            }
            onClick={onOpen}
          >
            Поехали
          </Button>
        </Flex>
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
  const getTours = require("../api/tours/index").getTours;
  const { data } = await getTours({});
  let paths = data.map(({ _id }) => ({ params: { id: String(_id) } }));

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

// TODO revalidate value

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
