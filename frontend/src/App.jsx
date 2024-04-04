
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar.jsx';
import Home from './Home.jsx'; // Importa tus componentes correctamente
import UserCases from './MyCases/UserCases.jsx';
import SearchResults from './SearchResults.jsx';
import useTabs from './Hooks/UseTabs.jsx';
import AppContext from './Contexts/AppContext.jsx';
import { Box } from "@mui/material";
function App() {

  return (
    <div>
      <AppContext.Provider value={{

      }}>
        <Navbar />
        <Box marginTop={20}>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/search/:searchTerm" element={<SearchResults />} />
            <Route path="/usercases/" element={<UserCases />} />
          </Routes>
        </Box>
      </AppContext.Provider>
    </div>
  );
}

export default App;