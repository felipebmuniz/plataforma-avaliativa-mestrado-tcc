import type { AppProps as NextAppProps } from "next/app";
import { Poppins } from "next/font/google";
import createCache from "@emotion/cache";
import {
  EmotionCache,
  CacheProvider,
  ThemeProvider,
  Global,
} from "@emotion/react";
import { ChakraProvider } from "@chakra-ui/react";
import globalStyles from "@/styles/global";
import { defaultPallet } from "@/styles/defaultPallet";
import {
  FormsProvider,
  AuthProvider,
  UsersProvider,
  SubjectsProvider,
  ClassesProvider,
  EvaluationsProvider,
  AnswersProvider,
} from "@/providers";

interface AppProps extends NextAppProps {
  emotionCache?: EmotionCache;
}

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

const clientSideEmotionCache = createCache({ key: "css", prepend: true });

export default function App({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps,
}: AppProps) {
  return (
    <CacheProvider value={emotionCache}>
      <ChakraProvider>
        <ThemeProvider theme={defaultPallet}>
          <AuthProvider>
            <UsersProvider>
              <SubjectsProvider>
                <ClassesProvider>
                  <FormsProvider>
                    <EvaluationsProvider>
                      <AnswersProvider>
                        <Global styles={globalStyles} />
                        <main className={poppins.className}>
                          <Component {...pageProps} />
                        </main>
                      </AnswersProvider>
                    </EvaluationsProvider>
                  </FormsProvider>
                </ClassesProvider>
              </SubjectsProvider>
            </UsersProvider>
          </AuthProvider>
        </ThemeProvider>
      </ChakraProvider>
    </CacheProvider>
  );
}
