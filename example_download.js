To achieve a dynamic table with the features you've described using Material-UI (MUI), React, and Axios, you can follow these steps. The key features include:

1. Dynamic column names and data.
2. Multi-column filter using an icon button.
3. Sorting.
4. Pagination with records count.
5. Clear filter functionality.
6. Hide column functionality.
7. Compact density mode.
8. Export functionality (CSV, JSON, Excel).

Here's a basic implementation:

### Step 1: Setup React Application

First, make sure you have a React application set up. You can create one using Create React App if you haven't already:

```bash
npx create-react-app dynamic-table
cd dynamic-table
npm install @mui/material @mui/icons-material axios react-csv @material-ui/core @material-ui/icons
```

### Step 2: Create the Dynamic Table Component

Create a new component called `DynamicTable.js`.

```jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarColumnsButton,
  GridToolbarDensitySelector,
  GridToolbarFilterButton,
} from '@mui/x-data-grid';
import { IconButton, Button, Box } from '@mui/material';
import ClearAllIcon from '@mui/icons-material/ClearAll';

const DynamicTable = () => {
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [filterModel, setFilterModel] = useState({ items: [] });

  useEffect(() => {
    axios.get('https://api.example.com/data')
      .then(response => {
        const data = response.data;
        if (data.length > 0) {
          const cols = Object.keys(data[0]).map(key => ({
            field: key,
            headerName: key.charAt(0).toUpperCase() + key.slice(1),
            width: 150,
          }));
          setColumns(cols);
          setRows(data);
        }
      });
  }, []);

  const handleClearFilters = () => {
    setFilterModel({ items: [] });
  };

  const CustomToolbar = () => (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <GridToolbarExport csvOptions={{ allColumns: true }} />
      <IconButton onClick={handleClearFilters} color="primary">
        <ClearAllIcon />
      </IconButton>
    </GridToolbarContainer>
  );

  return (
    <Box sx={{ height: 600, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowsPerPageOptions={[10, 20, 50]}
        pagination
        filterModel={filterModel}
        onFilterModelChange={(newFilterModel) => setFilterModel(newFilterModel)}
        components={{
          Toolbar: CustomToolbar,
        }}
        checkboxSelection
        disableSelectionOnClick
      />
    </Box>
  );
};

export default DynamicTable;
```

### Step 3: Modify `App.js` to Include the Dynamic Table Component

Update your `App.js` to include the `DynamicTable` component:

```jsx
import React from 'react';
import DynamicTable from './DynamicTable';
import { Container } from '@mui/material';

function App() {
  return (
    <Container>
      <h1>Dynamic Table with MUI</h1>
      <DynamicTable />
    </Container>
  );
}

export default App;
```

### Step 4: Run the Application

Run your application to see the dynamic table in action:

```bash
npm start
```

### Explanation

- **Dynamic Columns and Data**: The `useEffect` hook fetches data from an API, dynamically setting the columns based on the keys of the first object in the data.
- **Filtering**: The toolbar includes a filter button (`GridToolbarFilterButton`) and a clear filters button (`ClearAllIcon`).
- **Sorting and Pagination**: Handled by `DataGrid` with built-in support.
- **Compact Density**: The toolbar includes a density selector (`GridToolbarDensitySelector`).
- **Export**: The toolbar includes an export button with CSV options (`GridToolbarExport`).

This setup should cover most of the functionality you need. You can further customize and enhance it based on your specific requirements.