import * as React from "react";
import { Button, Container, Typography, Grid, Paper } from "@mui/material";
import ProductTable from "../src/components/ProductTable";
import agent from "./app/api/agent";
import { Product } from "./app/models/Product";
import CreateProductForm from "./components/CreateProductForm";
import EditProductForm from "./components/EditProductForm";
import DeleteDialog from "./components/DeleteDialog";

const defaultProduct: Product = {
  id: 0,
  name: "",
  price: 0,
  description: "",
  image: "",
};

const AdminPage = () => {
  const [product, setProduct] = React.useState<Product[]>([]);

  const [currentProduct, setCurrentProduct] =
    React.useState<Product>(defaultProduct);

  const [isCreateFormOpen, setIsCreateFormOpen] =
    React.useState<boolean>(false);
  const [isEditFormOpen, setIsEditFormOpen] = React.useState<boolean>(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] =
    React.useState<boolean>(false);

  React.useEffect(() => {
    agent.Product.list()
      .then((response) => {
        setProduct(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleClickCreate = (newProduct: Product) => {
    agent.Product.create(
      newProduct.name,
      newProduct.price,
      newProduct.description,
      newProduct.image
    )
      .then((response) => {
        setProduct([...product, response]);
        handleCloseCreateForm();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleClickDelete = (id: number) => {
    console.log(id);
    agent.Product.delete(id)
      .then((response) => {
        setProduct(product.filter((client) => client.id !== id));
        console.log(response);
        handleCloseDeleteForm();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleClickUpdate = (updatedProduct: Product) => {
    agent.Product.update(
      updatedProduct.id,
      updatedProduct.name,
      updatedProduct.price,
      updatedProduct.description,
      updatedProduct.image
    )
      .then((response) => {
        setProduct((prevProduct) =>
          prevProduct.map((product) =>
            product.id === updatedProduct.id
              ? { ...product, ...updatedProduct }
              : product
          )
        );
        console.log(response);
        handleCloseEditForm();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleOpenCreateForm = () => {
    setIsCreateFormOpen(true);
  };

  const handleCloseCreateForm = () => {
    setIsCreateFormOpen(false);
  };

  const handleOpenDeleteForm = (product: Product) => {
    setIsDeleteDialogOpen(true);
    setCurrentProduct(product);
  };
  const handleCloseDeleteForm = () => {
    setIsDeleteDialogOpen(false);
    setCurrentProduct(defaultProduct);
  };

  const handleEditProduct = (product: Product) => {
    setIsEditFormOpen(true);
    setCurrentProduct(product);
  };

  const handleCloseEditForm = () => {
    setCurrentProduct(defaultProduct);
    setIsEditFormOpen(false);
  };

  return (
    <Container maxWidth="xl">
      <Paper elevation={3} sx={{ padding: "20px 15px", margin: "2rem 0" }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h4" align="center">
              Gestión de Productos
            </Typography>

            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item>
                <Button variant="outlined" onClick={handleOpenCreateForm}>
                  Añadir producto
                </Button>
              </Grid>
            </Grid>

            <ProductTable
              initialProduct={product}
              handleDelete={handleOpenDeleteForm}
              handleEdit={handleEditProduct}
            />
            {isCreateFormOpen && (
              <CreateProductForm
                isOpen={isCreateFormOpen}
                handleClickClose={handleCloseCreateForm}
                handleClickCreate={handleClickCreate}
              />
            )}
            {isEditFormOpen && (
              <EditProductForm
                isOpen={isEditFormOpen}
                initialProduct={currentProduct}
                handleClickClose={handleCloseEditForm}
                handleClickUpdate={handleClickUpdate}
              />
            )}

            {isDeleteDialogOpen && (
              <DeleteDialog
                isOpen={isDeleteDialogOpen}
                deleteProduct={currentProduct}
                handleClickClose={handleCloseDeleteForm}
                handleClickDelete={handleClickDelete}
              />
            )}
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default AdminPage;
