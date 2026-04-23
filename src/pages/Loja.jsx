import { useEffect, useState } from "react";
import { useCart } from "../contexts/CartContext";
import { Card } from "primereact/card";
import { Button } from "primereact/button";

export default function Loja() {
  const [produtos, setProdutos] = useState([]);
  const { addItem } = useCart();

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProdutos(data));
  }, []);

  // Estilização do cabeçalho do Card (Imagem do produto)
  const renderHeader = (produto) => (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      padding: '20px',
      backgroundColor: '#fff',
      borderTopLeftRadius: '12px',
      borderTopRightRadius: '12px'
    }}>
      <img 
        src={produto.image} 
        alt={produto.title} 
        style={{ height: '150px', objectFit: 'contain', width: '100%' }} 
      />
    </div>
  );

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f8fafc', // Fundo levemente cinza para destacar os cards brancos
      padding: '40px 20px',
      fontFamily: '-apple-system, system-ui, sans-serif'
    }}>
      
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#0f172a', margin: '0' }}>
          Nossos Produtos
        </h1>
        <p style={{ color: '#64748b', fontSize: '16px', marginTop: '8px' }}>
          Explore as melhores ofertas do Mercado X
        </p>
      </div>

      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", 
        gap: "30px",
        maxWidth: "1200px",
        margin: "0 auto"
      }}>
        {produtos.map((p) => (
          <Card 
            key={p.id}
            header={renderHeader(p)}
            style={{ 
              borderRadius: '12px', 
              border: 'none', 
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div style={{ height: '100px', overflow: 'hidden', marginBottom: '10px' }}>
              <h3 style={{ 
                fontSize: '16px', 
                color: '#1e293b', 
                margin: '0',
                display: '-webkit-box',
                WebkitLineClamp: '2',
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
              }}>
                {p.title}
              </h3>
              <p style={{ 
                fontSize: '20px', 
                fontWeight: '700', 
                color: '#0f172a', 
                marginTop: '10px' 
              }}>
                R$ {p.price.toFixed(2)}
              </p>
            </div>

            <Button
              label="Adicionar"
              icon="pi pi-shopping-cart"
              onClick={() => addItem({
                id: p.id,
                title: p.title,
                price: p.price,
                image: p.image
              })}
              style={{ 
                backgroundColor: '#0f172a', 
                border: 'none', 
                borderRadius: '8px', 
                width: '100%',
                padding: '12px',
                fontWeight: '600'
              }}
            />
          </Card>
        ))}
      </div>
    </div>
  );
}