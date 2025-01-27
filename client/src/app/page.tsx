import Image from "next/image";
import NonDashBoardNavbar from "@/components/NonDashBoardNavbar";
import Landing from "./(nondashboard)/landing/page";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="nondashboard-layout">
      <NonDashBoardNavbar />
      <main className="nondashboard-layout__main">
        <Landing />
      </main>
      <Footer />
    </div>
  );
}
