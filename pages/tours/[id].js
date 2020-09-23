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
  Grid,
  useDisclosure,
  useColorModeValue,
  LightMode,
} from "@chakra-ui/core";
import Link from "next/link";

import GuideCard from "../../components/GuideCard";
import { useBreakpointValue } from "@chakra-ui/media-query";
import Carousel from "../../components/Carousel";
import Header from "../../components/Header";
import RegModal from "../../components/RegModal";
import ConsModal from "../../components/ConsModal";

// server
// import { getAllTours } from "../api/tours/index";
import { daysRus } from "../../utils/ruswords";
import { categoriesMap, monthsMap } from "../../utils/data";

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
                      // border="1px solid #20C4CE"
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
                  <Button
                    colorScheme="teal"
                    size={buttonVariant}
                    sx={{
                      borderRadius: "full",
                    }}
                    onClick={onConsOpen}
                  >
                    Поехали
                  </Button>
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

        <Container
          maxW="xl"
          sx={{
            mt: 4,
            px: [4, 10],
            py: 2,
            position: "sticky",
            top: 0,
            left: 0,
            borderBottomLeftRadius: [0, 10],
            borderBottomRightRadius: [0, 10],
            boxShadow: "base",
            border: "1px solid #e2e2e2",
            bg: sectionBg,
          }}
        >
          <List sx={{ d: "flex", overflow: "hidden" }}>
            <ListItem>
              <Link
                href={router.pathname}
                as={`${router?.query?.id}/#about-tour`}
              >
                <ChakraLink sx={{ fontSize: ["lg", "xl"] }}>О Туре</ChakraLink>
              </Link>
            </ListItem>

            <ListItem>
              <Link
                href={router.pathname}
                as={`${router?.query?.id}/#days-description`}
              >
                <ChakraLink sx={{ fontSize: ["lg", "xl"], ml: 4 }}>
                  Дни
                </ChakraLink>
              </Link>
            </ListItem>

            <ListItem>
              <Link
                href={router.pathname}
                as={`${router?.query?.id}/#coming-dates`}
              >
                <ChakraLink sx={{ fontSize: ["lg", "xl"], ml: 4 }}>
                  Даты
                </ChakraLink>
              </Link>
            </ListItem>

            <ListItem>
              <Link href={router.pathname} as={`${router?.query?.id}/#guides`}>
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
                p: [4, 10],
                flex: 1,
                width: "100%",
                border: "1px solid #e2e2e2",
                borderRadius: [0, 10],
                bg: sectionBg,
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
            </Box>
            <Box
              sx={{
                p: [3, 6],
                ml: [0, null, null, 4],
                mb: [4, null, null, 0],
                minW: "xs",
                maxW: [null, "sm"],
                border: "1px solid #e2e2e2",
                borderRadius: [0, 10],
                bg: sectionBg,
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

                {groupDiscounts.length === 0 ? null : (
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
            mt: 4,
            p: [4, 10],
            border: "1px solid #e2e2e2",
            borderRadius: [0, 10],
            bg: sectionBg,
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
            mt: 4,
            p: [4, 10],
            border: "1px solid #e2e2e2",
            borderRadius: [0, 10],
            bg: sectionBg,
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
            mt: 4,
            p: [4, 10],
            border: "1px solid #e2e2e2",
            borderRadius: [0, 10],
            bg: sectionBg,
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
              {guides.map(
                ({ name, age, experience, languages, photo }, index) => (
                  <GuideCard
                    key={index}
                    name={name}
                    age={age}
                    experience={experience}
                    languages={languages}
                    photo={photo}
                  />
                )
              )}
            </Grid>
          </Flex>
        </Container>

        <Container maxW="xl" centerContent sx={{ mt: "100px" }}>
          Demaloo 2020
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
