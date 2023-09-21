import { ComponentProps } from 'react';
import {
  Select as ChakraSelect,
  ChakraProps,
  FormControl,
  FormLabel,
} from '@chakra-ui/react';
import { useTheme } from '@emotion/react';

type ButtonProps = ComponentProps<'select'> &
  ChakraProps & {
    label: string;
  };

export function SelectUI({ placeholder, label, ...props }: ButtonProps) {
  const theme = useTheme();

  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <ChakraSelect placeholder={placeholder} borderRadius="0.5rem" h="3.75rem">
        <option>United Arab Emirates</option>
        <option>Nigeria</option>
      </ChakraSelect>
      {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
    </FormControl>
  );
}
