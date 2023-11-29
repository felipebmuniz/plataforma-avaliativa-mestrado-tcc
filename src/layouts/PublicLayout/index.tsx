import Head from 'next/head';

import { ReactNode } from 'react';
import { HStack, VStack } from '@chakra-ui/react';
import { Menu } from '@/components/sections/Menu';
import { Footer } from '@/components/sections/Footer';
import { useTheme } from '@emotion/react';

interface IPropsLayout {
  title: string;
  description: string;
  oculteMenu?: boolean;
  children: ReactNode;
}

export default function PublicLayout({
  title,
  description,
  oculteMenu,
  children,
}: IPropsLayout) {
  const theme = useTheme();
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <VStack
        w="100%"
        h="100%"
        spacing={0}
        justifyContent="space-between"
        alignItems="flex-start"
      >
        {!oculteMenu && <Menu />}
        <HStack
          w="100%"
          maxW="1920px"
          margin="auto"
          padding="5rem"
          bg={theme.background}
          alignItems="flex-start"
          justifyContent="space-between"
          height="auto"
        >
          {children}
        </HStack>
        <Footer />
      </VStack>
    </>
  );
}
