import { Client } from "../../utils/prismicHelpers";
import Prismic from "prismic-javascript";
import { Box, Image, Text, Container, Stack } from "@chakra-ui/core";
import { RichText } from "prismic-reactjs";
import { Heading } from "@chakra-ui/core";
import { Fragment } from "react";
import Header from "../../components/Header";

const Post = ({ post }) => {
  if (post && post.data) {
    let title = post.data.title
      ? RichText.asText(post.data.title)
      : "Без названия";

    return (
      <Box>
        <Header />
        <Container maxW="sm" mt="30px">
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
    );
  }

  return null;
};

const SliceZone = ({ sliceZone }) => (
  <Stack spacing="30px">
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
  </Stack>
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
    <Fragment>
      <Box>
        <Image
          mx="auto"
          src={slice.primary.image.url}
          alt={slice.primary.image.alt}
        />
        <Text textAlign="center" color="gray.500" fontStyle="italic">
          {caption}
        </Text>
      </Box>
    </Fragment>
  );
};

export async function getStaticProps({
  params,
  preview = null,
  previewData = {},
}) {
  const { ref } = previewData;
  const post = (await Client().getByID(params.uid, ref ? { ref } : null)) || {};

  return {
    props: {
      preview,
      post,
    },
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
    paths: res.results.map((doc) => ({ params: { uid: `/blog/${doc.id}` } })),
    fallback: true,
  };
}

export default Post;
