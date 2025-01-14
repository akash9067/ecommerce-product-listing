"use client";

import { useRouter, useSearchParams } from "next/navigation"; // For managing the query
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage, setProducts } from "../store/slices/productSlice";
import { RootState } from "../store/store";
import FilterComponent from "./ProductFilter";
import ProductCard from "./ProductCard";
import axios from "axios";

interface Product {
  sizeOptions: string;
  viscosity: string;
  brand: string;
  sku: string;
  sizesAvailable: boolean;
  dimensions: string;
  category: string[];
  images: string;
  title: string;
  id: number;
  price: number;
  image: string;
}

const ProductList = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();

  const { items, currentPage, productsPerPage } = useSelector(
    (state: RootState) => state.products
  );

  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  // Load filters from query string on initial render
  useEffect(() => {
    const filtersFromQuery = searchParams.get("filters");
    if (filtersFromQuery) {
      setActiveFilters(filtersFromQuery.split(","));
    }
  }, [searchParams]);

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/api/products");
        dispatch(setProducts(response.data));
        setFilteredProducts(response.data); // Initialize filteredProducts with all products
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [dispatch]);

  // Filter products whenever items or activeFilters change
  useEffect(() => {
    const filtered = filterProducts(items, activeFilters);
    setFilteredProducts(filtered);
  }, [items, activeFilters]);

  // Update query string when filters change
  const updateQueryString = (filters: string[]) => {
    const query = filters.length ? `?filters=${filters.join(",")}` : "";
    router.push(query);
  };

  const handleFilterChange = (filters: string[]) => {
    setActiveFilters(filters);
    updateQueryString(filters);
  };

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const displayedProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const filterProducts = (products: Product[], filters: string[]) => {
    if (!filters.length) return products;

    const brandFilters = filters.filter((filter) =>
      ["Mobil", "Old World", "Peak"].includes(filter)
    );
    const viscosityFilters = filters.filter((filter) =>
      ["0W-20", "0W-30", "5W-20", "5W-30", "10W-30", "10W-40"].includes(filter)
    );
    const sizeFilters = filters.filter((filter) =>
      [
        "1 Quart",
        "5 Quarts",
        "1 Gallon",
        "Bulk 1 Drum",
        "Bulk 1 Tote",
        "Half-Quart",
      ].includes(filter)
    );

    return products.filter((product) => {
      // Enforce brand filter if it exists
      if (brandFilters.length && !brandFilters.includes(product.brand)) {
        return false; // Exclude product if it doesn't match the brand filter
      }

      // Check viscosity filter
      if (
        viscosityFilters.length &&
        !viscosityFilters.some((viscosity) =>
          product.viscosity?.includes(viscosity)
        )
      ) {
        return false; // Exclude product if it doesn't match viscosity filter
      }

      // Check size filter
      if (
        sizeFilters.length &&
        !sizeFilters.some((size) => product.sizeOptions?.includes(size))
      ) {
        return false; // Exclude product if it doesn't match size filter
      }

      // If it passes all active filters, include the product
      return true;
    });
  };

  return (
    <div>
      <div className="flex space-x-4">
        <div>
          <FilterComponent
            onFilterChange={handleFilterChange}
            selectedFilters={activeFilters} // Pass selected filters for initialization
          />
        </div>
        <div className="w-full grid grid-cols-2 md:grid-cols-3">
          {displayedProducts.map((product: Product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              title={product.title}
              sku={product.sku}
              price={product.price}
              image={product.image}
              dimensions={product.dimensions}
              sizesAvailable={product.sizesAvailable}
              category={product.category}
              sizeOptions={product.sizeOptions}
              viscosity={product.viscosity}
              brand={product.brand}
            />
          ))}
        </div>
      </div>
      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`px-4 py-2 mx-1 border ${
              currentPage === index + 1
                ? "bg-gray-800 text-white"
                : "bg-white text-gray-800"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
