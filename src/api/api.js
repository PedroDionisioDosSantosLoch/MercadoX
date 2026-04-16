export async function getProdutos() {
  const response = await fetch("https://fakestoreapi.com/products");
  return response.json();
}