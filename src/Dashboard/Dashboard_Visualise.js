import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Fade from '@mui/material/Fade';
import Dashboard from "../Dashboard/Dashboard";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import PieChart from "./Graphs/PieChart";
import { onSnapshot, collection, query } from "firebase/firestore";
import { db } from "../firebase-config";
import BarChart from "./Graphs/BarChart";
import StackedBarChart from "./Graphs/Stacked";
import Logout from "../LogInSignup/Logout";
import './dashboard_visualise.css';

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
      '#back-to-top-anchor',
    );

    if (anchor) {
      anchor.scrollIntoView({
        block: 'center',
      });
    }
  };

  return (
    <Fade in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
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

export default function Dashboard_Visualise(props){
  const usersCollectionRef = collection(db, "Inventory");
  const usersCollectionRef2 = collection(db, "Stock Levels");

  const [InventoryData, setInventoryData] = useState([]);
  const [StocksData, setStocksData] = useState([]);
  const [barData, setBarData] = useState();
  const [clientData, setClientData] = useState();
  const [supplierData, setSupplierData] = useState();
  const [pieData, setPieData] = useState();

  // for bar graph 1
  const getBarData = (data) => {
    setBarData({
      labels: data.map((d) => d.Item_Name),
      datasets: [
        {
          label: "Total Quantity",
          data: data.map((d) => d.Quantity),
          backgroundColor: getRandomColor(),
          barThickness: 50,
          maxBarThickness: 60,
        },
      ],
    });

    const rawDataQuantity = data.filter(
      (d) => d.Type === "Raw Material"
    ).length;
    const finishedGoodsQuantity = data.filter(
      (d) => d.Type === "Finished Goods"
    ).length;
    const packagingMaterialQuantity = data.filter(
      (d) => d.Type === "Packaging Material"
    ).length;
    const semiFinishedGoodsQuantity = data.filter(
      (d) => d.Type === "Semi Finished Goods"
    ).length;

    const pieChartData = {
      labels: [
        "Raw Material",
        "Finished Goods",
        "Packaging Material",
        "Semi Finished Goods",
      ],
      datasets: [
        {
          data: [
            rawDataQuantity,
            finishedGoodsQuantity,
            packagingMaterialQuantity,
            semiFinishedGoodsQuantity,
          ],
          backgroundColor: ["gold", "brown", "blue", "green"],
          borderColor: "whitesmoke",
          borderWidth: 2,
        },
      ],
    };

    setPieData(pieChartData);
  };

  const getRandomColor = () => {
    // Function to generate a random hexadecimal color
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  // for bar graph 2
  const getClientData = (data) => {
    const filteredData = data.filter((d) => d.Client.length > 1);

    // Extract unique client names
    const uniqueClients = [...new Set(filteredData.map((item) => item.Client))];

    // unique products
    const uniqueProducts = [
      ...new Set(filteredData.map((item) => item.Item_Name)),
    ];

    // Organize data per client and item
    const dataPerClient = uniqueClients.map((client) => {
      const clientData = filteredData.filter((item) => item.Client === client);

      // Calculate quantities for each product purchased by the client
      const quantities = uniqueProducts.map((product) =>
        clientData.reduce(
          (acc, val) => (val.Item_Name === product ? acc + val.Quantity : acc),
          0
        )
      );

      return {
        label: client,
        data: quantities,
        backgroundColor: getRandomColor(), // Function to generate random colors
      };
    });

    // Prepare chart data
    const chartData = {
      labels: uniqueClients, // X-axis: client names
      datasets: uniqueProducts.map((product, index) => ({
        label: product,
        data: dataPerClient.map((clientData) => clientData.data[index]), // Quantities per client for each product
        backgroundColor: getRandomColor(),
        stack: "stack",
        barThickness: 50,
        maxBarThickness: 60,
        borderColor: "whitesmoke",
        borderWidth: 2,
      })),
    };
    setClientData(chartData);
  };

  // for bar graph 3
  const getSupplierData = (data) => {
    const filteredData = data.filter((d) => d.Supplier.length > 1);

    // Extract unique supplier names
    const uniqueSuppliers = [
      ...new Set(filteredData.map((item) => item.Supplier)),
    ];

    // unique products
    const uniqueProducts = [
      ...new Set(filteredData.map((item) => item.Item_Name)),
    ];

    // Organize data per client and item
    const dataPerSupplier = uniqueSuppliers.map((supplier) => {
      const supplierData = filteredData.filter(
        (item) => item.Supplier === supplier
      );

      // Calculate quantities for each product purchased by the client
      const quantities = uniqueProducts.map((product) =>
        supplierData.reduce(
          (acc, val) => (val.Item_Name === product ? acc + val.Quantity : acc),
          0
        )
      );

      return {
        label: supplier,
        data: quantities,
        backgroundColor: getRandomColor(),
      };
    });

    // Prepare chart data
    const chartData = {
      labels: uniqueSuppliers,
      datasets: uniqueProducts.map((product, index) => ({
        label: product,
        data: dataPerSupplier.map((supplierData) => supplierData.data[index]), // Quantities per client for each product
        backgroundColor: getRandomColor(),
        stack: "stack",
        barThickness: 50,
        maxBarThickness: 60,
        borderColor: "whitesmoke",
        borderWidth: 2,
      })),
    };
    setSupplierData(chartData);
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(query(usersCollectionRef), (snapshot) => {
      const fetchedData = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setInventoryData(fetchedData);

      if (fetchedData.length > 1) {
        getBarData(fetchedData);
      }
    });

    console.log("data", InventoryData);
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const unsubscribe = onSnapshot(query(usersCollectionRef2), (snapshot) => {
      const fetchedData = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setStocksData(fetchedData);

      if (fetchedData.length > 1) {
        getClientData(fetchedData);
        getSupplierData(fetchedData);
      }
    });

    console.log("stocks data", StocksData);
    return () => unsubscribe();
  }, []);

  return (
    <ThemeProvider theme={defaultTheme}>
          <React.Fragment>
      <CssBaseline />
      <AppBar>
        <Toolbar>
          <Typography variant="h6" component="div">
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Toolbar id="back-to-top-anchor" />
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <CssBaseline />
        <Dashboard />
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            overflow: "auto",
          }}
        >
          <Toolbar />

          <Container className="containermain"
            maxWidth="lg"
          >
            <Grid container spacing={3}>
              <Grid item xs={10} md={8} lg={9}>
                <Paper className="barpaper"
                  sx={{
                    p: 2,
                  }}
                >
                  <div className='barchart' style={{ height: 350 }}>
                    {barData && (
                      <BarChart chartData={barData} value={"Items"} />
                    )}
                  </div>
                </Paper>
              </Grid>
              <Grid item xs={12} md={4} lg={3}>
                <Paper className="piepaperheight"
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div className="piechart">
                    {pieData && <PieChart chartData={pieData} />}
                  </div>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6} lg={7}>
                <Paper className="stackedpaperclient"
                  sx={{
                    p: 2,
                  }}
                >
                  <div className="stackerbarchartclient">
                    {clientData && (
                      <StackedBarChart
                        chartData={clientData}
                        value={"Client"}
                      />
                    )}
                  </div>
                </Paper>
              </Grid>

              <Grid item xs={12} md={6} lg={5}>
                <Paper className="stackersupplierpaper"
                  sx={{
                    p: 2,
                  }}
                >
                  <div className="stackedsupplier">
                    {supplierData && (
                      <StackedBarChart
                        chartData={supplierData}
                        value={"Supplier"}
                      />
                    )}
                  </div>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
      <ScrollTop {...props}>
        <Fab size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </React.Fragment>
    </ThemeProvider>
  );
};

