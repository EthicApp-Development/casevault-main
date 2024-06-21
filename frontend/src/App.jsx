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
import InfoCreator from './CreationCases/Information/InfoCreator.jsx';
import { useState, useEffect } from 'react';
import { getUser } from './API/user.js';
import Register from './Session/Register.jsx';
import NotFound from './Components/404.jsx';
import Forbidden from './Components/403.jsx';
import ShowCase from './ShowCase/ShowCase.jsx';
import ShowCaseText from './ShowCase/ShowCaseText.jsx';
import ShowCaseVideos from './ShowCase/ShowCaseVideos.jsx';
import ShowCaseAudios from './ShowCase/ShowCaseAudios.jsx';
import ShowCaseDocuments from './ShowCase/ShowCaseDocuments.jsx';

function App() {
  const location = useLocation();
  const [user, setUser] = useState(null)
  const { pathname } = location
  const [avatar, setAvatar] = useState()

    useEffect(() => {
        const fetchUser = async () => {
            const accountString = localStorage.getItem("account");
            if (accountString) {
                console.log("accountString", accountString);
                const account = JSON.parse(accountString);
                const userId = account.id;
                try {
                    const response = await getUser(userId);
                    setUser(response.data.info);
                } catch (error) {
                    console.error("Error fetching user:", error);
                }
            }
        };

        fetchUser();
    }, []);

  useEffect(() => {
    const accountInfo = localStorage.getItem('account');
    if (!accountInfo && pathname !== "/login" && pathname !== "/login/" && pathname !== "/register" && pathname !== "/register/"){
      // Redirigir a la página de inicio de sesión si no hay información de cuenta en el almacenamiento local
      window.location.href = "/login";
    }
  }, [pathname]);

  return (
    <div>
      <AppContext.Provider value={{
        user, setUser, avatar, setAvatar
      }}>
        {pathname !== "/login/" && pathname !== "/login" && pathname !== "/register" && pathname !== "/register/" && <Navbar />}
        <Box marginTop={0} marginLeft={45}>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/search/:searchTerm" element={<SearchResults />} />
            <Route path="/mycases/" element={<UserCases />} />
            <Route path="/show_case/:caseId/" element={<ShowCase />}>
              <Route path="text" element={<ShowCaseText />} />
              <Route path="videos" element={<ShowCaseVideos />} />
              <Route path="audios" element={<ShowCaseAudios />} />
              <Route path='documents' element={<ShowCaseDocuments />} />
            </Route>
            <Route path="/create_case/:caseId/" element={<CreateCase />}>
              <Route path="text" element={<TextCreator />} />
              <Route path="videos" element={<VideoCreator />} />
              <Route path="documents" element={<DocumentCreator />} />
              {/* <Route path="images" element={<ImageCreator />} /> */}
              <Route path="audios" element={<AudioCreator />} />
              <Route path="information" element={<InfoCreator />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Box>
      </AppContext.Provider>
    </div>
  );
}

export default App;
