// ListItems.js
import * as React from 'react';
import { Link } from 'react-router-dom';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ExitToAppIcon from '@mui/icons-material/ExitToApp'; // Import ExitToApp icon
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew'; // Import your chosen icon
import Logout from '../LogInSignup/Logout'; // Import your Logout component

export const mainListItems = (
  <React.Fragment>
    <ListItemButton component={Link} to="/dashboard">
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>
    <ListItemButton component={Link} to="/inventory">
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Inventory" />
    </ListItemButton>
    <ListItemButton component={Link} to="/stocklevels">
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Stock Levels" />
    </ListItemButton>
    <ListItemButton component={Link} to="/client">
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Client" />
    </ListItemButton>
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Saved reports
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItemButton>
    {/* Add Logout button here */}
    <ListItemButton component={Logout}>
      <ListItemIcon>
        <PowerSettingsNewIcon />
      </ListItemIcon>
      <ListItemText primary="Logout" />
    </ListItemButton>
  </React.Fragment>
);


