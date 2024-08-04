import React, { useEffect, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const GridExample = () => {
    const gridRef = useRef();

    const columnDefs = [
        { field: 'name' },
        { field: 'age' },
        { field: 'address' }
    ];

    const rowData = [
        { name: 'John Doe', age: 25, address: '1234 Main St' },
        { name: 'Jane Smith', age: 30, address: '5678 First Ave' },
        // Add more rows dynamically if needed
    ];

    useEffect(() => {
        if (gridRef.current) {
            gridRef.current.api.sizeColumnsToFit();
        }
    }, [rowData]);

    const onFirstDataRendered = (params) => {
        params.api.sizeColumnsToFit();
    };

    return (
        <div className="ag-theme-alpine" style={{ height: 400, width: 600 }}>
            <AgGridReact
                ref={gridRef}
                columnDefs={columnDefs}
                rowData={rowData}
                onFirstDataRendered={onFirstDataRendered}
            />
        </div>
    );
};

export default GridExample;