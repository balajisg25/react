// IBM PCOMM Mainframe Automation Tool
// This demonstrates a React-based keyword-driven framework for automating IBM PCOMM mainframe interactions

// src/App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import KeywordRunner from './components/KeywordRunner';
import TestCaseEditor from './components/TestCaseEditor';
import KeywordLibrary from './utils/KeywordLibrary';
import MainframeEmulator from './components/MainframeEmulator'; // For demo purposes

function App() {
  const [testCase, setTestCase] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [logs, setLogs] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [emulatorScreen, setEmulatorScreen] = useState('');
  const [connectionStatus, setConnectionStatus] = useState('Disconnected');

  const handleRunTest = async () => {
    setIsRunning(true);
    setLogs([]);
    setCurrentStep(0);
    
    for (let i = 0; i < testCase.length; i++) {
      setCurrentStep(i);
      const step = testCase[i];
      const result = await KeywordLibrary.executeKeyword(
        step.keyword, 
        step.parameters,
        updateEmulatorScreen,
        addLog
      );
      
      addLog(`Step ${i+1}: ${step.keyword} - ${result.success ? 'Success' : 'Failed'}`);
      
      if (!result.success) {
        addLog(`Error: ${result.message}`);
        break;
      }
      
      // Add a small delay between steps for visibility
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    setIsRunning(false);
    addLog('Test execution completed');
  };

  const addLog = (message) => {
    setLogs(prevLogs => [...prevLogs, `[${new Date().toLocaleTimeString()}] ${message}`]);
  };

  const updateEmulatorScreen = (screen) => {
    setEmulatorScreen(screen);
  };

  const [pcommPath, setPcommPath] = useState('');
  const [pcommDetected, setPcommDetected] = useState(false);
  const [selectedSession, setSelectedSession] = useState('');
  const [availableSessions, setAvailableSessions] = useState([]);
  const [connectionParams, setConnectionParams] = useState({
    host: '',
    port: '23',
    sessionType: 'TN3270',
    model: '2',
    codePage: '037',
    wsFile: ''
  });
  // Function to detect installed PCOMM and available sessions
  const detectPCOMM = () => {
    addLog('Searching for IBM PCOMM installation...');
    
    // In a real implementation, this would search for PCOMM installation
    // and read available session files
    // For this demo, we'll simulate detection
    
    setTimeout(() => {
      setPcommDetected(true);
      setPcommPath('C:\\Program Files\\IBM\\Personal Communications\\');
      setAvailableSessions([
        { id: 'session1', name: 'MAINFRAME1.WS', path: 'C:\\Users\\Public\\Documents\\IBM\\Personal Communications\\MAINFRAME1.WS' },
        { id: 'session2', name: 'DEV_SYSTEM.WS', path: 'C:\\Users\\Public\\Documents\\IBM\\Personal Communications\\DEV_SYSTEM.WS' },
        { id: 'session3', name: 'PRODUCTION.WS', path: 'C:\\Users\\Public\\Documents\\IBM\\Personal Communications\\PRODUCTION.WS' }
      ]);
      addLog('IBM PCOMM detected successfully');
    }, 1500);
  };
  
  useEffect(() => {
    // Try to detect PCOMM installation on component mount
    detectPCOMM();
  }, []);

  const connectToPCOMM = () => {
    // In a real implementation, this would connect to IBM PCOMM using its API
    if (!connectionParams.host) {
      addLog('Error: Host address is required');
      return;
    }
    
    addLog(`Connecting to ${connectionParams.host}:${connectionParams.port}...`);
    addLog(`Session type: ${connectionParams.sessionType}, Model: ${connectionParams.model}, Code page: ${connectionParams.codePage}`);
    
    // Simulating connection process
    setTimeout(() => {
      setConnectionStatus('Connected');
      updateEmulatorScreen(`IBM PCOMM Terminal Connected\nHost: ${connectionParams.host}\nSession: ${connectionParams.sessionType}\n\nReady for input...`);
      addLog('Connected to PCOMM successfully');
      setShowConnectionDialog(false);
    }, 1500);
  };

  const disconnectFromPCOMM = () => {
    addLog('Disconnecting from PCOMM...');
    setTimeout(() => {
      setConnectionStatus('Disconnected');
      updateEmulatorScreen('');
      addLog('Disconnected from PCOMM');
    }, 500);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>IBM PCOMM Mainframe Automation Tool</h1>
        <div className="connection-controls">
          <span className={`status ${connectionStatus === 'Connected' ? 'connected' : 'disconnected'}`}>
            {connectionStatus}
          </span>
          {connectionStatus === 'Connected' ? (
            <button onClick={disconnectFromPCOMM} disabled={isRunning}>Disconnect</button>
          ) : (
            <button onClick={openConnectionDialog} disabled={isRunning}>Connect to PCOMM</button>
          )}
          
          {showConnectionDialog && (
            <div className="connection-dialog-overlay">
              <div className="connection-dialog">
                <h3>Connect to Mainframe</h3>
                
                <div className="form-group">
                  <label>Host Address <span className="required">*</span></label>
                  <input
                    type="text"
                    value={connectionParams.host}
                    onChange={(e) => setConnectionParams({...connectionParams, host: e.target.value})}
                    placeholder="mainframe.example.com"
                  />
                </div>
                
                <div className="form-group">
                  <label>Port</label>
                  <input
                    type="text"
                    value={connectionParams.port}
                    onChange={(e) => setConnectionParams({...connectionParams, port: e.target.value})}
                    placeholder="23"
                  />
                </div>
                
                <div className="form-group">
                  <label>Session Type</label>
                  <select
                    value={connectionParams.sessionType}
                    onChange={(e) => setConnectionParams({...connectionParams, sessionType: e.target.value})}
                  >
                    <option value="TN3270">TN3270</option>
                    <option value="TN3270E">TN3270E</option>
                    <option value="TN5250">TN5250</option>
                    <option value="VT">VT</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Terminal Model</label>
                  <select
                    value={connectionParams.model}
                    onChange={(e) => setConnectionParams({...connectionParams, model: e.target.value})}
                  >
                    <option value="2">Model 2 (24x80)</option>
                    <option value="3">Model 3 (32x80)</option>
                    <option value="4">Model 4 (43x80)</option>
                    <option value="5">Model 5 (27x132)</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Code Page</label>
                  <select
                    value={connectionParams.codePage}
                    onChange={(e) => setConnectionParams({...connectionParams, codePage: e.target.value})}
                  >
                    <option value="037">037 (US/Canada)</option>
                    <option value="273">273 (Germany)</option>
                    <option value="277">277 (Denmark/Norway)</option>
                    <option value="278">278 (Finland/Sweden)</option>
                    <option value="280">280 (Italy)</option>
                    <option value="284">284 (Spain)</option>
                    <option value="285">285 (UK)</option>
                    <option value="297">297 (France)</option>
                    <option value="500">500 (International)</option>
                    <option value="930">930 (Japanese Katakana)</option>
                  </select>
                </div>
                
                <div className="dialog-buttons">
                  <button className="connect-btn" onClick={connectToPCOMM}>Connect</button>
                  <button className="cancel-btn" onClick={() => setShowConnectionDialog(false)}>Cancel</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>
      
      <div className="main-content">
        <div className="left-panel">
          <h2>Test Case Editor</h2>
          <TestCaseEditor 
            testCase={testCase} 
            setTestCase={setTestCase} 
            isRunning={isRunning}
            availableKeywords={KeywordLibrary.getAvailableKeywords()}
          />
          
          <div className="action-buttons">
            <button 
              onClick={handleRunTest} 
              disabled={isRunning || testCase.length === 0 || connectionStatus !== 'Connected'}
            >
              Run Test Case
            </button>
          </div>
        </div>
        
        <div className="right-panel">
          <h2>Emulator Screen</h2>
          <MainframeEmulator screen={emulatorScreen} />
          
          <h2>Execution Logs</h2>
          <div className="logs-container">
            {logs.map((log, index) => (
              <div key={index} className="log-entry">{log}</div>
            ))}
            {logs.length === 0 && <div className="empty-logs">No logs yet</div>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

// src/components/KeywordRunner.js
import React from 'react';

const KeywordRunner = ({ step, onComplete, onError }) => {
  // This component would handle the execution of a single keyword step
  return null; // Actual implementation handled by KeywordLibrary
};

export default KeywordRunner;

// src/components/TestCaseEditor.js
import React, { useState } from 'react';

const TestCaseEditor = ({ testCase, setTestCase, isRunning, availableKeywords }) => {
  const [currentKeyword, setCurrentKeyword] = useState('');
  const [currentParams, setCurrentParams] = useState({});
  const [selectedStepIndex, setSelectedStepIndex] = useState(null);

  const addStep = () => {
    if (!currentKeyword) return;
    
    const newStep = {
      keyword: currentKeyword,
      parameters: { ...currentParams }
    };
    
    setTestCase([...testCase, newStep]);
    resetForm();
  };

  const updateStep = () => {
    if (selectedStepIndex === null || !currentKeyword) return;
    
    const updatedTestCase = [...testCase];
    updatedTestCase[selectedStepIndex] = {
      keyword: currentKeyword,
      parameters: { ...currentParams }
    };
    
    setTestCase(updatedTestCase);
    resetForm();
    setSelectedStepIndex(null);
  };

  const deleteStep = (index) => {
    const updatedTestCase = testCase.filter((_, i) => i !== index);
    setTestCase(updatedTestCase);
    if (selectedStepIndex === index) {
      resetForm();
      setSelectedStepIndex(null);
    }
  };

  const editStep = (index) => {
    const step = testCase[index];
    setCurrentKeyword(step.keyword);
    setCurrentParams({ ...step.parameters });
    setSelectedStepIndex(index);
  };

  const moveStep = (index, direction) => {
    if ((direction === -1 && index === 0) || 
        (direction === 1 && index === testCase.length - 1)) {
      return;
    }
    
    const updatedTestCase = [...testCase];
    const temp = updatedTestCase[index];
    updatedTestCase[index] = updatedTestCase[index + direction];
    updatedTestCase[index + direction] = temp;
    
    setTestCase(updatedTestCase);
    
    if (selectedStepIndex === index) {
      setSelectedStepIndex(index + direction);
    } else if (selectedStepIndex === index + direction) {
      setSelectedStepIndex(index);
    }
  };

  const resetForm = () => {
    setCurrentKeyword('');
    setCurrentParams({});
  };

  const getParameterFields = () => {
    if (!currentKeyword) return null;
    
    const keywordInfo = availableKeywords.find(k => k.name === currentKeyword);
    if (!keywordInfo) return null;
    
    return keywordInfo.parameters.map(param => (
      <div key={param.name} className="parameter-field">
        <label>{param.label}</label>
        <input
          type="text"
          value={currentParams[param.name] || ''}
          onChange={(e) => setCurrentParams({
            ...currentParams,
            [param.name]: e.target.value
          })}
          disabled={isRunning}
          placeholder={param.placeholder || ''}
        />
        {param.description && <small>{param.description}</small>}
      </div>
    ));
  };

  return (
    <div className="test-case-editor">
      <div className="step-form">
        <div className="form-group">
          <label>Keyword</label>
          <select
            value={currentKeyword}
            onChange={(e) => setCurrentKeyword(e.target.value)}
            disabled={isRunning}
          >
            <option value="">Select a keyword</option>
            {availableKeywords.map(keyword => (
              <option key={keyword.name} value={keyword.name}>{keyword.name}</option>
            ))}
          </select>
        </div>
        
        {getParameterFields()}
        
        <div className="form-buttons">
          {selectedStepIndex !== null ? (
            <>
              <button onClick={updateStep} disabled={isRunning || !currentKeyword}>
                Update Step
              </button>
              <button onClick={() => { resetForm(); setSelectedStepIndex(null); }} disabled={isRunning}>
                Cancel
              </button>
            </>
          ) : (
            <button onClick={addStep} disabled={isRunning || !currentKeyword}>
              Add Step
            </button>
          )}
        </div>
      </div>
      
      <div className="test-case-steps">
        <h3>Test Steps</h3>
        {testCase.length === 0 ? (
          <div className="empty-steps">No steps added yet</div>
        ) : (
          <table className="steps-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Keyword</th>
                <th>Parameters</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {testCase.map((step, index) => (
                <tr key={index} className={selectedStepIndex === index ? 'selected-step' : ''}>
                  <td>{index + 1}</td>
                  <td>{step.keyword}</td>
                  <td>
                    {Object.entries(step.parameters).map(([key, value]) => (
                      <div key={key}>{key}: {value}</div>
                    ))}
                  </td>
                  <td>
                    <button onClick={() => editStep(index)} disabled={isRunning}>Edit</button>
                    <button onClick={() => deleteStep(index)} disabled={isRunning}>Delete</button>
                    <button 
                      onClick={() => moveStep(index, -1)} 
                      disabled={isRunning || index === 0}
                    >
                      ▲
                    </button>
                    <button 
                      onClick={() => moveStep(index, 1)} 
                      disabled={isRunning || index === testCase.length - 1}
                    >
                      ▼
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default TestCaseEditor;

// src/components/MainframeEmulator.js
import React from 'react';

const MainframeEmulator = ({ screen }) => {
  return (
    <div className="mainframe-emulator">
      <div className="emulator-screen">
        <pre>{screen || 'Terminal not connected'}</pre>
      </div>
    </div>
  );
};

export default MainframeEmulator;

// src/utils/KeywordLibrary.js
const KeywordLibrary = {
  getAvailableKeywords() {
    return [
      {
        name: 'Connect',
        description: 'Connect to the mainframe',
        parameters: [
          {
            name: 'host',
            label: 'Host Address',
            description: 'Mainframe host address or IP',
            placeholder: 'mainframe.example.com'
          },
          {
            name: 'port',
            label: 'Port',
            description: 'Connection port (default: 23)',
            placeholder: '23'
          },
          {
            name: 'sessionType',
            label: 'Session Type',
            description: 'Terminal emulation type',
            placeholder: 'TN3270'
          },
          {
            name: 'model',
            label: 'Terminal Model',
            description: 'Terminal model (e.g., 2, 3, 4, 5)',
            placeholder: '2'
          },
          {
            name: 'codePage',
            label: 'Code Page',
            description: 'EBCDIC code page (e.g., 037, 500)',
            placeholder: '037'
          }
        ]
      },
      {
        name: 'Disconnect',
        description: 'Disconnect from the mainframe',
        parameters: []
      },
      {
        name: 'WaitForText',
        description: 'Wait for specific text to appear on screen',
        parameters: [
          {
            name: 'text',
            label: 'Text to Wait For',
            description: 'The text string to wait for on the screen',
            placeholder: 'Enter text...'
          },
          {
            name: 'timeout',
            label: 'Timeout (seconds)',
            description: 'Maximum time to wait in seconds',
            placeholder: '30'
          }
        ]
      },
      {
        name: 'SendKeys',
        description: 'Send keystrokes to the mainframe',
        parameters: [
          {
            name: 'text',
            label: 'Text',
            description: 'Text to send to the mainframe',
            placeholder: 'Enter text...'
          }
        ]
      },
      {
        name: 'PressKey',
        description: 'Press a specific key',
        parameters: [
          {
            name: 'key',
            label: 'Key',
            description: 'Key to press (e.g., ENTER, F1, F2, etc.)',
            placeholder: 'ENTER'
          }
        ]
      },
      {
        name: 'SetCursorPosition',
        description: 'Move cursor to specific position',
        parameters: [
          {
            name: 'row',
            label: 'Row',
            description: 'Row number (starting from 1)',
            placeholder: '1'
          },
          {
            name: 'column',
            label: 'Column',
            description: 'Column number (starting from 1)',
            placeholder: '1'
          }
        ]
      },
      {
        name: 'GetText',
        description: 'Extract text from specified position',
        parameters: [
          {
            name: 'row',
            label: 'Row',
            description: 'Starting row (starting from 1)',
            placeholder: '1'
          },
          {
            name: 'column',
            label: 'Column',
            description: 'Starting column (starting from 1)',
            placeholder: '1'
          },
          {
            name: 'length',
            label: 'Length',
            description: 'Number of characters to extract',
            placeholder: '10'
          },
          {
            name: 'variableName',
            label: 'Save to Variable',
            description: 'Name of variable to store the extracted text',
            placeholder: 'myVariable'
          }
        ]
      },
      {
        name: 'Login',
        description: 'Login to mainframe with credentials',
        parameters: [
          {
            name: 'username',
            label: 'Username',
            description: 'Mainframe username',
            placeholder: 'Enter username...'
          },
          {
            name: 'password',
            label: 'Password',
            description: 'Mainframe password',
            placeholder: 'Enter password...'
          }
        ]
      },
      {
        name: 'RunTransaction',
        description: 'Run a mainframe transaction code',
        parameters: [
          {
            name: 'transactionCode',
            label: 'Transaction Code',
            description: 'Mainframe transaction code',
            placeholder: 'Enter transaction code...'
          }
        ]
      },
      {
        name: 'Wait',
        description: 'Wait for specified seconds',
        parameters: [
          {
            name: 'seconds',
            label: 'Seconds',
            description: 'Number of seconds to wait',
            placeholder: '5'
          }
        ]
      },
      {
        name: 'VerifyField',
        description: 'Verify text in a specific field',
        parameters: [
          {
            name: 'row',
            label: 'Row',
            description: 'Field row position',
            placeholder: '1'
          },
          {
            name: 'column',
            label: 'Column',
            description: 'Field column position',
            placeholder: '1'
          },
          {
            name: 'expectedText',
            label: 'Expected Text',
            description: 'Text expected in the field',
            placeholder: 'Enter expected text...'
          }
        ]
      }
    ];
  },

  async executeKeyword(keyword, parameters, updateScreen, addLog) {
    // In a real implementation, this would use IBM PCOMM's API
    // For this demo, we'll simulate the behavior
    
    addLog(`Executing keyword: ${keyword}`);
    
    // Demo responses for different keywords
    const demoScreens = {
      'Connect': `CONNECTED TO MAINFRAME\nHOST: ${parameters.host || 'DEFAULT'}\nPORT: ${parameters.port || '23'}\nSESSION: ${parameters.sessionType || 'TN3270'}\nMODEL: ${parameters.model || '2'}\nCODE PAGE: ${parameters.codePage || '037'}\n\nLOGIN:\n\n\n\n\nF1=HELP  F3=EXIT  F12=CANCEL`,
      'Login': 'LOGIN SUCCESSFUL\nMAIN MENU\n1. ACCOUNTS\n2. INVENTORY\n3. REPORTS\n4. ADMIN\n\nENTER SELECTION:',
      'RunTransaction': `TRANSACTION ${parameters.transactionCode} STARTED\n\n\nENTER DATA:`,
      'SendKeys': `INPUT RECEIVED: ${parameters.text}\n\nPRESS ENTER TO CONTINUE`,
      'PressKey': 'COMMAND PROCESSED SUCCESSFULLY\n\nNEXT SCREEN LOADED\n\nF1=HELP  F3=EXIT  F12=CANCEL',
      'WaitForText': 'TEXT FOUND ON SCREEN\n\nCONTINUING PROCESS...',
      'GetText': `EXTRACTED TEXT: ${parameters.variableName}=[SAMPLE DATA]\n\nPROCESS COMPLETE`,
      'VerifyField': parameters.expectedText === 'VALID' 
        ? 'VERIFICATION SUCCESSFUL\n\nFIELD CONTAINS EXPECTED VALUE'
        : 'VERIFICATION FAILED\n\nFIELD DOES NOT CONTAIN EXPECTED VALUE',
      'SetCursorPosition': `CURSOR MOVED TO POSITION [${parameters.row},${parameters.column}]\n\nREADY FOR INPUT`,
      'Wait': 'SYSTEM WAITING...\n\nPROCESSING...',
      'Disconnect': 'DISCONNECTING FROM MAINFRAME\n\nSESSION TERMINATED'
    };
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Update emulator screen with demo response
    if (demoScreens[keyword]) {
      updateScreen(demoScreens[keyword]);
    } else {
      updateScreen(`KEYWORD ${keyword} EXECUTED\n\nCOMPLETED SUCCESSFULLY`);
    }
    
    // Handle specific keyword logic for the demo
    switch (keyword) {
      case 'Connect':
        addLog(`Connecting to ${parameters.host}:${parameters.port}`);
        addLog(`Session type: ${parameters.sessionType}, Model: ${parameters.model}, Code Page: ${parameters.codePage}`);
        
        if (!parameters.host) {
          updateScreen('CONNECTION FAILED\n\nHOST ADDRESS IS REQUIRED\n\nPRESS ENTER TO TRY AGAIN');
          return { success: false, message: 'Host address is required' };
        }
        
        return { success: true, message: `Connected to ${parameters.host}` };
        
      case 'Login':
        addLog(`Logging in as ${parameters.username}`);
        if (parameters.username === 'admin' && parameters.password === 'password') {
          return { success: true, message: 'Login successful' };
        } else {
          updateScreen('LOGIN FAILED\n\nINVALID CREDENTIALS\n\nPRESS ENTER TO TRY AGAIN');
          return { success: false, message: 'Invalid credentials' };
        }
        
      case 'WaitForText':
        addLog(`Waiting for text: ${parameters.text} (timeout: ${parameters.timeout}s)`);
        // Simulate text appearing after a delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        return { success: true, message: 'Text found on screen' };
        
      case 'VerifyField':
        if (parameters.expectedText === 'VALID') {
          return { success: true, message: 'Field verification successful' };
        } else {
          return { success: false, message: 'Field verification failed' };
        }
        
      default:
        return { success: true, message: `Keyword ${keyword} executed successfully` };
    }
  }
};

export default KeywordLibrary;

// src/App.css
/* App.css would contain all styling for the application */

/* Connection Dialog Styling */
.connection-dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.connection-dialog {
  background-color: white;
  border-radius: 6px;
  padding: 20px;
  width: 500px;
  max-width: 90%;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.connection-dialog h3 {
  margin-top: 0;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
  margin-bottom: 15px;
}

.dialog-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}

.connect-btn {
  background-color: #27ae60;
}

.connect-btn:hover {
  background-color: #2ecc71;
}

.cancel-btn {
  background-color: #7f8c8d;
}

.cancel-btn:hover {
  background-color: #95a5a6;
}

.required {
  color: #e74c3c;
  font-weight: bold;
}
body {
  font-family: 'Courier New', monospace;
  margin: 0;
  padding: 0;
  background-color: #f0f0f0;
}

.app {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.app-header {
  background-color: #2c3e50;
  color: white;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.app-header h1 {
  margin: 0;
  font-size: 1.5rem;
}

.main-content {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.left-panel, .right-panel {
  flex: 1;
  padding: 20px;
  overflow: auto;
}

.left-panel {
  background-color: #ecf0f1;
  border-right: 1px solid #bdc3c7;
}

.right-panel {
  background-color: #fff;
}

h2 {
  margin-top: 0;
  color: #34495e;
  border-bottom: 1px solid #bdc3c7;
  padding-bottom: 10px;
}

.connection-controls {
  display: flex;
  align-items: center;
}

.status {
  margin-right: 10px;
  padding: 5px 10px;
  border-radius: 4px;
  font-weight: bold;
  font-size: 0.9rem;
}

.status.connected {
  background-color: #27ae60;
  color: white;
}

.status.disconnected {
  background-color: #e74c3c;
  color: white;
}

button {
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 15px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #2980b9;
}

button:disabled {
  background-color: #95a5a6;
  cursor: not-allowed;
}

.mainframe-emulator {
  margin-bottom: 20px;
}

.emulator-screen {
  background-color: #000;
  color: #0f0;
  border: 2px solid #34495e;
  padding: 10px;
  font-family: 'Courier New', monospace;
  height: 300px;
  overflow: auto;
  white-space: pre-wrap;
}

.logs-container {
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  padding: 10px;
  height: 150px;
  overflow-y: auto;
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
}

.log-entry {
  border-bottom: 1px solid #eee;
  padding: 4px 0;
}

.empty-logs {
  color: #7f8c8d;
  font-style: italic;
  text-align: center;
  padding: 20px;
}

.test-case-editor {
  margin-bottom: 20px;
}

.step-form {
  margin-bottom: 20px;
  padding: 15px;
  background-color: #fff;
  border: 1px solid #bdc3c7;
  border-radius: 4px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #34495e;
}

select, input {
  width: 100%;
  padding: 8px;
  border: 1px solid #bdc3c7;
  border-radius: 4px;
  font-size: 0.9rem;
}

.parameter-field {
  margin-bottom: 15px;
}

.parameter-field small {
  display: block;
  color: #7f8c8d;
  margin-top: 3px;
  font-size: 0.8rem;
}

.form-buttons {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin-top: 20px;
}

.steps-table {
  width: 100%;
  border-collapse: collapse;
}

.steps-table th, .steps-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.steps-table th {
  background-color: #f2f2f2;
}

.steps-table tr:nth-child(even) {
  background-color: #f9f9f9;
}

.selected-step {
  background-color: #e3f2fd !important;
}

.empty-steps {
  color: #7f8c8d;
  font-style: italic;
  text-align: center;
  padding: 20px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.action-buttons {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}

.action-buttons button {
  background-color: #27ae60;
  padding: 10px 20px;
  font-size: 1rem;
}

.action-buttons button:hover {
  background-color: #2ecc71;
}

.action-buttons button:disabled {
  background-color: #95a5a6;
}