// import Add_item from './Components/Add_item';
// import Boxes from './Components/Boxes';
// import Table from './Components/TableBasic';
// import Navbar from '../Navbar_Top/Navbar';
// import LowStock from './Components/LowStock';
// import OutOfStock from './Components/OutOfStock';
// import GoodStock from './Components/GoodStock';

// function Inventory() {
//     return (
//         <div>
//             <Navbar />
//             <Boxes />
//             <Table />
//             <Add_item />
//             <LowStock/>
//             <OutOfStock/>
//             <GoodStock/>
//         </div>
//     );
// }

// export default Inventory;

import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
// import ClientPage from './ClientPage';
// import ClientTable from './clientTable';
import Add_item from './Components/Add_item';
import Boxes from './Components/Boxes';
import Table from './Components/TableBasic';
import Navbar from '../Navbar_Top/Navbar';
import LowStock from './Components/LowStock';
import OutOfStock from './Components/OutOfStock';
import GoodStock from './Components/GoodStock';
import TableBasic from './Components/TableBasic';
import Dashboard from '../Dashboard/Dashboard';
import Logout from '../LogInSignup/Logout';
import Fab from '@mui/material/Fab';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Fade from '@mui/material/Fade';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import PropTypes from 'prop-types';


function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Ivy Herbals
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  width: '100%',
}));
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
const defaultTheme = createTheme();

export default function Client(props) {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <React.Fragment>
    <CssBaseline />
    <AppBar>
      <Toolbar>
        <Typography variant="h6" component="div">
          Inventory
        </Typography>
      </Toolbar>
    </AppBar>
    <Toolbar id="back-to-top-anchor" />
    <Dashboard />
      <ThemeProvider theme={defaultTheme}>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />

          <Box
            component="main"
            sx={{
              flexGrow: 1,
              height: "100%",
              overflow: "auto",
            }}
          >
            <Toolbar />
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} style={{ paddingTop: "50px" }}>
                  <Paper
                    sx={{ p: 2, display: "flex", flexDirection: "column" }}
                  >
                    <Boxes />
                    <TableBasic />
                  </Paper>
                </Grid>
                <Grid item xs={12} style={{ paddingTop: "50px" }}>
                  <Paper
                    sx={{ p: 2, display: "flex", flexDirection: "column" }}
                  >
                    <OutOfStock />
                  </Paper>
                </Grid>
                <Grid item xs={12} style={{ paddingTop: "50px" }}>
                  <Paper
                    sx={{ p: 2, display: "flex", flexDirection: "column" }}
                  >
                    <LowStock />
                  </Paper>
                </Grid>
                <Grid item xs={12} style={{ paddingTop: "50px" }}>
                  <Paper
                    sx={{
                      p: 2,
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <GoodStock />
                  </Paper>
                </Grid>
                <Grid item xs={12} style={{ marginLeft: "20px" }}>
                  <Add_item />
                </Grid>
              </Grid>
              <Box sx={{ pt: 4 }}>
                <Copyright />
              </Box>
            </Container>
          </Box>
        </Box>
      </ThemeProvider>
  
    <ScrollTop {...props}>
      <Fab size="small" aria-label="scroll back to top">
        <KeyboardArrowUpIcon />
      </Fab>
    </ScrollTop>
  </React.Fragment>
  );
}
