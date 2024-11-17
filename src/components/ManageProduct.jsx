import React, { useState, useEffect } from "react";
import axios from "axios";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
  Fab,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { Link } from "react-router-dom";
import Add from "@mui/icons-material/Add";

const ManageProduct = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [productToEdit, setProductToEdit] = useState(null);

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

  const handleDeleteDialogOpen = (product) => {
    setProductToDelete(product);
    setOpenDeleteDialog(true);
  };

  const handleDeleteDialogClose = () => {
    setOpenDeleteDialog(false);
    setProductToDelete(null);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`https://671deb931dfc42991980b1e7.mockapi.io/ASMFINAL/${productToDelete.id}`);
      setProducts((prevProducts) => prevProducts.filter((product) => product.id !== productToDelete.id));
      handleDeleteDialogClose();
    } catch (err) {
      console.error("Failed to delete product:", err);
    }
  };

  const handleEditDialogOpen = (product) => {
    setProductToEdit(product);
    setOpenEditDialog(true);
  };

  const handleEditDialogClose = () => {
    setOpenEditDialog(false);
    setProductToEdit(null);
  };

  const handleEditSave = async () => {
    try {
      await axios.put(`https://671deb931dfc42991980b1e7.mockapi.io/ASMFINAL/${productToEdit.id}`, productToEdit);
      setProducts((prevProducts) =>
        prevProducts.map((product) => (product.id === productToEdit.id ? productToEdit : product))
      );
      handleEditDialogClose();
    } catch (err) {
      console.error("Failed to edit product:", err);
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setProductToEdit((prev) => ({ ...prev, [name]: value }));
  };

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
          <Typography variant="h4" sx={{ color: "white", mt: 2, fontSize: "2rem" }}>
            {error}
          </Typography>
        ) : (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="products table">
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Current Price</TableCell>
                  <TableCell>Image URL</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((product, index) => (
                  <TableRow key={product.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell sx={{ wordBreak: "break-word", maxWidth: "150px" }}>
                      {product.name}
                    </TableCell>
                    <TableCell sx={{ wordBreak: "break-word", maxWidth: "250px" }}>
                      {product.description}
                    </TableCell>
                    <TableCell>
                      <Typography sx={{ textDecoration: "line-through", color: "grey" }}>
                        {product.price} đ
                      </Typography>
                    </TableCell>
                    <TableCell>{product.currentPrice} đ</TableCell>
                    <TableCell sx={{ wordBreak: "break-word", maxWidth: "250px" }}>
                      {product.image}
                    </TableCell>
                    <TableCell>
                      <Box display="flex" flexDirection="column">
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => handleEditDialogOpen(product)}
                        sx={{ mr: 2, mb:1, width:"100%" }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleDeleteDialogOpen(product)}
                      >
                        Delete
                      </Button>
                      </Box>
                      
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {/* Edit Product Dialog */}
        <Dialog open={openEditDialog} onClose={handleEditDialogClose}>
          <DialogTitle>Edit Product</DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              label="Name"
              name="name"
              value={productToEdit?.name || ""}
              onChange={handleEditChange}
              fullWidth
            />
            <TextField
              margin="dense"
              label="Description"
              name="description"
              value={productToEdit?.description || ""}
              onChange={handleEditChange}
              fullWidth
            />
            <TextField
              margin="dense"
              label="Price"
              name="price"
              value={productToEdit?.price || ""}
              onChange={handleEditChange}
              fullWidth
            />
            <TextField
              margin="dense"
              label="Current Price"
              name="currentPrice"
              value={productToEdit?.currentPrice || ""}
              onChange={handleEditChange}
              fullWidth
            />
            <TextField
              margin="dense"
              label="Image URL"
              name="image"
              value={productToEdit?.image || ""}
              onChange={handleEditChange}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleEditDialogClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleEditSave} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog
          open={openDeleteDialog}
          onClose={handleDeleteDialogClose}
          aria-labelledby="delete-dialog-title"
          aria-describedby="delete-dialog-description"
        >
          <DialogTitle id="delete-dialog-title">Confirm Delete</DialogTitle>
          <DialogContent>
            Are you sure you want to delete {productToDelete?.name}?
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteDialogClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleDelete} color="error">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      <Fab
          color="primary"
          aria-label="home"
          component={Link}
          to="/"
          sx={{ position: "fixed", bottom: 16, right: 16 }} // Adjust position above the add button
        >
          <HomeIcon />
        </Fab>
      </Container>
    </Box>
  );
};

export default ManageProduct;
