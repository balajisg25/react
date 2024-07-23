import React, { useEffect, useState } from 'react';
import { AppBar, Tabs, Tab, Box, Typography } from '@mui/material';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import axios from 'axios';
import './styles.css'; // Import the custom CSS

const DynamicTabs = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [columnDefs, setColumnDefs] = useState([]);
  const [rowData, setRowData] = useState([]);
  const [gridApi, setGridApi] = useState(null);

  const tabs = ['Users', 'Posts', 'Comments'];

  const fetchData = async (tabName) => {
    const url = `https://jsonplaceholder.typicode.com/${tabName.toLowerCase()}`;
    try {
      const response = await axios.post(url, { tabName });
      const data = response.data;
      setRowData(data);

      const columns = Object.keys(data[0] || {}).map((key, index) => ({
        headerName: key || `Column ${index}`,
        field: key || `column_${index}`, // Field must be unique
        filter: true,
        headerClass: params => params.column.isFilterActive() ? 'filter-active' : ''
      }));

      setColumnDefs(columns);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  useEffect(() => {
    const fetchTabData = async () => {
      const selectedTab = tabs[tabIndex];
      await fetchData(selectedTab);
    };

    fetchTabData();
  }, [tabIndex]);

  const handleTabChange = (event, newIndex) => {
    setTabIndex(newIndex);
  };

  const onGridReady = (params) => {
    setGridApi(params.api);
    autoSizeAllColumns(params.api); // Auto-size columns when the grid is ready
  };

  const autoSizeAllColumns = (api) => {
    const allColumnIds = [];
    api.getAllColumns().forEach((column) => {
      allColumnIds.push(column.getId());
    });
    api.autoSizeColumns(allColumnIds);
  };

  return (
    <div>
      <AppBar position="static">
        <Tabs value={tabIndex} onChange={handleTabChange}>
          {tabs.map((tab, index) => (
            <Tab key={index} label={tab} />
          ))}
        </Tabs>
      </AppBar>
      <Box p={3}>
        <Typography variant="h6">{tabs[tabIndex]} Data</Typography>
        <div className="ag-theme-alpine" style={{ height: '60vh', width: '100%' }}>
          <AgGridReact
            rowData={rowData}
            columnDefs={columnDefs}
            pagination
            paginationPageSize={10}
            onGridReady={onGridReady}
            defaultColDef={{
              resizable: true,
              sortable: true,
              filter: true,
              editable: true,
              clipboard: true,
            }}
            suppressClipboardPaste={false}
            enableCellTextSelection={true}
          />
        </div>
      </Box>
    </div>
  );
};

export default DynamicTabs;