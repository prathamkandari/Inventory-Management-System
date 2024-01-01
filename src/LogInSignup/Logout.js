import React from 'react'
import { useAuth } from "../contexts/AuthContext";
import { ListItemButton } from '@mui/material';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew'; // Import your chosen icon

function Logout() {
    const { logout } = useAuth();

    async function handleLogout() {
        try {
            await logout();

        } catch (error) {

            console.error("Logout failed:", error.message);
        }
    }
    return (
            <ListItemButton onClick={handleLogout}>
                <ListItemIcon>
                    <PowerSettingsNewIcon />
                </ListItemIcon>
                <ListItemText primary="Logout" />
            </ListItemButton>
    )
}

export default Logout