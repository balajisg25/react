import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemText, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const Sidebar = () => {
    const [open, setOpen] = useState(false);

    // Load the initial state from localStorage
    useEffect(() => {
        const savedOpenState = localStorage.getItem('sidebarOpen');
        if (savedOpenState !== null) {
            setOpen(JSON.parse(savedOpenState));
        }
    }, []);

    // Save the state to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('sidebarOpen', JSON.stringify(open));
    }, [open]);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleDrawerOpen}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6">
                        My Application
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer open={open} onClose={handleDrawerClose}>
                <List>
                    <ListItem button onClick={handleDrawerClose}>
                        <ListItemText primary="Home" />
                    </ListItem>
                    <ListItem button onClick={handleDrawerClose}>
                        <ListItemText primary="About" />
                    </ListItem>
                    <ListItem button onClick={handleDrawerClose}>
                        <ListItemText primary="Contact" />
                    </ListItem>
                </List>
            </Drawer>
        </div>
    );
};

export default Sidebar;