import {
  Link as ChakraLink,
  LinkProps as ChakraLinkProps,
} from '@chakra-ui/next-js';

interface LinkProps extends ChakraLinkProps {}

export const Link = ({ children, ...props }: LinkProps) => {
  return (
    <ChakraLink
      color="inherit"
      _hover={{
        textDecoration: 'none',
      }}
      {...props}
    >
      {children}
    </ChakraLink>
  );
};
