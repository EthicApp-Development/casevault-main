import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Importa BrowserRouter y Routes de react-router-dom
import App from './App.jsx';
import Home from './Home.jsx';
import { ThemeProvider } from '@mui/material';
import newTheme from './Components/Theme.jsx';
import Navbar from './Components/Navbar.jsx';
import { Box } from '@mui/material';
import SearchResults from './SearchResults.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={newTheme}>
    <React.StrictMode>
      <Router>
        <Navbar />
        <Box marginTop={24}>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/home" element={<Home />} />
            <Route path="/search/:searchTerm" component={SearchResults} />
          </Routes>
        </Box>
      </Router>
    </React.StrictMode>
  </ThemeProvider>
);
