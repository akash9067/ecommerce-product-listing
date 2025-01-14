"use client";

import "./globals.css";
import { ReactNode } from "react";
import { Provider } from "react-redux";
import store from "../store/store";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <Header />
          <main className="container mx-auto p-4">{children}</main>
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
