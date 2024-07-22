import React, { useEffect, useState, useCallback } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import axios from 'axios';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { IconButton, Menu, MenuItem, Tooltip, Button, ButtonGroup } from '@mui/material';
import { Download as DownloadIcon, FileCsv as FileCsvIcon, FileExcel as FileExcelIcon, FileCopy as FileCopyIcon, Clear as ClearIcon } from '@mui/icons-material';

const DynamicTable = () => {
  const [rowData, setRowData] = useState([]);
  const [columnDefs, setColumnDefs] = useState([]);
  const [paginationPageSize, setPaginationPageSize] = useState(10);
  const [gridApi, setGridApi] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        const fetchedData = response.data;
        setRowData(fetchedData);

        const columns = Object.keys(fetchedData[0] || {}).map((key, index) => ({
          headerName: key || `Column ${index}`,
          field: key || `column_${index}`, // Field must be unique
          filter: true, // Enable filtering for this column
        }));

        setColumnDefs(columns);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  }, []);

  const onGridReady = (params) => {
    setGridApi(params.api);
    params.api.paginationSetPageSize(paginationPageSize);
    params.api.sizeColumnsToFit(); // Adjust column sizes to fit the grid
  };

  const onPageSizeChanged = useCallback((event) => {
    const newPageSize = Number(event.target.value);
    setPaginationPageSize(newPageSize);
    if (gridApi) {
      gridApi.paginationSetPageSize(newPageSize);
    }
  }, [gridApi]);

  const getFilteredData = () => {
    if (gridApi) {
      const filteredData = [];
      gridApi.forEachNodeAfterFilterAndSort(node => filteredData.push(node.data));
      return filteredData;
    }
    return rowData;
  };

  const getFormattedDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day}_${hours}-${minutes}-${seconds}`;
  };

  const exportToCSV = () => {
    const data = getFilteredData();
    const csv = Papa.unparse(data);
    const formattedDate = getFormattedDate();
    const filename = `data_${formattedDate}.csv`;
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, filename);
  };

  const exportToExcel = () => {
    const data = getFilteredData();
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Data');
    const formattedDate = getFormattedDate();
    const filename = `data_${formattedDate}.xlsx`;
    XLSX.writeFile(wb, filename);
  };

  const exportToJson = () => {
    const data = getFilteredData();
    const json = JSON.stringify(data, null, 2);
    const formattedDate = getFormattedDate();
    const filename = `data_${formattedDate}.json`;
    const blob = new Blob([json], { type: 'application/json;charset=utf-8;' });
    saveAs(blob, filename);
  };

  const handleExport = (format) => {
    switch (format) {
      case 'csv':
        exportToCSV();
        break;
      case 'excel':
        exportToExcel();
        break;
      case 'json':
        exportToJson();
        break;
      default:
        break;
    }
    setAnchorEl(null);
  };

  const clearFilters = () => {
    if (gridApi) {
      gridApi.setFilterModel(null); // Clear all filters
    }
  };

  const clearAll = () => {
    if (gridApi) {
      gridApi.setFilterModel(null); // Clear all filters
      gridApi.setSortModel(null); // Clear all sorting
      gridApi.setRowData([]); // Clear row data
      setRowData([]); // Clear row data in state
    }
  };

  return (
    <div>
      <ButtonGroup variant="outlined" aria-label="outlined primary button group">
        <Tooltip title="Export Data">
          <IconButton
            aria-controls={open ? 'export-menu' : undefined}
            aria-haspopup="true"
            onClick={(event) => setAnchorEl(event.currentTarget)}
            color="primary"
          >
            <DownloadIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Clear Filters">
          <IconButton onClick={clearFilters} color="primary">
            <ClearIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Clear All">
          <IconButton onClick={clearAll} color="primary">
            <ClearIcon />
          </IconButton>
        </Tooltip>
      </ButtonGroup>
      <Menu
        id="export-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem onClick={() => handleExport('csv')}>
          <FileCsvIcon style={{ marginRight: 8 }} />
          Export to CSV
        </MenuItem>
        <MenuItem onClick={() => handleExport('excel')}>
          <FileExcelIcon style={{ marginRight: 8 }} />
          Export to Excel
        </MenuItem>
        <MenuItem onClick={() => handleExport('json')}>
          <FileCopyIcon style={{ marginRight: 8 }} />
          Export to JSON
        </MenuItem>
      </Menu>
      <div className="ag-theme-alpine" style={{ height: 'calc(100vh - 150px)', width: '100%' }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          pagination
          paginationPageSize={paginationPageSize}
          onGridReady={onGridReady}
          onFilterChanged={() => gridApi && gridApi.paginationGoToFirstPage()} // Reset to first page when filtering
          defaultColDef={{
            resizable: true,
            sortable: true,
            filter: true,
            editable: true,
            clipboard: true, // Enable clipboard support
          }}
          suppressClipboardPaste={false}
          enableCellTextSelection={true} // Enable text selection for copy-paste
        />
      </div>
      <div style={{ marginTop: '10px' }}>
        <span>
          Page{' '}
          <strong>
            {gridApi ? gridApi.paginationGetCurrentPage() + 1 : 1} of {gridApi ? gridApi.paginationGetTotalPages() : 1}
          </strong>
        </span>
        <select
          value={paginationPageSize}
          onChange={onPageSizeChanged}
          style={{ marginLeft: '10px' }}
        >
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default DynamicTable;