import styles from "./page.module.css";
import { db } from "@/lib/prisma/db";

export default async function Home() {
  const produts = await db.orm.public.Product.all();
  console.log(produts);
  return (
    <div>
      <main>
        <h1>Descrição do produto: {produts[0].description}</h1>
      </main>
    </div>
  );
}
