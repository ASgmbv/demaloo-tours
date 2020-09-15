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
  Menu,
  MenuButton,
  MenuList,
  MenuOptionGroup,
  MenuItemOption,
  MenuDivider,
  Select,
  MenuItem,
  Skeleton,
  SkeletonText,
} from "@chakra-ui/core";
import Link from "next/link";
import TourCard from "../components/TourCard";
import Header from "../components/Header";
import { HamburgerIcon } from "@chakra-ui/icons";
import { daysRus } from "../utils/ruswords";
import { categoriesMap, sortingMap } from "../utils/data";
import { FaSortAmountDownAlt } from "react-icons/fa";
import { useState, useEffect } from "react";
import { toursRus } from "../utils/ruswords";

// TODO error when the internet is down
// TODO add the number of listings on the search page
// TODO show something when empty
// TODO sorting closest

const SearchPage = () => {
  const [filters, setFilters] = React.useState({
    duration: 1,
    // categories: [...Array(categoriesMap.length).keys()],
    categories: [],
  });

  const [sortBy, setSortBy] = React.useState(Object.keys(sortingMap)[0]);

  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState(false);
  const [tours, setTours] = useState([]);

  console.log("tours", tours);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        setFetching(true);
        const res = await fetch(
          `/api/tours?currentDate=${new Date().toDateString()}&duration=${
            filters.duration
          }&categories=${filters.categories.join()}&sortBy=${sortBy}`,
          {
            method: "GET",
          }
        );
        const tours = await res.json();
        setFetching(false);
        setTours(tours);
      } catch (error) {
        setFetching(false);
        setError(true);
      }
    };

    fetchTours();
  }, [filters, setFetching, setError, setTours, sortBy]);

  return (
    <>
      <Header />
      <Box as="main">
        <Container as="main" maxW="lg" width="100%">
          <Flex sx={{ width: "100%", justifyContent: "center" }}>
            <Flex
              sx={{
                flexDirection: "column",
                alignItems: "center",
                maxW: "614px",
                width: "100%",
              }}
            >
              <Flex
                sx={{
                  flexDirection: "column",
                  width: "100%",
                  borderBottom: "1px solid",
                  borderColor: "gray.300",
                  py: "20px",
                  mb: 4,
                }}
              >
                {/* Filters */}
                <Flex sx={{ flexDirection: "column", mb: 4 }}>
                  <Text sx={{ mb: 2, color: "gray.500" }}>Фильтры</Text>
                  <Flex>
                    <Menu>
                      <MenuButton
                        as={Button}
                        colorScheme="blue"
                        variant="outline"
                        size="sm"
                        borderRadius="lg"
                      >
                        {`${filters.duration} ${daysRus(filters.duration)}`}
                      </MenuButton>
                      <MenuList
                        onClick={(e) => {
                          setFilters({
                            ...filters,
                            duration: e.target.value,
                          });
                        }}
                      >
                        <MenuItem isDisabled={true}>
                          <Text
                            sx={{
                              fontSize: "sm",
                            }}
                          >
                            Длительность от
                          </Text>
                        </MenuItem>
                        {[...Array(10).keys()].map((_, index) => (
                          <MenuItem
                            value={index + 1}
                            key={index}
                            sx={{ fontSize: "sm" }}
                          >
                            {`${index + 1} ${daysRus(index + 1)}`}
                          </MenuItem>
                        ))}
                      </MenuList>
                    </Menu>

                    <Menu closeOnSelect={false}>
                      <MenuButton
                        as={Button}
                        colorScheme="blue"
                        variant="outline"
                        size="sm"
                        borderRadius="lg"
                        marginLeft="4"
                      >
                        Категории
                      </MenuButton>
                      <MenuList minWidth="240px">
                        <MenuOptionGroup
                          type="checkbox"
                          value={filters.categories}
                          onChange={(e) => {
                            setFilters({ ...filters, categories: e });
                          }}
                        >
                          {categoriesMap.map((category, index) => (
                            <MenuItemOption
                              value={index}
                              key={index}
                              sx={{ fontSize: "sm" }}
                            >
                              {category}
                            </MenuItemOption>
                          ))}
                        </MenuOptionGroup>
                      </MenuList>
                    </Menu>

                    <Menu>
                      <MenuButton
                        leftIcon={<FaSortAmountDownAlt />}
                        as={Button}
                        colorScheme="blue"
                        variant="outline"
                        size="sm"
                        borderRadius="lg"
                        marginLeft="4"
                      >
                        {sortingMap[sortBy]}
                      </MenuButton>
                      <MenuList
                        onClick={(e) => {
                          setSortBy(e.target.value);
                        }}
                      >
                        <MenuItem isDisabled={true}>
                          <Text
                            sx={{
                              fontSize: "sm",
                            }}
                          >
                            Сортировать по
                          </Text>
                        </MenuItem>
                        {Object.keys(sortingMap).map((item) => (
                          <MenuItem sx={{ fontSize: "sm" }} value={item}>
                            {sortingMap[item]}
                          </MenuItem>
                        ))}
                      </MenuList>
                    </Menu>
                  </Flex>
                </Flex>
              </Flex>

              <Text
                sx={{
                  textAlign: "start",
                  width: "100%",
                  color: "gray.600",
                  fontSize: "sm",
                }}
              >
                {`${tours.length} ${toursRus(tours.length)}`}
              </Text>

              {
                <List sx={{ width: "100%", py: "20px" }} spacing="6">
                  {fetching
                    ? [...Array(3)].map((item, index) => (
                        <Box
                          sx={{
                            borderRadius: "16px",
                            p: [2, 4],
                            border: "1px solid",
                            borderColor: "gray.300",
                            overflow: "hidden",
                            width: "100%",
                          }}
                        >
                          <Flex sx={{ width: "100%" }}>
                            <Box sx={{ flex: 1 }}>
                              <Skeleton height="100%" />
                            </Box>
                            <Box sx={{ flex: 3, marginLeft: 4 }}>
                              <SkeletonText mb="4" noOfLines={4} spacing="5" />
                            </Box>
                          </Flex>
                        </Box>
                      ))
                    : tours.map((tour, index) => (
                        <ListItem key={index}>
                          <Link href={`/tours/${tour?._id}`} passHref>
                            <a>
                              <TourCard {...tour} image={tour?.photos[0]} />
                            </a>
                          </Link>
                        </ListItem>
                      ))}
                </List>
              }
            </Flex>
          </Flex>
        </Container>
      </Box>
    </>
  );
};

export async function getStaticProps(context) {
  let tours = null;
  try {
    const getAllTours = require("./api/tours/index").getAllTours;
    tours = await getAllTours();
    console.log({ tours });
  } catch (error) {
    tours = null;
  }

  return {
    props: {
      tours: JSON.parse(JSON.stringify(tours)),
    },
    revalidate: 1,
  };
}

export default SearchPage;
