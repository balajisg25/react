import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import {
  Autocomplete,
  TextField,
  Container,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Alert
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloseIcon from "@mui/icons-material/Close";

function App() {
  const [excelData, setExcelData] = useState([]);
  const [input, setInput] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [selectedDescription, setSelectedDescription] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load Excel file and convert to JSON
  const fetchExcelData = async () => {
    try {
      const response = await fetch("/data.xlsx");
      if (!response.ok) throw new Error("File not found or inaccessible");

      const arrayBuffer = await response.arrayBuffer();
      const workbook = XLSX.read(arrayBuffer, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet);

      if (!jsonData.length || !jsonData[0].Description) {
        throw new Error("Invalid format: 'Description' column is missing");
      }

      setExcelData(jsonData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExcelData();
  }, []);

  // Filter descriptions as user types
  useEffect(() => {
    if (input.length > 1) {
      const filtered = excelData
        .map((row) => row.Description.trim())
        .filter((desc) => desc.toLowerCase().includes(input.toLowerCase()));
      setFilteredData(filtered);
    } else {
      setFilteredData([]);
    }

    if (input === "") {
      setResult(null);
    }
  }, [input, excelData]);

  // Display steps when a description is selected
  useEffect(() => {
    if (selectedDescription) {
      const stepDetails = excelData.find((row) => row.Description === selectedDescription)?.Steps;
      setResult(
        stepDetails
          ? stepDetails.split("\n").map((step, index) => (
              <ListItem key={index}>
                <ListItemIcon>
                  <CheckCircleIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary={step} />
              </ListItem>
            ))
          : "No steps found."
      );
    } else {
      setResult(null);
    }
  }, [selectedDescription, excelData]);

  return (
    <Container maxWidth="sm" style={{ marginTop: 50 }}>
      <Typography variant="h4" align="center" gutterBottom>
        📄 Excel Search Tool
      </Typography>

      {loading && <CircularProgress style={{ display: "block", margin: "auto" }} />}

      {error && <Alert severity="error">{error}</Alert>}

      {!loading && !error && (
        <Card elevation={3} style={{ padding: 20 }}>
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
                label="Search description..."
                variant="outlined"
                fullWidth
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {input && (
                        <IconButton onClick={() => setInput("")}>
                          <CloseIcon />
                        </IconButton>
                      )}
                      {params.InputProps.endAdornment}
                    </>
                  ),
                }}
              />
            )}
            style={{ marginBottom: 20 }}
          />

          {/* Display Steps in Card Component */}
          {result && (
            <Card style={{ marginTop: 20, padding: 10 }} elevation={2}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  ✅ Steps:
                </Typography>
                <List>{result}</List>
              </CardContent>
            </Card>
          )}
        </Card>
      )}
    </Container>
  );
}

export default App;