import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Box,
  TablePagination,
  TableSortLabel,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Toolbar,
  Button,
  Collapse
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import ClearIcon from '@mui/icons-material/Clear';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { json2csv } from 'json2csv';
import { utils as xlsxUtils, writeFile as xlsxWriteFile } from 'xlsx';

const DynamicTableWithFilterAndPagination = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [filters, setFilters] = useState({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [anchorEl, setAnchorEl] = useState(null);
  const [hiddenColumns, setHiddenColumns] = useState({});
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' });
  const [expandFilter, setExpandFilter] = useState({});
  const [exportAnchorEl, setExportAnchorEl] = useState(null);

  useEffect(() => {
    axios.get('https://api.example.com/data') // Replace with your API endpoint
      .then(response => {
        if (response.data.length > 0) {
          setData(response.data);
          setFilteredData(response.data);
          setColumns(Object.keys(response.data[0]));
          const initialFilters = Object.keys(response.data[0]).reduce((acc, key) => {
            acc[key] = '';
            return acc;
          }, {});
          setFilters(initialFilters);
          const initialHiddenColumns = Object.keys(response.data[0]).reduce((acc, key) => {
            acc[key] = false;
            return acc;
          }, {});
          setHiddenColumns(initialHiddenColumns);
          const initialExpandFilter = Object.keys(response.data[0]).reduce((acc, key) => {
            acc[key] = false;
            return acc;
          }, {});
          setExpandFilter(initialExpandFilter);
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleFilterChange = (column, value) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [column]: value
    }));
  };

  const handleClearFilters = () => {
    const clearedFilters = Object.keys(filters).reduce((acc, key) => {
      acc[key] = '';
      return acc;
    }, {});
    setFilters(clearedFilters);
  };

  useEffect(() => {
    let filtered = data;
    for (const column in filters) {
      if (filters[column]) {
        filtered = filtered.filter(row =>
          row[column].toString().toLowerCase().includes(filters[column].toLowerCase())
        );
      }
    }
    if (sortConfig.key) {
      filtered.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    setFilteredData(filtered);
    setPage(0); // Reset to the first page whenever filters or sorting change
  }, [filters, sortConfig, data]);

  const formatHeader = (header) => {
    return header.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSort = (column) => {
    let direction = 'asc';
    if (sortConfig.key === column && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key: column, direction });
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleToggleColumn = (column) => {
    setHiddenColumns(prevState => ({
      ...prevState,
      [column]: !prevState[column]
    }));
  };

  const handleExpandFilter = (column) => {
    setExpandFilter(prevState => ({
      ...prevState,
      [column]: !prevState[column]
    }));
  };

  const handleExportClick = (event) => {
    setExportAnchorEl(event.currentTarget);
  };

  const handleExportClose = () => {
    setExportAnchorEl(null);
  };

  const exportData = (format) => {
    const visibleColumns = columns.filter(column => !hiddenColumns[column]);
    const visibleData = filteredData.map(row => {
      const newRow = {};
      visibleColumns.forEach(column => {
        newRow[column] = row[column];
      });
      return newRow;
    });

    if (format === 'json') {
      const jsonString = JSON.stringify(visibleData, null, 2);
      const blob = new Blob([jsonString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'data.json';
      document.body.appendChild(a);
      a.click();
      a.remove();
    } else if (format === 'csv') {
      const csvString = json2csv.parse(visibleData);
      const blob = new Blob([csvString], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'data.csv';
      document.body.appendChild(a);
      a.click();
      a.remove();
    } else if (format === 'xlsx') {
      const worksheet = xlsxUtils.json_to_sheet(visibleData);
      const workbook = xlsxUtils.book_new();
      xlsxUtils.book_append_sheet(workbook, worksheet, 'Data');
      xlsxWriteFile(workbook, 'data.xlsx');
    }

    handleExportClose();
  };

  return (
    <Box>
      <Toolbar>
        <Button onClick={handleClearFilters} startIcon={<ClearIcon />}>
          Clear Filters
        </Button>
        <IconButton onClick={handleMenuClick}>
          <MoreVertIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          {columns.map((column, index) => (
            <MenuItem key={index}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={!hiddenColumns[column]}
                    onChange={() => handleToggleColumn(column)}
                  />
                }
                label={formatHeader(column)}
              />
            </MenuItem>
          ))}
        </Menu>
        <Button
          onClick={handleExportClick}
          startIcon={<FileDownloadIcon />}
        >
          Export
        </Button>
        <Menu
          anchorEl={exportAnchorEl}
          open={Boolean(exportAnchorEl)}
          onClose={handleExportClose}
        >
          <MenuItem onClick={() => exportData('json')}>Export as JSON</MenuItem>
          <MenuItem onClick={() => exportData('csv')}>Export as CSV</MenuItem>
          <MenuItem onClick={() => exportData('xlsx')}>Export as XLSX</MenuItem>
        </Menu>
      </Toolbar>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              {columns.map((column, index) => (
                !hiddenColumns[column] && (
                  <TableCell key={index}>
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                      <Box>
                        <TableSortLabel
                          active={sortConfig.key === column}
                          direction={sortConfig.direction}
                          onClick={() => handleSort(column)}
                        >
                          {formatHeader(column)}
                        </TableSortLabel>
                      </Box>
                      <IconButton size="small" onClick={() => handleExpandFilter(column)}>