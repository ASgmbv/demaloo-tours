import {
  Box,
  Flex,
  Image,
  Text,
  Heading,
  Stack,
  Wrap,
  Tag,
  WrapItem,
  AspectRatio,
  useColorMode,
} from "@chakra-ui/react";
// import Image from "next/image";
import { monthsMap } from "../utils/data";

const ResultsTourCard = ({
  date = "",
  price = 0,
  name = "",
  description = "",
  duration = 0,
  groupSize = 0,
  distance = 0,
  transportation = "",
  categories = [],
  image = "/demaloo_bg.jpeg",
}) => {
  const { colorMode } = useColorMode();

  let dateObj = new Date(date);
  let dateStr = `${dateObj.getDate()} ${monthsMap[dateObj.getMonth()]}`;

  return (
    <Flex
      borderRadius="10px"
      bg={colorMode === "light" ? "gray.50" : "gray.800"}
      position="relative"
      w="100%"
      h="100%"
      boxShadow="6px 6px 6px #CEC1C1"
      flexDir="column"
      border="1px solid"
      borderColor={colorMode === "light" ? "gray.200" : "gray.50"}
    >
      <Box position="relative">
        <Box sx={{ clipPath: "polygon(0 0, 100% 0%, 100% 100%, 0% 75%)" }}>
          <AspectRatio ratio={5 / 2}>
            <Image
              borderTopRadius="10px"
              alt={name}
              src={image}
              w="100%"
              objectFit="cover"
            />
          </AspectRatio>
          {/* <Image
            alt={name}
            src={image}
            responsive="responsive"
            style={{
              // objectFit: "cover",
              borderTopRadius: "10px",
            }}
            layout='fill'
            objectFit='cover'
          /> */}
        </Box>
        <Flex
          justifyContent="space-between"
          alignItems="center"
          position="absolute"
          left="0"
          top="calc(100% - 45px)"
          w="100%"
          px="1rem"
        >
          <Text as="span" border="1px solid #1D3774" borderRadius="5px" px="1">
            {dateStr}
          </Text>
          <Flex
            h="90px"
            w="90px"
            border="5px solid #4BBADE"
            borderRadius="50%"
            alignItems="center"
            justifyContent="center"
            bg="white"
            color="black"
          >
            <Text as="span" fontWeight="bold" fontSize="xl">
              {price} с
            </Text>
          </Flex>
        </Flex>
      </Box>
      <Flex w="100%" flexDir="column" p="4" mt="45px" flex="1">
        <Heading size="md" fontWeight="bold">
          {name}
        </Heading>
        <Text my="4" h="120px">
          {description}
        </Text>
        <Stack>
          <Flex justifyContent="space-between">
            <Text fontWeight="bold">Длительность:</Text>
            <Text>{duration} день</Text>
          </Flex>
          <Flex justifyContent="space-between">
            <Text fontWeight="bold">Количество участников:</Text>
            <Text>{groupSize} человек</Text>
          </Flex>
          <Flex justifyContent="space-between">
            <Text fontWeight="bold">Дистанция:</Text>
            <Text>{distance} км</Text>
          </Flex>
          <Flex justifyContent="space-between">
            <Text fontWeight="bold">Транспорт:</Text>
            <Text>{transportation}</Text>
          </Flex>
        </Stack>
        <Wrap mt="4">
          {categories.map((item, index) => (
            <WrapItem key={index}>
              <Tag variant="solid" colorScheme="teal">
                {item}
              </Tag>
            </WrapItem>
          ))}
        </Wrap>
      </Flex>
    </Flex>
  );
};

export default ResultsTourCard;
