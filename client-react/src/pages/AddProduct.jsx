import React, { useState } from "react";
import { Form, Button, Col } from "react-bootstrap";

function AddProduct() {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [productDescription, setProductDescription] = useState("");
  const [productCategory, setProductCategory] = useState("Pizza");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(
      "Submitted:",
      productName,
      productPrice,
      productImage,
      productDescription,
      productCategory
    );
    setProductName("");
    setProductPrice("");
    setProductImage(null);
    setProductDescription("");
    setProductCategory("Pizza");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProductImage(file);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "70vh" }}>
      <Form style={{ width: "400px" }} onSubmit={handleSubmit}>
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <h2 style={{ fontWeight: "bold" }}>Add New Product</h2>
        </div>
        <br />
        <Form.Group controlId="productName">
          <Form.Label>Product Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter product name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            style={{ backgroundColor: "#c7c7c7" }}
          />
        </Form.Group>
        <Form.Group controlId="productPrice">
          <Form.Label>Product Price</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter product price"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            style={{ backgroundColor: "#c7c7c7" }}
          />
        </Form.Group>
        <Form.Group controlId="productImage">
          <Form.Label>Product Image</Form.Label>
          <Form.Control
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </Form.Group>
        <Form.Group controlId="productDescription">
          <Form.Label>Product Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter product description"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            style={{ backgroundColor: "#c7c7c7" }}
          />
        </Form.Group>
        <Form.Group controlId="productCategory">
          <Form.Label>Product Category</Form.Label>
          <Form.Control
            as="select"
            value={productCategory}
            onChange={(e) => setProductCategory(e.target.value)}
          >
            <option value="Pizza">Pizza</option>
            <option value="Drink">Drink</option>
          </Form.Control>
          <br />
        </Form.Group>
        <Button variant="primary" type="submit"> 
          Add Product
        </Button>
      </Form>
    </div>
  );
}

export { AddProduct };

