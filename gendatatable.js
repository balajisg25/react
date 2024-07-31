import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Tabs, Tab, Box, Button, styled } from '@mui/material';
import { AgGridReact } from 'ag-grid-react';
import axios from 'axios';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const FancyTabs = styled(Tabs)({
  backgroundColor: '#f5f5f5',
  borderRadius: '8px',
  padding: '10px',
  '& .MuiTabs-indicator': {
    display: 'none',
  },
});

const FancyTab = styled(Tab)(({ theme }) => ({
  textTransform: 'none',
  fontWeight: theme.typography.fontWeightBold,
  marginRight: theme.spacing(1),
  '&.Mui-selected': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    borderRadius: '4px',
  },
}));

const App = () => {
  const [tabValue, setTabValue] = useState('Tab 1');
  const [rowData, setRowData] = useState([]);
  const [columnDefs, setColumnDefs] = useState([]);
  const [paginationPageSize, setPaginationPageSize] = useState(10);
  const [totalRows, setTotalRows] = useState(0);

  useEffect(() => {
    fetchData(tabValue);
  }, [tabValue]);

  const fetchData = async (tabValue, page = 1) => {
    try {
      const response = await axios.post('/api/data', { tabValue, page, pageSize: paginationPageSize });
      const { data, totalRows } = response.data;
      setRowData(data);
      setTotalRows(totalRows);
      if (data.length > 0) {
        setColumnDefs(Object.keys(data[0]).map(key => ({
          headerName: key,
          field: key,
          filter: true,
          sortable: true,
          resizable: true,
        })));
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(rowData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    XLSX.writeFile(workbook, 'data.xlsx');
  };

  const clearFilters = () => {
    gridApi.setFilterModel(null);
    gridApi.onFilterChanged();
  };

  let gridApi;
  const onGridReady = params => {
    gridApi = params.api;
    params.api.sizeColumnsToFit();
  };

  return (
    <Box sx={{ width: '100%' }}>
      <AppBar position="static">
        <Toolbar>
          <FancyTabs value={tabValue} onChange={handleTabChange}>
            <FancyTab label="Tab 1" value="Tab 1" />
            <FancyTab label="Tab 2" value="Tab 2" />
          </FancyTabs>
        </Toolbar>
      </AppBar>
      <Box sx={{ padding: '20px' }}>
        <Button variant="contained" color="primary" onClick={clearFilters} sx={{ marginRight: '10px' }}>
          Clear Filters
        </Button>
        <Button variant="contained" color="primary" onClick={exportToExcel}>
          Export to Excel
        </Button>
        <div className="ag-theme-alpine" style={{ height: 400, width: '100%', marginTop: '20px' }}>
          <AgGridReact
            rowData={rowData}
            columnDefs={columnDefs}
            onGridReady={onGridReady}
            pagination={true}
            paginationPageSize={paginationPageSize}
            domLayout='autoHeight'
            enableCellTextSelection={true}
            suppressPaginationPanel={false}
          />
        </div>
      </Box>
    </Box>
  );
};

export default App;