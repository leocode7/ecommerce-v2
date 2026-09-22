import { db } from "@/lib/prisma/db";

class ProdutoRepository {
  async listar() {
    return db.orm.public.Product.all();
  }
}

export const produtoRepository = new ProdutoRepository();
