import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Product } from "../app/models/Product";

interface Props {
  isOpen: boolean;
  initialProduct: Product;
  handleClickClose: () => void;
  handleClickUpdate: (Product: Product) => void;
}

const EditProductForm = ({
  isOpen,
  initialProduct,
  handleClickClose,
  handleClickUpdate,
}: Props) => {
  const [open, setOpen] = React.useState(isOpen);
  const [product, setProduct] = React.useState<Product>(initialProduct);

  const handleClientChange = (event: any) => {
    console.log(event);
    setProduct({ ...product, [event.target.id]: event.target.value });
  };

  const handleClose = () => {
    setOpen(false);
    handleClickClose();
  };
  const handleOnSubmit = () => {
    handleClickUpdate(product);
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Editar Producto</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Nombres"
            type="text"
            fullWidth
            variant="standard"
            value={product.name}
            onChange={(e) => handleClientChange(e)}
          />
        </DialogContent>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="price"
            label="Precio"
            type="numeric"
            fullWidth
            variant="standard"
            value={product.price.toString()}
            onChange={(e) => handleClientChange(e)}
          />
        </DialogContent>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="description"
            label="Descripción"
            type="text"
            fullWidth
            variant="standard"
            value={product.description}
            onChange={(e) => handleClientChange(e)}
          />
        </DialogContent>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="image"
            label="URL de la imagen:"
            fullWidth
            variant="standard"
            value={product.image}
            onChange={(e) => handleClientChange(e)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleOnSubmit}>Actualizar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EditProductForm;
