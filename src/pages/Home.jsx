import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [produtos, setProdutos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProdutos(data));
  }, []);

  function comprar(produto) {
    const usuario = localStorage.getItem("usuarioLogado");

    if (!usuario) {
      const temConta = confirm("Você já tem conta?");

      if (temConta) {
        navigate("/login");
      } else {
        navigate("/cadastro");
      }
      return;
    }

    
    localStorage.setItem("carrinho", JSON.stringify(produto));

    navigate("/dashboard");
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}>Mercado X</h1>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          justifyContent: "center",
          marginTop: "30px"
        }}
      >
        {produtos.map((p) => (
          <div
            key={p.id}
            style={{
              width: "220px",
              border: "1px solid #ccc",
              borderRadius: "10px",
              padding: "15px",
              textAlign: "center",
              boxShadow: "0 0 10px rgba(0,0,0,0.1)"
            }}
          >
            <img
              src={p.image}
              alt={p.title}
              style={{ width: "100px", height: "100px", objectFit: "contain" }}
            />

            <h4 style={{ fontSize: "14px", minHeight: "50px" }}>
              {p.title}
            </h4>

            <p style={{ fontWeight: "bold" }}>
              R$ {p.price}
            </p>

            <button onClick={() => comprar(p)}>
              Comprar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}