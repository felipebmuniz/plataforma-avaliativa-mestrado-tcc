import React from "react";
import {
  Button,
  ButtonGroup,
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
import { BiWindows, BiTable } from "react-icons/bi";

interface IModalPreviewProps {
  // type: 'textButton' | 'iconButtonClose';
  label?: string;
  ModalTitle: string;
  // ModalText: string;
  // ModalTextButtonConfirm: string;
  configButton?: {};
  children: React.ReactNode;
  // onChange: () => void;
}

const ModalPreview = ({
  // type,
  label,
  ModalTitle,
  // ModalText,
  children,
}: // ModalTextButtonConfirm,
// configButton,
// onChange,
IModalPreviewProps) => {
  const theme = useTheme();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [scrollBehavior] = React.useState("inside");

  const btnRef = React.useRef(null);

  return (
    <>
      {/* {type == 'textButton' ? ( */}
      <Button onClick={onOpen} leftIcon={<BiWindows />} ref={btnRef}>
        {label}
      </Button>
      {/* ) : (
        <IconButton
          aria-label="close-icon-modal"
          icon={<BiX />}
          onClick={onOpen}
          size="xs"
          {...configButton}
        />
      )} */}

      <Modal
        onClose={onClose}
        isOpen={isOpen}
        size={"6xl"}
        // @ts-ignore
        scrollBehavior={scrollBehavior}
        finalFocusRef={btnRef}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{ModalTitle}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{children}</ModalBody>
          <ModalFooter>
            <ButtonGroup size="sm" gap="1rem">
              <ButtonUI
                onClick={onClose}
                transition={!isOpen ? "inherit" : "filter 0.3s ease"}
              >
                Fechar
              </ButtonUI>
              {/* <ButtonUI
                onClick={onChange}
                transition={!isOpen ? 'inherit' : 'filter 0.3s ease'}
                bgColor={theme.delete}
                color={theme.colorTextAddButton}
              >
                {ModalTextButtonConfirm}
              </ButtonUI> */}
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalPreview;
