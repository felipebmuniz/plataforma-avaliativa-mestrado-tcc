import React from 'react';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import {
  ButtonGroup,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  useDisclosure,
  useTheme,
} from '@chakra-ui/react';

import Button from '../Button';
import { InputUI } from '../InputUI';

import { BiUser } from 'react-icons/bi';
import { BiLockAlt } from 'react-icons/bi';

interface IProps {
  children: React.ReactNode;
}

const defaultValues: { email: string; password: string } = {
  email: '',
  password: '',
};

const schemaFormLogin = yup.object({
  email: yup.string().email().required('Deve ser informado um email!'),
  password: yup
    .string()
    .min(6, 'Senha deve ter no mínimo 6 caracteres!')
    .required('Deve ser informado uma senha!'),
});

const PopoverLogin = ({ children }: IProps) => {
  const theme = useTheme();
  const { onOpen, onClose, isOpen } = useDisclosure();
  const initialFocusRef = React.useRef(null);

  const {
    handleSubmit,
    register,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(schemaFormLogin),
    mode: 'onBlur',
  });
  return (
    <Popover
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      placement="bottom-start"
      initialFocusRef={initialFocusRef}
    >
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent
        key={'form-login'}
        py="0.75rem "
        px="1.5rem"
        width="25rem"
      >
        <PopoverArrow />
        <PopoverCloseButton
          onClick={() => {
            onClose();
            reset(defaultValues);
          }}
        />
        <PopoverHeader>Acesso Exclusivo!</PopoverHeader>
        <PopoverBody
          marginBottom="1rem"
          marginTop="1rem"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="flex-start"
          gap={'1rem'}
        >
          <InputUI
            register={register}
            errors={errors}
            name="email"
            // label="email"
            type="email"
            placeholder="Email de acesso *"
            icon={<BiUser />}
            iconPosition="left"
            py="0.2rem "
            px="1.5rem"
            h="2.75rem"
          />
          <InputUI
            register={register}
            errors={errors}
            name="password"
            // label="password"
            type="password"
            placeholder="Senha de acesso *"
            icon={<BiLockAlt />}
            iconPosition="left"
            py="0.2rem "
            px="1.5rem"
            h="2.75rem"
          />
        </PopoverBody>
        <PopoverFooter
          border="0"
          display="flex"
          alignItems="center"
          justifyContent="flex-end"
        >
          <ButtonGroup size="sm" gap="1rem">
            <Button
              py="0.75rem "
              px="1.5rem"
              h="2.75rem"
              onClick={() => {
                onClose();
                reset(defaultValues);
              }}
            >
              Cancelar
            </Button>
            <Button
              bg={theme.container500}
              color={theme.container200}
              py="0.75rem "
              px="1.5rem"
              h="2.75rem"
              ref={initialFocusRef}
            >
              Entrar
            </Button>
          </ButtonGroup>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
};

export default PopoverLogin;
