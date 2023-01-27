import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import AboutUsPage from "../pages/AboutUsPage";
import HomePage from "../pages/HomePage";
import OfertasPage from "../pages/OfertasPage";
import ContactUsPage from "../pages/ContactUsPage";

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/ofertas" element={<OfertasPage />} />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/contact" element={<ContactUsPage />} />

        {/* <Route path="/agregar" element={<Agregarpage />} /> */}
      </Routes>
    </AnimatePresence>
  );
}

export default AnimatedRoutes;
