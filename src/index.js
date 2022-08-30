import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import './index.css';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react'
import { UserAuthContextProvider } from "./Context/UserAuthContext"
import { ProductContextProvider } from "./Context/ProductContext"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ChakraProvider>
    <BrowserRouter>
      <UserAuthContextProvider>
        <ProductContextProvider>
          <App />
        </ProductContextProvider>
      </UserAuthContextProvider>
    </BrowserRouter>
  </ChakraProvider>
);

