import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from 'react-router-dom';
import { CartProvider } from "./components/Contexts/CartContexts";
import {  ProductProvider } from "./components/Contexts/ProductContexts";
import { AuthProvider } from "./components/Contexts/AuthContexts";
import { WishlistProvider } from "./components/Contexts/WishListContext";
import { AddressProvider } from "./components/Contexts/AddressContexts";
import { ErrorProvider } from "./components/Contexts/ErrorContexts";

// Call make Server

const root = ReactDOM.createRoot(
  document.getElementById('root')
);
root.render(
    <Router>
      <ErrorProvider>
        <AddressProvider>
          <CartProvider>
            <WishlistProvider>
              <ProductProvider>
                <AuthProvider>
                  <App />
                </AuthProvider>
              </ProductProvider>
            </WishlistProvider>
          </CartProvider>
        </AddressProvider>
      </ErrorProvider>
    </Router>
);
