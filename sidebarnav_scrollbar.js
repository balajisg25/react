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
import LogoutIcon from '@mui/icons-material/Logout';
import logo from './assets/logo.png'; // Adjust the path as needed

const App = () => {
  const initialSidebarState = localStorage.getItem('isSidebarOpen') === 'false' ? false : true;
  const [isSidebarOpen, setIsSidebarOpen] = useState(initialSidebarState);
  const [selectedItem, setSelectedItem] = useState(""); // State to track the selected menu item

  const toggleSidebar = () => {
    const newSidebarState = !isSidebarOpen;
    setIsSidebarOpen(newSidebarState);
    localStorage.setItem('isSidebarOpen', newSidebarState);
  };

  const handleMenuItemClick = (item) => {
    setSelectedItem(item);
  };

  const currentYear = new Date().getFullYear();

  // Check if the user is logged in
  const isUserLoggedIn = localStorage.getItem('userSession') !== null;

  // Handle user logout
  const handleLogout = () => {
    // Clear the session from localStorage
    localStorage.removeItem('userSession');
    // Optionally, redirect the user or update state here
    window.location.reload(); // Reload the page to reflect changes
  };

  return (
    <div>
      {isSidebarOpen && (
        <Sidebar
          width="270px"
          style={{
            height: "100vh", // Ensure the sidebar takes full height of the viewport
            overflowY: "auto", // Allow scrolling
            scrollbarWidth: "thin", // Firefox scrollbar styling
            scrollbarColor: "#888 #f0f0f0", // Firefox scrollbar colors
          }}
        >
          <div onClick={toggleSidebar} style={{ cursor: 'pointer' }}>
            <Logo img={logo}>
              AdminMart
            </Logo>
          </div>
          <Menu subHeading="HOME">
            <Tooltip title="Home">
              <MenuItem
                link="/"
                badge="true"
                icon={<HomeIcon />}
                style={{ backgroundColor: selectedItem === "Home" ? "#f0f0f0" : "transparent" }}
                onClick={() => handleMenuItemClick("Home")}
              >
                Modern
              </MenuItem>
            </Tooltip>
            <Tooltip title="eCommerce">
              <MenuItem
                icon={<ShoppingCartIcon />}
                style={{ backgroundColor: selectedItem === "eCommerce" ? "#f0f0f0" : "transparent" }}
                onClick={() => handleMenuItemClick("eCommerce")}
              >
                eCommerce
              </MenuItem>
            </Tooltip>
            <Tooltip title="Analytical">
              <MenuItem
                icon={<AssessmentIcon />}
                style={{ backgroundColor: selectedItem === "Analytical" ? "#f0f0f0" : "transparent" }}
                onClick={() => handleMenuItemClick("Analytical")}
              >
                Analytical
              </MenuItem>
            </Tooltip>
          </Menu>
          <Menu subHeading="APPS">
            <Tooltip title="Chat">
              <MenuItem
                icon={<ChatIcon />}
                style={{ backgroundColor: selectedItem === "Chat" ? "#f0f0f0" : "transparent" }}
                onClick={() => handleMenuItemClick("Chat")}
              >
                Chat
              </MenuItem>
            </Tooltip>
            <Tooltip title="Calendar">
              <MenuItem
                icon={<CalendarTodayIcon />}
                style={{ backgroundColor: selectedItem === "Calendar" ? "#f0f0f0" : "transparent" }}
                onClick={() => handleMenuItemClick("Calendar")}
              >
                Calendar
              </MenuItem>
            </Tooltip>
          </Menu>
          <Menu subHeading="OTHERS">
            <Submenu title="Menu Level">
              <Tooltip title="Post">
                <MenuItem
                  icon={<ArticleIcon />}
                  style={{ backgroundColor: selectedItem === "Post" ? "#f0f0f0" : "transparent" }}
                  onClick={() => handleMenuItemClick("Post")}
                >
                  Post
                </MenuItem>
              </Tooltip>
              <Tooltip title="Details">
                <MenuItem
                  icon={<InfoIcon />}
                  style={{ backgroundColor: selectedItem === "Details" ? "#f0f0f0" : "transparent" }}
                  onClick={() => handleMenuItemClick("Details")}
                >
                  Details
                </MenuItem>
              </Tooltip>
              <Submenu title="Level 2">
                <Tooltip title="New">
                  <MenuItem
                    style={{ backgroundColor: selectedItem === "New" ? "#f0f0f0" : "transparent" }}
                    onClick={() => handleMenuItemClick("New")}
                  >
                    new
                  </MenuItem>
                </Tooltip>
                <Tooltip title="Hello">
                  <MenuItem
                    style={{ backgroundColor: selectedItem === "Hello" ? "#f0f0f0" : "transparent" }}
                    onClick={() => handleMenuItemClick("Hello")}
                  >
                    Hello
                  </MenuItem>
                </Tooltip>
              </Submenu>
            </Submenu>
            <Tooltip title="Chip">
              <MenuItem
                icon={<ChipIcon />}
                style={{ backgroundColor: selectedItem === "Chip" ? "#f0f0f0" : "transparent" }}
                onClick={() => handleMenuItemClick("Chip")}
              >
                Chip
              </MenuItem>
            </Tooltip>
            <Tooltip title="External Link">
              <MenuItem
                target="_blank"
                link="https://google.com"
                style={{ backgroundColor: selectedItem === "External Link" ? "#f0f0f0" : "transparent" }}
                onClick={() => handleMenuItemClick("External Link")}
              >
                External Link
              </MenuItem>
            </Tooltip>
          </Menu>
          <div style={{ marginTop: 'auto', padding: '10px', textAlign: 'center', fontSize: '12px', color: '#aaa' }}>
            © {currentYear} AdminMart. All rights reserved.
          </div>
          {isUserLoggedIn && (
            <button
              onClick={handleLogout}
              style={{
                position: 'absolute',
                bottom: '10px',
                width: '100%',
                border: 'none',
                background: 'none',
                cursor: 'pointer',
                color: '#f44336',
                fontSize: '14px',
                textAlign: 'center'
              }}
            >
              <LogoutIcon /> Logout
            </button>
          )}
        </Sidebar>
      )}
    </div>
  );
};

export default App;



---------------

::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-thumb {
  background-color: #888; 
  border-radius: 10px;
}

::-webkit-scrollbar-track {
  background-color: #f0f0f0; 
}


----
2308
import React, { useState } from "react";
import { Sidebar, Menu, MenuItem, Submenu } from "react-mui-sidebar";
import { Tooltip } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AssessmentIcon from "@mui/icons-material/Assessment";
import ChatIcon from "@mui/icons-material/Chat";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ArticleIcon from "@mui/icons-material/Article";
import InfoIcon from "@mui/icons-material/Info";
import ChipIcon from "@mui/icons-material/Chip";
import LogoutIcon from "@mui/icons-material/Logout";
import logo from "./assets/logo.png"; // Adjust the path as needed

const App = () => {
  const initialSidebarState = localStorage.getItem("isSidebarOpen") !== "false";
  const [isSidebarOpen, setIsSidebarOpen] = useState(initialSidebarState);
  const [selectedItem, setSelectedItem] = useState("");

  const toggleSidebar = () => {
    const newSidebarState = !isSidebarOpen;
    setIsSidebarOpen(newSidebarState);
    localStorage.setItem("isSidebarOpen", newSidebarState);
  };

  const handleMenuItemClick = (item) => {
    setSelectedItem(item);
  };

  const currentYear = new Date().getFullYear();
  const isUserLoggedIn = localStorage.getItem("userSession") !== null;

  const handleLogout = () => {
    localStorage.removeItem("userSession");
    window.location.reload();
  };

  return (
    <div>
      {isSidebarOpen && (
        <Sidebar
          width="270px"
          style={{
            height: "100vh",
            overflowY: "auto",
            scrollbarWidth: "thin",
            scrollbarColor: "#888 #f0f0f0",
          }}
        >
          <Tooltip title="Toggle Sidebar" placement="right">
            <div onClick={toggleSidebar} style={{ cursor: "pointer", textAlign: "center", padding: "20px 0" }}>
              <img src={logo} alt="AdminMart Logo" style={{ maxWidth: "150px" }} />
            </div>
          </Tooltip>
          <Menu subHeading="HOME">
            <Tooltip title="Home">
              <MenuItem
                link="/"
                badge="true"
                icon={<HomeIcon />}
                style={{ backgroundColor: selectedItem === "Home" ? "#f0f0f0" : "transparent" }}
                onClick={() => handleMenuItemClick("Home")}
              >
                Modern
              </MenuItem>
            </Tooltip>
            <Tooltip title="eCommerce">
              <MenuItem
                icon={<ShoppingCartIcon />}
                style={{ backgroundColor: selectedItem === "eCommerce" ? "#f0f0f0" : "transparent" }}
                onClick={() => handleMenuItemClick("eCommerce")}
              >
                eCommerce
              </MenuItem>
            </Tooltip>
            <Tooltip title="Analytical">
              <MenuItem
                icon={<AssessmentIcon />}
                style={{ backgroundColor: selectedItem === "Analytical" ? "#f0f0f0" : "transparent" }}
                onClick={() => handleMenuItemClick("Analytical")}
              >
                Analytical
              </MenuItem>
            </Tooltip>
          </Menu>
          <Menu subHeading="APPS">
            <Tooltip title="Chat">
              <MenuItem
                icon={<ChatIcon />}
                style={{ backgroundColor: selectedItem === "Chat" ? "#f0f0f0" : "transparent" }}
                onClick={() => handleMenuItemClick("Chat")}
              >
                Chat
              </MenuItem>
            </Tooltip>
            <Tooltip title="Calendar">
              <MenuItem
                icon={<CalendarTodayIcon />}
                style={{ backgroundColor: selectedItem === "Calendar" ? "#f0f0f0" : "transparent" }}
                onClick={() => handleMenuItemClick("Calendar")}
              >
                Calendar
              </MenuItem>
            </Tooltip>
          </Menu>
          <Menu subHeading="OTHERS">
            <Submenu title="Menu Level">
              <Tooltip title="Post">
                <MenuItem
                  icon={<ArticleIcon />}
                  style={{ backgroundColor: selectedItem === "Post" ? "#f0f0f0" : "transparent" }}
                  onClick={() => handleMenuItemClick("Post")}
                >
                  Post
                </MenuItem>
              </Tooltip>
              <Tooltip title="Details">
                <MenuItem
                  icon={<InfoIcon />}
                  style={{ backgroundColor: selectedItem === "Details" ? "#f0f0f0" : "transparent" }}
                  onClick={() => handleMenuItemClick("Details")}
                >
                  Details
                </MenuItem>
              </Tooltip>
              <Submenu title="Level 2">
                <Tooltip title="New">
                  <MenuItem
                    style={{ backgroundColor: selectedItem === "New" ? "#f0f0f0" : "transparent" }}
                    onClick={() => handleMenuItemClick("New")}
                  >
                    new
                  </MenuItem>
                </Tooltip>
                <Tooltip title="Hello">
                  <MenuItem
                    style={{ backgroundColor: selectedItem === "Hello" ? "#f0f0f0" : "transparent" }}
                    onClick={() => handleMenuItemClick("Hello")}
                  >
                    Hello
                  </MenuItem>
                </Tooltip>
              </Submenu>
            </Submenu>
            <Tooltip title="Chip">
              <MenuItem
                icon={<ChipIcon />}
                style={{ backgroundColor: selectedItem === "Chip" ? "#f0f0f0" : "transparent" }}
                onClick={() => handleMenuItemClick("Chip")}
              >
                Chip
              </MenuItem>
            </Tooltip>
            <Tooltip title="External Link">
              <MenuItem
                target="_blank"
                link="https://google.com"
                style={{ backgroundColor: selectedItem === "External Link" ? "#f0f0f0" : "transparent" }}
                onClick={() => handleMenuItemClick("External Link")}
              >
                External Link
              </MenuItem>
            </Tooltip>
          </Menu>
          <div style={{ marginTop: "auto", padding: "10px", textAlign: "center", fontSize: "12px", color: "#aaa" }}>
            © {currentYear} AdminMart. All rights reserved.
          </div>
          {isUserLoggedIn && (
            <button
              onClick={handleLogout}
              style={{
                position: "absolute",
                bottom: "10px",
                width: "100%",
                border: "none",
                background: "none",
                cursor: "pointer",
                color: "#f44336",
                fontSize: "14px",
                textAlign: "center",
              }}
            >
              <LogoutIcon /> Logout
            </button>
          )}
        </Sidebar>
      )}
    </div>
  );
};

export default App;