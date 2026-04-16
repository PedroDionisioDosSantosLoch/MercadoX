import { useEffect, useState } from "react";
import CardProduto from "../components/CardProduto";
import { getProdutos } from "../services/api";

function Produtos() {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    getProdutos().then((data) => setProdutos(data));
  }, []);

  return (
    <div>
      <h1>Produtos</h1>

      {produtos.map((item) => (
        <CardProduto key={item.id} produto={item} />
      ))}
    </div>
  );
}

export default Produtos;