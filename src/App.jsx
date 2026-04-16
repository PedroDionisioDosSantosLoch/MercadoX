import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Loja from "./pages/Loja";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/loja" element={<Loja />} />
    </Routes>
  );
}