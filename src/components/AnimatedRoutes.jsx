import React,{useEffect} from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import AboutUsPage from "../pages/AboutUsPage";
import HomePage from "../pages/HomePage";
import OfertasPage from "../pages/OfertasPage";
import ContactUsPage from "../pages/ContactUsPage";
import DetallePage from "../pages/DetallePage";
import Login from "../pages/LogIn";
import CategoryFormPage from "../pages/CategoryFormPage";
import ProductForm from "../pages/ProductForm";
import SingIn from "../pages/SingIn";
import UsersData from "./UsersData";
// import Carrito from "./Carrito";
import Carritoj from "./Carritoj";
import HandleStore from "./HandleStore";
import FinishBuy from "./FinishBuy";
import ReactGA from 'react-ga';
import OrderState from "./OrderState";
import VisionMisionPage from "../pages/VisionMisionPage";
function AnimatedRoutes() {
  
  const TRACKING_ID = "UA-257356066-1"; // OUR_TRACKING_ID

  ReactGA.initialize(TRACKING_ID);
  
  const location = useLocation();
  
  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);
  
  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/singin" element={<SingIn />} />
        <Route path="/detalle/:id" element={<DetallePage />} />
        {/* <Route path="/cart" element={<Carrito />} /> */}
        <Route path="/cartj" element={<Carritoj  />} />
        <Route path="/ofertas" element={<OfertasPage />} />
        <Route path="/category" element={<CategoryFormPage />} />
        <Route path="/about" element={<VisionMisionPage /> } />
        <Route path="/contact" element={<ContactUsPage />} />
        <Route path="/agregar" element={<ProductForm />} />
        <Route path="/store" element={<HandleStore />} />
        <Route path="/account" element={<UsersData />} />
        <Route path="/finish" element={<FinishBuy />} />
        <Route path="/status" element={<OrderState />} />
        <Route path="/nosotros" element={<AboutUsPage />} />
      </Routes>
    </AnimatePresence>
  );
}

export default AnimatedRoutes;
