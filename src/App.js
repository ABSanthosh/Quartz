import Router from "./router";
import { AuthProvider } from "./contexts/provider";

export default function App() {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
}
