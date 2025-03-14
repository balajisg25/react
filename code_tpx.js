// src/App.js

import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import * as XLSX from 'xlsx';

function App() {
  const [data, setData] = useState([]);
  const [headers, setHeaders] = useState([]);

  // Fetch the Excel file from the public folder on component mount
  useEffect(() => {
    // Load the file from the public folder
    fetch('/data.xlsx')
      .then((response) => response.arrayBuffer()) // Fetch and convert to ArrayBuffer
      .then((arrayBuffer) => {
        const wb = XLSX.read(arrayBuffer, { type: 'array' }); // Parse the binary data
        const ws = wb.Sheets[wb.SheetNames[0]]; // Assuming we're reading the first sheet
        const sheetData = XLSX.utils.sheet_to_json(ws, { header: 1 }); // Get data as an array of rows
        setHeaders(sheetData[0]); // Set the headers as the first row
        setData(sheetData.slice(1)); // Set the remaining rows as data
      })
      .catch((error) => console.error('Error loading the Excel file:', error));
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Excel Data to Table</h1>

      {/* Table display */}
      {headers.length > 0 && data.length > 0 && (
        <TableContainer component={Paper} style={{ marginTop: '20px' }}>
          <Table>
            <TableHead>
              <TableRow>
                {headers.map((header, index) => (
                  <TableCell key={index}>{header}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <TableCell key={cellIndex}>{cell}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}

export default App;