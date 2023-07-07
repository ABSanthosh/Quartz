import Sidebar from "@/components/Sidebar/Sidebar";
import "@/styles/routes/main-app.scss";

export default function MainApp() {
  return (
    <main className="MainApp">
      <Sidebar />
      <div className="MainApp__content"></div>
    </main>
  );
}
