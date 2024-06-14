import React, { useState } from 'react';
import Card from '@mui/material/Card';
import EditIcon from '@mui/icons-material/Edit';
import ShareIcon from '@mui/icons-material/Share';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import { CardActionArea, IconButton, Box, Tooltip, Button, Modal, TextField } from '@mui/material';

export default function CaseCard({ title, description, image_url, onEdit, onCardClick, caseId }) {
    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = (e) => {
        e.stopPropagation();
        setShowModal(true);
    };

    const handleCloseModal = (e) => {
        e.stopPropagation();
        setShowModal(false);
    };

    const handleCopyIframeCode = (e) => {
        e.stopPropagation();
        const iframeCode = `<iframe src="http://localhost:3000/cases/${caseId}" width="700" height="800"></iframe>`;
        navigator.clipboard.writeText(iframeCode)
            .then(() => alert('Código del iframe copiado al portapapeles'))
            .catch(err => console.error('Error al copiar el código del iframe', err));
    };

    return (
        <Card sx={{ maxWidth: 500 }}>
            <CardActionArea onClick={onCardClick}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <img src={image_url} alt={title} style={{ width: '80%', height: '200px', objectFit: 'cover' }} />
                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <IconButton color="secondary" aria-label="edit" onClick={onEdit}>
                            <EditIcon />
                        </IconButton>
                        <Tooltip title="Compartir">
                            <IconButton color="primary" aria-label="share" onClick={handleOpenModal}>
                                <ShareIcon />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Box>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {title}
                    </Typography>
                    <div dangerouslySetInnerHTML={{ __html: description }}
                        style={{
                            marginTop: '8px',
                            textAlign: 'justify',
                            display: '-webkit-box',
                            WebkitLineClamp: 4,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                        }} />
                </CardContent>
            </CardActionArea>

            <Modal
                open={showModal}
                onClose={handleCloseModal}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    <Typography variant="h6" id="modal-title" gutterBottom>
                        Código del iframe
                    </Typography>
                    <TextField
                        multiline
                        fullWidth
                        value={`<iframe src="http://localhost:3000/cases/${caseId}" width="700" height="800"></iframe>`}
                        variant="outlined"
                        InputProps={{
                            readOnly: true,
                            endAdornment: (
                                <Button onClick={handleCopyIframeCode} variant="contained" color="primary">
                                    Copiar
                                </Button>
                            ),
                        }}
                    />
                </Box>
            </Modal>
        </Card>
    );
}
