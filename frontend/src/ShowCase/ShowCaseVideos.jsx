import { Box, Typography} from "@mui/material"
import { useCaseContext } from "./ShowCase"
import { dialog_style } from "../Utils/defaultStyles"

const css = {
    item:{
        margin: '6px 0',
        borderRadius: 1,
        padding: 0.5,
        display: 'flex',
        alignItems: 'center',
        gap: 3,
        flexWrap: 'wrap'
    },
}
const ShowCaseVideos = () => {
    const {videos, setVideos} = useCaseContext()

    return (
        <>
            {videos.map((video, index) => (
                <Box sx={{...dialog_style,marginTop: 5}} key={index}>
                    <Box sx={{...css.item_name, marginLeft: 2}}> 
                    <Typography variant='body1'>{video.title}</Typography>
                    </Box>
                <Box sx={css.item}>
                    {video.url && (
                    <div>
                        <iframe
                            width="500"
                            height="315"
                            src={video.url}
                            title="YouTube video player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>  
                    )}
                </Box>
                </Box>
            )).reverse()}
        </>
    );
}

export default ShowCaseVideos;