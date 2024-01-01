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
import ClientPage from './ClientPage';
import ClientTable from './clientTable';
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
        Your Website
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
          Client Page
        </Typography>
      </Toolbar>
    </AppBar>
    <Toolbar id="back-to-top-anchor" />
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Dashboard />

        <Box component="main" sx={{ flexGrow: 1, overflow: "hidden" }}>
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper
                  sx={{
                    p: 2,
                    height: "100%",
                  }}
                >
                  <ClientPage />
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper sx={{ p: 2, height: "100%" }}>
                  <ClientTable />
                </Paper>
              </Grid>
            </Grid>
            <Box sx={{ pt: 4 }}>
              <Typography variant="body2" color="text.secondary" align="center">
                {"Copyright "}
                <Link color="inherit" href="https://mui.com/">
                  © Ivy Herbals
                </Link>{" "}
                {new Date().getFullYear()}
                {"."}
              </Typography>
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
