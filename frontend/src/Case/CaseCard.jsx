import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import TextEllipsis from '../Utils/Ellipsis';
import InterpreterRichText from '../Utils/InterpreterRichText';
import {Box} from '@mui/material';
export default function CaseCard({ title, description, image_url }) {
    return (
        <Card sx={{ maxWidth: 700 }}>
            <CardActionArea>
                <CardContent>
                    <img src={image_url} alt={title} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                    <Typography gutterBottom variant="h5" component="div">
                        {title}
                    </Typography>
                   
                        <TextEllipsis 
                            text={description ? description : ""} 
                            variant="body1" 
                            showTooltip={true} 
                            maxLines={5} 
                        />
                    
                </CardContent>
            </CardActionArea>
        </Card>
    );
}