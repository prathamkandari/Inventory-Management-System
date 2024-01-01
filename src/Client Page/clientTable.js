import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";

// firebase
import {
  getDocs,
  onSnapshot,
  collection,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase-config";

const ClientTable = () => {
  const [data, setData] = useState([]);

  const usersCollectionRef = collection(db, "Client");

  useEffect(
    () =>
      onSnapshot(usersCollectionRef, (snapshot) =>
        setData(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      ),
    []
  );

  return (
    <>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        <TableContainer>
          <React.Fragment>
            <Table size="small">
              <TableHead>
                <TableRow sx={{ backgroundColor: "lightgreen" }}>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    Company Name
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Location</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>GST Number</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row) => (
                  <TableRow key={row.GSTNumber}>
                    <TableCell>{row.CompanyName}</TableCell>
                    <TableCell>{row.CompanyLoc}</TableCell>
                    <TableCell>{row.GSTNumber}</TableCell>
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

export default ClientTable;
