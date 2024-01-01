import React, { useState } from "react";
import { db } from "../firebase-config";
import { collection, addDoc } from "firebase/firestore";
import { TextField, Button, Container, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";

const Client = () => {
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [gst, setGst] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "Client"), {
        CompanyName: company,
        CompanyLoc: location,
        GSTNumber: gst,
      });
    } catch (err) {
      alert(err);
    }
    setCompany("");
    setLocation("");
    setGst("");
  };

  return (
    <Container maxWidth="sm">
      <Typography component="h2" variant="h6" gutterBottom>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                type="text"
                variant="outlined"
                color="success"
                size="normal"
                label="Company Name"
                onChange={(e) => setCompany(e.target.value)}
                value={company}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="text"
                size="normal"
                variant="outlined"
                color="success"
                label="Location"
                onChange={(e) => setLocation(e.target.value)}
                value={location}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="text"
                variant="outlined"
                color="success"
                label="GST Number"
                onChange={(e) => setGst(e.target.value)}
                value={gst}
                fullWidth
                required
                inputProps={{ maxLength: 15 }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="success"
                type="submit"
                sx={{
                  backgroundColor: "lightgreen",
                  color: "black",
                  fontWeight: "bold",
                }}
              >
                Add Entry
              </Button>
            </Grid>
          </Grid>
        </form>
      </Typography>
    </Container>
  );
};

export default Client;
