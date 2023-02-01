import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import AboutUsPage from "../pages/AboutUsPage";
import HomePage from "../pages/HomePage";
import OfertasPage from "../pages/OfertasPage";
import ContactUsPage from "../pages/ContactUsPage";
import DetallePage from "../pages/DetallePage";
import Login from "../pages/LogIn";
import CategoryFormPage from "../pages/CategoryFormPage";
import ProductFormPage from "../pages/ProductFormPage";
import SingIn from "../pages/SingIn";

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/singin" element={<SingIn />} />
        <Route path="/detalle/:id" element={<DetallePage />} />
        <Route path="/ofertas" element={<OfertasPage />} />
        <Route path="/category" element={<CategoryFormPage />} />
        <Route path="/product" element={<ProductFormPage />} />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/contact" element={<ContactUsPage />} />

        {/* <Route path="/agregar" element={<Agregarpage />} /> */}
      </Routes>
    </AnimatePresence>
  );
}

export default AnimatedRoutes;
