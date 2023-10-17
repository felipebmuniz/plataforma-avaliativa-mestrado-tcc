import { ComponentProps } from 'react';
import {
  Input as ChakraInput,
  ChakraProps,
  FormControl,
  FormErrorMessage,
  FormLabel,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from '@chakra-ui/react';

import InputMask from 'react-input-mask';

import { useTheme } from '@emotion/react';

type ButtonProps = ComponentProps<'input'> &
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

export function InputUI({
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
}: ButtonProps) {
  const theme = useTheme();

  const propsMask = mask
    ? {
        mask: mask,
        maskChar: null,
      }
    : {};

  return (
    <FormControl isInvalid={errors[`${name}`]}>
      {label && <FormLabel>{label}</FormLabel>}
      <InputGroup>
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
        <ChakraInput
          as={mask ? InputMask : 'input'}
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
        />
      </InputGroup>
      <FormErrorMessage>
        {errors && errors[`${name}`] && errors[`${name}`].message}
      </FormErrorMessage>
    </FormControl>
  );
}
