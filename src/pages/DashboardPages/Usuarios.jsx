import js from "@eslint/js";

export default function Usuarios() {
  return (
    <div>
      <h1>Usuarios Cadastrados</h1>
      <ul>
        {JSON.parse(localStorage.getItem('usuarios') || '[]').map((usuario, index) => (
            <li key={index}>{usuario.nome} - {usuario.email}</li>
        ))}
      </ul>
    </div>
  );
}
