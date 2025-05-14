import '@mantine/core/styles.css';
import "@/styles/globals.css";
import { theme } from "@/styles/mantine.theme";
import { MantineProvider } from "@mantine/core";
import type { AppProps } from "next/app";

require("../mocks");

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider theme={theme}>
      <Component {...pageProps} />
    </MantineProvider>
  );
}
