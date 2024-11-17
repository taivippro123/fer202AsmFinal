import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  Fab,
} from "@mui/material";
import { Link } from "react-router-dom"; 
import Add from "@mui/icons-material/Add"; 
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts"; // Import icon for the manage button

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://6739ed07a3a36b5a62f00fc5.mockapi.io/AsmFinal"
        );
        if (response.data.length === 0) {
          setError("No products found.");
        } else {
          setProducts(response.data);
          setError(null);
        }
      } catch (err) {
        setError("No products found.");
      }
    };

    fetchProducts();
  }, []);

  return (
    <Box
      sx={{
        bgcolor: "#1e1e1e",
        minHeight: "100vh",
        py: 4,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container
        maxWidth="lg"
        sx={{ textAlign: "center", color: "white", mt: 4 }}
      >
        <Typography
          variant="h4"
          component="h2"
          gutterBottom
          sx={{ color: "white" }}
        >
          Product List
        </Typography>
        {error ? (
          <Typography
            variant="h4"
            sx={{ color: "white", mt: 2, fontSize: "2rem" }}
          >
            {error}
          </Typography>
        ) : (
          <Grid container spacing={4}>
            {products.map((product) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                <Card
                  sx={{
                    maxWidth: 345,
                    bgcolor: "#fff",
                    color: "white",
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.05)",
                      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={product.image}
                    alt={product.name}
                  />
                  <CardContent
                    sx={{
                      flexGrow: 1,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box>
                      <Typography
                        variant="h6"
                        component="div"
                        sx={{ color: "#D32F2F" }}
                      >
                        {product.name}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "#000", mt: 1 }}>
                        {product.description}
                      </Typography>
                    </Box>
                    <Box sx={{ mt: 2 }}>
                      {product.price && (
                        <Typography
                          variant="body2"
                          sx={{
                            textDecoration: "line-through",
                            color: "#000",
                            fontSize: "17px",
                          }}
                        >
                          {product.price} đ
                        </Typography>
                      )}
                      <Typography
                        variant="h6"
                        sx={{ color: "#D32F2F", fontWeight: "bold" }}
                      >
                        {product.currentPrice} đ
                      </Typography>
                    </Box>
                  </CardContent>
                  <Button
                    variant="contained"
                    color="error"
                    component={Link}
                    to="/product-details"
                    state={{ product }} // Pass product data here
                    sx={{ m: 2, mt: "auto" }}
                  >
                    View Details
                  </Button>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
        <Fab
          color="primary"
          aria-label="add"
          component={Link}
          to="/add"
          sx={{ position: "fixed", bottom: 16, right: 16 }}
        >
          <Add />
        </Fab>
        <Fab
          color="secondary"
          aria-label="manage"
          component={Link}
          to="/manage"
          sx={{ position: "fixed", bottom: 80, right: 16 }} // Adjust position above the add button
        >
          <ManageAccountsIcon />
        </Fab>
      </Container>
    </Box>
  );
};

export default ProductList;
