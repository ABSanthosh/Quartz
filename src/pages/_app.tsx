import { Store } from "@/store/store";
import "@/styles/root/global.scss";
import { StoreProvider } from "easy-peasy";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <StoreProvider store={Store}>
      <Component {...pageProps} />
    </StoreProvider>
  );
}
