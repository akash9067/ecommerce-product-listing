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
  category: string;
  title: string;
  id: number;
  price: string;
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

  useEffect(() => {
    const filtersFromQuery = searchParams.get("filters");
    if (filtersFromQuery) {
      setActiveFilters(filtersFromQuery.split(","));
    }
  }, [searchParams]);

  const ResData = [
    {
      id: 1,
      title: "Product 1",
      sku: "SKU-1000",
      price: "33.52",
      image: "/images/product.svg",
      dimensions: "239 x 216",
      sizesAvailable: true,
      category: "Lube-Tech",
      sizeOptions: "1 Gallon",
      viscosity: "0W-20",
      brand: "Old World",
    },
    {
      id: 2,
      title: "Product 2",
      sku: "SKU-1001",
      price: "22.11",
      image: "/images/product.svg",
      dimensions: "124 x 480",
      sizesAvailable: true,
      category: "Chemicals",
      sizeOptions: "Half-Quart",
      viscosity: "10W-30",
      brand: "Mobil",
    },
    {
      id: 3,
      title: "Product 3",
      sku: "SKU-1002",
      price: "44.13",
      image: "/images/product.svg",
      dimensions: "387 x 142",
      sizesAvailable: true,
      category: "Equipment",
      sizeOptions: "1 Quart",
      viscosity: "0W-30",
      brand: "Peak",
    },
    {
      id: 4,
      title: "Product 4",
      sku: "SKU-1003",
      price: "33.12",
      image: "/images/product.svg",
      dimensions: "610 x 81",
      sizesAvailable: true,
      category: "Equipment",
      sizeOptions: "5 Quarts",
      viscosity: "10W-40",
      brand: "Peak",
    },
    {
      id: 5,
      title: "Product 5",
      sku: "SKU-1004",
      price: "47.99",
      image: "/images/product.svg",
      dimensions: "564 x 89",
      sizesAvailable: true,
      category: "Supplies",
      sizeOptions: "5 Quarts",
      viscosity: "0W-20",
      brand: "Mobil",
    },
    {
      id: 6,
      title: "Product 6",
      sku: "SKU-1005",
      price: "27.80",
      image: "/images/product.svg",
      dimensions: "264 x 5",
      sizesAvailable: true,
      category: "Chemicals",
      sizeOptions: "5 Quarts",
      viscosity: "5W-30",
      brand: "Mobil",
    },
    {
      id: 7,
      title: "Product 7",
      sku: "SKU-1006",
      price: "21.40",
      image: "/images/product.svg",
      dimensions: "81 x 497",
      sizesAvailable: false,
      category: "Auto Parts",
      sizeOptions: "Bulk 1 Drum",
      viscosity: "5W-30",
      brand: "Peak",
    },
    {
      id: 8,
      title: "Product 8",
      sku: "SKU-1007",
      price: "10.28",
      image: "/images/product.svg",
      dimensions: "938 x 287",
      sizesAvailable: false,
      category: "Auto Parts",
      sizeOptions: "1 Quart",
      viscosity: "10W-30",
      brand: "Mobil",
    },
    {
      id: 9,
      title: "Product 9",
      sku: "SKU-1008",
      price: "16.14",
      image: "/images/product.svg",
      dimensions: "170 x 107",
      sizesAvailable: true,
      category: "Chemicals",
      sizeOptions: "1 Gallon",
      viscosity: "0W-30",
      brand: "Mobil",
    },
    {
      id: 10,
      title: "Product 10",
      sku: "SKU-1009",
      price: "54.66",
      image: "/images/product.svg",
      dimensions: "787 x 458",
      sizesAvailable: true,
      category: "Chemicals",
      sizeOptions: "5 Quarts",
      viscosity: "10W-30",
      brand: "Peak",
    },
    {
      id: 11,
      title: "Product 11",
      sku: "SKU-1010",
      price: "58.90",
      image: "/images/product.svg",
      dimensions: "581 x 304",
      sizesAvailable: false,
      category: "Lube-Tech",
      sizeOptions: "Bulk 1 Tote",
      viscosity: "10W-30",
      brand: "Peak",
    },
    {
      id: 12,
      title: "Product 12",
      sku: "SKU-1011",
      price: "32.95",
      image: "/images/product.svg",
      dimensions: "501 x 172",
      sizesAvailable: true,
      category: "Auto Parts",
      sizeOptions: "Bulk 1 Drum",
      viscosity: "5W-20",
      brand: "Old World",
    },
    {
      id: 13,
      title: "Product 13",
      sku: "SKU-1012",
      price: "44.90",
      image: "/images/product.svg",
      dimensions: "673 x 411",
      sizesAvailable: true,
      category: "Chemicals",
      sizeOptions: "Bulk 1 Drum",
      viscosity: "10W-40",
      brand: "Peak",
    },
    {
      id: 14,
      title: "Product 14",
      sku: "SKU-1013",
      price: "20.78",
      image: "/images/product.svg",
      dimensions: "250 x 91",
      sizesAvailable: false,
      category: "Lube-Tech",
      sizeOptions: "1 Quart",
      viscosity: "5W-20",
      brand: "Old World",
    },
    {
      id: 15,
      title: "Product 15",
      sku: "SKU-1014",
      price: "11.57",
      image: "/images/product.svg",
      dimensions: "668 x 28",
      sizesAvailable: false,
      category: "Chemicals",
      sizeOptions: "1 Quart",
      viscosity: "0W-20",
      brand: "Old World",
    },
    {
      id: 16,
      title: "Product 16",
      sku: "SKU-1015",
      price: "26.40",
      image: "/images/product.svg",
      dimensions: "927 x 224",
      sizesAvailable: false,
      category: "Chemicals",
      sizeOptions: "1 Quart",
      viscosity: "0W-20",
      brand: "Old World",
    },
    {
      id: 17,
      title: "Product 17",
      sku: "SKU-1016",
      price: "35.97",
      image: "/images/product.svg",
      dimensions: "694 x 434",
      sizesAvailable: false,
      category: "Auto Parts",
      sizeOptions: "5 Quarts",
      viscosity: "0W-20",
      brand: "Peak",
    },
    {
      id: 18,
      title: "Product 18",
      sku: "SKU-1017",
      price: "33.91",
      image: "/images/product.svg",
      dimensions: "923 x 120",
      sizesAvailable: true,
      category: "Auto Parts",
      sizeOptions: "1 Quart",
      viscosity: "5W-20",
      brand: "Old World",
    },
    {
      id: 19,
      title: "Product 19",
      sku: "SKU-1018",
      price: "30.58",
      image: "/images/product.svg",
      dimensions: "750 x 152",
      sizesAvailable: true,
      category: "Supplies",
      sizeOptions: "1 Gallon",
      viscosity: "0W-20",
      brand: "Peak",
    },
    {
      id: 20,
      title: "Product 20",
      sku: "SKU-1019",
      price: "58.66",
      image: "/images/product.svg",
      dimensions: "588 x 142",
      sizesAvailable: false,
      category: "Chemicals",
      sizeOptions: "Half-Quart",
      viscosity: "10W-40",
      brand: "Mobil",
    },
    {
      id: 21,
      title: "Product 21",
      sku: "SKU-1020",
      price: "57.93",
      image: "/images/product.svg",
      dimensions: "517 x 216",
      sizesAvailable: true,
      category: "Chemicals",
      sizeOptions: "Half-Quart",
      viscosity: "10W-30",
      brand: "Peak",
    },
    {
      id: 22,
      title: "Product 22",
      sku: "SKU-1021",
      price: "57.91",
      image: "/images/product.svg",
      dimensions: "281 x 491",
      sizesAvailable: false,
      category: "Chemicals",
      sizeOptions: "Half-Quart",
      viscosity: "10W-40",
      brand: "Old World",
    },
    {
      id: 23,
      title: "Product 23",
      sku: "SKU-1022",
      price: "37.43",
      image: "/images/product.svg",
      dimensions: "862 x 272",
      sizesAvailable: false,
      category: "Supplies",
      sizeOptions: "Bulk 1 Drum",
      viscosity: "0W-30",
      brand: "Mobil",
    },
    {
      id: 24,
      title: "Product 24",
      sku: "SKU-1023",
      price: "57.96",
      image: "/images/product.svg",
      dimensions: "698 x 333",
      sizesAvailable: true,
      category: "Equipment",
      sizeOptions: "Half-Quart",
      viscosity: "0W-30",
      brand: "Peak",
    },
    {
      id: 25,
      title: "Product 25",
      sku: "SKU-1024",
      price: "47.96",
      image: "/images/product.svg",
      dimensions: "739 x 377",
      sizesAvailable: true,
      category: "Lube-Tech",
      sizeOptions: "1 Quart",
      viscosity: "0W-20",
      brand: "Mobil",
    },
    {
      id: 26,
      title: "Product 26",
      sku: "SKU-1025",
      price: "44.47",
      image: "/images/product.svg",
      dimensions: "863 x 174",
      sizesAvailable: true,
      category: "Chemicals",
      sizeOptions: "1 Gallon",
      viscosity: "10W-40",
      brand: "Old World",
    },
    {
      id: 27,
      title: "Product 27",
      sku: "SKU-1026",
      price: "40.04",
      image: "/images/product.svg",
      dimensions: "138 x 75",
      sizesAvailable: false,
      category: "Equipment",
      sizeOptions: "1 Quart",
      viscosity: "10W-40",
      brand: "Peak",
    },
    {
      id: 28,
      title: "Product 28",
      sku: "SKU-1027",
      price: "48.46",
      image: "/images/product.svg",
      dimensions: "305 x 350",
      sizesAvailable: false,
      category: "Supplies",
      sizeOptions: "Half-Quart",
      viscosity: "5W-30",
      brand: "Old World",
    },
    {
      id: 29,
      title: "Product 29",
      sku: "SKU-1028",
      price: "38.85",
      image: "/images/product.svg",
      dimensions: "60 x 490",
      sizesAvailable: true,
      category: "Auto Parts",
      sizeOptions: "5 Quarts",
      viscosity: "5W-30",
      brand: "Peak",
    },
    {
      id: 30,
      title: "Product 30",
      sku: "SKU-1029",
      price: "28.97",
      image: "/images/product.svg",
      dimensions: "926 x 182",
      sizesAvailable: true,
      category: "Lube-Tech",
      sizeOptions: "5 Quarts",
      viscosity: "0W-30",
      brand: "Old World",
    },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/api/products");
        console.log("TCL: fetchProducts -> response", response);
        dispatch(setProducts(ResData));
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [dispatch]);

  useEffect(() => {
    if (items.length) {
      const filtered = filterProducts(items, activeFilters);
      setFilteredProducts(filtered);
    }
  }, [items, activeFilters]);

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
    <div>
      <div className="flex space-x-4">
        <div>
          <FilterComponent
            onFilterChange={handleFilterChange}
            selectedFilters={activeFilters} // Pass selected filters for initialization
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
              image={product.image}
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
