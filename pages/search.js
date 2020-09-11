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
import TourCard from "../components/TourCard";
import Header from "../components/Header";

const SearchPage = ({ tours }) => {
  return (
    <>
      <Header />
      <Box as="main">
        <Container maxW="lg">
          <Flex
            sx={{
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <List sx={{ maxW: "614px", width: "100%", py: "20px" }} spacing="6">
              <Flex
                sx={{
                  justifyContent: "flex-end",
                  width: "100%",
                }}
              >
                <Button>Filters</Button>
              </Flex>
              {tours.map((tour, index) => (
                <ListItem key={index}>
                  <Link href={`/tours/${tour?._id}`} passHref>
                    <a>
                      <TourCard {...tour} image={tour?.photos[0]} />
                    </a>
                  </Link>
                </ListItem>
              ))}
            </List>
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
