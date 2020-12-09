import {
  Popover,
  PopoverTrigger,
  Button,
  PopoverContent,
  PopoverHeader,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody,
  Grid,
  Box,
} from "@chakra-ui/react";

const ctgrs = [
  "Приватный",
  "На выходные",
  "Тематические",
  "С детьми",
  "По городу",
  "Природа и парки",
  "Театры и концерты",
  "Музеи",
  "Горы",
  "Озера и реки",
  "Ущелье",
  "Каньон",
  "Горячий источник",
  "Объекты сооружения",
  "Конный",
  "Водопад",
  "Горнолыжный",
  "Спортивный",
  "Джип тур",
];

// selected items
// all items

function FilterByCategories() {
  return (
    <div>
      <Popover placement="bottom-start" size="lg">
        <PopoverTrigger>
          <Button>Выберите фильтры</Button>
        </PopoverTrigger>
        <PopoverContent w="30rem">
          <PopoverHeader>Фильтры</PopoverHeader>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverBody>
            <Grid templateColumns="repeat(2, 1fr)" gap="0">
              {ctgrs.map((item, index) => (
                <Box key={index} bg="green.100" border="1px solid black">
                  {item}
                </Box>
              ))}
            </Grid>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default FilterByCategories;
