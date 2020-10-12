import Head from "next/head";
import {
  Box,
  Image,
  Heading,
  Container,
  Flex,
  Text,
  Stack,
  Wrap,
  Grid,
  Alert,
  Link as ChakraLink,
} from "@chakra-ui/core";

import Hero from "../components/Hero";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { partners, places } from "../utils/data";
import { useInView } from "react-intersection-observer";
import { getCompanies } from "../pages/api/companies/index";
import { getTours } from "../pages/api/tours/index";
import { Client } from "../utils/prismicHelpers";
import Prismic from "prismic-javascript";
import BlogFirstParagraph from "../components/BlogFirstParagraph";
import { RichText } from "prismic-reactjs";
import Link from "next/link";
import { linkResolver, hrefResolver } from "../prismic-configuration";

export default function Home({ companies, toursCount, blogPosts }) {
  const { ref: heroRef, inView, entry } = useInView({
    threshold: 0.7,
    initialInView: true,
  });

  return (
    <>
      <Head>
        <title>
          Туры по низким ценам от ведущих турагенств и гидов | Demaloo
        </title>
        <meta
          name="description"
          content="Приобретите горящие туры, экскурсии, отдых за городом, на выходные и.т.д. 5% от суммы покупки накапливаются у вас! Туризм Кыргызстана"
        />
        <meta
          name="keywords"
          content="туры, экскурсии, горящие туры, турагентство ,отдых за городом, тур пакеты, туристические пакеты"
        />
      </Head>

      <Alert
        status="info"
        sx={{
          textAlign: "center",
          justifyContent: "center",
          alignItems: "center",
          py: "5px",
          fontSize: "13px",
          textDecoration: "underline",
        }}
      >
        <ChakraLink href="https://covid.kg" rel="noopener" target="_blank">
          Актуальная информация о COVID-19 в Кыргызстане
        </ChakraLink>
      </Alert>

      <Box as="main" sx={{ width: "100%" }}>
        <Header isVisible={!inView} />

        <Hero ref={heroRef} />

        <Container as="section" maxW="xl" sx={{ my: ["50px", "100px"] }}>
          <Heading
            as="h2"
            sx={{
              fontSize: ["xl", "2xl"],
              textAlign: "center",
              mb: "10px",
              mx: "auto",
            }}
          >
            Бронируйте туры быстро и легко!
          </Heading>
          <Box
            sx={{
              width: "50px",
              height: "4px",
              backgroundColor: "#20C4CE",
              mx: "auto",
            }}
          />
          <Stack
            direction={["column", null, "row"]}
            spacing={[8]}
            sx={{ width: "100%", marginTop: "50px" }}
          >
            <Flex
              sx={{
                p: [0, 4],
                flex: 1,
                flexDirection: "column",
                minW: 56,
                alignItems: ["start", "center"],
              }}
            >
              <Heading
                as="h3"
                fontSize={["18px", "22px"]}
                sx={{
                  textAlign: "center",
                  mb: 3,
                }}
              >
                О нас 🤘
              </Heading>
              <Text sx={{ textAlign: ["start", "center"], maxW: "md" }}>
                Сотрудничаем с более{" "}
                <strong>{companies.length} турфирмами.</strong>
                <br />
                Около <strong>{toursCount} туров</strong> и экскурсий по всем
                достопримечательностям Бишкека, Каракола, Нарына и т.д.
              </Text>
            </Flex>

            <Flex
              sx={{
                p: [0, 4],
                flex: 1,
                flexDirection: "column",
                minW: 56,
                alignItems: ["start", "center"],
              }}
            >
              <Heading
                as="h3"
                fontSize={["18px", "22px"]}
                sx={{ textAlign: "center", mb: 3 }}
              >
                Почему мы? 👊
              </Heading>
              <Text sx={{ textAlign: ["start", "center"], maxW: "md" }}>
                Те же цены что и у турагенств
                <br />
                Накопительная система - <strong>5% от суммы покупки.</strong>
                Накопив достаточно, вы сможете получить бесплатный тур от любого
                туроператора.
              </Text>
            </Flex>

            <Flex
              sx={{
                p: [0, 4],
                flex: 1,
                flexDirection: "column",
                minW: 56,
                alignItems: ["start", "center"],
              }}
            >
              <Heading
                as="h3"
                fontSize={["18px", "22px"]}
                sx={{ textAlign: "center", mb: 3 }}
              >
                Как это работает? 👏
              </Heading>
              <Text sx={{ textAlign: ["start", "center"], maxW: "md" }}>
                1) Выберите тур.
                <br />
                2) Заполните форму.
                <br />
                3) Ожидайте подтверждения от турагенства
                <br />
                4) Приятного отдыха!
              </Text>
            </Flex>
          </Stack>
        </Container>

        {/* <Container as="section" maxW="xl" sx={{ my: ["50px", "100px"] }}>
          <Heading
            as="h2"
            sx={{
              fontSize: ["xl", "2xl"],
              textAlign: "center",
              mb: "10px",
            }}
          >
            Популярные места
          </Heading>
          <Box
            sx={{
              width: "50px",
              height: "4px",
              backgroundColor: "#20C4CE",
              mx: "auto",
            }}
          />

          <Grid
            templateColumns={["repeat(2, 1fr)", null, "repeat(4, 1fr)"]}
            gap={["10px", "20px"]}
            sx={{ marginTop: "50px" }}
          >
            {places.map(({ title, image, isWide }, index) => (
              <Box
                sx={{
                  width: "100%",
                  position: "relative",
                  borderRadius: "10px",
                  gridColumn: isWide ? "span 2" : "span 1",
                  bg: "gray.50",
                }}
                key={index}
              >
                <Image
                  src={image}
                  objectFit="cover"
                  boxSize="100%"
                  borderRadius="10px"
                  alt={`${title} | demaloo`}
                />
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    bg: "rgba(0, 0, 0, 0.2)",
                    color: "white",
                    borderRadius: "10px",
                    display: "flex",
                    alignItems: "flex-end",
                    padding: "20px",
                  }}
                >
                  <Text fontSize="20px">{title}</Text>
                </Box>
              </Box>
            ))}
          </Grid>
        </Container> */}

        <Container as="section" maxW="xl" sx={{ my: ["50px", "100px"] }}>
          <Heading
            as="h2"
            sx={{
              fontSize: ["xl", "2xl"],
              textAlign: "center",
              mb: "10px",
            }}
          >
            Наши партнеры
          </Heading>
          <Box
            sx={{
              width: "50px",
              height: "4px",
              backgroundColor: "#20C4CE",
              mx: "auto",
            }}
          />

          <Wrap
            sx={{
              marginTop: "50px",
            }}
            justify="center"
            spacing="8"
          >
            {companies.map(({ name, logo }, index) => (
              <Flex
                sx={{
                  flexDirection: "column",
                  alignItems: "center",
                  width: "150px",
                }}
                key={index}
              >
                <Image
                  src={logo || "./test/download.png"}
                  boxSize="95px"
                  alt={`${name} | demaloo`}
                />
                <Text
                  sx={{
                    fontWeight: "bold",
                    fontSize: "lg",
                    mt: "10px",
                    textAlign: "center",
                  }}
                >
                  {name}
                </Text>
              </Flex>
            ))}
          </Wrap>
        </Container>

        <Container as="section" maxW="md" sx={{ my: ["50px", "100px"] }}>
          <Heading
            as="h2"
            sx={{
              fontSize: ["xl", "2xl"],
              textAlign: "center",
              mb: "10px",
            }}
          >
            Наш блог
          </Heading>
          <Box
            sx={{
              width: "50px",
              height: "4px",
              backgroundColor: "#20C4CE",
              mx: "auto",
            }}
          />

          <Stack mt="50px" spacing="50px">
            {blogPosts.map((post) => {
              return (
                <Link
                  as={linkResolver(post)}
                  href={hrefResolver(post)}
                  passHref
                >
                  <a>
                    <Stack>
                      <Heading as="h2" fontSize={["xl", "2xl"]}>
                        {RichText.asText(post.data.title)}
                      </Heading>
                      <BlogFirstParagraph
                        sliceZone={post.data.body}
                        textLimit="200"
                      />
                      <Text color="gray.400">
                        {new Date(post.last_publication_date)
                          .toLocaleString()
                          .substring(0, 10)}
                      </Text>
                    </Stack>
                  </a>
                </Link>
              );
            })}
          </Stack>

          <Link href="/blog" passHref>
            <ChakraLink>
              <Text mt="50px" textAlign="center">
                Все статьи ->
              </Text>
            </ChakraLink>
          </Link>
        </Container>

        <Footer />
      </Box>
    </>
  );
}

export async function getStaticProps() {
  let companies = null;

  try {
    companies = await getCompanies();
  } catch (error) {
    companies = [];
  }

  let toursCount = 0;
  try {
    let res = await getTours({});
    toursCount = res.count;
  } catch (error) {
    toursCount = 0;
  }

  const blogPosts = await Client().query(
    Prismic.Predicates.at("document.type", "blog_post"),
    {
      orderings: "[document.last_publication_date desc]",
      pageSize: 3,
    }
  );

  return {
    props: {
      companies: JSON.parse(JSON.stringify(companies)),
      blogPosts: JSON.parse(JSON.stringify(blogPosts.results)),
      toursCount,
    },
    revalidate: 30,
  };
}
