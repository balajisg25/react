import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import { TextField, Button, Autocomplete, Container, Typography } from "@mui/material";

function App() {
  const [excelData, setExcelData] = useState([]);
  const [input, setInput] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [selectedDescription, setSelectedDescription] = useState(null);
  const [result, setResult] = useState("");

  // Function to load Excel data
  const fetchExcelData = async () => {
    const response = await fetch("/data.xlsx"); // Excel file in the 'public' folder
    const arrayBuffer = await response.arrayBuffer();
    const workbook = XLSX.read(arrayBuffer, { type: "array" });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(sheet);
    setExcelData(jsonData);
  };

  useEffect(() => {
    fetchExcelData();
  }, []);

  // Filter descriptions based on user input
  useEffect(() => {
    if (input.length > 1) {
      const filtered = excelData
        .map((row) => row.Description) // Extract only 'Description' column
        .filter((desc) => desc.toLowerCase().includes(input.toLowerCase()));
      setFilteredData(filtered);
    } else {
      setFilteredData([]);
    }
  }, [input, excelData]);

  const handleSearch = () => {
    if (selectedDescription) {
      const stepDetails = excelData.find((row) => row.Description === selectedDescription)?.Steps;
      setResult(stepDetails || "No steps found.");
    } else {
      setResult("Please select a description.");
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: 50 }}>
      <Typography variant="h4" gutterBottom>React MUI Excel Search</Typography>

      {/* Input Field */}
      <TextField
        fullWidth
        label="Enter a word"
        variant="outlined"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{ marginBottom: 20 }}
      />

      {/* Autocomplete Dropdown */}
      <Autocomplete
        options={filteredData}
        getOptionLabel={(option) => option}
        onChange={(event, newValue) => setSelectedDescription(newValue)}
        renderInput={(params) => <TextField {...params} label="Select Description" variant="outlined" />}
        style={{ marginBottom: 20 }}
      />

      {/* Search Button */}
      <Button variant="contained" color="primary" fullWidth onClick={handleSearch}>
        Search
      </Button>

      {/* Result Display */}
      {result && (
        <Typography variant="h6" style={{ marginTop: 20 }}>
          {result}
        </Typography>
      )}
    </Container>
  );
}

export default App;