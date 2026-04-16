import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const usuario = localStorage.getItem("usuarioLogado");
  if (!usuario) {
    return <Navigate to="/login" />;
  }
  return children;
}