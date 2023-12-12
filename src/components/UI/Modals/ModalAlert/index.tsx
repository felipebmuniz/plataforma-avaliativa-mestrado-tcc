import React from "react";
import {
  Button,
  ButtonGroup,
  HStack,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useTheme } from "@emotion/react";
import { ButtonUI } from "../../ButtonUI";
import { BiX, BiTrash } from "react-icons/bi";

interface IModalAlertProps {
  type: "textButton" | "iconButtonClose" | "iconButtonDelete";
  label?: string;
  ModalTitle: string;
  ModalText: string;
  ModalTextButtonConfirm: string;
  configButton?: {};
  onChange: () => void;
}

const ModalAlert = ({
  type,
  label,
  ModalTitle,
  ModalText,
  ModalTextButtonConfirm,
  configButton,
  onChange,
}: IModalAlertProps) => {
  const theme = useTheme();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const selectButtonType = React.useCallback(
    (typeSelect: "textButton" | "iconButtonClose" | "iconButtonDelete") => {
      switch (typeSelect) {
        case "textButton":
          return <Button onClick={onOpen}>{label}</Button>;

        case "iconButtonClose":
          return (
            <IconButton
              aria-label="close-icon-modal"
              icon={<BiX />}
              onClick={onOpen}
              size="xs"
              {...configButton}
            />
          );
        case "iconButtonDelete":
          return (
            <HStack w="100%" m="auto" alignItems="center" paddingLeft="2.2rem">
              <IconButton
                aria-label="delete-icon-modal"
                icon={<BiTrash />}
                onClick={onOpen}
                size="lg"
                color="red"
                {...configButton}
              />
            </HStack>
          );

        default:
          return <Button onClick={onOpen}>{label}</Button>;
      }
    },
    [],
  );

  return (
    <>
      {selectButtonType(type)}

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{ModalTitle}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>{ModalText}</Text>
          </ModalBody>
          <ModalFooter>
            <ButtonGroup size="sm" gap="1rem">
              <ButtonUI
                onClick={onClose}
                transition={!isOpen ? "inherit" : "filter 0.3s ease"}
              >
                Cancelar
              </ButtonUI>
              <ButtonUI
                onClick={onChange}
                transition={!isOpen ? "inherit" : "filter 0.3s ease"}
                bgColor={theme.delete}
                color={theme.colorTextAddButton}
              >
                {ModalTextButtonConfirm}
              </ButtonUI>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalAlert;
