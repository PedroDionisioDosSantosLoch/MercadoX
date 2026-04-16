import { useEffect, useState } from "react";

export default function Loja() {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProdutos(data));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Produtos</h1>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {produtos.map((p) => (
          <div key={p.id} style={{ width: "200px" }}>
            <img src={p.image} width="100%" />
            <p>{p.title}</p>
            <p>R$ {p.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}