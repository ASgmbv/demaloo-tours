import { Client } from "../../utils/prismicHelpers";
import Prismic from "prismic-javascript";
import {
  Box,
  Image,
  Text,
  Container,
  Stack,
  Flex,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { RichText } from "prismic-reactjs";
import { Heading } from "@chakra-ui/react";
import { Fragment } from "react";
import Header from "../../components/Header";
import Head from "next/head";
import Link from "next/link";
import { ArrowBackIcon } from "@chakra-ui/icons";

const Post = ({ post, t }) => {
  if (post && post.data) {
    let title = post.data.title
      ? RichText.asText(post.data.title)
      : "Без названия";

    return (
      <>
        <pre>{JSON.stringify(t, null, 2)}</pre>
        <Head>
          <title>{title}</title>
        </Head>
        <Box>
          <Header />
          {/* <pre>{JSON.stringify(post, null, 2)}</pre> */}

          <Container maxW="sm" mt="30px">
            <Link href="/blog">
              <ChakraLink>
                <Flex my="30px" alignItems="center">
                  <ArrowBackIcon />
                  <Text verticalAlign="middle" ml="5px">
                    {" "}
                    Блог
                  </Text>
                </Flex>
              </ChakraLink>
            </Link>
            <Heading as="h1">{title}</Heading>
            <Text color="gray.400" mb="30px">
              {new Date(post.last_publication_date)
                .toLocaleString()
                .substring(0, 10)}
            </Text>
            <SliceZone sliceZone={post.data.body} />
          </Container>
          <Box height="100px" />
        </Box>
      </>
    );
  }

  return null;
};

const SliceZone = ({ sliceZone }) => (
  <>
    {sliceZone.map((slice, index) => {
      switch (slice.slice_type) {
        case "image_with_caption":
          return <ImageWithCaption slice={slice} key={index} />;
        case "text":
          return <TextSlice slice={slice} key={index} />;
        default:
          return (
            <div slice={slice} key={index}>
              default
            </div>
          );
      }
    })}
  </>
);

const TextSlice = ({ slice }) => {
  return (
    <div className="blog-content">
      <RichText render={slice.primary.text} />
    </div>
  );
};

const ImageWithCaption = ({ slice }) => {
  let caption = slice.primary.image_caption
    ? RichText.asText(slice.primary.image_caption)
    : "";

  return (
    <Box my="30px">
      <Image
        mx="auto"
        src={slice.primary.image.url}
        alt={slice.primary.image.alt}
      />
      <Text textAlign="center" color="gray.500" fontStyle="italic">
        {caption}
      </Text>
    </Box>
  );
};

export async function getStaticProps({
  params,
  preview = null,
  previewData = {},
}) {
  const { ref } = previewData;
  const post =
    (await Client().getByUID("blog_post", params.uid, ref ? { ref } : null)) ||
    {};

  let t = await Client().query(
    [Prismic.Predicates.at("document.type", "tour")],
    {
      fetchLinks: ["organizer.organizer_name", "organizer.organizer_logo"],
    }
  );

  return {
    props: {
      preview,
      post,
      t,
    },
    revalidate: 30,
  };
}

export async function getStaticPaths() {
  const res = await Client().query(
    Prismic.Predicates.at("document.type", "blog_post"),
    {
      orderings: "[document.last_publication_date desc]",
    }
  );

  return {
    paths: res.results.map((doc) => ({ params: { uid: `/blog/${doc.uid}` } })),
    fallback: true,
  };
}

export default Post;
