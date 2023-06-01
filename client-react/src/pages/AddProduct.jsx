import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    ingredients: "",
    price: "",
    food_drink: "pizza",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    console.log(formData.food_drink);
  }, [formData.food_drink]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    fetch("/addProduct", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setFormData({
          ...formData,
          food_drink: "",
          ingredients: "",
          name: "",
          price: "",
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "70vh",
      }}
    >
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
            value={formData.name}
            onChange={handleChange}
            name="name"
            style={{ backgroundColor: "#c7c7c7" }}
          />
        </Form.Group>
        <Form.Group controlId="productPrice">
          <Form.Label>Product Price</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter product price"
            value={formData.price}
            onChange={handleChange}
            name="price"
            style={{ backgroundColor: "#c7c7c7" }}
          />
        </Form.Group>
        {/*  <Form.Group controlId="productImage">
          <Form.Label>Product Image</Form.Label>
          <Form.Control
            type="file"
            accept="image/*"
            
          />
        </Form.Group> */}
        <Form.Group controlId="productDescription">
          <Form.Label>Product Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter product description"
            value={formData.ingredients}
            onChange={handleChange}
            name="ingredients"
            style={{ backgroundColor: "#c7c7c7" }}
          />
        </Form.Group>
        <Form.Group controlId="productCategory">
          <Form.Label>Product Category</Form.Label>
          <Form.Control
            as="select"
            value={formData.food_drink}
            onChange={handleChange}
            name="food_drink"
          >
            <option value="pizza">Pizza</option>
            <option value="drink">Drink</option>
          </Form.Control>
          <br />
        </Form.Group>
        <Button variant="primary" type="submit">
          Add Product
        </Button>
      </Form>
    </div>
  );
};

export { AddProduct };
