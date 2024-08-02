import React, { useEffect } from 'react';

const useHandleTabClose = () => {
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      // Set a flag to indicate the tab is about to be closed
      localStorage.setItem('isClosing', 'true');
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        if (localStorage.getItem('isClosing') === 'true') {
          // Clear local storage if the tab is being closed
          localStorage.removeItem('isClosing');
          localStorage.clear();
        }
      } else if (document.visibilityState === 'visible') {
        // Reset the flag when the tab becomes visible again
        localStorage.removeItem('isClosing');
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);
};

const App = () => {
  useHandleTabClose();

  return (
    <div>
      <h1>My React App</h1>
      <p>This app handles closing local storage when the tab is closed.</p>
    </div>
  );
};

export default App;