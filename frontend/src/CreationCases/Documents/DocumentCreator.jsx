import { Drawer, Box, Typography, Paper, Button, TextField } from '@mui/material'
import { useState, useEffect } from 'react';
import React from 'react';
import { paper_style, title_style } from '../../Utils/defaultStyles';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { italic, inline } from '../../Utils/defaultStyles';
import newTheme from '../../Components/Theme';
import { useCaseContext } from '../CreateCase';
import { DocumentCreatorField } from './FileInput';
import { useParams } from 'react-router-dom';
import { getDocuments } from '../../API/cases';

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

export default function DocumentCreator() {
  const [documents, setDocuments] = useState([])
  const { caseId } = useParams()

  useEffect(() => {
    async function fetchDocuments() {
      try {
        const response = await getDocuments(caseId)
        setDocuments(response.data.info)
      } catch (error) {
        console.error("Error fetching documents:", error)
      }
    }

    fetchDocuments();
  }, [caseId])

    console.log(documents)
    return (
        <Box marginTop={3}>
            <Typography variant='h2' sx={title_style}>Documentos relacionados al caso</Typography>
            <div>
      <h2>Documentos del caso:</h2>
      <ul>
        {documents.map((document) => (
          <li key={document.id}>
            <h3>{document.title}</h3>
            <p>{document.description}</p>
            <a href={`/api/v1/documents/${document.id}/download`} target="_blank" rel="noreferrer" style={css.link}>
              Descargar documento
            </a>
          </li>
        ))}
      </ul>
    </div>
    <DocumentCreatorField/>
        </Box>
    );
}
