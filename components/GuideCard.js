import React from "react";
import { Box, Stack, Avatar, Text, Wrap, Tag } from "@chakra-ui/core";
import { useBreakpointValue } from "@chakra-ui/media-query";
import { yearsRus } from "../utils/ruswords";

// ["30em",  "48em",  "62em",  "80em"  ]
// ["480px", "768px", "992px", "1280px"]
// [0 - 480] [480 - 768] [768 - 992] [992 - 1280] [1280 - ]
// base, md, xl

const GuideCard = ({
  photo,
  name,
  age,
  experience,
  languages = [],
  ...props
}) => {
  const avatarSize = useBreakpointValue({ base: "md", md: "lg", xl: "xl" });
  const stackSpacing = useBreakpointValue({ base: 3, md: 5, xl: 8 });

  return (
    <Box
      {...props}
      sx={{
        borderRadius: "20px",
        border: "1px solid",
        borderColor: "teal.500",
        p: [3, 5],
        maxW: "2xl",
        width: "100%",
      }}
    >
      <Stack direction="row" spacing={stackSpacing}>
        <Avatar size={avatarSize} src={photo} />
        <Stack spacing={["1", "2"]}>
          <Text fontSize={["md", "lg"]}>{name}</Text>
          <Text fontSize={["sm", "md"]}>{`Возраст: ${age} ${yearsRus(
            age
          )}`}</Text>
          <Text fontSize={["sm", "md"]}>{`Опыт: ${experience} ${yearsRus(
            experience
          )}`}</Text>
          <Wrap direction="row" sx={{ flexWrap: "wrap" }}>
            <Text fontSize={["sm", "md"]}>Языки:</Text>
            {languages.map((lang, index) => (
              <Tag key={index} size={"sm"} variant="solid" colorScheme="teal">
                {lang}
              </Tag>
            ))}
          </Wrap>
        </Stack>
      </Stack>
    </Box>
  );
};

export default GuideCard;
