import { useState, createContext, useContext } from "react";
import { Box, Tab, Tabs} from '@mui/material';
import useToggle from "../Hooks/ToggleHook";
import { Outlet, useNavigate, useParams } from "react-router-dom";

const CaseContext = createContext();

export const useCaseContext = () => {
    return useContext(CaseContext);
};


function CreateCase() {
    const [selectedTab, setSelectedTab] = useToggle(0);
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [text, setText] = useState('');
    const [documents, setDocuments] = useState([]);
    const [audios, setAudios] = useState([]);
    const [videos, setVideos] = useState([]);
    const [visibility, setVisibility] = useState('');
    const [mainImage, setMainImage] = useState('');
    const [caseObject, setCaseObject] = useState({});
    const { caseId, } = useParams();
    const navigate = useNavigate();

    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue)

        switch (newValue) {
            case 0:
                navigate(`/create_case/${caseObject.id}/text`)
                break
            case 1:
                navigate(`/create_case/${caseObject.id}/videos`)
                break
            case 2:
                navigate(`/create_case/${caseObject.id}/documents`)
                break
            case 3:
                navigate(`/create_case/${caseObject.id}/audios`)
                break
            case 4:
                navigate(`/create_case/${caseObject.id}/visibility`)
                break
            case 5:
                navigate(`/create_case/${caseObject.id}/information`)
                break
            default:
                break
        }
    }

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
                    </Box>
                    <Outlet />
                </Box>
            </Box>
        </CaseContext.Provider>
    )
}

export default CreateCase;
