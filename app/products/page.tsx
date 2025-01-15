import ProductList from "../../components/ProductList";
import { Suspense } from "react";

export default function ProductsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>
        <ProductList />
      </div>
    </Suspense>
  );
}
