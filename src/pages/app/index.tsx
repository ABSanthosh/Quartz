import Sidebar from "@/components/Sidebar/Sidebar";
import { useStoreState } from "@/hooks/useStoreHooks";
import "@/styles/routes/main-app.scss";

export default function MainApp() {
  const isNavOpen = useStoreState((state) => state.ui.isNavOpen);
  return (
    <main className={`MainApp ${!isNavOpen ? "MainApp--open" : ""}`}>
      <Sidebar />
      <div className="MainApp__content">hello</div>
    </main>
  );
}
