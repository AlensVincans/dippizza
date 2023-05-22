import React, { useState } from 'react';
import { Card, Button, Modal, Form } from 'react-bootstrap';

const productsData = [
  {
    id: 1,
    name: 'Product 1',
    image: 'product1.jpg',
    price: 10.99,
    description: 'This is product 1 description.',
    category: 'Pizza'
  },
  {
    id: 2,
    name: 'Product 2',
    image: 'product2.jpg',
    price: 19.99,
    description: 'This is product 2 description.',
    category: 'Beverage'
  },
  // Add more product objects here
];

const ProductList = () => {
  const [products, setProducts] = useState(productsData);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedProduct, setEditedProduct] = useState(null);

  const deleteProduct = (productId) => {
    setProducts(products.filter(product => product.id !== productId));
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
    setProducts(products.map(product => {
      if (product.id === editedProduct.id) {
        return { ...product, ...editedData };
      }
      return product;
    }));
    closeEditModal();
  };

  return (
    <div>
      <h1>Product List</h1>
      {products.map(product => (
        <Card key={product.id} style={{ width: '18rem' }}>
          <Card.Img variant="top" src={product.image} />
          <Card.Body>
            <Card.Title>{product.name}</Card.Title>
            <Button variant="danger" onClick={() => deleteProduct(product.id)}>Delete</Button>
            <Button variant="primary" onClick={() => openEditModal(product)}>Edit</Button>
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
                  type="text"
                  defaultValue={editedProduct.image}
                  // onChange to update the edited product's image state
                />
              </Form.Group>
              <Form.Group controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={editedProduct.name}
                  // onChange to update the edited product's name state
                />
              </Form.Group>
              <Form.Group controlId="formPrice">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={editedProduct.price}
                  // onChange to update the edited product's price state
                />
              </Form.Group>
              <Form.Group controlId="formDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  defaultValue={editedProduct.description}
                />
              </Form.Group>
              <Form.Group controlId="formCategory">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  as="select"
                  defaultValue={editedProduct.category}

                >
                  <option>Pizza</option>
                  <option>Beverage</option>
                </Form.Control>
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeEditModal}>Close</Button>
          <Button variant="primary" onClick={() => saveEditedProduct(editedProduct)}>Save Changes</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export {ProductList}
