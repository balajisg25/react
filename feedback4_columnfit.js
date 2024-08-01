import React, { useState, useEffect, useRef } from 'react';
import { AppBar, Tabs, Tab, Box, IconButton, Tooltip, Menu, MenuItem, CircularProgress, Typography } from '@mui/material';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import axios from 'axios';
import { AgGridReact } from 'ag-grid-react';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const App = () => {
  const [tabValue, setTabValue] = useState('tab1');
  const [tableData, setTableData] = useState([]);
  const [columnDefs, setColumnDefs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filterApplied, setFilterApplied] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const gridApiRef = useRef(null);

  useEffect(() => {
    fetchData();
  }, [tabValue]);

  const fetchData = async () => {
    setLoading(true);
    setError('');
    const cachedData = localStorage.getItem(`tableData_${tabValue}`);
    if (cachedData) {
      const parsedData = JSON.parse(cachedData);
      setTableData(parsedData);
      setDynamicColumns(parsedData);
      setLoading(false);
      autoSizeAllColumns();
    } else {
      try {
        const response = await axios.post('/api/data', { tabValue });
        const responseData = response.data;
        localStorage.setItem(`tableData_${tabValue}`, JSON.stringify(responseData));
        setTableData(responseData);
        setDynamicColumns(responseData);
        setLoading(false);
        autoSizeAllColumns();
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load data. Please try again.');
        setLoading(false);
      }
    }
  };

  const setDynamicColumns = (data) => {
    if (data.length > 0) {
      const columns = Object.keys(data[0]).map(key => ({
        headerName: key.charAt(0).toUpperCase() + key.slice(1),
        field: key,
        filter: true, // Enable filtering
        sortable: true, // Enable sorting
        resizable: true // Enable resizing
      }));
      setColumnDefs(columns);
    }
  };

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const clearFilters = () => {
    if (gridApiRef.current) {
      gridApiRef.current.setFilterModel(null);
      setFilterApplied(false);
    }
  };

  const onFilterChanged = () => {
    if (gridApiRef.current) {
      const isFilterActive = gridApiRef.current.isAnyFilterPresent();
      setFilterApplied(isFilterActive);
    }
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const exportData = (format) => {
    let fileData;
    let fileType;
    let fileExtension;

    switch (format) {
      case 'csv':
        fileData = tableData.map(row => Object.values(row).join(',')).join('\n');
        fileType = 'text/csv';
        fileExtension = '.csv';
        break;
      case 'json':
        fileData = JSON.stringify(tableData, null, 2);
        fileType = 'application/json';
        fileExtension = '.json';
        break;
      case 'xlsx':
        const worksheet = XLSX.utils.json_to_sheet(tableData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
        fileData = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
        fileExtension = '.xlsx';
        break;
      default:
        return;
    }

    const blob = new Blob([fileData], { type: fileType });
    saveAs(blob, `export${fileExtension}`);
    handleMenuClose();
  };

  const autoSizeAllColumns = () => {
    if (gridApiRef.current) {
      const allColumns = gridApiRef.current.getAllColumns();
      if (allColumns && allColumns.length > 0) {
        const allColumnIds = allColumns.map(column => column.getId());
        gridApiRef.current.autoSizeColumns(allColumnIds);
      }
    }
  };

  const onGridReady = (params) => {
    gridApiRef.current = params.api;
    autoSizeAllColumns();
  };

  return (
    <Box sx={{ width: '100%' }}>
      <AppBar position="static">
        <Tabs value={tabValue} onChange={handleChange} variant="scrollable" scrollButtons="auto">
          <Tab label="Tab 1" value="tab1" />
          <Tab label="Tab 2" value="tab2" />
          <Tab label="Tab 3" value="tab3" />
        </Tabs>
      </AppBar>
      <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ my: 2, px: 2 }}>
        <Box display="flex" alignItems="center">
          <Tooltip title="Export Options">
            <IconButton onClick={handleMenuOpen}>
              <FileDownloadIcon />
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={() => exportData('csv')}>Export as CSV</MenuItem>
            <MenuItem onClick={() => exportData('json')}>Export as JSON</MenuItem>
            <MenuItem onClick={() => exportData('xlsx')}>Export as XLSX</MenuItem>
          </Menu>
          {filterApplied && (
            <Tooltip title="Clear Filters">
              <IconButton onClick={clearFilters}>
                <ClearAllIcon />
              </IconButton>
            </Tooltip>
          )}
        </Box>
      </Box>
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" sx={{ height: 400 }}>
          <CircularProgress />
          <Typography variant="h6" sx={{ mt: 2 }}>
            Loading data, please wait...
          </Typography>
        </Box>
      ) : error ? (
        <Box display="flex" justifyContent="center" alignItems="center" sx={{ height: 400 }}>
          <Typography color="error">{error}</Typography>
        </Box>
      ) : (
        <Box sx={{ height: 400, width: '100%' }} className="ag-theme-alpine">
          <AgGridReact
            rowData={tableData}
            columnDefs={columnDefs}
            onGridReady={onGridReady}
            onFilterChanged={onFilterChanged}
            pagination={true}
            paginationPageSize={10}
          />
        </Box>
      )}
    </Box>
  );
};

export default App;