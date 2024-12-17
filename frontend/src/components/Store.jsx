// frontend/src/components/Store.jsx
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Grid, Card, CardContent, CardMedia, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import "../styles/Store.css"; // Create this CSS file for custom styles
import productImage1 from "../assets/product1.jpg";
import productImage2 from "../assets/product2.jpg";
import productImage3 from "../assets/product3.jpg";

const products = [
  {
    id: 1,
    name: "Event Decor Kit",
    description: "All-in-one decor kit for your event.",
    price: 49.99,
    image: productImage1,
  },
  {
    id: 2,
    name: "Premium Sound System",
    description: "High-quality sound system for events.",
    price: 299.99,
    image: productImage2,
  },
  {
    id: 3,
    name: "Lighting Setup",
    description: "Professional lighting for ambiance.",
    price: 199.99,
    image: productImage3,
  },
  // Add more products as needed
];

const Store = () => {
  const [cart, setCart] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  const addToCart = (product) => {
    setCurrentProduct(product);
    setOpen(true);
  };

  const handleAdd = () => {
    setCart([...cart, { ...currentProduct, quantity: 1 }]);
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const proceedToCheckout = () => {
    // Implement navigation to checkout page or open checkout dialog
  };

  return (
    <div>
      <Helmet>
        <title>Wasna Pure Store - Wasna Event Complex</title>
        <meta name="description" content="Shop premium event products at Wasna Pure Store. Enhance your events with our top-quality products." />
      </Helmet>
      <div style={{ paddingTop: '80px', paddingBottom: '40px' }}>
        <Typography variant="h3" align="center" gutterBottom style={{ color: '#001f3f', marginTop: '20px' }}>
          Wasna Pure Store
        </Typography>
        <Grid container spacing={4} style={{ padding: '20px' }}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card className="product-card">
                <CardMedia
                  component="img"
                  height="200"
                  image={product.image}
                  alt={product.name}
                />
                <CardContent>
                  <Typography variant="h5" component="div" style={{ color: '#b55850' }}>
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.description}
                  </Typography>
                  <Typography variant="h6" style={{ marginTop: '10px' }}>
                    ${product.price.toFixed(2)}
                  </Typography>
                  <Button variant="contained" color="primary" style={{ marginTop: '10px' }} onClick={() => addToCart(product)}>
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        {/* Cart Summary */}
        <div style={{ position: 'fixed', bottom: '20px', right: '20px' }}>
          <Button variant="contained" color="secondary" onClick={proceedToCheckout}>
            View Cart ({cart.length})
          </Button>
        </div>
        {/* Add to Cart Dialog */}
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Add to Cart</DialogTitle>
          <DialogContent>
            {currentProduct && (
              <Typography>
                {currentProduct.name} has been added to your cart.
              </Typography>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Continue Shopping
            </Button>
            <Button onClick={handleAdd} color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default Store;
