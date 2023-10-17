import { ComponentProps } from 'react';
import {
  ButtonOptions,
  Button as ChakraButton,
  ChakraProps,
} from '@chakra-ui/react';
import { useTheme } from '@emotion/react';

type ButtonProps = ComponentProps<'button'> & ChakraProps & ButtonOptions;

function Button({ children, ...props }: ButtonProps) {
  const theme = useTheme();

  return (
    <ChakraButton
      display="flex"
      justifyContent="center"
      alignItems="center"
      color={theme.container500}
      bgColor={theme.container200}
      // py="1.2rem "
      // px="2.5rem"
      py="1rem "
      px="2rem"
      fontSize="1rem"
      fontStyle="normal"
      fontWeight="700"
      lineHeight="normal"
      border="none"
      outline="none"
      borderRadius="0.5rem"
      transition="filter 0.3s ease"
      cursor="pointer"
      w="inherit"
      // h="3.75rem"
      h="3rem"
      textTransform="uppercase"
      boxShadow={`0px 2px 4px 0px rgba(0, 0, 0, 0.25)`}
      _hover={{
        filter: 'brightness(1.1)',
      }}
      {...props}
    >
      {children}
    </ChakraButton>
  );
}

export default Button;
