To ensure that the column width automatically adjusts to fit the table content size, you can make use of the `autoSizeAllColumns` method in the Ag-Grid API. You can trigger this method after the grid is ready and after the data is loaded. Additionally, you might want to use the `sizeColumnsToFit` method to ensure the columns fit within the grid's width.

Here’s how you can update your component to ensure that the columns adjust to the content size automatically:

```javascript
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
      const response = await axios.get(url);
      const data = response.data;
      setRowData(data);

      const columns = Object.keys(data[0] || {}).map((key, index) => ({
        headerName: key || `Column ${index}`,
        field: key || `column_${index}`, // Field must be unique
        filter: true,
        headerClass: params => params.column.isFilterActive() ? 'filter-active' : ''
      }));

      setColumnDefs(columns);

      if (gridApi) {
        autoSizeAllColumns(gridApi); // Auto-size columns after setting the new column definitions
      }
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

  useEffect(() => {
    if (gridApi) {
      autoSizeAllColumns(gridApi); // Auto-size columns when rowData changes
    }
  }, [rowData, gridApi]);

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
```

### Key Changes:

1. **Auto-size Columns on Data Fetch**:
   - Added `autoSizeAllColumns(gridApi)` call within `fetchData` to ensure columns are auto-sized when new data is fetched and column definitions are set.

2. **Grid Ready Event**:
   - Ensure `autoSizeAllColumns(params.api)` is called in `onGridReady` to auto-size columns when the grid is first initialized.

3. **Auto-size on Row Data Change**:
   - Added a `useEffect` hook to auto-size columns whenever `rowData` or `gridApi` changes.

This ensures that columns are sized to fit their content whenever new data is loaded or when the grid is ready, providing a better user experience with dynamically sized columns.