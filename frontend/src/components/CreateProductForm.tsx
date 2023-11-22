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
  handleClickClose: () => void;
  handleClickCreate: (product: Product) => void;
}

const defaultProduct: Product = {
  id: 0,
  name: "",
  price: 0,
  description: "",
  image: "",
};

const CreateProductForm = ({
  isOpen,

  handleClickClose,
  handleClickCreate,
}: Props) => {
  const [open, setOpen] = React.useState(isOpen);
  const [product, setProduct] = React.useState<Product>(defaultProduct);

  const handleClientChange = (event: any) => {
    const { id, value } = event.target;
    setProduct({ ...product, [id]: value });
    console.log(product);
  };

  const handleClose = () => {
    setOpen(false);
    handleClickClose();
  };
  const handleOnSubmit = () => {
    handleClickCreate(product);
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Crear Product</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Nombres"
            type="text"
            fullWidth
            variant="standard"
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
            onChange={(e) => handleClientChange(e)}
          />
        </DialogContent>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="image"
            label="URL de imagen"
            type="text"
            fullWidth
            variant="standard"
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

export default CreateProductForm;
