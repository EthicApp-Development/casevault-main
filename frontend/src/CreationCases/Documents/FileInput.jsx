import { TextField, Button, Typography,Box } from "@mui/material";
import { useState } from "react";
import { Backup } from "@mui/icons-material";
import { addDocumentToCase } from "../../API/cases";
import { useParams } from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';
import { inline_buttons } from '../../Utils/defaultStyles';

export function DocumentCreatorField() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const { caseId} = useParams()

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  }

  const handleClick = () => {
    const input = document.getElementById("file-input");
    input.click();
  };

  const handleUpload = async () => {
    if (file) {
      console.log("Uploading file...");
  
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("case_id", caseId);
      formData.append('file', file); // No necesitas convertir a blob
  
      try {
        const result = await addDocumentToCase(caseId, formData);
        console.log(result)
        // Supongamos que result contiene la información del documento devuelta por el servidor
        if (result && result.download_url) {
          // Mostrar el enlace de descarga en tu interfaz de usuario
          console.log("Download URL:", result.download_url);
          // Aquí puedes usar result.download_url para mostrarlo en tu interfaz de usuario o crear un enlace de descarga
        }
  
      } catch (error) {
        console.error(error);
      }
    }
  };
  

  return (
    <>
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
      <TextField
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        label={
          <Typography sx={{ fontWeight: 600 }} color={"primary"}>
            Descripción
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
      <Box sx={inline_buttons}></Box>
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
      <input
        id="file"
        type="file"
        onChange={handleFileChange}
      />
      <Button onClick={handleUpload} sx={{ marginLeft: 10 }} variant="outlined">
        Agregar
      </Button>
    </>
  );
}
