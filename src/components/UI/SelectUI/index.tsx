import { ComponentProps } from 'react';
import {
  Select as ChakraSelect,
  ChakraProps,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from '@chakra-ui/react';
import { useTheme } from '@emotion/react';
import { Controller } from 'react-hook-form';

type ButtonProps = ComponentProps<'select'> &
  ChakraProps & {
    name: string;
    label: string;
    control: any;
    errors?: any;
    size?: (string & {}) | 'sm' | 'md' | 'lg' | 'xs';
  };

export function SelectUI({
  placeholder,
  label,
  name,
  control,
  errors,
  ...props
}: ButtonProps) {
  const theme = useTheme();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => {
        return (
          <FormControl isInvalid={errors[`${name}`]}>
            <FormLabel>{label}</FormLabel>
            <ChakraSelect
              onChange={field.onChange}
              value={field.value}
              placeholder={placeholder}
              borderRadius="0.5rem"
              h="3.75rem"
              focusBorderColor={theme.colorPrimary}
              {...props}
            >
              <option>United Arab Emirates</option>
              <option>Nigeria</option>
            </ChakraSelect>
            <FormErrorMessage>
              {errors && errors[`${name}`] && errors[`${name}`].message}
            </FormErrorMessage>
          </FormControl>
        );
      }}
    ></Controller>
  );
}
