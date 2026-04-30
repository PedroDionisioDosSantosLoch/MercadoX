export default function Relatorios() {
  return (
    <div>
        <h1>Relatórios Detalhados</h1>
        <p>Gráficos de desempenho e métricas mensais.</p>


        <h1>Vendas Recentes</h1>
        <ul>
            {JSON.parse(localStorage.getItem('itensVendidos') || '[]').map((item, index) => (
            <li key={index}>{item.title} - R$ {item.price.toFixed(2)}</li>
            ))}
        </ul>

        <h1>Resumo das Vendas</h1>
        <p>Total de vendas: {localStorage.getItem('vendidos') || 0}</p>
        <p>Valor total das vendas: R$ {localStorage.getItem('totalVendas') || '0.00'}</p>


        <h1>Data da Última Venda</h1>
        <p>{localStorage.getItem('dataVenda') || 'Nenhuma venda realizada'}</p> 
        
    
    </div>
  );
}