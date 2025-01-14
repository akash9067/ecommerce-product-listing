"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(""); // Track active category

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
  };

  const categories = [
    {
      name: "Browse Categories",
      subcategories: [
        { name: "Lubricants", href: "/lubricants" },
        { name: "Hydraulic Fluid", href: "/hydraulic-fluid" },
        { name: "Chemicals", href: "/chemicals" }, // Added more subcategories
        { name: "Supplies", href: "/supplies" },
        { name: "Equipment", href: "/equipment" },
        { name: "Auto Parts", href: "/auto-parts" },
        { name: "Purchased Products", href: "/purchased-products" },
      ],
    },
    {
      name: "Who We Serve",
      subcategories: [{ name: "Industries", href: "/industries" }],
    },
    { name: "What We Do", href: "/what-we-do" },
    { name: "Who We Are", href: "/who-we-are" },
  ];

  return (
    <div>
      {" "}
      <header className="bg-gray-800 text-white flex items-center justify-between relative py-2">
        <div
          className="hamburger block md:hidden ml-2 cursor-pointer"
          onClick={toggleMenu}
        >
          {isMenuOpen ? "Close" : "Menu"}
        </div>

        <h1 className="logo md:ml-4 text-center">
          <Link href="/">
            <Image
              src="/path-to-logo.svg"
              alt="Ipsum Logo"
              className="h-10"
              width={100}
              height={100}
            />
          </Link>
        </h1>

        <nav className="hidden md:flex">
          <ul className="flex space-x-6">
            {categories.map((category) => (
              <li
                key={category.name}
                className={`relative group ${
                  activeCategory === category.name ? "bg-gray-700 rounded" : ""
                }`}
                onClick={() => handleCategoryClick(category.name)}
              >
                <span className="cursor-pointer px-2 py-1">
                  {category.name}
                </span>{" "}
                {/* Added padding */}
                {category.subcategories && (
                  <ul className="absolute left-0 top-full hidden  bg-gray-700 rounded w-max">
                    {" "}
                    {/* Added w-max */}
                    {category.subcategories.map((subcategory) => (
                      <li
                        key={subcategory.name}
                        className="p-2 hover:bg-gray-600 rounded whitespace-nowrap"
                      >
                        {" "}
                        {/* Added whitespace-nowrap */}
                        <Link
                          href={subcategory.href}
                          className="hover:text-gray-300 block"
                        >
                          {subcategory.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* ... (Search, Login, and Cart - same as before) */}
        <div className="flex items-center space-x-4 mr-4">
          {" "}
          {/* Added space-x for spacing */}
          <div className="relative w-64">
            {" "}
            {/* Set a fixed width for the search bar */}
            <input
              type="text"
              placeholder="Search by keyword, brand or SKU..."
              className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500" // Added text-black
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-gray-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </div>
          </div>
          <Link href="/login" className="hidden md:block hover:text-gray-300">
            Login
          </Link>
          <Link href="/cart" className="relative">
            <Image
              src="/path-to-cart-icon.svg"
              alt="Cart"
              className="h-6 w-6" // Added w-6 for consistent size
              width={24}
              height={24}
            />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              3
            </span>
          </Link>
        </div>

        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-gray-800 p-4 flex flex-col">
            <div className="relative w-full mb-4">
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-gray-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
              </div>
            </div>
            <Link href="/login" className="hover:text-gray-300 mb-2">
              Login
            </Link>
            <Link href="/cart" className="hover:text-gray-300">
              Cart
            </Link>
          </div>
        )}
      </header>
      {/* Subheader (Conditionally rendered) */}
      {activeCategory && (
        <div className="bg-gray-400 text-white p-4 w-full">
          <div className="container mx-auto">
            <ul className="flex space-x-6">
              {" "}
              {/* This is the key change: flex and space-x-6 */}
              {categories
                .find((cat) => cat.name === activeCategory)
                ?.subcategories?.map((subcategory) => (
                  <li
                    key={subcategory.name}
                    className="whitespace-nowrap flex flex-col"
                  >
                    {" "}
                    {/* Added whitespace-nowrap here as well */}
                    <Link
                      href={subcategory.href}
                      className="hover:text-gray-300"
                    >
                      {subcategory.name}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
