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
  Collapse,
} from "@chakra-ui/core";
import Link from "next/link";
import TourCard from "../components/TourCard";
import Header from "../components/Header";
import { HamburgerIcon, SearchIcon } from "@chakra-ui/icons";
import { daysRus } from "../utils/ruswords";
import { categoriesMap, sortingMap } from "../utils/data";
import { FaSortAmountDownAlt } from "react-icons/fa";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { useState, useEffect } from "react";
import { toursRus } from "../utils/ruswords";

// TODO error when the internet is down
// TODO add the number of listings on the search page
// TODO show something when empty
// TODO sorting closest
// TODO add carousel
// TODO add url query

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
        <Container as="main" maxW="lg" width="100%" centerContent>
          <Flex
            sx={{
              flexDirection: "column",
              alignItems: "center",
              maxW: "614px",
              width: "100%",
              mt: 4,
            }}
          >
            {/* Filters */}
            <Stack spacing="4" sx={{ width: "100%" }}>
              <Text sx={{ color: "gray.500" }}>Фильтры</Text>

              <Menu closeOnSelect={false}>
                <MenuButton
                  as={Button}
                  colorScheme="blue"
                  variant="outline"
                  size="sm"
                  borderRadius="30px"
                >
                  Категории
                </MenuButton>
                <MenuList minWidth="240px">
                  <MenuOptionGroup
                    type="checkbox"
                    title="Выберите категории"
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

              <Wrap>
                {filters.categories.length === 0 ? (
                  <Tag>{"Все категории"}</Tag>
                ) : (
                  filters.categories.map((item, index) => (
                    <Tag key={index}>{categoriesMap[item]}</Tag>
                  ))
                )}
              </Wrap>

              <Divider />
              <Flex sx={{ justifyContent: "space-between" }}>
                <Text
                  sx={{
                    textAlign: "start",
                    color: "gray.600",
                    fontSize: "sm",
                  }}
                >
                  {`${tours.length} ${toursRus(tours.length)}`}
                </Text>
                <Menu>
                  <MenuButton
                    leftIcon={<FaSortAmountDownAlt />}
                    as={Button}
                    colorScheme="blue"
                    variant="outline"
                    size="sm"
                    borderRadius="30px"
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
            </Stack>

            {
              <List sx={{ width: "100%", py: "20px" }} spacing="6">
                {fetching ? (
                  [...Array(3)].map((item, index) => (
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
                ) : tours.length === 0 ? (
                  <Text
                    sx={{
                      textAlign: "center",
                      mt: "50px",
                      alignItems: "center",
                      flexDirection: "column",
                      width: "100%",
                    }}
                  >
                    <SearchIcon boxSize="6" mb="3" />
                    <Text>Туры не найдены</Text>
                  </Text>
                ) : (
                  tours.map((tour, index) => (
                    <ListItem key={index}>
                      <Link href={`/tours/${tour?._id}`} passHref>
                        <a>
                          <TourCard {...tour} image={tour?.photos[0]} />
                        </a>
                      </Link>
                    </ListItem>
                  ))
                )}
              </List>
            }
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
