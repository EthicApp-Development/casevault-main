import { Box } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCaseAudios } from '../API/cases';

const ShowCaseAudios = () => {
    const [audios, setAudios] = useState([]);
    const { caseId } = useParams();

    useEffect(() => {
        fetchCaseAudios();
    }, []);

    const fetchCaseAudios = async () => {
        try {
            const response = await getCaseAudios(caseId);
            if (response.status === 200) {
                setAudios(response.data);
            } else {
                alert("Error al obtener los videos del caso");
            }
        } catch (error) {
            alert("Error al procesar la solicitud");
        }
    };

    return (
        <div>
            {audios.map((data, index) => (
                <Box key={index} marginTop={2} marginBottom={2} sx={{ width: '250%', border: '1px solid black', padding: '10px', position: 'flex' }}>
                    {data.url && (
                        <iframe
                            style={{ borderRadius: '12px' }}
                            src={data.url}
                            width="100%"
                            height="152"
                            frameBorder="0"
                            allowFullScreen=""
                            allow="clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                            loading="lazy"
                        ></iframe>
                    )}
                    {data.file_url && (
                        <div style={{ marginBottom: '10px' }}>
                            <a href={data.file_url} download>{data.title}</a> 
                        </div>
                    )}
                    <div>
                        {data.title}
                    </div>
                </Box>
            )).reverse()}
        </div>
    );
};

export default ShowCaseAudios;
