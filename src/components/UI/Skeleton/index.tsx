import { Box, HStack, SkeletonCircle, SkeletonText } from '@chakra-ui/react';
import { useTheme } from '@emotion/react';
import React from 'react';

export const SkeletonCards = () => {
  const theme = useTheme();
  return (
    <HStack
      gap="1.5rem"
      width="100%"
      flexWrap="wrap"
      margin="auto"
      marginTop="1.5rem"
    >
      <Box
        padding="6"
        boxShadow="lg"
        bg={theme.background500}
        w="18.75rem"
        h="18.75rem"
        borderRadius="0.5rem"
      >
        <SkeletonCircle size="10" />
        <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
      </Box>
      <Box
        padding="6"
        boxShadow="lg"
        bg={theme.background500}
        w="18.75rem"
        h="18.75rem"
        borderRadius="0.5rem"
      >
        <SkeletonCircle size="10" />
        <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
      </Box>
      <Box
        padding="6"
        boxShadow="lg"
        bg={theme.background500}
        w="18.75rem"
        h="18.75rem"
        borderRadius="0.5rem"
      >
        <SkeletonCircle size="10" />
        <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
      </Box>
      <Box
        padding="6"
        boxShadow="lg"
        bg={theme.background500}
        w="18.75rem"
        h="18.75rem"
        borderRadius="0.5rem"
      >
        <SkeletonCircle size="10" />
        <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
      </Box>
      <Box
        padding="6"
        boxShadow="lg"
        bg={theme.background500}
        w="18.75rem"
        h="18.75rem"
        borderRadius="0.5rem"
      >
        <SkeletonCircle size="10" />
        <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
      </Box>
      <Box
        padding="6"
        boxShadow="lg"
        bg={theme.background500}
        w="18.75rem"
        h="18.75rem"
        borderRadius="0.5rem"
      >
        <SkeletonCircle size="10" />
        <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
      </Box>
      <Box
        padding="6"
        boxShadow="lg"
        bg={theme.background500}
        w="18.75rem"
        h="18.75rem"
        borderRadius="0.5rem"
      >
        <SkeletonCircle size="10" />
        <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
      </Box>
    </HStack>
  );
};
