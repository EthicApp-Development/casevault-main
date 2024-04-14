import { useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import { paper_style, end_buttons } from "../../Utils/defaultStyles";


const css = {
    item: {
        borderRadius: 2,
        padding: 2,
        margin: '12px 0'
    }
}

export default function VideoField() {

    return (
        <Box sx={{ ...paper_style, ...css.item }} >
            <TextField label="URL" variant="outlined" />
            <TextField
                id="outlined-multiline-static"
                label="Multiline"
                multiline
                rows={4}
                defaultValue="Default Value"
            />
            <Box sx={end_buttons}>
                <Button variant="outlined" color="info" size="small">
                    Agregar
                </Button>
            </Box>
        </Box >
    )
}
