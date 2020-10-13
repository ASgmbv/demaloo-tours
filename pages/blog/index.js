import { Client } from "../../utils/prismicHelpers";
import Prismic from "prismic-javascript";
import { RichText } from "prismic-reactjs";
import {
  Heading,
  Container,
  Box,
  Divider,
  Text,
  Stack,
  Link as ChakraLink,
  Flex,
} from "@chakra-ui/core";
import Header from "../../components/Header";
import Link from "next/link";
import { linkResolver, hrefResolver } from "../../prismic-configuration";
import Head from "next/head";
import BlogFirstParagraph from "../../components/BlogFirstParagraph";

const Blog = ({ posts }) => {
  return (
    <>
      <Head>
        <title>Блог Demaloo</title>
      </Head>
      <Box>
        <Header />
        <Container maxW="sm">
          <Heading as="h1" mt="30px">
            Блог Demaloo
          </Heading>
          <Divider my="30px" />
          <Stack spacing="50px">
            {posts.map((post) => (
              <BlogPost post={post} key={post.id} />
            ))}
          </Stack>
          {/* <pre>{JSON.stringify(posts, null, 2)}</pre> */}
        </Container>
      </Box>
    </>
  );
};

const BlogPost = ({ post }) => {
  const title = RichText.asText(post.data.title)
    ? RichText.asText(post.data.title)
    : "Без названия";

  return (
    <Box>
      <Link as={linkResolver(post)} href={hrefResolver(post)} passHref>
        <ChakraLink>
          <Heading as="h2" fontSize="2xl">
            {title}
          </Heading>
        </ChakraLink>
      </Link>
      {/* <pre>{JSON.stringify(post, null, 2)}</pre> */}
      <Text color="gray.400">
        {new Date(post.last_publication_date).toLocaleString().substring(0, 10)}
      </Text>
      <BlogFirstParagraph sliceZone={post.data.body} />
    </Box>
  );
};

export async function getStaticProps({ preview = null, previewData = {} }) {
  const { ref } = previewData;

  const posts = await Client().query(
    Prismic.Predicates.at("document.type", "blog_post"),
    {
      orderings: "[document.last_publication_date desc]",
      ...(ref ? { ref } : null),
    }
  );

  return {
    props: {
      posts: posts ? posts.results : [],
      preview,
    },
    revalidate: 1,
  };
}

export default Blog;
