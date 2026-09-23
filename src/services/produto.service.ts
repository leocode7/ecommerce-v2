import { produtoRepository } from "@/repositories/produto.repository";

class ProdutoService {
  
  async buscarPorId(id: number) {
    const produto = produtoRepository.buscarPorId(id);
    return produto;
  }

  async listar() {
    const produtos = produtoRepository.listar();
    return produtos;
  }
}

export const produtoService = new ProdutoService();
