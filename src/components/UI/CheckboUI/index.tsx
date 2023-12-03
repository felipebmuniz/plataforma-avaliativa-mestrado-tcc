import React, { ComponentProps, ReactNode } from "react";
import {
  ChakraProps,
  CheckboxGroup,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Stack,
} from "@chakra-ui/react";
import { Controller } from "react-hook-form";

type CheckboxProps = ComponentProps<"input"> &
  ChakraProps & {
    name: string;
    label: string;
    append: any;
    remove: any;
    errors: any;
    control: any;
    children: ReactNode;
    size?: (string & {}) | "sm" | "md" | "lg" | "xs";
  };

const CheckboxUI = ({
  name,
  label,
  append,
  remove,
  errors,
  control,
  children,
  ...props
}: CheckboxProps) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => {
        return (
          <FormControl isInvalid={errors[`${name}`]}>
            <FormLabel>{label}</FormLabel>
            <CheckboxGroup
              colorScheme="green"
              value={field.value}
              // defaultValue={["naruto", "kakashi"]}
              onChange={field.onChange}
            >
              <Stack spacing={5} direction={"column"}>
                {children}
              </Stack>
            </CheckboxGroup>
            <FormErrorMessage>
              {errors && errors[`${name}`] && errors[`${name}`].message}
            </FormErrorMessage>
          </FormControl>
        );
      }}
    ></Controller>
  );
};

export default CheckboxUI;
