import React from "react";
import { useLocation, Link } from "react-router-dom";
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Box,
  Button,
  CircularProgress,
} from "@mui/material";

const ProductDetails = () => {
  const location = useLocation();
  const product = location.state?.product; // Get product from state
  const [loading, setLoading] = React.useState(!product); // Set loading state based on product existence
  const [error, setError] = React.useState(null);

  // If product data is not passed, handle it (Optional)
  React.useEffect(() => {
    if (!product) {
      setError("Product not found.");
      setLoading(false);
    }
  }, [product]);

  if (loading) {
    return (
      <Container maxWidth="sm" sx={{ mt: 5, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="sm" sx={{ mt: 5 }}>
        <Typography variant="h4" component="h2" color="error">
          {error}
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 5, textAlign: "center" }}>
        <Typography variant="h4" component="h1" gutterBottom>
            Product Details
          </Typography>
      <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
        <CardMedia
          component="img"
          height="400"
          image={product.image}
          alt={product.name}
        />
        <CardContent>
          <Typography variant="h4" component="h1" gutterBottom>
            {product.name}
          </Typography>
          <Typography variant="body1" color="black" sx={{ mb: 2 }}>
            {product.description}
          </Typography>
          <Box sx={{ mb: 2 }}>
            {product.price && (
              <Typography
                variant="body2"
                sx={{
                  textDecoration: "line-through",
                  color: "#757575",
                  fontSize: "17px",
                }}
              >
                {product.price} đ
              </Typography>
            )}
            <Typography variant="h6" sx={{ color: "#D32F2F", fontWeight: "bold" }}>
              {product.currentPrice} đ
            </Typography>
          </Box>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/"
            sx={{ mt: 2 }}
          >
            Back to Product List
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ProductDetails;
