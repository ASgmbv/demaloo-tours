import {
  Heading,
  Container,
  Link as ChakraLink,
  Grid,
  useColorMode,
  Box,
} from "@chakra-ui/react";
import Header from "../components/Header";
import ResultsTourCard from "../components/ResultsTourCard";
import { Client } from "../utils/prismicHelpers";
import Prismic from "prismic-javascript";
import { RichText } from "prismic-reactjs";
import Link from "next/link";

const ResultsPage = ({ tours }) => {
  const { colorMode } = useColorMode();

  return (
    <>
      <Header />
      <Container maxW="xl">
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

        <Grid
          templateColumns={[
            "repeat(1, 1fr)",
            null,
            "repeat(2, 1fr)",
            "repeat(3, 1fr)",
          ]}
          gap={10}
        >
          {tours.map(({ data, id }) => {
            // latest data
            let date = data.dates[0].date;

            let categories = data.categories.map((item) => item.category);

            let DESC_LIMIT = 130;
            let description = RichText.asText(data.description);
            let limited = description.substring(0, DESC_LIMIT);
            if (description.length > DESC_LIMIT) {
              limited = `${limited.substring(0, limited.lastIndexOf(" "))}...`;
            }

            let image;
            let dataImage = data.images[0].image;
            if (dataImage.link_type === "Web") {
              image = dataImage.url;
            }

            return (
              <Link href={"/tours/" + id} passHref>
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
        {/* <pre>{JSON.stringify(tours, null, 2)}</pre> */}
        <Box h="100px"></Box>
      </Container>
    </>
  );
};

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
