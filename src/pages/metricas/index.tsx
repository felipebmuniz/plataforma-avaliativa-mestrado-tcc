import Head from 'next/head';

import { VStack } from '@chakra-ui/react';
import { Menu } from '@/components/sections/Menu';
import { Footer } from '@/components/sections/Footer';
import { Metrics } from '@/components/sections/Metrics';

export default function Metricas() {
  return (
    <>
      <Head>
        <title>Plataforma Autoavaliativa Mestrado</title>
        <meta
          name="description"
          content="Área avaliativa da Plataforma Autoavaliativa do Mestrado - UFC"
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
        <Metrics />
        <Footer />
      </VStack>
    </>
  );
}
