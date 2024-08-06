import React, { useEffect, useState, useCallback } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import axios from 'axios';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { IconButton, Menu, MenuItem, Tooltip, ButtonGroup } from '@mui/material';
import { Download as DownloadIcon, FileCsv as FileCsvIcon, FileExcel as FileExcelIcon, FileCopy as FileCopyIcon, Clear as ClearIcon } from '@mui/icons-material';
import './styles.css'; // Import the custom CSS

const DynamicTable = () => {
  const [rowData, setRowData] = useState([]);
  const [columnDefs, setColumnDefs] = useState([]);
  const [paginationPageSize, setPaginationPageSize] = useState(10);
  const [gridApi, setGridApi] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        const fetchedData = response.data;
        setRowData(fetchedData);

        const columns = Object.keys(fetchedData[0] || {}).map((key, index) => ({
          headerName: key || `Column ${index}`,
          field: key || `column_${index}`,
          filter: true,
          headerClass: params => params.column.isFilterActive() ? 'filter-active' : ''
        }));

        setColumnDefs(columns);
      } catch (error) {
        setError('Error fetching data');
        console.error('Error fetching data: ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const onGridReady = (params) => {
    setGridApi(params.api);
    params.api.paginationSetPageSize(paginationPageSize);
    autoSizeAllColumns(params.api); // Auto-size columns when the grid is ready
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
      gridApi.setFilterModel(null);
    }
  };

  const autoSizeAllColumns = (api) => {
    const allColumnIds = api.getAllColumns().map(column => column.getId());
    api.autoSizeColumns(allColumnIds);
  };

  const applyCustomFilterIconColor = () => {
    if (gridApi) {
      const allColumns = gridApi.getAllColumns();
      allColumns.forEach(column => {
        const filterComponent = gridApi.getFilterInstance(column.getColId());
        if (filterComponent && filterComponent.isFilterActive()) {
          const headerElement = gridApi.getHeaderCellElement(column);
          if (headerElement) {
            const filterIcon = headerElement.querySelector('.ag-filter-icon');
            if (filterIcon) {
              filterIcon.style.color = 'yellow';
            }
          }
        }
      });
    }
  };

  useEffect(() => {
    if (gridApi) {
      const applyColor = () => applyCustomFilterIconColor();
      gridApi.addEventListener('filterChanged', applyColor);
      return () => {
        gridApi.removeEventListener('filterChanged', applyColor);
      };
    }
  }, [gridApi]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

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
          onFilterChanged={() => {
            if (gridApi) {
              gridApi.paginationGoToFirstPage();
              applyCustomFilterIconColor();
              autoSizeAllColumns(gridApi); // Adjust column sizes when filters are applied
            }
          }}
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
    </div>
  );
};

export default DynamicTable;