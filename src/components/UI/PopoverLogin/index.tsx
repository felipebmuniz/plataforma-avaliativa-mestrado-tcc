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

import { ButtonUI } from '../ButtonUI';
import { InputUI } from '../InputUI';

import { BiUser } from 'react-icons/bi';
import { BiLockAlt } from 'react-icons/bi';
import { useRouter } from 'next/router';

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
  const router = useRouter();

  const initialFocusRef = React.useRef<HTMLInputElement>(null);
  const { onOpen, onClose, isOpen } = useDisclosure();

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

  const clearForm = () => {
    onClose();
    reset(defaultValues);
  };

  function onSubmit(values: any) {
    return new Promise((resolve: any) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        clearForm();
        router.push('/admin');
        resolve();
      }, 3000);
    });
  }

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
        p="1rem"
        width="28rem"
        as={'form'}
        onSubmit={handleSubmit(onSubmit)}
      >
        <PopoverArrow />
        <PopoverCloseButton onClick={clearForm} />
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
            ref={initialFocusRef}
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
          />
        </PopoverBody>
        <PopoverFooter
          border="0"
          display="flex"
          alignItems="center"
          justifyContent="flex-end"
        >
          <ButtonGroup size="sm" gap="1rem">
            <ButtonUI
              onClick={clearForm}
              transition={!isOpen ? 'inherit' : 'filter 0.3s ease'}
            >
              Cancelar
            </ButtonUI>
            <ButtonUI
              bg={theme.container500}
              color={theme.container200}
              transition={!isOpen ? 'inherit' : 'filter 0.3s ease'}
              type="submit"
              isLoading={isSubmitting}
            >
              Entrar
            </ButtonUI>
          </ButtonGroup>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
};

export default PopoverLogin;
