import { ComponentProps } from 'react';
import {
  Input as ChakraInput,
  ChakraProps,
  FormControl,
  FormLabel,
} from '@chakra-ui/react';
import { useTheme } from '@emotion/react';

type ButtonProps = ComponentProps<'input'> &
  ChakraProps & {
    label: string;
  };

export function InputUI({ type, placeholder, label, ...props }: ButtonProps) {
  const theme = useTheme();

  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <ChakraInput
        type={type}
        placeholder={placeholder}
        borderRadius="0.5rem"
        h="3.75rem"
      />
      {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
    </FormControl>
  );
}
