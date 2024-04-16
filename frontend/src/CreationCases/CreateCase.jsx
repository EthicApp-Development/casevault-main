import { Typography, Box, Breadcrumbs, Link, Tab, Tabs, Button } from '@mui/material';
import useToggle from "../Hooks/ToggleHook";
import { Outlet, useNavigate } from "react-router-dom";

function CreateCase() {
    const [selectedTab, setSelectedTab] = useToggle(0)
    const navigate = useNavigate()

    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue)

        switch (newValue) {
            case 0:
                navigate('/create_case/text')
                break
            case 1:
                navigate('/create_case/videos')
                break;
            case 2:
                navigate('/create_case/documents')
                break;
            case 3:
                navigate('/create_case/audios')
                break;
            case 4:
                navigate('/create_case/visibility')
                break;
            case 5:
                navigate('/create_case/summary')
                break;
            default:
                break;
        }
    }

    return (
        <Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginLeft: 10 }}>
                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs aria-label="basic tabs example" value={selectedTab} onChange={handleTabChange}>
                        <Tab label="Texto" value={0} />
                        <Tab label="Videos" value={1} />
                        <Tab label="Documentos" value={2} />
                        <Tab label="Audios" value={3} />
                        <Tab label="Visibilidad" value={4} />
                        <Tab label="Resumen" value={5} />
                    </Tabs>
                    <Button variant="contained" sx={{ minWidth: 120 }}>Enviar caso</Button>
                </Box>
                <Outlet />
            </Box>

        </Box>
    )
}

export default CreateCase
