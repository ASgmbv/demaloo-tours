import React from "react";

import GuideCard from "../components/GuideCard";
import { ChakraProvider } from "@chakra-ui/react";

export default {
   title: "GuideCard",
   component: GuideCard,
   decorators: [
      (Story) => (
         <ChakraProvider resetCSS>
            <Story />
         </ChakraProvider>
      ),
   ],
};

const Template = (args) => <GuideCard {...args} />;
export const Default = Template.bind({});

Default.args = {
   name: "Aбдурахман Tianguber",
   age: "Возраст: 26 лет",
   experience: "Стаж: 5 лет",
   languages: ["Русский", "Кыргызский", "Английский"],
   photo: "/test/27.jpeg",
};
