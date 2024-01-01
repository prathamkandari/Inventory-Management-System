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
  query,
  orderBy,
  where,
} from "firebase/firestore";
import { db } from "../../firebase-config";
import { TextField, MenuItem } from "@mui/material";

// const TableCell = (TableCell)(({ theme }) => ({
//   "&.MuiTableCell-head": {
//     backgroundColor: theme.palette.common.black,
//     color: theme.palette.common.white,
//   },
//   "&.MuiTableCell-body": {
//     fontSize: 14,
//   },
// }));

// const TableRow = (TableRow)(({ theme }) => ({
//   "&:nth-of-type(odd)": {
//     backgroundColor: theme.palette.action.hover,
//   },
//   // hide last border
//   "&:last-child td, &:last-child th": {
//     border: 0,
//   },
// }));

const LowStock = () => {
  const [data, setData] = useState([]);

  const usersCollectionRef = collection(db, "Inventory");

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        usersCollectionRef,
        where("Quantity", ">", 0),
        where("Quantity", "<", 50)
      ),
      (snapshot) => {
        setData(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      }
    );

    return () => unsubscribe();
  }, []);

  const handleDownload = () => {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Low Stock");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const dataBlob = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });
    const fileName = "low_stock.xlsx";

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
    <>
      {/* <div>
        <h3
          style={{
            fontWeight: "bold",
            display: "flex",
            justifyContent: "center",
            borderRadius: "20px",
          }}
        >
          Low Stock
        </h3>
      </div> */}
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        <h4>Low Stock</h4>
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
                  <TableRow key={row.ID}>
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

export default LowStock;
