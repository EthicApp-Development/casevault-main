import { Box, Typography,IconButton} from '@mui/material'
import React from 'react';
import { title_style } from '../../Utils/defaultStyles';
import VideoField from './VideoDataField';
import newTheme from '../../Components/Theme';
import useToggle from '../../Hooks/ToggleHook';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useCaseContext } from '../CreateCase';

const css = {
    link: {
        cursor: 'pointer',
        fontWeight: 600,
        textDecoration: 'underline',
        color: newTheme.palette.info.main
    },
    container: {
        marginBottom: 3
    },
    interspace: {
        background: 'black',
        height: 12,

    }
}

export default function VideoCreator() {
    const [open, toggleOpen] = useToggle(false);
    const {videos, setVideos, caseObject} = useCaseContext()
    return (
        <Box marginTop={3}>
          <Typography variant='h2' sx={title_style}>Videos relacionados al caso</Typography>
          <IconButton onClick={toggleOpen}>
            <AddCircleOutlineIcon/>
          </IconButton>
            <Box>
                <VideoField open={open} toggleOpen={toggleOpen}  />
            </Box>
        </Box>
    );
}
