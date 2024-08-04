import React, { useState, useEffect } from 'react';
import { AppBar, Tabs, Tab, Box, CircularProgress, Typography } from '@mui/material';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import axios from 'axios';

const TabsComponent = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [rowData, setRowData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const tabs = [
    { label: 'Tab 1', value: 'tab1' },
    { label: 'Tab 2', value: 'tab2' },
    { label: 'Tab 3', value: 'tab3' }
  ];

  const columnDefs = [
    { headerName: "Make", field: "make" },
    { headerName: "Model", field: "model" },
    { headerName: "Price", field: "price" }
  ];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      const tabValue = tabs[activeTab].value;
      const storedData = localStorage.getItem(`data-${tabValue}`);

      if (storedData) {
        setRowData(JSON.parse(storedData));
        setLoading(false);
      } else {
        try {
          const response = await axios.post('http://localhost:4000/getData', { tab: tabValue });
          localStorage.setItem(`data-${tabValue}`, JSON.stringify(response.data));
          setRowData(response.data);
        } catch (error) {
          setError('Error fetching data');
          console.error('Error fetching data:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [activeTab]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <div>
      <AppBar position="static" sx={{ width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ flexWrap: 'nowrap' }}
        >
          {tabs.map((tab, index) => (
            <Tab key={index} label={tab.label} />
          ))}
        </Tabs>
      </AppBar>
      <Box sx={{ padding: 2 }}>
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="400px">
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          <div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
            <AgGridReact
              columnDefs={columnDefs}
              rowData={rowData}>
            </AgGridReact>
          </div>
        )}
      </Box>
    </div>
  );
};

export default TabsComponent;