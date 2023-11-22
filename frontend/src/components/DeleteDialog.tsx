import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Product } from "../app/models/Product";

interface Props {
  isOpen: boolean;
  deleteProduct: Product;
  handleClickClose: () => void;
  handleClickDelete: (id: number) => void;
}
const DeleteDialog = ({
  isOpen,
  deleteProduct,
  handleClickClose,
  handleClickDelete,
}: Props) => {
  const [open, setOpen] = React.useState(isOpen);
  const [product, setProduct] = React.useState<Product>(deleteProduct);

  const handleOnSubmit = () => {
    handleClickDelete(product.id);
    handleClose();
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"¿Estas seguro?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Esta acción es irreversible. ¿Estas seguro de que quieres eliminar?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickClose}>Cancelar</Button>
          <Button onClick={handleOnSubmit} autoFocus>
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteDialog;
