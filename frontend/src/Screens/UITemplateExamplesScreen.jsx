import React from "react";
import ButtonTemplates from "components/uitemplates/ButtonTemplates";
import TypographyTemplates from "components/uitemplates/TypographyTemplates";
import Header from "components/layout/Header";
import Footer from "components/layout/Footer";
import Logo from "components/common/Logo";

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
