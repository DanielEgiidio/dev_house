import NonDashBoardNavbar from "@/components/NonDashBoardNavbar";
import Footer from "@/components/Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="nondashboard-layout">
      <NonDashBoardNavbar />
      <main className="nondashboard-layout__main">{children}</main>
      <Footer />
    </div>
  );
}
