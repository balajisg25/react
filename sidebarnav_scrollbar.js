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
      <Sidebar
        width={isSidebarOpen ? "270px" : "80px"}
        style={{
          height: "100vh",
          overflowY: "auto",
          scrollbarWidth: "thin",
          scrollbarColor: "#888 #f0f0f0",
          transition: "width 0.3s",
        }}
      >
        <Tooltip title="Toggle Sidebar" placement="right">
          <div
            onClick={toggleSidebar}
            style={{
              cursor: "pointer",
              textAlign: "center",
              padding: "20px 0",
            }}
          >
            <img
              src={logo}
              alt="AdminMart Logo"
              style={{ maxWidth: isSidebarOpen ? "150px" : "50px", transition: "max-width 0.3s" }}
            />
          </div>
        </Tooltip>
        <Menu subHeading={isSidebarOpen ? "HOME" : ""}>
          <Tooltip title="Home" placement="right">
            <MenuItem
              link="/"
              badge="true"
              icon={<HomeIcon />}
              style={{ backgroundColor: selectedItem === "Home" ? "#f0f0f0" : "transparent" }}
              onClick={() => handleMenuItemClick("Home")}
            >
              {isSidebarOpen && "Modern"}
            </MenuItem>
          </Tooltip>
          <Tooltip title="eCommerce" placement="right">
            <MenuItem
              icon={<ShoppingCartIcon />}
              style={{ backgroundColor: selectedItem === "eCommerce" ? "#f0f0f0" : "transparent" }}
              onClick={() => handleMenuItemClick("eCommerce")}
            >
              {isSidebarOpen && "eCommerce"}
            </MenuItem>
          </Tooltip>
          <Tooltip title="Analytical" placement="right">
            <MenuItem
              icon={<AssessmentIcon />}
              style={{ backgroundColor: selectedItem === "Analytical" ? "#f0f0f0" : "transparent" }}
              onClick={() => handleMenuItemClick("Analytical")}
            >
              {isSidebarOpen && "Analytical"}
            </MenuItem>
          </Tooltip>
        </Menu>
        <Menu subHeading={isSidebarOpen ? "APPS" : ""}>
          <Tooltip title="Chat" placement="right">
            <MenuItem
              icon={<ChatIcon />}
              style={{ backgroundColor: selectedItem === "Chat" ? "#f0f0f0" : "transparent" }}
              onClick={() => handleMenuItemClick("Chat")}
            >
              {isSidebarOpen && "Chat"}
            </MenuItem>
          </Tooltip>
          <Tooltip title="Calendar" placement="right">
            <MenuItem
              icon={<CalendarTodayIcon />}
              style={{ backgroundColor: selectedItem === "Calendar" ? "#f0f0f0" : "transparent" }}
              onClick={() => handleMenuItemClick("Calendar")}
            >
              {isSidebarOpen && "Calendar"}
            </MenuItem>
          </Tooltip>
        </Menu>
        <Menu subHeading={isSidebarOpen ? "OTHERS" : ""}>
          <Submenu title={isSidebarOpen ? "Menu Level" : ""}>
            <Tooltip title="Post" placement="right">
              <MenuItem
                icon={<ArticleIcon />}
                style={{ backgroundColor: selectedItem === "Post" ? "#f0f0f0" : "transparent" }}
                onClick={() => handleMenuItemClick("Post")}
              >
                {isSidebarOpen && "Post"}
              </MenuItem>
            </Tooltip>
            <Tooltip title="Details" placement="right">
              <MenuItem
                icon={<InfoIcon />}
                style={{ backgroundColor: selectedItem === "Details" ? "#f0f0f0" : "transparent" }}
                onClick={() => handleMenuItemClick("Details")}
              >
                {isSidebarOpen && "Details"}
              </MenuItem>
            </Tooltip>
            <Submenu title={isSidebarOpen ? "Level 2" : ""}>
              <Tooltip title="New" placement="right">
                <MenuItem
                  style={{ backgroundColor: selectedItem === "New" ? "#f0f0f0" : "transparent" }}
                  onClick={() => handleMenuItemClick("New")}
                >
                  {isSidebarOpen && "new"}
                </MenuItem>
              </Tooltip>
              <Tooltip title="Hello" placement="right">
                <MenuItem
                  style={{ backgroundColor: selectedItem === "Hello" ? "#f0f0f0" : "transparent" }}
                  onClick={() => handleMenuItemClick("Hello")}
                >
                  {isSidebarOpen && "Hello"}
                </MenuItem>
              </Tooltip>
            </Submenu>
          </Submenu>
          <Tooltip title="Chip" placement="right">
            <MenuItem
              icon={<ChipIcon />}
              style={{ backgroundColor: selectedItem === "Chip" ? "#f0f0f0" : "transparent" }}
              onClick={() => handleMenuItemClick("Chip")}
            >
              {isSidebarOpen && "Chip"}
            </MenuItem>
          </Tooltip>
          <Tooltip title="External Link" placement="right">
            <MenuItem
              target="_blank"
              link="https://google.com"
              style={{ backgroundColor: selectedItem === "External Link" ? "#f0f0f0" : "transparent" }}
              onClick={() => handleMenuItemClick("External Link")}
            >
              {isSidebarOpen && "External Link"}
            </MenuItem>
          </Tooltip>
        </Menu>
        <div
          style={{
            marginTop: "auto",
            padding: "10px",
            textAlign: "center",
            fontSize: "12px",
            color: "#aaa",
          }}
        >
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
            <LogoutIcon /> {isSidebarOpen && "Logout"}
          </button>
        )}
      </Sidebar>
    </div>
  );
};

export default App;


2408

import React, { useState } from "react";
import { Sidebar, Menu, MenuItem, Submenu } from "react-mui-sidebar";
import { Tooltip, Divider } from "@mui/material";
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
    <div style={{ display: "flex" }}>
      <Sidebar
        width={isSidebarOpen ? "270px" : "80px"}
        style={{
          height: "100vh",
          overflowY: "auto",
          scrollbarWidth: "thin",
          scrollbarColor: "#888 #f0f0f0",
          transition: "width 0.3s",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#2c3e50", // Dark sidebar background color
          color: "#ecf0f1", // Light text color
        }}
      >
        <Tooltip title="Toggle Sidebar" placement="right">
          <div
            onClick={toggleSidebar}
            style={{
              cursor: "pointer",
              textAlign: "center",
              padding: "20px 0",
            }}
          >
            <img
              src={logo}
              alt="AdminMart Logo"
              style={{
                maxWidth: isSidebarOpen ? "150px" : "50px",
                transition: "max-width 0.3s",
              }}
            />
          </div>
        </Tooltip>

        <div style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
          <Menu subHeading={isSidebarOpen ? "HOME" : ""}>
            <Tooltip title="Home" placement="right" arrow>
              <MenuItem
                link="/"
                badge="true"
                icon={<HomeIcon style={{ color: "#ecf0f1" }} />}
                style={{
                  backgroundColor: selectedItem === "Home" ? "#34495e" : "transparent",
                  color: "#ecf0f1",
                }}
                onClick={() => handleMenuItemClick("Home")}
              >
                {isSidebarOpen && "Modern"}
              </MenuItem>
            </Tooltip>
            <Tooltip title="eCommerce" placement="right" arrow>
              <MenuItem
                icon={<ShoppingCartIcon style={{ color: "#ecf0f1" }} />}
                style={{
                  backgroundColor: selectedItem === "eCommerce" ? "#34495e" : "transparent",
                  color: "#ecf0f1",
                }}
                onClick={() => handleMenuItemClick("eCommerce")}
              >
                {isSidebarOpen && "eCommerce"}
              </MenuItem>
            </Tooltip>
            <Tooltip title="Analytical" placement="right" arrow>
              <MenuItem
                icon={<AssessmentIcon style={{ color: "#ecf0f1" }} />}
                style={{
                  backgroundColor: selectedItem === "Analytical" ? "#34495e" : "transparent",
                  color: "#ecf0f1",
                }}
                onClick={() => handleMenuItemClick("Analytical")}
              >
                {isSidebarOpen && "Analytical"}
              </MenuItem>
            </Tooltip>
          </Menu>

          <Menu subHeading={isSidebarOpen ? "APPS" : ""}>
            <Tooltip title="Chat" placement="right" arrow>
              <MenuItem
                icon={<ChatIcon style={{ color: "#ecf0f1" }} />}
                style={{
                  backgroundColor: selectedItem === "Chat" ? "#34495e" : "transparent",
                  color: "#ecf0f1",
                }}
                onClick={() => handleMenuItemClick("Chat")}
              >
                {isSidebarOpen && "Chat"}
              </MenuItem>
            </Tooltip>
            <Tooltip title="Calendar" placement="right" arrow>
              <MenuItem
                icon={<CalendarTodayIcon style={{ color: "#ecf0f1" }} />}
                style={{
                  backgroundColor: selectedItem === "Calendar" ? "#34495e" : "transparent",
                  color: "#ecf0f1",
                }}
                onClick={() => handleMenuItemClick("Calendar")}
              >
                {isSidebarOpen && "Calendar"}
              </MenuItem>
            </Tooltip>
          </Menu>

          <Menu subHeading={isSidebarOpen ? "OTHERS" : ""}>
            <Submenu title={isSidebarOpen ? "Menu Level" : ""}>
              <Tooltip title="Post" placement="right" arrow>
                <MenuItem
                  icon={<ArticleIcon style={{ color: "#ecf0f1" }} />}
                  style={{
                    backgroundColor: selectedItem === "Post" ? "#34495e" : "transparent",
                    color: "#ecf0f1",
                  }}
                  onClick={() => handleMenuItemClick("Post")}
                >
                  {isSidebarOpen && "Post"}
                </MenuItem>
              </Tooltip>
              <Tooltip title="Details" placement="right" arrow>
                <MenuItem
                  icon={<InfoIcon style={{ color: "#ecf0f1" }} />}
                  style={{
                    backgroundColor: selectedItem === "Details" ? "#34495e" : "transparent",
                    color: "#ecf0f1",
                  }}
                  onClick={() => handleMenuItemClick("Details")}
                >
                  {isSidebarOpen && "Details"}
                </MenuItem>
              </Tooltip>
              <Submenu title={isSidebarOpen ? "Level 2" : ""}>
                <Tooltip title="New" placement="right" arrow>
                  <MenuItem
                    style={{
                      backgroundColor: selectedItem === "New" ? "#34495e" : "transparent",
                      color: "#ecf0f1",
                    }}
                    onClick={() => handleMenuItemClick("New")}
                  >
                    {isSidebarOpen && "new"}
                  </MenuItem>
                </Tooltip>
                <Tooltip title="Hello" placement="right" arrow>
                  <MenuItem
                    style={{
                      backgroundColor: selectedItem === "Hello" ? "#34495e" : "transparent",
                      color: "#ecf0f1",
                    }}
                    onClick={() => handleMenuItemClick("Hello")}
                  >
                    {isSidebarOpen && "Hello"}
                  </MenuItem>
                </Tooltip>
              </Submenu>
            </Submenu>
            <Tooltip title="Chip" placement="right" arrow>
              <MenuItem
                icon={<ChipIcon style={{ color: "#ecf0f1" }} />}
                style={{
                  backgroundColor: selectedItem === "Chip" ? "#34495e" : "transparent",
                  color: "#ecf0f1",
                }}
                onClick={() => handleMenuItemClick("Chip")}
              >
                {isSidebarOpen && "Chip"}
              </MenuItem>
            </Tooltip>
            <Tooltip title="External Link" placement="right" arrow>
              <MenuItem
                target="_blank"
                link="https://google.com"
                style={{
                  backgroundColor: selectedItem === "External Link" ? "#34495e" : "transparent",
                  color: "#ecf0f1",
                }}
                onClick={() => handleMenuItemClick("External Link")}
              >
                {isSidebarOpen && "External Link"}
              </MenuItem>
            </Tooltip>
          </Menu>
        </div>

        <Divider
          orientation="vertical"
          flexItem
          style={{
            display: isSidebarOpen ? "block" : "none",
            borderColor: "#95a5a6", // Color of the divider
            height: "100%",
          }}
        />

        <div
          style={{
            marginTop: "auto",
            padding: "10px",
            textAlign: "center",
            fontSize: "12px",
            color: "#bdc3c7", // Light gray color for footer text
          }}
        >
          © {currentYear} AdminMart. All rights reserved.
        </div>

        {isUserLoggedIn && (
          <button
            onClick={handleLogout}
            style={{
              width: "100%",
              border: "none",
              background: "none",