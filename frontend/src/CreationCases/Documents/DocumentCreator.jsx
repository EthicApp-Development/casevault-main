import { Drawer, Box, Typography, Paper, Button, TextField, IconButton } from '@mui/material'
import { useState, useEffect } from 'react';
import React from 'react';
import { dialog_style, paper_style, title_style, inline_buttons } from '../../Utils/defaultStyles';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { italic, inline } from '../../Utils/defaultStyles';
import newTheme from '../../Components/Theme';
import { useCaseContext } from '../CreateCase';
import { DocumentCreatorField } from './FileInput';
import { useParams } from 'react-router-dom';
import { deleteDocuments, getDocuments } from '../../API/cases';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import useToggle from '../../Hooks/ToggleHook';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

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

    },
    item:{
      margin: '6px 0',
      borderRadius: 1,
      padding: 0.5,
      display: 'flex',
      alignItems: 'center',
      gap: 3,
      flexWrap: 'wrap'
    },
    item_name: {
      flexBasis: '60%',
      flexGrow: 1
    },
    item_actions: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      flexGrow: 1
    }
}

export default function DocumentCreator() {
  const [documents, setDocuments] = useState([])
  const { caseId } = useParams()
  const [openMenu, toggleMenu] = useToggle(false)


    async function handleDeleteDocument(documentId) {
      try {
        console.log(documentId)
        const response = await deleteDocuments(caseId,documentId)
        setDocuments(response.data.info)
      } catch (error) {
        console.error("Error fetching documents:", error)
      }
    }

    return (
      <Box marginTop={3} sx={{width: '80%'}}>
          <Typography variant='h2' sx={title_style}>Documentos relacionados al caso</Typography>
          <IconButton onClick={toggleMenu}>
            <AddCircleOutlineIcon/>
          </IconButton>
          <DocumentCreatorField setDocuments={setDocuments} open={openMenu}/>
          <Box sx={{marginTop: 3}}>
          {documents.map((document) => (
            <Box sx={dialog_style} key={document.id}>
              <Box sx={css.item}>
                <InsertDriveFileIcon />
                <Box sx={{...css.item_name, marginLeft: 2}}> 
                  <Typography variant='subtitle1'>{document.title}</Typography>
                  <Typography variant='body1'>{document.description}</Typography>
                </Box>
                <Box sx={css.item_actions}>
                  <a href={document.download_url} target="_blank" rel="noreferrer" style={css.link}>
                    <IconButton>
                      <DownloadIcon />
                    </IconButton>
                  </a>
                  <IconButton onClick={() => handleDeleteDocument(document.id)}>
                    <DeleteIcon />
                  </IconButton>
                </Box>

              </Box>
            </Box>
          ))}
        </Box>
      </Box>
  );
}
