import "@/styles/globals.css";
import type { AppProps } from "next/app";
import DarkModeToggle from "@/components/DarkModeToggle";
import { DarkModeProvider } from '@/context/DarkModeContext';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <DarkModeProvider>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
        <header className="p-4 bg-gray-300 dark:bg-gray-800">
          <DarkModeToggle />
        </header>
        <main className="p-4">
          <Component {...pageProps} />
        </main>
      </div>
    </DarkModeProvider>
  );
}
