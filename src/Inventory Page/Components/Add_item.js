import React, { useState } from "react";
import { db } from "../../firebase-config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import {
  Button,
  Dialog,
  DialogContent,
  TextField,
  MenuItem,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

const Add_item = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    uniqueId: "",
    itemName: "",
    type: "Raw Material",
    quantity: "",
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const sendData = async (e) => {
    e.preventDefault();
    try {
      // adding entry to the inventory table
      await addDoc(collection(db, "Inventory"), {
        Item_Name: formData.itemName,
        ID: formData.uniqueId,
        Type: formData.type,
        Quantity: 0,
        Timestamp: serverTimestamp(),
      });

      // onClose()
    } catch (err) {
      alert(err);
    }
    // Clear the form data after successful submission
    setFormData({
      itemName: "",
      type: "",
      uniqueId: "",
      quantity: "",
      // Clear other form fields as needed
    });
  };

  return (
    <div style={{ marginTop: "12px" }}>
      <Button variant="contained" color="success" onClick={handleOpen}>
        Add Item
      </Button>

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
            Add Item
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
            <form onSubmit={sendData}>
              <div style={{ marginTop: "30px" }}>
                <TextField
                  variant="outlined"
                  color="success"
                  type="text"
                  name="uniqueId"
                  value={formData.uniqueId}
                  label="Unique ID"
                  style={{ background: "white", borderRadius: "5px" }}
                  fullWidth
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div style={{ marginTop: "30px" }}>
                <TextField
                  variant="outlined"
                  color="success"
                  name="itemName"
                  label="Item Name"
                  value={formData.itemName}
                  placeholder=""
                  style={{ background: "white", borderRadius: "5px" }}
                  fullWidth
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div style={{ marginTop: "30px" }}>
                <TextField
                  variant="outlined"
                  color="success"
                  select
                  name="type"
                  value={formData.type}
                  fullWidth
                  onChange={handleInputChange}
                  label="Select the Type"
                >
                  <MenuItem value="Raw Material">Raw Material</MenuItem>
                  <MenuItem value="Semi Finished Goods">
                    Semi Finished Goods
                  </MenuItem>
                  <MenuItem value="Finished Goods">Finished Goods</MenuItem>
                  <MenuItem value="Packaging Material">
                    Packaging Material
                  </MenuItem>
                </TextField>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  margin: "40px",
                }}
              >
                <Button
                  size="large"
                  variant="contained"
                  color="success"
                  type="submit"
                  value="Send"
                  fullWidth
                >
                  Add
                </Button>
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Add_item;
