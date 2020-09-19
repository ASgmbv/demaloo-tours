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
  Input,
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
import { useState } from "react";

// accept, multiple, required
// change, input
// files, value
// select

// input type="file" is uncontrollable

// TODO use react form hooks

const CMS = () => {
  const uploadRef = React.useRef();
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    if (uploadRef.current.files[0]) {
      formData.append("logo", uploadRef.current.files[0]);
    }
    formData.append("name", name);

    let res = await fetch("/api/companies", {
      method: "POST",
      body: formData,
    });

    res = await res.json();
    console.log("res:", res);
  };

  return (
    <Box>
      <Container>
        <Text>Add a new company</Text>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <Input
            type="name"
            name="name"
            id="name"
            onChange={handleNameChange}
            value={name}
          />
          <Input
            ref={uploadRef}
            name="logo"
            id="logo"
            type="file"
            accept="image/png, image/jpeg"
          />
          <Button type="submit">Upload</Button>
        </form>
        <Text sx={{ color: "red.500" }}>{error}</Text>
      </Container>
    </Box>
  );
};

export default CMS;
