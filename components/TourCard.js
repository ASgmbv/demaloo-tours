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

import Carousel from "../components/Carousel";
import { daysRus } from "../utils/ruswords";

const TourCard = ({
  name,
  image,
  categories = [],
  organizer,
  duration,
  maxGroupCount,
  distance,
  transportation,
  price,
}) => {
  return (
    <Box
      sx={{
        borderRadius: "16px",
        p: [2, 4],
        boxShadow:
          "rgba(0, 0, 0, 0.08) 0px 1pt 4pt, rgba(0, 0, 0, 0.08) 0px 2pt 4pt",
        border: "1px solid",
        borderColor: "gray.100",
        overflow: "hidden",
      }}
    >
      <Flex flexDirection={["column", null, "row"]}>
        <AspectRatio
          maxW={["100%", null, "200px"]}
          width="100%"
          ratio={[3 / 2, 4 / 3]}
          sx={{ alignSelf: "center" }}
        >
          <Image src={image} objectFit="cover" borderRadius={["lg", "md"]} />
        </AspectRatio>
        <Flex sx={{ ml: [0, null, 4], mt: [3, null, 0], flex: 1 }}>
          <Stack
            sx={{
              flex: 1,
            }}
            // spacing="1"
          >
            <Text
              sx={{
                fontWeight: "bold",
                fontSize: ["lg", "xl"],
                whiteSpace: "normal",
                minWidth: "200px",
              }}
              isTruncated
            >
              {name}
            </Text>
            <Flex sx={{ alignItems: "center" }}>
              <Avatar
                src={organizer?.logo}
                border="1px solid #20C4CE"
                size="xs"
              />
              <Text sx={{ ml: 2 }} isTruncated>
                {organizer?.name}
              </Text>
            </Flex>
            <Text>Chuy - Batken - Osh</Text>
            <Wrap>
              {categories.map((category, index) => (
                <Tag variant="solid" colorScheme="teal" size="sm" key={index}>
                  {category}
                </Tag>
              ))}
              {duration === undefined ? null : (
                <Tag variant="solid" colorScheme="green" size="sm">
                  {`${duration} ${daysRus(duration)}`}
                </Tag>
              )}
              {maxGroupCount === undefined ? null : (
                <Tag variant="solid" colorScheme="yellow" size="sm">
                  {`${maxGroupCount} чел`}
                </Tag>
              )}
              {distance === undefined ? null : (
                <Tag variant="solid" colorScheme="orange" size="sm">
                  {`${distance} км`}
                </Tag>
              )}
              {transportation === undefined ? null : (
                <Tag variant="solid" colorScheme="blue" size="sm">
                  {transportation}
                </Tag>
              )}
            </Wrap>
          </Stack>
          <Text sx={{ fontWeight: "bold", fontSize: ["lg", "xl"] }}>
            {price}
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
};

export default TourCard;
