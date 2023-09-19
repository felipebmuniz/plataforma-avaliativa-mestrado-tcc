import { hexToRgb } from '@/utils/theme';
import { Box } from '@chakra-ui/react';
import { useTheme } from '@emotion/react';

export const Footer = () => {
  const theme = useTheme();
  return (
    <Box
      as="footer"
      p=" 1rem"
      w="100%"
      bg={hexToRgb(theme.container200, 0.3)}
      display="flex"
      alignItems="center"
      justifyContent="center"
      color={theme.textDefault}
      fontSize="0.85rem"
      fontStyle="normal"
      fontWeight="700"
      lineHeight="normal"
      borderRadius="0.5rem 0.5rem 0rem 0rem"
      textTransform="uppercase"
    >
      &copy;{new Date().getFullYear()} Felipe Barros Muniz - Todos os direitos
      reservados
    </Box>
  );
};
