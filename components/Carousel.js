import React, { useState } from "react";
import { AspectRatio, Image, Text, Box } from "@chakra-ui/core";
import SwipeableViews from "react-swipeable-views";
import { virtualize } from "react-swipeable-views-utils";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
const Virtualize = virtualize(SwipeableViews);

const Carousel = ({
  photos = [],
  ratio = 3 / 2,
  width = "100%",
  name = "demaloo tours image",
}) => {
  const [active, setActive] = useState(0);
  function mod(n, m) {
    const q = n % m;
    return q < 0 ? q + m : q;
  }

  const slideRenderer = (params) => {
    const { index, key } = params;
    const image = photos[mod(index, photos.length)];

    return (
      <Image
        alt={name}
        src={image}
        key={key}
        boxSize="100%"
        objectFit="cover"
        borderRadius={[0, "lg"]}
        sx={{
          userSelect: "none",
        }}
      />
    );
  };

  const length = photos.length;

  const handleRightChevronClick = (e) => {
    e.stopPropagation();
    // the last image
    if (length - 1 !== active) {
      setActive(active + 1);
    }
  };

  const handleLeftChevronClick = (e) => {
    e.stopPropagation();
    // first image
    if (active > 0) {
      setActive(active - 1);
    }
  };

  const handleChangeIndex = (index, latest, meta) => {
    setActive(index);
  };

  return (
    <AspectRatio
      width={width}
      ratio={ratio}
      sx={{ position: "relative", borderRadius: "lg" }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      >
        <Virtualize
          index={active}
          containerStyle={{
            width: "100%",
            height: "100%",
          }}
          enableMouseEvents
          slideRenderer={slideRenderer}
          onChangeIndex={handleChangeIndex}
          slideCount={photos.length}
        />
        {active > 0 ? (
          <ChevronLeftIcon
            onClick={handleLeftChevronClick}
            boxSize={6}
            sx={{
              position: "absolute",
              top: "calc(50% - 10px)",
              left: "10px",
              backgroundColor: "gray.50",
              borderRadius: "full",
              cursor: "pointer",
            }}
          />
        ) : null}
        {length - 1 !== active ? (
          <ChevronRightIcon
            onClick={handleRightChevronClick}
            boxSize={6}
            sx={{
              position: "absolute",
              top: "calc(50% - 10px)",
              right: "10px",
              backgroundColor: "gray.50",
              borderRadius: "full",
              cursor: "pointer",
            }}
          />
        ) : null}
        {
          <Text
            as="span"
            sx={{
              position: "absolute",
              bottom: "15%",
              right: "5%",
              bg: "rgba(0, 0, 0, 0.5)",
              p: 1,
              borderRadius: "md",
              lineHeight: 1,
              userSelect: "none",
              fontWeight: "bold",
              color: "white",
            }}
          >
            {`${active + 1} / ${length}`}
          </Text>
        }
      </Box>
    </AspectRatio>
  );
};

export default Carousel;
