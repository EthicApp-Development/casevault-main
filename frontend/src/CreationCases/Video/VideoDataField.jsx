import { useState } from "react";
import { Box, TextField, Button, Typography, IconButton } from "@mui/material";
import { paper_style, end_buttons, inline_space } from "../../Utils/defaultStyles";
import DeleteIcon from '@mui/icons-material/Delete';
import { inline } from "../../Utils/defaultStyles";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
const css = {
    item: {
        borderRadius: 2,
        padding: 2,
        margin: '12px 0'
    },
    container: {
        padding: 1,
        borderRadius: 2,
        width: '100%',
    },
    textField: {
        marginRight: '12px',
    },
    deleteButton: {
        marginLeft: 'auto', // Esto coloca el botón de eliminar a la derecha
    },
};

export default function VideoField() {
    return (
        <Box sx={{ ...css.container, ...paper_style, flex: 1 }} >
            <Box sx={inline_space}>
                <TextField
                    sx={{ flex: 1, ...css.textField }}
                    label="URL"
                    id="outlined-size-small"
                    defaultValue="Small"
                    size="small"
                />
                <TextField
                    sx={{ flex: 1, ...css.textField }}
                    id="standard-multiline-static"
                    label="Descripción"
                    multiline
                    rows={4}
                    defaultValue=""
                    variant="standard"
                />
                <Box sx={css.deleteButton}>
                    <IconButton>
                        <AddCircleOutlineIcon />
                    </IconButton>
                </Box>
            </Box>
        </Box >
    );
}
