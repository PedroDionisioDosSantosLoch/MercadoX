import { Routes, Route, useLocation } from "react-router-dom";
import { useState } from "react";

import Home from "./pages/home";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Loja from "./pages/Loja";
import Dashboard from "./pages/Dashboard";

import CartButton from "./components/CartButton";
import CartSidebar from "./components/CartSidebar";

export default function App() {
  const [openCart, setOpenCart] = useState(false);

  
  const location = useLocation();

 
  const isLoja = location.pathname === "/loja";

  return (
    <>
      
      {isLoja && (
        <>
          <CartButton openCart={() => setOpenCart(true)} />

          <CartSidebar
            isOpen={openCart}
            closeCart={() => setOpenCart(false)}
          />
        </>
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/loja" element={<Loja />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
}