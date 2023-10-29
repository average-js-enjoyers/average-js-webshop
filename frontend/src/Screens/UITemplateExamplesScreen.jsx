import React from "react";
import ButtonTemplates from "../Components/UI_Templates/ButtonTemplates";
import TypographyTemplates from "../Components/UI_Templates/TypographyTemplates";
import Header from "../Components/Layout/Header";
import Footer from "../Components/Layout/Footer";
import Logo from "../Components/Common/Logo";

import { Outlet } from "react-router-dom";

const UITemplateExamplesPage = () => {
  return (
    <>
      <Header />
      <h1>UI Template Examples</h1>
      <p className="lead">Router test:</p>
      <Outlet />
      <p className="lead">UI Component Templates</p>
      <Logo />
      <Logo logoSize="small" />
      <ButtonTemplates />
      <TypographyTemplates />
      <Footer />
    </>
  );
};

export default UITemplateExamplesPage;
