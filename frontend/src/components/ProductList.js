import React, { useState, useEffect } from "react";
import axios from "axios";
import "bulma/css/bulma.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const response = await axios.get("http://localhost:2006/products");
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`http://localhost:2006/products/${id}`);
        alert("Product deleted successfully!");
        getProducts(); // Refresh the product list
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="container">
      <div className="columns is-multiline">
        {products.map((product) => (
          <div className="column is-one-quarter" key={product.id}>
            <div
              className="card mt-5"
              style={{ borderRadius: "10px", overflow: "hidden" }}
            >
              <div className="card-image">
                <figure className="image is-4by3 mt-2">
                  <img
                    src={product.url}
                    alt="Product image"
                    className="has-ratio"
                  />
                </figure>
              </div>
              <div className="card-content">
                <div className="media">
                  <div className="media-left">
                    {/* Optional content */}
                  </div>
                  <div className="media-content">
                    <p className="title is-4">{product.name}</p>
                  </div>
                </div>
              </div>

              <footer className="card-footer">
                <a className="card-footer-item" href={`/product/update/${product.id}`}>
                  Edit
                </a>
                <a
                  className="card-footer-item"
                  onClick={() => handleDelete(product.id)}
                  style={{ cursor: "pointer" }}
                >
                  Delete
                </a>
              </footer>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
