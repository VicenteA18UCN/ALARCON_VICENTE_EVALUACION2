import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import exp from "constants";
import { Product } from "../app/models/Product";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Icon, IconButton } from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

interface Props {
  initialProduct: Product[];
  handleDelete: (product: Product) => void;
  handleEdit: (product: Product) => void;
}

const ClientsTable = ({ initialProduct, handleDelete, handleEdit }: Props) => {
  const [products, setProducts] = React.useState<Product[]>(initialProduct);

  React.useEffect(() => {
    setProducts(initialProduct);
  }, [initialProduct]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Nombre</StyledTableCell>

            <StyledTableCell align="center">Precio</StyledTableCell>
            <StyledTableCell align="center">Descripción</StyledTableCell>
            <StyledTableCell align="center">Imagen</StyledTableCell>
            <StyledTableCell align="center">Acciones</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <StyledTableRow key={product.id}>
              <StyledTableCell component="th" scope="row" align="center">
                {product.name}
              </StyledTableCell>
              <StyledTableCell align="center">{product.price}</StyledTableCell>
              <StyledTableCell align="center">
                {product.description}
              </StyledTableCell>
              <StyledTableCell align="center">
                <img src={product.image}></img>
              </StyledTableCell>
              <StyledTableCell align="center">
                <IconButton
                  aria-label="edit"
                  size="small"
                  onClick={() => handleEdit(product)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  aria-label="delete"
                  size="small"
                  color="error"
                  onClick={() => handleDelete(product)}
                >
                  <DeleteIcon />
                </IconButton>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ClientsTable;
