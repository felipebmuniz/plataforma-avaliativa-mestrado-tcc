import { ComponentProps } from 'react';
import {
  Box,
  ButtonGroup,
  Input as ChakraInput,
  ChakraProps,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  IconButton,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  useEditableControls,
} from '@chakra-ui/react';

import InputMask from 'react-input-mask';

import { useTheme } from '@emotion/react';

import { BiCheck, BiX, BiEdit } from 'react-icons/bi';

type EditableProps = ComponentProps<'input'> &
  ChakraProps & {
    label?: string;
    name: string;
    register: any;
    errors?: any;
    autoComplete?: any;
    autoFocus?: any;
    disabled?: any;
    size?: (string & {}) | 'sm' | 'md' | 'lg' | 'xs';
    icon?: JSX.Element;
    iconPosition?: 'right' | 'left';
    mask?: string;
  };

export function EditableUI({
  type,
  placeholder,
  label,
  name,
  register,
  errors,
  autoComplete,
  autoFocus,
  disabled,
  icon,
  iconPosition,
  size,
  mask,
  ...props
}: EditableProps) {
  const theme = useTheme();

  const propsMask = mask
    ? {
        mask: mask,
        maskChar: null,
      }
    : {};

  function EditableControls() {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps,
    } = useEditableControls();

    return isEditing ? (
      <ButtonGroup justifyContent="center" size="md">
        <IconButton
          aria-label="icon-check"
          icon={<BiCheck />}
          {...getSubmitButtonProps()}
        />
        <IconButton
          aria-label="icon-close"
          icon={<BiX />}
          {...getCancelButtonProps()}
        />
      </ButtonGroup>
    ) : (
      <Flex justifyContent="center">
        <IconButton
          size="md"
          aria-label="icon-edit"
          icon={<BiEdit />}
          {...getEditButtonProps()}
        />
      </Flex>
    );
  }

  return (
    <Editable
      textAlign="center"
      placeholder={placeholder}
      fontSize="2xl"
      isPreviewFocusable={false}
      w="100%"
    >
      <FormControl isInvalid={errors[`${name}`]}>
        {label && <FormLabel>{label}</FormLabel>}
        <InputGroup
          alignItems="center"
          gap="1rem"
          justifyContent="space-between"
        >
          {icon && iconPosition == 'left' && (
            <InputLeftElement
              pointerEvents="none"
              color="gray.300"
              fontSize="1.5em"
              h="100%"
            >
              {icon}
            </InputLeftElement>
          )}
          {icon && iconPosition == 'right' && (
            <InputRightElement
              pointerEvents="none"
              color="gray.300"
              fontSize="1.5em"
              h="100%"
            >
              {icon}
            </InputRightElement>
          )}
          <EditablePreview
            p="0.5rem 0rem"
            fontSize="1.2rem"
            width="100%"
            minH="3rem"
            border={`1px solid ${theme.disabled}`}
          />
          <ChakraInput
            as={mask ? InputMask : EditableInput}
            {...register(name)}
            id={name}
            name={name}
            type={type}
            placeholder={placeholder}
            autoComplete={autoComplete}
            autoFocus={autoFocus}
            disabled={disabled}
            borderRadius="0.5rem"
            focusBorderColor={theme.colorPrimary}
            h="3rem"
            {...propsMask}
            {...props}
          />{' '}
          <EditableControls />
        </InputGroup>
        <FormErrorMessage>
          {errors && errors[`${name}`] && errors[`${name}`].message}
        </FormErrorMessage>
      </FormControl>
    </Editable>
  );
}
