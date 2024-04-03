
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar.jsx';
import Home from './Home.jsx'; // Importa tus componentes correctamente
import UserCases from './MyCases/UserCases.jsx';
import SearchResults from './SearchResults.jsx';
import useTabs from './Hooks/UseTabs.jsx';
import AppContext from './Contexts/AppContext.jsx';

function App() {

  const [tab, setTab] = useTabs(0)
  return (
    <div>
      <AppContext.Provider value={{
        tab,
        setTab
      }}>
        <Navbar />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/search/:searchTerm" element={<SearchResults />} />
          <Route path="/usercases/" element={<UserCases />} />
        </Routes>
      </AppContext.Provider>
    </div>
  );
}

export default App;