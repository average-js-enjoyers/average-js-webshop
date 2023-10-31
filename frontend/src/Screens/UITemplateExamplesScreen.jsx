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
      <h1 style={{ textAlign: "center" }}>UI Template Examples</h1>
      <p style={{ fontSize: "1.25rem", textAlign: "center" }}>Router test:</p>
      <Outlet />
      <p style={{ fontSize: "1.25rem", textAlign: "center" }}>
        UI Component Templates
      </p>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Logo />
        <Logo logoSize="small" />
      </div>
      <ButtonTemplates />
      <TypographyTemplates />
      <Footer />
    </>
  );
};

export default UITemplateExamplesPage;
