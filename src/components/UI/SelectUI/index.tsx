import { ComponentProps, useCallback, useMemo } from 'react';
import {
  Select as ChakraSelect,
  ChakraProps,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from '@chakra-ui/react';
import { useTheme } from '@emotion/react';
import { Controller } from 'react-hook-form';

const mockData: { value: string | number | boolean; labelOption: string }[] = [
  {
    labelOption: 'Nigeria',
    value: 'Nigeria',
  },
  {
    labelOption: 'Aberta',
    value: true,
  },
  {
    labelOption: 'Período',
    value: 1,
  },
];

type ButtonProps = ComponentProps<'select'> &
  ChakraProps & {
    name: string;
    label: string;
    data?: any[] | { value: string | number | boolean; labelOption: string }[];
    indexObjectLabel?: string | 'labelOption';
    indexObjectValue?: string | 'value';
    control: any;
    errors?: any;
    size?: (string & {}) | 'sm' | 'md' | 'lg' | 'xs';
  };

export function SelectUI({
  placeholder,
  label,
  name,
  data,
  indexObjectLabel,
  indexObjectValue,
  control,
  errors,
  ...props
}: ButtonProps) {
  const theme = useTheme();

  const transformData = useMemo(() => {
    const auxData = data?.map((value) => {
      return {
        labelOption: value[indexObjectLabel ?? 'labelOption'],
        value: value[indexObjectValue ?? 'value'],
      };
    });

    return auxData ?? mockData;
  }, [data, indexObjectValue, indexObjectLabel]);

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
              h="3rem"
              focusBorderColor={theme.colorPrimary}
              {...props}
            >
              {transformData.map((option, index) => (
                <option key={`option-${label}-${index}`} value={option.value}>
                  {option.labelOption}
                </option>
              ))}
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
