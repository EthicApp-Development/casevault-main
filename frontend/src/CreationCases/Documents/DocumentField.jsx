import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { TextField, Button, Typography, Box, IconButton, Collapse } from "@mui/material";
import { Backup } from "@mui/icons-material";
import CloseIcon from '@mui/icons-material/Close';
import { addDocumentToCase } from "../../API/cases";
import { useCaseContext } from '../CreateCase';
import { inline_buttons } from '../../Utils/defaultStyles';

const DocumentField = ({ open, toggleMenu }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [file, setFile] = useState(null);
    const { caseId } = useParams();
    const { setDocuments } = useCaseContext();

    const handleFileChange = (e) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    const handleClick = () => {
        const input = document.getElementById("file-input");
        input.click();
    };

    const handleDelete = () => {
        setFile(null);
        document.getElementById("file").value = "";
    };

    const handleUpload = async () => {
        if (file) {
            const formData = new FormData();
            formData.append("title", title);
            formData.append("description", description);
            formData.append("case_id", caseId);
            formData.append('file', file);

            try {
                const result = await addDocumentToCase(caseId, formData);
                setTitle("");
                setFile(null);
                setDescription("");
                setDocuments(result.data.info);
            } catch (error) {
                console.error(error);
            }

            toggleMenu();
        }
    };

    return (
        <Collapse in={open} unmountOnExit>
            <TextField
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                label={
                    <Typography sx={{ fontWeight: 600 }} color={"primary"}>
                        Título
                    </Typography>
                }
                variant="outlined"
                fullWidth
                style={{ margin: "12px 0" }}
                InputLabelProps={{
                    shrink: true,
                }}
                type="text"
            />
            <Box sx={inline_buttons}>
                <TextField
                    value={file ? file.name : ""}
                    label={
                        <Typography sx={{ fontWeight: 600 }} color={"primary"}>
                            Documento
                        </Typography>
                    }
                    variant="outlined"
                    fullWidth
                    style={{ margin: "12px 0" }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onClick={handleClick}
                    InputProps={{ endAdornment: <Backup /> }}
                    type="text"
                />
                <IconButton onClick={handleDelete}>
                    <CloseIcon />
                </IconButton>
            </Box>
            <input
                id="file"
                type="file"
                onChange={handleFileChange}
            />
            <Button onClick={handleUpload} sx={{ marginLeft: 10, textTransform: 'none' }} variant="contained">
                Guardar
            </Button>
        </Collapse>
    );
};

export default DocumentField;
