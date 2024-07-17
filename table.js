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
  Typography
} from '@mui/material';

const DynamicTableWithFilterAndPagination = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [filters, setFilters] = useState({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

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

  useEffect(() => {
    let filtered = data;
    for (const column in filters) {
      if (filters[column]) {
        filtered = filtered.filter(row => 
          row[column].toString().toLowerCase().includes(filters[column].toLowerCase())
        );
      }
    }
    setFilteredData(filtered);
    setPage(0); // Reset to the first page whenever filters change
  }, [filters, data]);

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

  return (
    <Box>
      <Box mb={2}>
        {columns.map((column, index) => (
          <TextField
            key={index}
            label={`Filter by ${formatHeader(column)}`}
            variant="outlined"
            value={filters[column]}
            onChange={(e) => handleFilterChange(column, e.target.value)}
            style={{ marginRight: '10px', marginBottom: '10px' }}
          />
        ))}
      </Box>
      <Typography variant="h6">
        Total Records: {filteredData.length}
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column, index) => (
                <TableCell key={index}>{formatHeader(column)}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {columns.map((column, colIndex) => (
                  <TableCell key={colIndex}>{row[column]}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={filteredData.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Box>
  );
};

export default DynamicTableWithFilterAndPagination;