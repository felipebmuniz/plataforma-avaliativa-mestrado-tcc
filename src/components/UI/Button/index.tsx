import { ComponentProps } from 'react';
import { Button as ChakraButton, ChakraProps } from '@chakra-ui/react';
import { useTheme } from '@emotion/react';

type ButtonProps = ComponentProps<'button'> & ChakraProps;

function Button({ children, ...props }: ButtonProps) {
  const theme = useTheme();

  return (
    <ChakraButton
      display="flex"
      justifyContent="center"
      alignItems="center"
      color={theme.container500}
      bgColor={theme.container200}
      py="1.2rem "
      px="2.5rem"
      fontSize="1rem"
      fontStyle="normal"
      fontWeight="700"
      lineHeight="normal"
      border="none"
      outline="none"
      borderRadius="0.5rem"
      transition="all 0.3s ease"
      cursor="pointer"
      w="inherit"
      h="3.75rem"
      textTransform="uppercase"
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
