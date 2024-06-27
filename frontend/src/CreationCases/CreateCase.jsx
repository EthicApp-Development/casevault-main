import React, { useState, createContext, useContext, useEffect } from "react";
import { Box, Tab, Tabs, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import useToggle from "../Hooks/ToggleHook";
import { Outlet, useNavigate, useParams, useLocation } from "react-router-dom";
import { getCase, deleteCase } from "../API/cases"; // Importa la función deleteCase

const CaseContext = createContext();

export const useCaseContext = () => {
    return useContext(CaseContext);
};

function CreateCase() {
    const [selectedTab, setSelectedTab] = useState(0); // Inicializar en 0
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [text, setText] = useState('');
    const [description, setDescription] = useState('');
    const [documents, setDocuments] = useState([]);
    const [audios, setAudios] = useState([]);
    const [visibility, setVisibility] = useState('');
    const [mainImage, setMainImage] = useState('');
    const [caseObject, setCaseObject] = useState({});
    const { caseId } = useParams();
    const [videos, setVideos] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const [tags, setTags] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [caseIdToDelete, setCaseIdToDelete] = useState(null);
    
    useEffect(() => {
        async function fetchData() {
            if (!!caseObject) {
                try {
                    const response = await getCase(caseId);
                    setCaseObject(response.data);
                    setVideos(response.data.videos);
                    setTags(response.data.tags);
                    setDocuments(response.data.documents);
                    setAudios(response.data.audios);
                } catch (error) {
                    console.log("No se pudo obtener el caso");
                }
            }
        }
        fetchData();
    }, [caseId]);

    useEffect(() => {
        const segments = location.pathname.split('/');
        const tabSegment = segments[segments.length - 1];
        const tabValue = getTabValue(tabSegment);
        setSelectedTab(tabValue); 
    }, [location.pathname]);

    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
        navigate(`/create_case/${caseObject?.id}/${getTabSegment(newValue)}`);
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
                return 'visibility';
            case 5:
                return 'information';
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
            case 'visibility':
                return 4;
            case 'information':
                return 5;
            default:
                return 0;
        }
    };

    const openModal = (caseId) => {
        setIsModalOpen(true);
        setCaseIdToDelete(caseId);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setCaseIdToDelete(null);
    };

    const handleDeleteCase = async () => {
        try {
            await deleteCase(caseIdToDelete);
            closeModal();
            navigate('/home');
        } catch (error) {
            console.error("Error al eliminar el caso:", error);
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
        caseObject,
        setCaseObject,
        tags,
        setTags,
        description,
        setDescription
    };

    return (
        <CaseContext.Provider value={contextValue}>
            <Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginLeft: 10 }}>
                    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs aria-label="basic tabs example" value={selectedTab} onChange={handleTabChange}>
                            <Tab label="Texto" value={0} />
                            <Tab label="Videos" value={1} />
                            <Tab label="Documentos" value={2} />
                            <Tab label="Audios" value={3} />
                            <Tab label="Visibilidad" value={4} />
                            <Tab label="Información" value={5} />
                        </Tabs>
                        <Button sx={{ textTransform: 'none', zIndex: 100 }} variant="contained" color="error" onClick={() => openModal(caseObject.id)}>Eliminar caso</Button>
                    </Box>
                    <Outlet />
                </Box>

                <Dialog
                    open={isModalOpen}
                    onClose={closeModal}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Eliminar caso"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            ¿Estás seguro de que deseas eliminar este caso?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={closeModal} color="primary">
                            Cancelar
                        </Button>
                        <Button onClick={handleDeleteCase} color="error" autoFocus>
                            Eliminar
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </CaseContext.Provider>
    );
}

export default CreateCase;
