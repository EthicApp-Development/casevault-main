import { useParams } from 'react-router-dom';
import React, { useContext, useEffect, useState } from 'react';
import { getCase } from '../API/cases';
import InterpreterRichText from '../Utils/InterpreterRichText';
import { Box, Typography, Chip } from '@mui/material';
import AppContext from '../Contexts/AppContext';
import { useCaseContext } from "./ShowCase";

function ShowCaseText() {
    const { mainImage, setMainImage , title, setTitle, text, setText, tags, setTags} = useCaseContext();
    const { caseId } = useParams();
    const {user} = useContext(AppContext)    

    return (
        <Box p={2} sx={{ position: 'relative', marginRight: '320px' }}>
            <Typography variant="h1" align='left' gutterBottom>
                <strong>{title}</strong>
            </Typography>
            <Typography variant="body1" align='left' gutterBottom>
                <InterpreterRichText htmlContent={text} />
            </Typography>
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
                            height: '250px',
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
