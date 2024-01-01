import React, { useState, useEffect } from "react";
import Dashboard from "../Dashboard/Dashboard";
import "./StockLevel.css";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import {} from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import NorthIcon from "@mui/icons-material/North";
import SouthIcon from "@mui/icons-material/South";
import dayjs from "dayjs";
import Typography from "@mui/material/Typography";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { useAuth } from "../contexts/AuthContext";
import Logout from "../LogInSignup/Logout";
import Fab from "@mui/material/Fab";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Fade from "@mui/material/Fade";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import PropTypes from "prop-types";
import * as XLSX from "xlsx";
import DownloadIcon from "@mui/icons-material/Download";

import {
  Button,
  Dialog,
  DialogContent,
  TextField,
  MenuItem,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

// firebase
import {
  getDocs,
  onSnapshot,
  collection,
  updateDoc,
  addDoc,
  getDoc,
  doc,
  query,
  where,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import app, { auth, db } from "../firebase-config";

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  width: "100%",
}));

const defaultTheme = createTheme();

function ScrollTop(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      "#back-to-top-anchor"
    );

    if (anchor) {
      anchor.scrollIntoView({
        block: "center",
      });
    }
  };

  return (
    <Fade in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: "fixed", bottom: 16, right: 16 }}
      >
        {children}
      </Box>
    </Fade>
  );
}

ScrollTop.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};

const StockLevels = (props) => {
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [inventoryItems, setInventoryItems] = useState([]);

  const [open, setOpen] = useState(false);

  const [formData, setFormData] = useState({
    id: "",
    ID: "",
    Item_Name: "",
    Type: "",
    Client: "",
    Supplier: "",
    Quantity: 0,
    Date: serverTimestamp(),
    Stock: "",
  });

  // get firebase collection
  const usersCollectionRef = collection(db, "Stock Levels");

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(usersCollectionRef, orderBy("Date", "desc")),
      (snapshot) => {
        setData(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      }
    );

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchInventoryItems = async () => {
      const inventoryCollectionRef = collection(db, "Inventory");
      const querySnapshot = await getDocs(inventoryCollectionRef);
      const items = querySnapshot.docs.map((doc) => doc.data());
      setInventoryItems(items);
    };

    fetchInventoryItems();
    console.log(inventoryItems);
  }, []);

  // Function to handle the edit action for a row
  const handleEdit = (item) => {
    console.log(item);
    setFormData({
      ...formData,
      id: item.id,
      Item_Name: item.Item_Name,
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (e) => {
    console.log(e.target);
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const updateData = async (e) => {
    e.preventDefault();

    // using query to get data
    const inventoryCollectionRef = collection(db, "Inventory");
    const q = query(
      inventoryCollectionRef,
      where("Item_Name", "==", formData.Item_Name)
    );

    const querySnapshot = await getDocs(q);
    const userDoc = querySnapshot.docs[0].ref;

    const dataInventory = querySnapshot.docs[0].data();

    const data = (await getDoc(userDoc)).data();
    // getting a single row

    const newFields = {
      ID: data.ID,
      Item_Name: data.Item_Name,
      Type: data.Type,
      Quantity: parseInt(formData.Quantity),
      Client: formData.Client,
      Supplier: formData.Supplier,
      Date: formData.Date,
      Stock: formData.Client.length > 0 ? "Stock Out" : "Stock In",
    };

    const updatedQuantity = {
      Quantity:
        formData.Client.length > 0
          ? dataInventory.Quantity - parseInt(formData.Quantity)
          : dataInventory.Quantity + parseInt(formData.Quantity),
    };

    try {
      await addDoc(usersCollectionRef, newFields);
      await updateDoc(userDoc, updatedQuantity);
    } catch (err) {
      console.log(err);
    }

    setOpen(false);

    setFormData({
      id: "",
      ID: "",
      Item_Name: "",
      Type: "",
      Client: "",
      Supplier: "",
      Quantity: "",
      Date: serverTimestamp(),
      Stock: "",
    });
  };

  const [formValid, setFormValid] = useState(false);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    const validateForm = () => {
      console.log(formData.Quantity);
      const { Client, Supplier, Quantity, Date } = formData;
      const isQuantityValid = Quantity > 0;
      const isDateValid = Date !== "";
      const isClientOrSupplierValid =
        Client.trim().length > 0 && Supplier.trim().length > 0;

      setFormValid(isQuantityValid && isDateValid && !isClientOrSupplierValid);

      if (!isQuantityValid || !isDateValid) {
        setFormError("Quantity and Date are required.");
      } else if (isClientOrSupplierValid) {
        setFormError("Enter Client Name or Supplier Name.");
      } else {
        setFormError("");
      }
    };

    validateForm();
  }, [formData]);

  // search functionality
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchOpen, setSearchOpen] = useState(false);

  const handleSearch = async (searchTerm) => {
    setSearchTerm(searchTerm);
    const inventoryCollectionRef = collection(db, "Inventory");
    const q = query(
      inventoryCollectionRef,
      where("Item_Name", ">=", searchTerm),
      where("Item_Name", "<=", searchTerm + "\uf8ff")
    );

    const querySnapshot = await getDocs(q);
    const items = querySnapshot.docs.map((doc) => doc.data().Item_Name);
    setSearchResults(items);
    setSearchOpen(true);
  };

  const handleSearchSelect = (selectedItem) => {
    setSearchTerm(selectedItem);
    setSearchOpen(false);
    const selectedItemData = inventoryItems.find(
      (item) => item.Item_Name === selectedItem
    );
    if (selectedItemData) {
      handleEdit(selectedItemData);
    }
  };

  const handleDownload = () => {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Stock Levels");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const dataBlob = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });
    const fileName = "stock_levels.xlsx";

    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      // For IE
      window.navigator.msSaveOrOpenBlob(dataBlob, fileName);
    } else {
      const url = window.URL.createObjectURL(dataBlob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar>
        <Toolbar>
          <Typography variant="h6" component="div">
            Stock Levels
          </Typography>
        </Toolbar>
      </AppBar>
      <Toolbar id="back-to-top-anchor" />
      <ThemeProvider theme={defaultTheme}>
        <Box>
          <CssBaseline />
          <Dashboard />

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              margin: "0px 30px 30px",
              marginBottom: "10px",
              alignContent: "center",
              alignItems: "center",
            }}
          >
            <TextField
              style={{ marginTop: "30px" }}
              variant="outlined"
              color="success"
              type="text"
              label="Search Item Name"
              size="small"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
            />
            {searchOpen && searchResults.length > 0 && (
              <div
                style={{
                  width: "225px",
                  borderRadius: "10px",
                  backgroundColor: "hsl(121, 90%, 88%)",
                }}
              >
                {searchResults.map((result, index) => (
                  <div key={index}>
                    <MenuItem onClick={() => handleSearchSelect(result)}>
                      {result}
                    </MenuItem>
                    {index !== searchResults.length - 1 && (
                      <div
                        style={{
                          borderBottom: "1px solid gray",
                          margin: "-2px 10px",
                        }}
                      />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* <TableContainer component={Paper}> */}
          <TableContainer
            maxWidth="lg"
            sx={{ mt: 4, mb: 4 }}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Paper sx={{ p: 2, height: "100%", width: "90%" }}>
              {/* <React.Fragment> */}
              <div
                variant="contained"
                color="primary"
                onClick={handleDownload}
                style={{
                  display: "flex",
                  justifyContent: "right",
                  cursor: "pointer",
                }}
              >
                <DownloadIcon style={{ color: "#1976d2", fontSize: "30px" }} />
              </div>
              <Table size="small">
                {/* <Table sx={{ minWidth: 650 }} aria-label="simple table"> */}
                <TableHead>
                  {/* <TableRow> */}
                  <TableRow sx={{ backgroundColor: "lightgreen" }}>
                    <TableCell style={{ fontWeight: "bold" }} align="right">
                      ID
                    </TableCell>
                    <TableCell style={{ fontWeight: "bold" }} align="right">
                      Item Name
                    </TableCell>
                    <TableCell style={{ fontWeight: "bold" }} align="right">
                      Quantity
                    </TableCell>
                    <TableCell style={{ fontWeight: "bold" }} align="right">
                      Type
                    </TableCell>
                    <TableCell style={{ fontWeight: "bold" }} align="right">
                      Supplier
                    </TableCell>
                    <TableCell style={{ fontWeight: "bold" }} align="right">
                      Client
                    </TableCell>
                    <TableCell style={{ fontWeight: "bold" }} align="right">
                      Date
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {data.map((item) => (
                    <TableRow
                      key={item.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="right" scope="row">
                        {item.ID ? item.ID : "-"}
                      </TableCell>
                      <TableCell align="right">
                        {item.Item_Name ? item.Item_Name : "-"}
                      </TableCell>
                      <TableCell align="right">
                        {item.Quantity ? item.Quantity : "-"}
                        {item.Stock === "Stock In" && (
                          <NorthIcon style={{ color: "green", fontSize: 18 }} />
                        )}
                        {item.Stock === "Stock Out" && (
                          <SouthIcon style={{ color: "red", fontSize: 18 }} />
                        )}
                      </TableCell>
                      <TableCell align="right">
                        {item.Type ? item.Type : "-"}
                      </TableCell>
                      <TableCell align="right">
                        {item.Supplier ? item.Supplier : "-"}
                      </TableCell>
                      <TableCell align="right">
                        {item.Client ? item.Client : "-"}
                      </TableCell>
                      <TableCell align="right">
                        {item.Date
                          ? item.Date.toDate().toString().slice(0, 16)
                          : "-"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          </TableContainer>

          {/* dialog box */}
          <Dialog open={open} onClose={handleClose} fullWidth>
            <DialogContent>
              <h3
                style={{
                  fontWeight: "bold",
                  display: "flex",
                  justifyContent: "center",
                  borderRadius: "20px",
                }}
              >
                Update Quantity
              </h3>

              <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                  position: "absolute",
                  right: 20,
                  top: 15,
                  color: (theme) => theme.palette.grey[500],
                }}
              >
                <CloseIcon />
              </IconButton>

              <div style={{ margin: "20px 30px", padding: "0px 10px" }}>
                <form>
                  <div style={{ marginTop: "30px" }}>
                    <TextField
                      variant="outlined"
                      color="success"
                      type="text"
                      name="Client"
                      value={formData.Client}
                      label="Client Name"
                      style={{ background: "white", borderRadius: "5px" }}
                      fullWidth
                      onChange={handleInputChange}
                    />
                  </div>

                  <div style={{ marginTop: "30px" }}>
                    <TextField
                      variant="outlined"
                      color="success"
                      name="Supplier"
                      label="Supplier Name"
                      value={formData.Supplier}
                      placeholder=""
                      style={{ background: "white", borderRadius: "5px" }}
                      fullWidth
                      onChange={handleInputChange}
                    />
                  </div>

                  <div style={{ marginTop: "30px" }}>
                    <TextField
                      variant="outlined"
                      color="success"
                      name="Quantity"
                      placeholder={formData.Quantity}
                      label="Quantity"
                      style={{ background: "white", borderRadius: "5px" }}
                      fullWidth
                      onChange={handleInputChange}
                    />
                  </div>

                  {formError && (
                    <div
                      style={{
                        color: "red",
                        textAlign: "center",
                        margin: "10px 0",
                      }}
                    >
                      {formError}
                    </div>
                  )}

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      paddingTop: "40px",
                    }}
                  >
                    <Button
                      size="large"
                      variant="contained"
                      color="success"
                      type="submit"
                      value="Send"
                      fullWidth
                      onClick={updateData}
                      disabled={!formValid}
                    >
                      Update
                    </Button>
                  </div>
                </form>
              </div>
            </DialogContent>
          </Dialog>
        </Box>
      </ThemeProvider>

      <ScrollTop {...props}>
        <Fab size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </React.Fragment>
  );
};

export default StockLevels;
