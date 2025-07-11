import React, { useState, useRef, useEffect } from 'react';
import { Box, Typography, FormGroup, FormControlLabel, RadioGroup, Radio, IconButton, Tooltip, collapseClasses } from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { useCaseContext } from './CreateCase';
import { updateCase } from '../API/cases';
import { useParams } from 'react-router-dom';

const CaseVisibility = () => {
  const [openTooltip, setOpenTooltip] = useState('');
  const containerRef = useRef(null);
  const iconRefs = useRef({});
  const { visibility, setVisibility} = useCaseContext(); // Asegúrate de tener caseId en el contexto
  const {caseId} = useParams();
  const { commentsAvailability, setCommentsAvailability} = useCaseContext();

  const handleTooltipToggle = (type) => {
    setOpenTooltip((prev) => (prev === type ? '' : type));
  };

  const handleVisibilityChange = async (event) => {
    const newVisibility = event.target.value;
    setVisibility(newVisibility);
    await handleSave(newVisibility); // Llama a handleSave con el nuevo valor
  };

  const handleClickOutside = (event) => {
    const isClickInsideAnyIcon = Object.values(iconRefs.current).some((ref) => ref && ref.contains(event.target));
    if (!isClickInsideAnyIcon) {
      setOpenTooltip('');
    }
  };

  const handleSave = async (newVisibility) => {
    const formData = new FormData();
    formData.append('case[visibility]', newVisibility);

    try {
      const response = await updateCase(caseId, formData);
      if (response.status === 200) {
        console.log("Guardado con éxito");
      } else {
        console.error('Error al guardar:', response.statusText);
      }
    } catch (error) {
      console.error('Error al procesar la solicitud:', error);
    }
  };

  const handleCommentChange = async (event) => {
    const newCommentsAvailability = event.target.value;
    setCommentsAvailability(newCommentsAvailability);
    await handleCommentSave(newCommentsAvailability); // Llama a handleCommentSave con el nuevo valor
  };

  const handleCommentSave = async (newCommentsAvailability) => {
    const formData = new FormData();
    formData.append('case[comments_availability]', newCommentsAvailability);
    try {
      const response = await updateCase(caseId, formData);
      if (response.status === 200) {
        console.log("Guardado con éxito");
      } else {
        console.error('Error al guardar:', response.statusText);
      }
    } catch (error) {
      console.error('Error al procesar la solicitud:', error);
    }
  };

  useEffect(() => {
    const handleDocumentClick = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        handleClickOutside(event);
      } else {
        setOpenTooltip('');
      }
    };

    document.addEventListener('mousedown', handleDocumentClick);
    return () => {
      document.removeEventListener('mousedown', handleDocumentClick);
    };
  }, []);

  return (
    <Box sx={{display: 'flex', flexDirection: 'row', width: '80%'}}>
      <Box marginTop={3} sx={{ width: '50%' }} ref={containerRef}>
        <Typography variant='h2' sx={{ marginBottom: 2 }}>Visibilidad del caso</Typography>
        <FormGroup>
          <RadioGroup value={visibility} onChange={handleVisibilityChange}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <FormControlLabel
                value="private_status"
                control={<Radio />}
                label="Privado"
              />
              <Tooltip
                PopperProps={{
                  disablePortal: true,
                }}
                onClose={() => setOpenTooltip('')}
                open={openTooltip === 'private'}
                disableFocusListener
                disableHoverListener
                disableTouchListener
                title={"Al tener el caso privado, solo será visible para ti"}
              >
                <IconButton
                  ref={(el) => (iconRefs.current['private'] = el)}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleTooltipToggle('private');
                  }}
                  aria-label="show-more"
                >
                  <HelpOutlineIcon />
                </IconButton>
              </Tooltip>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <FormControlLabel
                value="public_status"
                control={<Radio />}
                label="Público"
              />
              <Tooltip
                PopperProps={{
                  disablePortal: true,
                }}
                onClose={() => setOpenTooltip('')}
                open={openTooltip === 'public'}
                disableFocusListener
                disableHoverListener
                disableTouchListener
                title={"Al tener el caso público, será visible para todos"}
              >
                <IconButton
                  ref={(el) => (iconRefs.current['public'] = el)}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleTooltipToggle('public');
                  }}
                  aria-label="show-more"
                >
                  <HelpOutlineIcon />
                </IconButton>
              </Tooltip>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <FormControlLabel
                value="unlisted_status"
                control={<Radio />}
                label="Sin listar"
              />
              <Tooltip
                PopperProps={{
                  disablePortal: true,
                }}
                onClose={() => setOpenTooltip('')}
                open={openTooltip === 'unlisted'}
                disableFocusListener
                disableHoverListener
                disableTouchListener
                title={"Al tener el caso sin listar, será accesible solo mediante un link directo."}
              >
                <IconButton
                  ref={(el) => (iconRefs.current['unlisted'] = el)}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleTooltipToggle('unlisted');
                  }}
                  aria-label="show-more"
                >
                  <HelpOutlineIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </RadioGroup>
        </FormGroup>
      </Box>
      <Box marginTop={3} sx={{ width: '50%' }} ref={containerRef}>
        <Typography variant='h2' sx={{ marginBottom: 2 }}>Habilitar o deshabilitar comentarios</Typography>
        <FormGroup>
          <RadioGroup value={commentsAvailability} onChange={handleCommentChange}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <FormControlLabel
                value="comments_enabled"
                control={<Radio />}
                label="Habilitar"
              />
              <Tooltip
                PopperProps={{
                  disablePortal: true,
                }}
                onClose={() => setOpenTooltip('')}
                open={openTooltip === 'enabled'}
                disableFocusListener
                disableHoverListener
                disableTouchListener
                title={"Al habilitar los comentarios, los usuarios podrán dejar una opinión sobre el caso."}
              >
                <IconButton
                  ref={(el) => (iconRefs.current['enabled'] = el)}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleTooltipToggle('enabled');
                  }}
                  aria-label="show-more"
                >
                  <HelpOutlineIcon />
                </IconButton>
              </Tooltip>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <FormControlLabel
                value="comments_disabled"
                control={<Radio />}
                label="deshabilitar"
              />
              <Tooltip
                PopperProps={{
                  disablePortal: true,
                }}
                onClose={() => setOpenTooltip('')}
                open={openTooltip === 'disabled'}
                disableFocusListener
                disableHoverListener
                disableTouchListener
                title={"Al deshabilitar los comentarios, los usuarios no podrán dejar una opinión sobre el caso."}
              >
                <IconButton
                  ref={(el) => (iconRefs.current['disabled'] = el)}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleTooltipToggle('disabled');
                  }}
                  aria-label="show-more"
                >
                  <HelpOutlineIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </RadioGroup>
        </FormGroup>
      </Box>
    </Box>
  );
};

export default CaseVisibility;