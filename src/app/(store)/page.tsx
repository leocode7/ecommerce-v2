import { produtoRepository } from "@/repositories/produto.repository";
import styles from "./page.module.css";

export default async function Home() {
  const products = await produtoRepository.listar();
  console.log(products);
  return (
    <div>
      <main>
        <h1>Produtos</h1>

        <ul>{products.map((produto) =>
          <li key={produto.id}>
            {produto.name}
          </li>)}
        </ul>
      </main>
    </div>
  );
}
