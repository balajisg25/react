import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import { Autocomplete, TextField, Button, Container, Typography, Card, CardContent } from "@mui/material";

function App() {
  const [excelData, setExcelData] = useState([]);
  const [input, setInput] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [selectedDescription, setSelectedDescription] = useState(null);
  const [result, setResult] = useState(null);

  // Load Excel file and convert to JSON
  const fetchExcelData = async () => {
    try {
      const response = await fetch("/data.xlsx"); // Ensure file is in 'public/' folder
      const arrayBuffer = await response.arrayBuffer();
      const workbook = XLSX.read(arrayBuffer, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet);

      if (!jsonData.length || !jsonData[0].Description) {
        throw new Error("Invalid table format: Missing 'Description' column");
      }

      setExcelData(jsonData);
    } catch (error) {
      console.error("Error loading Excel file:", error);
    }
  };

  useEffect(() => {
    fetchExcelData();
  }, []);

  // Filter descriptions as user types
  useEffect(() => {
    if (input.length > 1) {
      const filtered = excelData
        .map((row) => row.Description)
        .filter((desc) => desc.toLowerCase().includes(input.toLowerCase()));
      setFilteredData(filtered);
    } else {
      setFilteredData([]);
    }
  }, [input, excelData]);

  const handleSearch = () => {
    if (selectedDescription) {
      const stepDetails = excelData.find((row) => row.Description === selectedDescription)?.Steps;
      setResult(
        stepDetails
          ? stepDetails.split("\n").map((step, index) => <Typography key={index}>{step}</Typography>)
          : "No steps found."
      );
    } else {
      setResult("Please select a description.");
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: 50 }}>
      <Typography variant="h4" gutterBottom>React MUI Excel Search</Typography>

      {/* Autocomplete Input Field */}
      <Autocomplete
        freeSolo
        options={filteredData}
        getOptionLabel={(option) => option}
        onInputChange={(event, newInput) => setInput(newInput)}
        onChange={(event, newValue) => setSelectedDescription(newValue)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Enter a word"
            variant="outlined"
            fullWidth
          />
        )}
        style={{ marginBottom: 20 }}
      />

      {/* Black Search Button */}
      <Button 
        variant="contained" 
        style={{ backgroundColor: "black", color: "white" }} 
        fullWidth 
        onClick={handleSearch}
      >
        Search
      </Button>

      {/* Display Steps in Card Component */}
      {result && (
        <Card style={{ marginTop: 20, padding: 10 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>Steps:</Typography>
            {result}
          </CardContent>
        </Card>
      )}
    </Container>
  );
}

export default App;