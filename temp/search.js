import Head from "next/head";
import {
  Box,
  Container,
  Flex,
  Text,
  Divider,
  Button,
  AspectRatio,
  Stack,
  List,
  ListItem,
  Tag,
  Wrap,
  Menu,
  MenuButton,
  MenuList,
  MenuOptionGroup,
  MenuItemOption,
  MenuItem,
  Skeleton,
  SkeletonText,
} from "@chakra-ui/react";
import Link from "next/link";
import TourCard from "../components/TourCard";
import Header from "../components/Header";
import { SearchIcon } from "@chakra-ui/icons";
import { categoriesMap, sortingMap } from "../utils/data";
import { FaSortAmountDownAlt } from "react-icons/fa";
import { useState, useEffect } from "react";
import { toursRus } from "../utils/ruswords";
import { useRouter } from "next/router";
import { useInfiniteQuery, useQuery, useQueryCache } from "react-query";
import useIntersectionObserver from "../lib/hooks/useIntersectionObserver";

// TODO error when the internet is down
// TODO sorting closest
// TODO add carousel
// TODO add url query

const SearchPage = ({ tours = [] }) => {
  const [categories, setCategories] = React.useState([]);
  const [sortBy, setSortBy] = React.useState(Object.keys(sortingMap)[0]);
  const loadMoreButtonRef = React.useRef();
  let limit = 5;

  let cache = useQueryCache();

  const fetchTours = async (key, cat, sb, page = 0) => {
    let res = await fetch(
      "/api/tours?page=" +
        page +
        "&limit=" +
        limit +
        "&sortBy=" +
        sortBy +
        "&categories=" +
        categories.join() +
        "&currentDate=" +
        new Date().toDateString()
    );
    res = await res.json();

    return res;
  };

  const temp = useInfiniteQuery(["tours", categories, sortBy], fetchTours, {
    getFetchMore: (group) => {
      let totalCount = group?.data?.count;
      let currentPage = group?.data?.page;

      if (totalCount - (currentPage + 1) * limit > 0) {
        return currentPage + 1;
      }

      return null;
    },
  });

  const { data, status, fetchMore, canFetchMore, isFetchingMore } = temp;

  useIntersectionObserver({
    target: loadMoreButtonRef,
    onIntersect: fetchMore,
    enabled: canFetchMore,
  });

  const totalNumberOfPosts = data === undefined ? 0 : data[0].data.count;

  return (
    <>
      <Head>
        <title>Поиск туров по разным направлениям Кыргызстна. | Демалуу</title>
        <meta
          name="description"
          content="Лучшие турагенства и гиды готовы предоставить вам конные походы , эко тур, подходящий для семьи, горящие путёвки на иссык-куль"
        />
        <meta
          name="keywords"
          content="туры, экскурсии, горящие туры, турагентство ,отдых за городом, тур пакеты, туристические пакеты"
        />
        {/* <meta name="robots" content="noindex" /> */}
      </Head>
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
                    value={categories}
                    onChange={(e) => {
                      setCategories(e);
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
                {categories.length === 0 ? (
                  <Tag>{"Все категории"}</Tag>
                ) : (
                  categories.map((item, index) => (
                    <Tag key={index} key={index}>
                      {categoriesMap[item]}
                    </Tag>
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
                  {`${totalNumberOfPosts} ${toursRus(totalNumberOfPosts)}`}
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
                    {Object.keys(sortingMap).map((item, index) => (
                      <MenuItem
                        sx={{ fontSize: "sm" }}
                        value={item}
                        key={index}
                      >
                        {sortingMap[item]}
                      </MenuItem>
                    ))}
                  </MenuList>
                </Menu>
              </Flex>
            </Stack>

            {status === "loading" ? (
              <List sx={{ width: "100%", py: "20px" }} spacing="4">
                {[...Array(3)].map((_, index) => (
                  <Flex
                    key={index}
                    sx={{
                      borderRadius: "16px",
                      p: [2, 4],
                      border: "1px solid",
                      borderColor: "gray.300",
                      overflow: "hidden",
                      width: "100%",
                      flexDirection: ["column", null, "row"],
                    }}
                  >
                    <AspectRatio
                      maxW={["100%", null, "200px"]}
                      width="100%"
                      minWidth="200px"
                      flex="1"
                      ratio={[3 / 2, 4 / 3]}
                      sx={{
                        alignSelf: "center",
                        mb: [4, null, 0],
                        mr: [0, null, 4],
                      }}
                    >
                      <Skeleton />
                    </AspectRatio>
                    <SkeletonText
                      mb="4"
                      noOfLines={4}
                      spacing="5"
                      sx={{
                        width: ["100%", null, "60%"],
                      }}
                    />
                  </Flex>
                ))}
              </List>
            ) : (
              <>
                <List sx={{ width: "100%", py: "20px" }}>
                  {data.map((page, i) => {
                    if (page.data.page === 0 && page.data.data.length === 0) {
                      return (
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
                          Туры не найдены
                        </Text>
                      );
                    }

                    return (
                      <React.Fragment key={i}>
                        {page.data.data?.map((tour, index) => (
                          <ListItem key={index} my="4">
                            <Link href={`/tours/${tour?._id}`} passHref>
                              <a>
                                <TourCard {...tour} />
                              </a>
                            </Link>
                          </ListItem>
                        ))}
                      </React.Fragment>
                    );
                  })}
                </List>
                <Button
                  ref={loadMoreButtonRef}
                  disabled={!canFetchMore || isFetchingMore}
                  onClick={() => fetchMore()}
                >
                  {isFetchingMore
                    ? "Загрузка..."
                    : canFetchMore
                    ? "Посмотреть еще"
                    : "Вы посмотрели все посты"}
                </Button>
              </>
            )}
          </Flex>
        </Container>
      </Box>
    </>
  );
};

// export async function getStaticProps(context) {
//   let tours = null;
//   console.log("here");

//   try {
//     const getTours = require("./api/tours/index").getTours;
//     tours = await getTours();
//     console.log("tours", tours);
//   } catch (error) {
//     tours = null;
//   }

//   return {
//     props: {
//       tours: JSON.parse(JSON.stringify(tours)),
//     },
//     revalidate: 1,
//   };
// }

export default SearchPage;
