import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Importa BrowserRouter y Routes de react-router-dom
import App from './App.jsx';
import { ThemeProvider } from '@mui/material';
import newTheme from './Components/Theme.jsx';
import Navbar from './Components/Navbar.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={newTheme}>
    <React.StrictMode>
      <Router>
        <App />
      </Router>
    </React.StrictMode>
  </ThemeProvider>
);

