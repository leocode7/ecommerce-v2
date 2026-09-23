import { produtoService } from "@/services/produto.service";

const ProdutosPage = async () => {
  const products = await produtoService.listar();
  console.log(products);

  return (
    <main>
      <h1>Produtos</h1>

      <ul>{products.map((produto) =>
        <li key={produto.id}>
          <h2>{produto.name}</h2>
          <p>{`R$ ${produto.priceCents / 100},00`}</p>
        </li>)}
      </ul>

    </main>
  );
}

export default ProdutosPage;
