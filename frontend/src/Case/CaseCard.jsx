import React from 'react';
import Card from '@mui/material/Card';
import EditIcon from '@mui/icons-material/Edit';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import { CardActionArea, IconButton, Box } from '@mui/material';

export default function CaseCard({ title, description, image_url, onEdit }) {
    return (
        <Card sx={{ maxWidth: 500 }}>
            <CardActionArea>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <img src={image_url} alt={title} style={{ width: '80%', height: '200px', objectFit: 'cover' }} />
                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <IconButton color="secondary" aria-label="edit" onClick={onEdit}>
                            <EditIcon />
                        </IconButton>
                    </Box>
                </Box>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {title}
                    </Typography>
                    <div dangerouslySetInnerHTML={{ __html: description }} style={{ marginTop: '8px' }} />
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
