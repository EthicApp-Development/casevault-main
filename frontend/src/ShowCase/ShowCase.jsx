import React, { useState, createContext, useContext, useEffect } from "react";
import { Outlet, useNavigate, useParams, useLocation } from "react-router-dom";
import { getCase } from "../API/cases";
import { Box, Tab, Tabs } from '@mui/material';
import AppContext from "../Contexts/AppContext";

const CaseContext = createContext();

export const useCaseContext = () => {
    return useContext(CaseContext);
};

function ShowCase() {
    const [selectedTab, setSelectedTab] = useState(0); 
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [text, setText] = useState('');
    const [tags, setTags] = useState([]);
    const [documents, setDocuments] = useState([]);
    const [audios, setAudios] = useState([]);
    const [visibility, setVisibility] = useState('');
    const [mainImage, setMainImage] = useState('');
    const [caseObject, setCaseObject] = useState({});
    const [comments, setComments] = useState({});
    const [allowComments, setAllowComments] = useState(true);
    const [canComment, setCanComment] = useState(false);
    const { caseId } = useParams();
    const [videos, setVideos] = useState([]);
    const { user } = useContext(AppContext);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        async function fetchData() {
            if (caseId && user) {
                try {
                    const response = await getCase(caseId, user.id);
                    setCaseObject(response.data);
                    setAudios(response.data.audios);
                    setVideos(response.data.videos);
                    setDocuments(response.data.documents);
                    setComments(response.data.comments);
                    setTags(response.data.tags);
                    setMainImage(response.data.main_image_url);
                    setText(response.data.text || '');
                    setTitle(response.data.title);
                    setAllowComments(response.data.comments_availability === "comments_enabled");
                    setCanComment(response.data.current_user_comment_available);
                } catch (error) {
                    console.log("No se pudo obtener el caso");
                }
            }
        }
        fetchData();
    }, [caseId, user]);

    useEffect(() => {
        const segments = location.pathname.split('/');
        const tabSegment = segments[segments.length - 1];
        const tabValue = getTabValue(tabSegment);
        setSelectedTab(tabValue);
    }, [location.pathname]);

    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
        navigate(`/show_case/${caseId}/${getTabSegment(newValue)}`);
    };

    const getTabSegment = (tabIndex) => {
        switch (tabIndex) {
            case 0:
                return 'text';
            case 1:
                return 'videos';
            case 2:
                return 'documents';
            case 3:
                return 'audios';
            case 4:
                return 'comments';
            default:
                return '';
        }
    };

    const getTabValue = (tabSegment) => {
        switch (tabSegment) {
            case 'text':
                return 0;
            case 'videos':
                return 1;
            case 'documents':
                return 2;
            case 'audios':
                return 3;
            case 'comments':
                return 4;
            default:
                return 0;
        }
    };

    const contextValue = {
        title,
        setTitle,
        summary,
        setSummary,
        documents,
        setDocuments,
        audios,
        setAudios,
        videos,
        setVideos,
        visibility,
        setVisibility,
        text,
        setText,
        mainImage,
        setMainImage,
        tags,
        setTags,
        caseObject,
        setCaseObject,
        comments,
        setComments,
        allowComments,
        setAllowComments,
        canComment,
        setCanComment,
    };

    return (
        <CaseContext.Provider value={contextValue}>
            <Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginLeft: 10 }}>
                    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs aria-label="basic tabs example" value={selectedTab} onChange={handleTabChange}>
                            <Tab label="Texto" value={0} sx={{ textTransform: 'none' }} />
                            <Tab label="Videos" value={1} sx={{ textTransform: 'none' }} />
                            <Tab label="Documentos" value={2} sx={{ textTransform: 'none' }} />
                            <Tab label="Audios" value={3} sx={{ textTransform: 'none' }} />
                            <Tab label="Comentarios" value={4} sx={{ textTransform: 'none' }} />
                        </Tabs>
                    </Box>
                    <Outlet />
                </Box>
            </Box>
        </CaseContext.Provider>
    );
}

export default ShowCase;
