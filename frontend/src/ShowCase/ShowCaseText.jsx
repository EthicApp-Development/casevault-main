import { useLocation, useParams } from 'react-router-dom';
import React, { useContext, useEffect, useState } from 'react';
import { getCase } from '../API/cases';
import InterpreterRichText from '../Utils/InterpreterRichText';
import { Box, Typography, Chip, ToggleButtonGroup, ToggleButton } from '@mui/material';
import AppContext from '../Contexts/AppContext';
import { useCaseContext } from "./ShowCase";

function ShowCaseText() {
    const { mainImage, setMainImage , title, setTitle, text, setText, tags, setTags} = useCaseContext();
    const { caseId } = useParams();
    const {user} = useContext(AppContext);

    const shouldShowTitle = location.pathname.startsWith('/cases/');

    const [fontSize, setFontSize] = useState('normal');
    const handleFontSizeChange = (event, newValue) => {
        if (newValue !== null) {
            setFontSize(newValue);
        }
    };

    return (
        <Box p={2} sx={{ position: 'relative', marginRight: '320px' }}>
            {shouldShowTitle && (
                <Typography variant="h1" align='left' gutterBottom>
                    <strong>{title}</strong>
                </Typography>
            )}
            
            <Box sx={{ position: 'relative'}}>
                <Box display="flex" justifyContent="flex-start">
                    <ToggleButtonGroup
                            value={fontSize}
                            exclusive
                            onChange={handleFontSizeChange}
                            aria-label="font size toggle"
                            sx={{ height: 40 }}
                        >
                            <ToggleButton
                                value="normal"
                                aria-label="small text"
                                sx={{ textTransform: 'none', fontSize: '1rem', px: 2 }}
                                >
                                a
                            </ToggleButton>
                            <ToggleButton
                                value="large"
                                aria-label="large text"
                                sx={{ textTransform: 'none', fontSize: '1.5rem', px: 2 }}
                                >
                                A
                            </ToggleButton>
                    </ToggleButtonGroup>
                </Box>

                <Typography
                    variant="body1"
                    align="left"
                    gutterBottom
                    sx={{ fontSize: fontSize === 'large' ? '1.5rem' : '1rem' }}
                >
                    <InterpreterRichText htmlContent={text} />
                </Typography>
            </Box>
            
            {mainImage && (
                <Box 
                    sx={{
                        position: 'fixed',
                        top: '40%',
                        right: '20px',
                        transform: 'translateY(-50%)',
                        width: '300px',
                        height: 'auto',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}
                >
                    <Box 
                        component="img" 
                        src={mainImage} 
                        alt={title} 
                        sx={{
                            width: '300px',
                            height: 'auto',
                            objectFit: 'contain',
                            marginBottom: '16px'
                        }}
                    />
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                        {tags.map(tag => (
                            <Chip key={tag.id} label={tag.name} 
                                sx={{ 
                                    margin: '4px',
                                    fontSize: '1.1rem',
                                    padding: '10px',
                                }} 
                            />
                        ))}
                    </Box>
                </Box>
            )}
        </Box>
    );
}

export default ShowCaseText;
