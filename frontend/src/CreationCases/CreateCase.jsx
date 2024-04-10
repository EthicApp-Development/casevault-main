import RTE from "../Utils/RTE"
import { Typography, Box, Breadcrumbs, Link, Tab, Tabs, Button } from '@mui/material';
import TextCreator from "./TextCreator";
import { inline_buttons } from "../Utils/defaultStyles"

function CreateCase() {
    return (
        <Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginLeft: 10 }}>
                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs aria-label="basic tabs example">
                        <Tab label="Texto" />
                        <Tab label="Videos" />
                        <Tab label="Documentos" />
                        <Tab label="Audios" />
                        <Tab label="Visibilidad" />
                        <Tab label="Resumen" />
                    </Tabs>
                    <Button variant="contained" sx={{ minWidth: 120 }}>Enviar caso</Button>
                </Box>
            </Box>
            <TextCreator />
        </Box>
    )
}

export default CreateCase
