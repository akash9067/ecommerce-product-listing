This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

# E-commerce Product Listing Page

This is a Next.js project that showcases an e-commerce product listing page. The project is built using the latest version of Next.js and features a modern design, responsive layout, and interactive functionality.

## Project Overview

This project is an e-commerce product listing page that allows users to browse and filter products by category, price, and popularity. The project is built using Next.js and features a responsive design that works on desktop and mobile devices.

## Project Structure

The project is organized into the following directories:

- `app`: This directory contains the main application code, including pages, components, and layouts.
- `components`: This directory contains reusable React components used throughout the application.
- `store`: This directory contains the Redux store configuration and slice reducers.
- `styles`: This directory contains global CSS styles and theme configurations.
- `public`: This directory contains static assets, such as images and fonts.

## Features

The project features the following:

- **Product Listing Page**: A responsive page that displays a list of products, including product images, titles, prices, and descriptions.
- **Sorting and Filtering**: Users can sort products by price, popularity, and newest, and filter by category.
- **Product Details Page**: A page that displays detailed information about a single product, including product images, titles, prices, and descriptions.
- **Header and Footer**: A responsive header and footer that provide navigation and branding.

## File Structure

The project files are organized as follows:

- [app/page.tsx](cci:7://file:///d:/React/ecommerce-product-listing/app/page.tsx:0:0-0:0): The main application page that renders the product listing page.
- [app/layout.tsx](cci:7://file:///d:/React/ecommerce-product-listing/app/layout.tsx:0:0-0:0): The layout component that wraps the application pages.
- [components/ProductList.tsx](cci:7://file:///d:/React/ecommerce-product-listing/components/ProductList.tsx:0:0-0:0): The product list component that displays a list of products.
- [components/ProductCard.tsx](cci:7://file:///d:/React/ecommerce-product-listing/components/ProductCard.tsx:0:0-0:0): The product card component that displays a single product.
- [components/Header.tsx](cci:7://file:///d:/React/ecommerce-product-listing/components/Header.tsx:0:0-0:0): The header component that provides navigation and branding.
- [components/Footer.tsx](cci:7://file:///d:/React/ecommerce-product-listing/components/Footer.tsx:0:0-0:0): The footer component that provides additional information and links.
- [store/store.ts](cci:7://file:///d:/React/ecommerce-product-listing/store/store.ts:0:0-0:0): The Redux store configuration file.
- [store/slices/productSlice.ts](cci:7://file:///d:/React/ecommerce-product-listing/store/slices/productSlice.ts:0:0-0:0): The product slice reducer file.
- [styles/globals.css](cci:7://file:///d:/React/ecommerce-product-listing/styles/globals.css:0:0-0:0): The global CSS styles file.
- `tailwind.config.ts`: The Tailwind CSS configuration file.

## Functions

The project uses the following functions:

- `getProducts()`: A function that fetches products from an API and returns a list of products.
<!-- * `sortProducts()`: A function that sorts products by price, popularity, and newest. -->
- `filterProducts()`: A function that filters products by category.
- `handleCategoryClick()`: A function that handles category clicks and updates the product list.
<!-- * `handleSortChange()`: A function that handles sort changes and updates the product list. -->

## Getting Started

To get started with the project, follow these steps:

1. Clone the repository using `git clone https://github.com/your-username/your-repo-name.git`
2. Install the dependencies using `npm install` or `yarn install`
3. Start the development server using `npm run dev` or `yarn dev`
4. Open the application in your web browser using `http://localhost:3000`

## Contributing

Contributions are welcome! If you'd like to contribute to the project, please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License.

## Acknowledgments

Thanks to the Next.js team for creating an amazing framework!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
