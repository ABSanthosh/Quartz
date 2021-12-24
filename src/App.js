import Router from "./router";
import { AuthProvider } from "./contexts/provider";
import { StoreProvider } from "easy-peasy";
import { Store } from "./Store/Store";

export default function App() {
  return (
    <StoreProvider store={Store}>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </StoreProvider>
  );
}
