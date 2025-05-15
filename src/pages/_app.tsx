import "@mantine/core/styles.css";
import "@/styles/globals.css";
import { theme } from "@/styles/mantine.theme";
import { MantineProvider, Paper, Title } from "@mantine/core";
import type { AppProps } from "next/app";

require("../mocks");

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider theme={theme}>
      <div className="h-screen w-screen bg-gradient-to-r from-gray-100 to-gray-400 flex items-center justify-center px-4">
        <Paper
          shadow="lg"
          radius="lg"
          className="w-full max-w-md bg-white border rounded-lg border-gray-200 p-4"
        >
          <Title order={2} mb="md" size="xl" className="text-gray-700 mb-6">
            Todo App
          </Title>
          <Component {...pageProps} />
        </Paper>
      </div>
    </MantineProvider>
  );
}
