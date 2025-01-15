"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage, setProducts } from "../store/slices/productSlice";
import { RootState } from "../store/store";
import FilterComponent from "./ProductFilter";
import ProductCard from "./ProductCard";
import axios from "axios";
import Sort from "./Sort";

interface Product {
  sizeOptions: string;
  viscosity: string;
  brand: string;
  sku: string;
  sizesAvailable: boolean;
  category: string;
  title: string;
  id: number;
  price: string;
}

const ProductList = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const [sortOption, setSortOption] = useState<string>("Most Popular");

  const { items, currentPage, productsPerPage } = useSelector(
    (state: RootState) => state.products
  );

  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    const filtersFromQuery = searchParams.get("filters");
    if (filtersFromQuery) {
      setActiveFilters(filtersFromQuery.split(","));
    }
  }, [searchParams]);

  const sortProducts = (products: Product[], option: string): Product[] => {
    const sortedProducts = [...products];
    switch (option) {
      case "Price: Low to High":
        return sortedProducts.sort(
          (a, b) => parseFloat(a.price) - parseFloat(b.price)
        );
      case "Price: High to Low":
        return sortedProducts.sort(
          (a, b) => parseFloat(b.price) - parseFloat(a.price)
        );
      default:
        return products;
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/api/products");
        dispatch(setProducts(response.data));
        dispatch(setProducts(response.data));
        setFilteredProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [dispatch]);

  useEffect(() => {
    if (items.length) {
      const filtered = filterProducts(items, activeFilters);
      const sorted = sortProducts(filtered, sortOption);
      setFilteredProducts(sorted);
    }
  }, [items, activeFilters, sortOption]);

  const updateQueryString = (filters: string[]) => {
    const filteredFilters = filters.filter((filter) => filter !== "");
    const query = filteredFilters.length
      ? `?filters=${filteredFilters.join(",")}`
      : undefined;
    if (query) {
      router.push(query);
    }
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
      if (brandFilters.length && !brandFilters.includes(product.brand)) {
        return false;
      }

      if (
        viscosityFilters.length &&
        !viscosityFilters.some((viscosity) =>
          product.viscosity?.includes(viscosity)
        )
      ) {
        return false;
      }

      if (
        sizeFilters.length &&
        !sizeFilters.some((size) => product.sizeOptions?.includes(size))
      ) {
        return false;
      }
      return true;
    });
  };

  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold text-center mb-4">Product Listing</h1>
        <Sort onSortChange={setSortOption} />
      </div>
      <div>
        <div className="flex space-x-4">
          <div>
            <FilterComponent
              onFilterChange={handleFilterChange}
              selectedFilters={activeFilters}
            />
          </div>
          <div className="w-full grid grid-cols-2 md:grid-cols-3">
            {displayedProducts?.map((product: Product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                title={product.title}
                sku={product.sku}
                price={product.price}
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
    </>
  );
};

export default ProductList;
