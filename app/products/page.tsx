import Sort from "@/components/Sort";
import ProductList from "../../components/ProductList";
import { Suspense } from "react";

export default function ProductsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold text-center mb-4">
            Product Listing
          </h1>
          <Sort />
        </div>
        <ProductList />
      </div>
    </Suspense>
  );
}
