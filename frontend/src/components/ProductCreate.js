import React, { useState } from "react";
import axios from "axios";
import "bulma/css/bulma.css";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);

  const saveProduct = async (e) => {
    e.preventDefault();

    // Membuat FormData untuk mengirimkan data produk dan file gambar
    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", image);

    try {
      await axios.post("http://localhost:2006/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Product added successfully!");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-5">
      <form onSubmit={saveProduct}>
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
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
