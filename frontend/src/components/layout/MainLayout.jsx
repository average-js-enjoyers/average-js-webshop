import Header from "components/layout/Header";
import Footer from "components/layout/Footer";

import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet /> {/* This is where child routes will be rendered */}
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
