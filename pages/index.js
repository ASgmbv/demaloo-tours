import {
  Heading,
  Container,
  Grid,
  useColorMode,
  Box,
  Button,
  Drawer,
  useDisclosure,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  VStack,
  Checkbox,
  CheckboxGroup,
  Text,
  Wrap,
  WrapItem,
  Tag,
  TagLabel,
  TagCloseButton,
  Flex,
  useRadio,
  useRadioGroup,
  HStack,
  RadioGroup,
  Stack,
  Radio,
} from "@chakra-ui/react";
import Header from "../components/Header";
import ResultsTourCard from "../components/ResultsTourCard";
import { Client } from "../utils/prismicHelpers";
import Prismic from "prismic-javascript";
import { RichText } from "prismic-reactjs";
import Link from "next/link";
import { useState, useRef } from "react";
import Head from "next/head";
import Hero from "../components/Hero";

const ctgrs = [
  "Приватный",
  "На выходные",
  "Тематические",
  "С детьми",
  "По городу",
  "Природа и парки",
  "Театры и концерты",
  "Музеи",
  "Горы",
  "Озера и реки",
  "Ущелье",
  "Каньон",
  "Горячий источник",
  "Объекты сооружения",
  "Конный",
  "Водопад",
  "Горнолыжный",
  "Спортивный",
  "Джип тур",
];

function sortByPrice(a, b) {
  let aprice = a.data.price;
  let bprice = b.data.price;
  if (aprice > bprice) return 1;
  if (aprice < bprice) return -1;
  return 0;
}

function sortByDate(a, b) {
  let adate = new Date(a.data.dates[0].date);
  let bdate = new Date(b.data.dates[0].date);

  if (adate > bdate) return 1;
  if (adate < bdate) return -1;
  return 0;
}

const ResultsPage = ({ tours }) => {
  const { colorMode } = useColorMode();

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [filterBy, setFilterBy] = useState(options[0]);

  // for drawer
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "filtering",
    defaultValue: options[0],
    onChange: setFilterBy,
  });
  const group = getRootProps();

  let filteredTours = React.useMemo(() => {
    // categories
    let temp =
      selectedCategories.length !== 0
        ? tours.filter((t) => {
            let tourCategories = t.data.categories.map((item) => item.category);
            let ok = false;
            tourCategories.forEach((i) => {
              if (selectedCategories.includes(i)) ok = true;
              if (ok) return;
            });
            return ok;
          })
        : tours;

    // filters
    temp = temp.sort(filterBy === options[0] ? sortByDate : sortByPrice);

    return temp;
  }, [tours, selectedCategories, filterBy]);

  return (
    <>
      <Head>
        <title>Demaloo - Быстрый поиск туров по всему Кыргызстану</title>
      </Head>
      <Header />
      <Flex
        w="full"
        backgroundColor="rgba(0, 0, 0, 0.5)"
        backgroundImage="url('/heroes/hero1.jpg')"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        backgroundSize="cover"
        height={["350px", "400px", "450px"]}
        position="relative"
      >
        <Flex
          position="absolute"
          sx={{
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            alignItems: "flex-start",
            justifyContent: "center",
            flexDirection: "column",
            bg: [
              "rgba(1,34,102,0.2)",
              null,
              "linear-gradient(90deg, rgba(1,34,102,0.5956757703081232) 0%, rgba(0,0,0,0) 58%)",
            ],
            p: [0, null, "70px"],
          }}
        >
          <Heading
            fontSize={["3xl", null, "5xl"]}
            textAlign={["center", null, "start"]}
            w="100%"
            as="h1"
            color="white"
            mb="4"
          >
            Быстрый поиск туров <br />
            по всему Кыргызстану
          </Heading>
          <Text
            color="white"
            w="100%"
            textAlign={["center", null, "start"]}
            fontWeight="bold"
            fontSize={["md", null, "xl"]}
          >
            Те же цены что и у турагенств.
            <br />
            Сотрудничаем с более 25 турфирмами
            <br />
            Приятного отдыха!
          </Text>
        </Flex>
      </Flex>
      <Container maxW="7xl">
        <Heading
          as="span"
          color={colorMode === "light" ? "#444547" : "gray.50"}
          size="lg"
          borderBottom="3px solid #4BBADE"
          my="6"
          lineHeight={["80px", null, "100px"]}
        >
          ВСЕ ТУРЫ
        </Heading>

        <Box w="full" mb="6">
          <Flex justifyContent="space-between" d={["flex", null, "none"]}>
            <Button ref={btnRef} onClick={onOpen}>
              Фильтровать
            </Button>
          </Flex>

          <Drawer
            isOpen={isOpen}
            placement="right"
            onClose={onClose}
            finalFocusRef={btnRef}
          >
            <DrawerOverlay>
              <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader
                  borderBottom="1px solid"
                  borderBottomColor="gray.200"
                >
                  Фильтры
                </DrawerHeader>
                <DrawerBody>
                  <Heading size="md" mb="6">
                    Сортировать
                  </Heading>
                  <HStack {...group} mb="6">
                    {options.map((value) => {
                      const radio = getRadioProps({ value });
                      return (
                        <RadioCard key={value} {...radio}>
                          {value}
                        </RadioCard>
                      );
                    })}
                  </HStack>
                  <Heading size="md" mb="6">
                    Категории
                  </Heading>
                  <CheckboxGroup
                    onChange={(items) => {
                      setSelectedCategories([...items]);
                    }}
                    value={selectedCategories}
                  >
                    <VStack align="flex-start" spacing="3">
                      {ctgrs.map((item, index) => (
                        <Checkbox value={item} key={index}>
                          {item}
                        </Checkbox>
                      ))}
                    </VStack>
                  </CheckboxGroup>
                </DrawerBody>
              </DrawerContent>
            </DrawerOverlay>
          </Drawer>

          <Wrap pt="6" d={["flex", null, "none"]}>
            {selectedCategories.map((item, index) => (
              <WrapItem key={index}>
                <Tag colorScheme="green">
                  <TagLabel>{item}</TagLabel>
                  <TagCloseButton
                    onClick={() => {
                      setSelectedCategories((arr) => {
                        let t = arr.filter((i) => i !== item);
                        return [...t];
                      });
                    }}
                  />
                </Tag>
              </WrapItem>
            ))}
          </Wrap>
        </Box>

        <Flex>
          <Box
            // bg="gray.50"
            bg={colorMode === "light" ? "gray.50" : "gray.700"}
            w="250px"
            mr="6"
            py="4"
            pl="4"
            d={["none", null, "block"]}
          >
            {/* <Heading size="md">Фильтры</Heading> */}
            <Heading size="sm" mb="6">
              Сортировать
            </Heading>
            <RadioGroup
              value={filterBy}
              mb="6"
              onChange={(e) => {
                setFilterBy(e);
                console.log(e);
              }}
            >
              <Stack spacing="3">
                <Radio value={options[0]}>{options[0]}</Radio>
                <Radio value={options[1]}>{options[1]}</Radio>
              </Stack>
            </RadioGroup>

            <Heading size="sm" mb="6">
              Категории
            </Heading>
            <CheckboxGroup
              onChange={(items) => {
                setSelectedCategories([...items]);
              }}
              value={selectedCategories}
            >
              <VStack align="flex-start" spacing="3">
                {ctgrs.map((item, index) => (
                  <Checkbox value={item} key={index}>
                    {item}
                  </Checkbox>
                ))}
              </VStack>
            </CheckboxGroup>
          </Box>

          {filteredTours.length === 0 ? (
            <Flex flex="1">
              <Text textAlign="center" w="100%" my="10">
                Не удалось найти подходящие туры
              </Text>
            </Flex>
          ) : (
            <Grid
              flex="1"
              templateColumns={[
                "repeat(1, 1fr)",
                null,
                "repeat(2, 1fr)",
                "repeat(3, 1fr)",
              ]}
              gap={4}
            >
              {filteredTours.map(({ data, id }) => {
                // latest data
                let date = data.dates[0].date;

                let categories = data.categories.map((item) => item.category);

                // selected categories

                let DESC_LIMIT = 130;
                let description = RichText.asText(data.description);
                let limited = description.substring(0, DESC_LIMIT);
                if (description.length > DESC_LIMIT) {
                  limited = `${limited.substring(
                    0,
                    limited.lastIndexOf(" ")
                  )}...`;
                }

                let image;
                let dataImage = data.images[0]?.image;
                if (dataImage?.link_type === "Web") {
                  image = dataImage.url;
                }

                return (
                  <Link href={"/tours/" + id} key={id} passHref>
                    <a>
                      <ResultsTourCard
                        key={id}
                        name={RichText.asText(data.name)}
                        description={limited}
                        price={data.price}
                        duration={data.duration}
                        groupSize={data.maxgroupcount}
                        transportation={RichText.asText(data.transportation)}
                        categories={categories}
                        distance={data.distance}
                        date={date}
                        image={image}
                      />
                    </a>
                  </Link>
                );
              })}
            </Grid>
          )}
        </Flex>

        {/* <pre>{JSON.stringify(tours, null, 2)}</pre> */}
        <Box h="100px"></Box>
      </Container>
    </>
  );
};

const options = ["Сперва ближайшие", "Сперва дешевые"];

function RadioCard(props) {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
        _checked={{
          bg: "teal.600",
          color: "white",
          borderColor: "teal.600",
        }}
        _focus={{
          boxShadow: "outline",
        }}
        p="1"
      >
        {props.children}
      </Box>
    </Box>
  );
}

export async function getStaticProps() {
  const tours = await Client().query(
    Prismic.Predicates.at("document.type", "tour"),
    {
      pageSize: 200,
    }
  );

  return {
    props: {
      tours: tours ? tours.results : [],
    },
    revalidate: 1,
  };
}

export default ResultsPage;
