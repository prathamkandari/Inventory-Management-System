import React, { useState, useEffect } from "react";
import { Paper, Typography } from "@mui/material";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase-config";


function Boxes() {
  const [lowStockCount, setLowStockCount] = useState(0);
  const [outOfStockCount, setOutOfStockCount] = useState(0);
  const [goodStockCount, setGoodStockCount] = useState(0);
  const [totalCount, settotalCount] = useState(0);

  useEffect(() => {
    const fetchInventoryData = async () => {
      try {
        const inventoryCollectionRef = collection(db, "Inventory");
        const querySnapshot = await getDocs(inventoryCollectionRef);

        let lowStock = 0;
        let outOfStock = 0;
        let goodStock = 0;
        let totalItems = 0;

        querySnapshot.forEach((doc) => {
          const { Quantity } = doc.data();

          if (Quantity < 50 && Quantity > 0) {
            lowStock++;
          } else if (Quantity === 0) {
            outOfStock++;
          } else if (Quantity >= 50) {
            goodStock++;
          }

          totalItems++;
        });

        setLowStockCount(lowStock);
        setOutOfStockCount(outOfStock);
        setGoodStockCount(goodStock);
        settotalCount(totalItems);
      } catch (error) {
        console.error("Error fetching inventory data:", error);
      }
    };

    fetchInventoryData();
  }, []);

  return (
  
    <div
      style={{ display: "flex", justifyContent: "center", marginTop:"10px",  flexWrap: "wrap"}}
    >
      <Paper elevation={3} style={{ flex: 1, padding: 20, margin: 10 }}>
        <Typography variant="h6">Low Stock</Typography>
        <Typography variant="body1">{lowStockCount}</Typography>
      </Paper>
      <Paper elevation={3} style={{ flex: 1, padding: 20, margin: 10 }}>
        <Typography variant="h6">Out of Stock</Typography>
        <Typography variant="body1">{outOfStockCount}</Typography>
      </Paper>
      <Paper elevation={3} style={{ flex: 1, padding: 20, margin: 10 }}>
        <Typography variant="h6">Total Items</Typography>
        {/* You might want to fetch and display total items count here */}
        <Typography variant="body1">{totalCount}</Typography>
      </Paper>
      <Paper elevation={3} style={{ flex: 1, padding: 20, margin: 10 }}>
        <Typography variant="h6">Good Stock</Typography>
        <Typography variant="body1">{goodStockCount}</Typography>
      </Paper>
    </div>
  );
}

export default Boxes;
