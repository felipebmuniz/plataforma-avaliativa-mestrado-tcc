import React from 'react';
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
} from '@chakra-ui/react';
import { useTheme } from '@emotion/react';
import { ButtonUI } from '../../ButtonUI';
import { BiX } from 'react-icons/bi';

interface IModalAlertProps {
  type: 'textButton' | 'iconButtonClose';
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

  return (
    <>
      {type == 'textButton' ? (
        <Button onClick={onOpen}>{label}</Button>
      ) : (
        <IconButton
          aria-label="close-icon-modal"
          icon={<BiX />}
          onClick={onOpen}
          size="xs"
          {...configButton}
        />
      )}

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
                transition={!isOpen ? 'inherit' : 'filter 0.3s ease'}
              >
                Cancelar
              </ButtonUI>
              <ButtonUI
                onClick={onChange}
                transition={!isOpen ? 'inherit' : 'filter 0.3s ease'}
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
