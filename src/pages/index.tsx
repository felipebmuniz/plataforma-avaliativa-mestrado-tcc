import Head from 'next/head';

import { VStack } from '@chakra-ui/react';
import { Menu } from '@/components/sections/Menu';
import { LandingPage } from '@/components/sections/LandingPage';
import { Footer } from '@/components/sections/Footer';

export default function Home() {
  return (
    <>
      <Head>
        <title>Plataforma Autoavaliativa Mestrado</title>
        <meta
          name="description"
          content="Plataforma Autoavaliativa do Mestrado - UFC"
        />
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
        <Menu />
        <LandingPage />
        <Footer />
      </VStack>
    </>
  );
}
