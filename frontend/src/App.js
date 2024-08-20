import React from "react";
import "bulma/css/bulma.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductList from "./components/ProductList";
import ProductCreate from "./components/ProductCreate";
import ProductUpdate from "./components/ProductUpdate";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductList />}>
          {" "}
        </Route>

        <Route path="/create" element={<ProductCreate />}>
          {" "}
        </Route>
        
        <Route path="/product/update/:id" element={<ProductUpdate />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
