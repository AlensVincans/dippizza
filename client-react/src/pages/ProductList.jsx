import React, { useState, useContext, useEffect } from "react";
import { Card, Button, Modal, Form } from "react-bootstrap";
import { CustomContext } from "../components/ProductsContext";

const ProductList = () => {
  const { setProducts, productData, removeProduct, updateProduct } =
    useContext(CustomContext);

  useEffect(() => {
    fetch("/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
      });
  }, []);

  const handleButtonDelete = (itemId) => {
    removeProduct(itemId);
    fetch("/deleteProduct", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id_product: itemId }),
    })
      .then((res) => res.json())
      .then((info) => {
        console.log(info);
      });
  };

  const [showEditModal, setShowEditModal] = useState(false);
  const [editedProduct, setEditedProduct] = useState(null);

  const handleInputChange = (event) => {
    if (event.target.name === "image") {
      setEditedProduct({
        ...editedProduct,
        [event.target.name]: event.target.files[0],
      });
    } else {
      setEditedProduct({
        ...editedProduct,
        [event.target.name]: event.target.value,
      });
    }
  };

  const openEditModal = (product) => {
    setEditedProduct(product);
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setEditedProduct(null);
    setShowEditModal(false);
  };

  const saveEditedProduct = (editedData) => {
    const postData = new FormData();
    postData.append("id", editedData.id);
    postData.append("name", editedData.name);
    postData.append("ingredients", editedData.ingredients);
    postData.append("price", editedData.price);
    postData.append("food_drink", editedData.food_drink);
    postData.append("image", editedData.image);

    fetch("/updateProduct", {
      method: "POST",
      body: postData,
    })
      .then((res) => res.json())
      .then((info) => {
        //console.log(info);
      });
    setShowEditModal(false);
    updateProduct(editedData);
    console.log(postData);
  };

  return (
    <div className="d-flex flex-column align-items-center">
      <h1 className="text-center mt-4">Product List</h1> <br /> <br />
      {productData.map((product) => (
        <Card key={product.id} style={{ width: "18rem" }} className="mb-4">
          <Card.Img variant="top" />
          <Card.Body>
            <Card.Title>{product.name}</Card.Title>
            <div className="d-flex justify-content-between">
              <Button variant="primary" onClick={() => openEditModal(product)}>
                Edit
              </Button>
              <Button
                variant="danger"
                onClick={() => handleButtonDelete(product.id)}
              >
                Delete
              </Button>
            </div>
          </Card.Body>
        </Card>
      ))}
      <Modal show={showEditModal} onHide={closeEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editedProduct && (
            <Form>
              <Form.Group controlId="formImage">
                <Form.Label>Image</Form.Label>
                <Form.Control
                  type="file"
                  onChange={handleInputChange}
                  name="image"
                  accept="image/*"
                />
              </Form.Group>
              <Form.Group controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  onChange={handleInputChange}
                  name="name"
                  value={editedProduct.name}
                  // onChange to update the edited product's name state
                />
              </Form.Group>
              <Form.Group controlId="formPrice">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="text"
                  onChange={handleInputChange}
                  name="price"
                  value={editedProduct.price}
                  // onChange to update the edited product's price state
                />
              </Form.Group>
              <Form.Group controlId="formDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  onChange={handleInputChange}
                  name="ingredients"
                  value={editedProduct.ingredients}
                />
              </Form.Group>
              <Form.Group controlId="formCategory">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  as="select"
                  onChange={handleInputChange}
                  name="food_drink"
                  value={editedProduct.food_drink}
                >
                  <option value={"food"}>Pizza</option>
                  <option value={"drink"}>Beverage</option>
                </Form.Control>
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeEditModal}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => saveEditedProduct(editedProduct)}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export { ProductList };
