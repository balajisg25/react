import React, { useState, useEffect } from 'react';
import { Alert, Button } from '@mui/material';

function TimedAlertOnSubmit() {
  const [showAlert, setShowAlert] = useState(false);

  const handleSubmit = () => {
    setShowAlert(true);

    // Set timeout to hide the alert after 10 seconds
    setTimeout(() => {
      setShowAlert(false);
    }, 10000); // 10000ms = 10 seconds
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Submit
      </Button>

      {showAlert && (
        <Alert severity="success" style={{ marginTop: '20px' }}>
          Form submitted successfully! This alert will disappear after 10 seconds.
        </Alert>
      )}
    </div>
  );
}

export default TimedAlertOnSubmit;