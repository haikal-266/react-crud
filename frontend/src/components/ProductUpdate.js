import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "bulma/css/bulma.css";

const ProductUpdate = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [product, setProduct] = useState(null);
  const navigate = useNavigate(); // Use useNavigate instead of useHistory
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:2006/products/${id}`);
        setProduct(response.data);
        setName(response.data.name);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProduct();
  }, [id]);

  const updateProduct = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    if (image) formData.append("image", image);

    try {
      await axios.put(`http://localhost:2006/products/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Product updated successfully!");
      navigate("/"); // Navigate to the products page or any other page after update
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-5">
      <form onSubmit={updateProduct}>
        <div className="field">
          <label className="label">Product Name</label>
          <div className="control">
            <input
              className="input"
              type="text"
              placeholder="Product Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Image File</label>
          <div className="control">
            <input
              className="input"
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
        </div>

        <div className="field">
          <div className="control">
            <button className="button is-primary" type="submit">
              Update
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProductUpdate;
