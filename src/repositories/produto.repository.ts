import { db } from "@/lib/prisma/db";

class ProdutoRepository {

  async buscarPorId(id: number) {
    return db.orm.public.Product.first({ id });
  }

  async listar() {
    return db.orm.public.Product.all();
  }
}

export const produtoRepository = new ProdutoRepository();
