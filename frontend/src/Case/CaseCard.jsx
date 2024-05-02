import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';


export default function CaseCard({ title, description, image_url }) {
    return (
        <Card sx={{ maxWidth: 500 }}>
            <CardActionArea>
                <CardContent>
                    <img src={image_url} alt={title} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                    <Typography gutterBottom variant="h5" component="div">
                        {title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {description}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}