import ProductList from "../../components/ProductList";
import { Suspense } from "react";

export default async function ProductsPage({
  params,
}: {
  params: Promise<{ products: string }>;
}) {
  const Ptype = (await params).products;
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>
        <ProductList ProductType={Ptype} />
      </div>
    </Suspense>
  );
}
