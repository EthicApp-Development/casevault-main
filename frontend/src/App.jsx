
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar.jsx';
import Home from './Home.jsx';
import UserCases from './MyCases/UserCases.jsx';
import SearchResults from './SearchResults.jsx';
import AppContext from './Contexts/AppContext.jsx';
import { Box } from "@mui/material";
import CreateCase from './CreationCases/CreateCase.jsx';
import TextCreator from './CreationCases/TextCreator.jsx';
import VideoCreator from './CreationCases/Video/VideoCreator.jsx';
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
            <Route path="/mycases/" element={<UserCases />} />
            <Route path="/create_case" element={<CreateCase />}>
              <Route path="text" element={<TextCreator />} />
              <Route path="videos" element={<VideoCreator />} />
            </Route>
          </Routes>
        </Box>
      </AppContext.Provider>
    </div>
  );
}

export default App;