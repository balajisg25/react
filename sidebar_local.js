import React, { useState } from "react";
import { Sidebar, Menu, MenuItem, Submenu, Logo } from "react-mui-sidebar";
import { Tooltip } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AssessmentIcon from '@mui/icons-material/Assessment';
import ChatIcon from '@mui/icons-material/Chat';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ArticleIcon from '@mui/icons-material/Article';
import InfoIcon from '@mui/icons-material/Info';
import ChipIcon from '@mui/icons-material/Chip';
import logo from './assets/logo.png'; // Adjust the path as needed

const App = () => {
  const initialSidebarState = localStorage.getItem('isSidebarOpen') === 'false' ? false : true;
  const [isSidebarOpen, setIsSidebarOpen] = useState(initialSidebarState);

  const toggleSidebar = () => {
    const newSidebarState = !isSidebarOpen;
    setIsSidebarOpen(newSidebarState);
    localStorage.setItem('isSidebarOpen', newSidebarState);
  };

  return (
    <div>
      <button onClick={toggleSidebar}>
        {isSidebarOpen ? "Close Sidebar" : "Open Sidebar"}
      </button>
      {isSidebarOpen && (
        <Sidebar width="270px">
          <Logo img={logo}>
            AdminMart
          </Logo>
          <Menu subHeading="HOME">
            <Tooltip title="Home">
              <MenuItem link="/" badge="true" icon={<HomeIcon />}>
                Modern
              </MenuItem>
            </Tooltip>
            <Tooltip title="eCommerce">
              <MenuItem icon={<ShoppingCartIcon />}>
                eCommerce
              </MenuItem>
            </Tooltip>
            <Tooltip title="Analytical">
              <MenuItem icon={<AssessmentIcon />}>
                Analytical
              </MenuItem>
            </Tooltip>
          </Menu>
          <Menu subHeading="APPS">
            <Tooltip title="Chat">
              <MenuItem icon={<ChatIcon />}>
                Chat
              </MenuItem>
            </Tooltip>
            <Tooltip title="Calendar">
              <MenuItem icon={<CalendarTodayIcon />}>
                Calendar
              </MenuItem>
            </Tooltip>
          </Menu>
          <Menu subHeading="OTHERS">
            <Submenu title="Menu Level">
              <Tooltip title="Post">
                <MenuItem icon={<ArticleIcon />}>
                  Post
                </MenuItem>
              </Tooltip>
              <Tooltip title="Details">
                <MenuItem icon={<InfoIcon />}>
                  Details
                </MenuItem>
              </Tooltip>
              <Submenu title="Level 2">
                <Tooltip title="New">
                  <MenuItem>
                    new
                  </MenuItem>
                </Tooltip>
                <Tooltip title="Hello">
                  <MenuItem>
                    Hello
                  </MenuItem>
                </Tooltip>
              </Submenu>
            </Submenu>
            <Tooltip title="Chip">
              <MenuItem icon={<ChipIcon />}>
                Chip
              </MenuItem>
            </Tooltip>
            <Tooltip title="External Link">
              <MenuItem target="_blank" link="https://google.com">
                External Link
              </MenuItem>
            </Tooltip>
          </Menu>
          <div style={{ marginTop: 'auto', padding: '10px', textAlign: 'center', fontSize: '12px', color: '#aaa' }}>
            © 2024 AdminMart. All rights reserved.
          </div>
        </Sidebar>
      )}
    </div>
  );
};

export default App;