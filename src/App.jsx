import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import ScrollToTop from "./ScrollToTop";
import { Analytics } from "@vercel/analytics/react";
import { useAppTitle } from "./hooks/useAppTitle";

function App() {
  useAppTitle();

  return (
    <>
      <ScrollToTop />
      <Header />
      <main className="main">
        <Outlet />
      </main>
      <Footer />
      <Analytics />
    </>
  );
}

export default App;
