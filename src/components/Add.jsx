import React, { useState } from "react";
import axios from "axios";
import { Container, TextField, Button, Typography, Box, Fab } from "@mui/material";
import { useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home"; // Import the Home icon

const Add = () => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    currentPrice: "",
    image: ""
  });
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://6739ed07a3a36b5a62f00fc5.mockapi.io/AsmFinal", product);
      setSuccess("Product added successfully!");
      setTimeout(() => navigate("/"), 1000); // Navigate back after 1 second
    } catch (err) {
      setSuccess("Failed to add product.");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ bgcolor: "#f4f4f4", p: 4, borderRadius: 2, mt: 5 }}>
      <Typography variant="h4" component="h1" gutterBottom color="black" textAlign={"center"}>
        Add New Product
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <TextField
          fullWidth
          label="Product Name"
          name="name"
          value={product.name}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Description"
          name="description"
          value={product.description}
          onChange={handleChange}
          multiline
          rows={4}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Price"
          name="price"
          value={product.price}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Current Price"
          name="currentPrice"
          value={product.currentPrice}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Image URL"
          name="image"
          value={product.image}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Add Product
        </Button>
      </Box>
      {success && (
        <Typography variant="body2" sx={{ color: success.includes("successfully") ? "green" : "red", mt: 2 }}>
          {success}
        </Typography>
      )}
      {/* Floating Action Button for Home Navigation */}
      <Fab
        color="primary"
        aria-label="home"
        onClick={() => navigate("/")} // Navigates to home when clicked
        sx={{
          position: "fixed",
          bottom: 16,
          right: 16,
        }}
      >
        <HomeIcon /> {/* Changed to Home icon */}
      </Fab>
    </Container>
  );
};

export default Add;
