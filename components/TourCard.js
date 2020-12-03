import {
  Box,
  Image,
  Flex,
  Text,
  AspectRatio,
  Stack,
  Badge,
  Tag,
  Avatar,
  Wrap,
  Link as ChakraLink,
  Skeleton,
} from "@chakra-ui/react";

import { daysRus } from "../utils/ruswords";
import { useState } from "react";
import { categoriesMap, monthsMap } from "../utils/data";

const TourCard = ({
  name,
  categories = [],
  organizer,
  duration,
  maxGroupCount,
  distance,
  transportation,
  price,
  days = [],
  dates,
  photos = [],
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  let places = [];
  days.map(({ locations }) => {
    places = places.concat(locations.map(({ name }) => name));
  });

  const closestDate = new Date(dates[0]);
  const photo = photos[0] || "/batken.jpg";

  // TODO error when dates is an empty array closestData dates[0]

  return (
    <Box
      sx={{
        borderRadius: "16px",
        p: [2, 4],
        border: "1px solid",
        borderColor: "gray.300",
        overflow: "hidden",
        ":hover": {
          boxShadow:
            "rgba(0, 0, 0, 0.08) 0px 1pt 4pt, rgba(0, 0, 0, 0.08) 0px 2pt 4pt",
        },
      }}
    >
      <Flex flexDirection={["column", null, "row"]}>
        <AspectRatio
          maxW={["100%", null, "200px"]}
          width="100%"
          minWidth="200px"
          flex="1"
          ratio={[3 / 2, 4 / 3]}
          sx={{ alignSelf: "center" }}
        >
          <Skeleton isLoaded={imageLoaded}>
            <Image
              alt={name}
              src={photo}
              objectFit="cover"
              align="center"
              onLoad={() => {
                setImageLoaded(true);
              }}
              borderRadius={["lg", "md"]}
              sx={{ height: "100%", width: "100%" }}
            />
          </Skeleton>
        </AspectRatio>
        <Flex sx={{ ml: [0, null, 4], mt: [3, null, 0], flex: 1 }}>
          <Stack
            sx={{
              flex: 1,
            }}
          >
            <Flex sx={{ justifyContent: "space-between" }}>
              <Text
                sx={{
                  fontWeight: "bold",
                  fontSize: ["lg", "lg"],
                  whiteSpace: "normal",
                  minWidth: "200px",
                }}
                isTruncated
              >
                {name}
              </Text>
              <Text
                sx={{
                  fontWeight: "bold",
                  fontSize: ["lg", "lg"],
                  textAlign: "end",
                }}
              >
                {`${price} сом`}
              </Text>
            </Flex>

            <Flex sx={{ alignItems: "center" }}>
              <Avatar src={organizer?.logo} size="xs" />
              <Text sx={{ ml: 2 }} isTruncated>
                {organizer?.name}
              </Text>
            </Flex>
            <Badge
              variant="outline"
              colorScheme="green"
              sx={{ width: "fit-content" }}
            >
              {`${closestDate.getDate()} ${monthsMap[closestDate.getMonth()]}`}
            </Badge>
            <Text sx={{ fontSize: ["sm"] }}>{places.join(" - ")}</Text>
            <Wrap>
              {categories.map((category, index) => (
                <Tag variant="solid" colorScheme="teal" size="sm" key={index}>
                  {categoriesMap[category]}
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
        </Flex>
      </Flex>
    </Box>
  );
};

export default TourCard;
