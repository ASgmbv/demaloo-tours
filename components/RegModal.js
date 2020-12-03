import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  Button,
  Text,
  useToast,
  Checkbox,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

import { useState } from "react";
import { useForm } from "react-hook-form";

// type = required, min, max
// TODO save bookings to a database
// TODO option to send email to a user if they want

const RegModal = ({ isOpen, onClose, tour, company }) => {
  const temp = useForm();
  const { register, handleSubmit, watch, errors, reset } = temp;

  const router = useRouter();
  const toast = useToast();

  const [isSending, setSending] = useState(false);

  const onSubmit = async (data) => {
    try {
      setSending(true);

      let details = {
        ...data,
        tour,
        company,
      };

      let dbResponse = await fetch("/api/bookings", {
        method: "POST",
        body: JSON.stringify({
          ...details,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (dbResponse.status < 200 || dbResponse.status > 299) {
        throw new Error("Failed to save booking to a database");
      }

      dbResponse = await dbResponse.json();

      let id = dbResponse.data.data._id;

      let emailResponse = await fetch("/api/registerTour", {
        method: "POST",
        body: JSON.stringify({
          ...details,
          id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (emailResponse.status < 200 || emailResponse.status > 299) {
        throw new Error("Failed to send registration email");
      }

      setSending(false);
      toast({
        title: "Тур успешно забронирован!",
        description:
          "Через некоторое время с вами свяжутся по номеру телефона который вы указали",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      handleClose();
    } catch (error) {
      setSending(false);
      toast({
        title: "Что-то пошло не так!",
        description: "Попробуйте перезагрузить страницу",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="lg" isCentered>
      <ModalOverlay>
        <ModalContent>
          <ModalHeader>Заполните поля</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text mb="6" color="gray.500" fontSize="sm">
              После отправления формы через некоторое время с вами свяжутся по
              номеру телефона который вы указали
            </Text>
            <form id="form" onSubmit={handleSubmit(onSubmit)}>
              <FormControl>
                <FormLabel>Ваше имя</FormLabel>
                <Input
                  name="name"
                  ref={register}
                  type="text"
                  ref={register({ required: true })}
                />
              </FormControl>

              {errors?.name?.type === "required" && (
                <Text color="orangered">Введите ваше имя</Text>
              )}

              <FormControl mt="4">
                <FormLabel>Ваш телефон</FormLabel>
                <Input
                  name="phone"
                  type="tel"
                  placeholder="0 ( ___ ) __-__-__"
                  ref={register({ required: true })}
                />
              </FormControl>

              {errors?.phone?.type === "required" && (
                <Text color="orangered">Введите ваш телефон</Text>
              )}

              <FormControl mt="4">
                <FormLabel>Количество человек</FormLabel>
                <Input
                  name="count"
                  type="number"
                  placeholder="1"
                  ref={register({ required: true, min: 1, max: 100 })}
                />
              </FormControl>
              {errors?.count?.type === "required" && (
                <Text color="orangered">Введите количество человек</Text>
              )}
              {errors?.count?.type === "min" && (
                <Text color="orangered">Мин. количество = 1</Text>
              )}

              {/* <Checkbox
                name="sendEmail"
                mt="5"
                size="sm"
                sx={{ fontSize: "12px" }}
                color="gray.500"
              >
                Получить детали регистрации на свою почту
              </Checkbox> */}
            </form>
          </ModalBody>
          <ModalFooter>
            <Button
              isLoading={isSending}
              colorScheme="primary"
              type="submit"
              form="form"
              mr={3}
            >
              Готово
            </Button>
            <Button onClick={onClose}>Отменить</Button>
          </ModalFooter>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  );
};

export default RegModal;
