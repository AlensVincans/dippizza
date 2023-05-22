import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

function AddProduct() {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productImage, setProductImage] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productCategory, setProductCategory] = useState("Pizza");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted:", productName, productPrice, productImage, productDescription, productCategory);
    setProductName("");
    setProductPrice("");
    setProductImage("");
    setProductDescription("");
    setProductCategory("Pizza");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="productName">
        <Form.Label>Product Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter product name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="productPrice">
        <Form.Label>Product Price</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter product price"
          value={productPrice}
          onChange={(e) => setProductPrice(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="productImage">
        <Form.Label>Product Image</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter product image URL"
          value={productImage}
          onChange={(e) => setProductImage(e.target.value)}
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
      </Form.Group>
      <Button variant="primary" type="submit">
        Add Product
      </Button>
    </Form>
  );
}

export {AddProduct}