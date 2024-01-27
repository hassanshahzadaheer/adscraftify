import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import router from './route.jsx';
import { RouterProvider } from 'react-router-dom';
import { ContextProvider } from './contexts/ContextProvider.jsx';

// Use ReactDOM.createRoot to render the React application
ReactDOM.createRoot(document.getElementById('root')).render(
  // Wrap the entire application in React.StrictMode for additional development checks
  <React.StrictMode>
    {/*
      Wrap the entire application in the ContextProvider to provide context values
      This assumes that ContextProvider is imported from a separate file
    */}

    <ContextProvider>
      {/*
        Wrap the entire application in RouterProvider to enable routing
        Pass the router object (containing route information) to RouterProvider
      */}
      <RouterProvider router={router} />
    </ContextProvider>
  </React.StrictMode>,
);
