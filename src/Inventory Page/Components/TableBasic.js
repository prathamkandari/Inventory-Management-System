import React, { useState, useEffect } from "react";
import {} from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import * as XLSX from "xlsx";
import DownloadIcon from "@mui/icons-material/Download";

// firebase
import {
  getDocs,
  onSnapshot,
  collection,
  updateDoc,
  doc,
  query,
  orderBy,
  where,
} from "firebase/firestore";
import { db } from "../../firebase-config";
import { TextField, MenuItem } from "@mui/material";

const TableBasic = () => {
  const [data, setData] = useState([]);
  const usersCollectionRef = collection(db, "Inventory");

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(usersCollectionRef, orderBy("Timestamp", "desc")),
      (snapshot) => {
        setData(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      }
    );

    return () => unsubscribe();
  }, []);

  const [selectedItem, setSelectedItem] = useState(null);

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

  const handleDownload = () => {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Total Stock");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const dataBlob = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });
    const fileName = "total_stock.xlsx";

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

  const handleShow = (selectedItem) => {
    console.log(selectedItem);
    const selectedItemData = data.filter(
      (item) => item.Item_Name === selectedItem
    );
    const newData = data.filter((item) => item.Item_Name !== selectedItem);
    setData([...selectedItemData, ...newData]);
  };

  const handleSearchSelect = (selectedItem) => {
    setSearchTerm(selectedItem);
    setSearchOpen(false);

    if (selectedItem) {
      handleShow(selectedItem);
    }
  };

  return (
    <>
      <div
        style={{
          margin: "30px",
        }}
      >
        <TextField
          variant="outlined"
          color="success"
          type="text"
          label="Search Item Name"
          value={searchTerm}
          size="small"
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
                <MenuItem
                  key={index}
                  onClick={() => handleSearchSelect(result)}
                >
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
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        <TableContainer>
          <React.Fragment>
            <Table size="small">
              <TableHead>
                <TableRow sx={{ backgroundColor: "lightgreen" }}>
                  <TableCell style={{ fontWeight: "bold" }}>
                    Item Name
                  </TableCell>
                  <TableCell style={{ fontWeight: "bold" }}>Item ID</TableCell>
                  <TableCell style={{ fontWeight: "bold" }}>Type</TableCell>
                  <TableCell style={{ fontWeight: "bold" }}>Quantity</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row) => (
                  <TableRow
                    key={row.ID}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.Item_Name}
                    </TableCell>
                    <TableCell>{row.ID}</TableCell>
                    <TableCell>{row.Type}</TableCell>
                    <TableCell>{row.Quantity}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </React.Fragment>
        </TableContainer>
      </Typography>
    </>
  );
};

export default TableBasic;
