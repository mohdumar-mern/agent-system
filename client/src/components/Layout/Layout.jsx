import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Container from "../Container";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Container>{children}</Container>
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
