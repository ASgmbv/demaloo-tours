import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Text,
  List,
  ListItem,
  Link as ChakraLink,
} from "@chakra-ui/core";

import { FaWhatsapp, FaTelegram, FaPhone } from "react-icons/fa";

const ConsModal = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay>
        <ModalContent>
          <ModalHeader>Консультация</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text mb="6" color="gray.500" fontSize="sm">
              Вы можете обратиться по данным контактам по любым интересующим вас
              вопросом о туре
            </Text>
            <List spacing="4">
              <ListItem>
                <ChakraLink
                  href="tel:+996706100901"
                  target="_blank"
                  sx={{ d: "flex", alignItems: "center" }}
                >
                  <FaPhone style={{ marginRight: "10px", fontSize: "20px" }} />
                  +996 706 100 901
                </ChakraLink>
              </ListItem>
              <ListItem>
                <ChakraLink
                  href="tel:+996702308926"
                  target="_blank"
                  sx={{ d: "flex", alignItems: "center" }}
                >
                  <FaPhone style={{ marginRight: "10px", fontSize: "20px" }} />
                  +996 702 308 926
                </ChakraLink>
              </ListItem>
              <ListItem>
                <ChakraLink
                  href="https://wa.me/+996706100901"
                  target="_blank"
                  sx={{ d: "flex", alignItems: "center" }}
                >
                  <FaWhatsapp
                    style={{
                      marginRight: "10px",
                      fontSize: "20px",
                      color: "#26D366",
                    }}
                  />
                  +996 706 100 901
                </ChakraLink>
              </ListItem>
              <ListItem>
                <ChakraLink
                  href="tg://msg?to=+996706100901"
                  target="_blank"
                  sx={{ d: "flex", alignItems: "center" }}
                >
                  <FaTelegram
                    style={{
                      marginRight: "10px",
                      fontSize: "20px",
                      color: "#0088cc",
                    }}
                  />
                  +996 706 100 901
                </ChakraLink>
              </ListItem>
            </List>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Отменить</Button>
          </ModalFooter>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  );
};

export default ConsModal;
