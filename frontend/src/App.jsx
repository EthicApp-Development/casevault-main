import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './Components/Navbar.jsx';
import Home from './Home.jsx';
import UserCases from './MyCases/UserCases.jsx';
import SearchResults from './SearchResults.jsx';
import AppContext from './Contexts/AppContext.jsx';
import { Box } from "@mui/material";
import CreateCase from './CreationCases/CreateCase.jsx';
import TextCreator from './CreationCases/Texto/TextCreator.jsx';
import VideoCreator from './CreationCases/Video/VideoCreator.jsx';
import DocumentCreator from './CreationCases/Documents/DocumentCreator.jsx';
import AudioCreator from './CreationCases/Audios/AudioCreator.jsx';
import Login from './Session/Login.jsx';

function App() {
  const location = useLocation();
  const { pathname } = location
  return (
    <div>
      <AppContext.Provider value={{

      }}>
        {pathname !== "/login/" && <Navbar />}
        <Box marginTop={20}>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/search/:searchTerm" element={<SearchResults />} />
            <Route path="/mycases/" element={<UserCases />} />
            <Route path="/create_case" element={<CreateCase />}>
              <Route path="text" element={<TextCreator />} />
              <Route path="videos" element={<VideoCreator />} />
              <Route path="documents" element={<DocumentCreator />} />
              <Route path="audios" element={<AudioCreator />} />
            </Route>
          </Routes>
        </Box>
      </AppContext.Provider>
    </div>
  );
}

export default App;
