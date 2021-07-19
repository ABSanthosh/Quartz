import { AuthProvider } from "./contexts/provider";
import Router from "./router";

export default function App() {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
}
