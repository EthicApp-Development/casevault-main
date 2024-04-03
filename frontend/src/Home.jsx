import Navbar from "./Components/Navbar";
import { Box, Tabs, Tab, Typography, Grid, Container, Button } from "@mui/material";
import CaseCard from "./Case/CaseCard";
import { styled, alpha } from '@mui/material/styles';
import useTabs from "./Hooks/UseTabs";
import { useState } from "react";

const fakeData = [
    {
        id: 1,
        title: "Caso ético 1",
        description: "Descripción larga y detallada del caso ético 1. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed aliquam arcu in consectetur commodo. Nam a tellus eget nunc congue efficitur. Morbi at dolor justo. Quisque nec sem vel urna tempor cursus. Phasellus lobortis fringilla quam, ut pharetra nulla vehicula non. Vivamus vel velit turpis. Proin in nisi id risus eleifend congue vel ac libero. Integer vitae ipsum quis dolor luctus efficitur. Sed in ipsum id metus consequat finibus nec ac lacus. Suspendisse tincidunt augue risus, vel eleifend ligula malesuada et. Nunc et consequat odio. .."
    },
    {
        id: 2,
        title: "Caso ético 2",
        description: "Descripción larga y detallada del caso ético 2. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed aliquam arcu in consectetur commodo. Nam a tellus eget nunc congue efficitur. Morbi at dolor justo. Quisque nec sem vel urna tempor cursus. Phasellus lobortis fringilla quam, ut pharetra nulla vehicula non. Vivamus vel velit turpis. Proin in nisi id risus eleifend congue vel ac libero. Integer vitae ipsum quis dolor luctus efficitur. Sed in ipsum id metus consequat finibus nec ac lacus. Suspendisse tincidunt augue risus, vel eleifend ligula malesuada et. Nunc et consequat odio. .."
    },
    {
        id: 3,
        title: "Caso ético 3",
        description: "Descripción larga y detallada del caso ético 3. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed aliquam arcu in consectetur commodo. Nam a tellus eget nunc congue efficitur. Morbi at dolor justo. Quisque nec sem vel urna tempor cursus. Phasellus lobortis fringilla quam, ut pharetra nulla vehicula non. Vivamus vel velit turpis. Proin in nisi id risus eleifend congue vel ac libero. Integer vitae ipsum quis dolor luctus efficitur. Sed in ipsum id metus consequat finibus nec ac lacus. Suspendisse tincidunt augue risus, vel eleifend ligula malesuada et. Nunc et consequat odio. .."
    },
    {
        id: 4,
        title: "Caso ético 4",
        description: "Descripción larga y detallada del caso ético 4. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed aliquam arcu in consectetur commodo. Nam a tellus eget nunc congue efficitur. Morbi at dolor justo. Quisque nec sem vel urna tempor cursus. Phasellus lobortis fringilla quam, ut pharetra nulla vehicula non. Vivamus vel velit turpis. Proin in nisi id risus eleifend congue vel ac libero. Integer vitae ipsum quis dolor luctus efficitur. Sed in ipsum id metus consequat finibus nec ac lacus. Suspendisse tincidunt augue risus, vel eleifend ligula malesuada et. Nunc et consequat odio. .."
    },
    {
        id: 5,
        title: "Caso ético 5",
        description: "Descripción larga y detallada del caso ético 5. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed aliquam arcu in consectetur commodo. Nam a tellus eget nunc congue efficitur. Morbi at dolor justo. Quisque nec sem vel urna tempor cursus. Phasellus lobortis fringilla quam, ut pharetra nulla vehicula non. Vivamus vel velit turpis. Proin in nisi id risus eleifend congue vel ac libero. Integer vitae ipsum quis dolor luctus efficitur. Sed in ipsum id metus consequat finibus nec ac lacus. Suspendisse tincidunt augue risus, vel eleifend ligula malesuada et. Nunc et consequat odio. .."
    },
    {
        id: 6,
        title: "Caso ético 6",
        description: "Descripción larga y detallada del caso ético 6. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed aliquam arcu in consectetur commodo. Nam a tellus eget nunc congue efficitur. Morbi at dolor justo. Quisque nec sem vel urna tempor cursus. Phasellus lobortis fringilla quam, ut pharetra nulla vehicula non. Vivamus vel velit turpis. Proin in nisi id risus eleifend congue vel ac libero. Integer vitae ipsum quis dolor luctus efficitur. Sed in ipsum id metus consequat finibus nec ac lacus. Suspendisse tincidunt augue risus, vel eleifend ligula malesuada et. Nunc et consequat odio. .."
    },
    {
        id: 7,
        title: "Caso ético 7",
        description: "Descripción larga y detallada del caso ético 7. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed aliquam arcu in consectetur commodo. Nam a tellus eget nunc congue efficitur. Morbi at dolor justo. Quisque nec sem vel urna tempor cursus. Phasellus lobortis fringilla quam, ut pharetra nulla vehicula non. Vivamus vel velit turpis. Proin in nisi id risus eleifend congue vel ac libero. Integer vitae ipsum quis dolor luctus efficitur. Sed in ipsum id metus consequat finibus nec ac lacus. Suspendisse tincidunt augue risus, vel eleifend ligula malesuada et. Nunc et consequat odio. .."
    },
    {
        id: 8,
        title: "Caso ético 8",
        description: "Descripción larga y detallada del caso ético 8. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed aliquam arcu in consectetur commodo. Nam a tellus eget nunc congue efficitur. Morbi at dolor justo. Quisque nec sem vel urna tempor cursus. Phasellus lobortis fringilla quam, ut pharetra nulla vehicula non. Vivamus vel velit turpis. Proin in nisi id risus eleifend congue vel ac libero. Integer vitae ipsum quis dolor luctus efficitur. Sed in ipsum id metus consequat finibus nec ac lacus. Suspendisse tincidunt augue risus, vel eleifend ligula malesuada et. Nunc et consequat odio. .."
    },
    {
        id: 9,
        title: "Caso ético 9",
        description: "Descripción larga y detallada del caso ético 9. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed aliquam arcu in consectetur commodo. Nam a tellus eget nunc congue efficitur. Morbi at dolor justo. Quisque nec sem vel urna tempor cursus. Phasellus lobortis fringilla quam, ut pharetra nulla vehicula non. Vivamus vel velit turpis. Proin in nisi id risus eleifend congue vel ac libero. Integer vitae ipsum quis dolor luctus efficitur. Sed in ipsum id metus consequat finibus nec ac lacus. Suspendisse tincidunt augue risus, vel eleifend ligula malesuada et. Nunc et consequat odio. .."
    },
    {
        id: 10,
        title: "Caso ético 10",
        description: "Descripción larga y detallada del caso ético 10. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed aliquam arcu in consectetur commodo. Nam a tellus eget nunc congue efficitur. Morbi at dolor justo. Quisque nec sem vel urna tempor cursus. Phasellus lobortis fringilla quam, ut pharetra nulla vehicula non. Vivamus vel velit turpis. Proin in nisi id risus eleifend congue vel ac libero. Integer vitae ipsum quis dolor luctus efficitur. Sed in ipsum id metus consequat finibus nec ac lacus. Suspendisse tincidunt augue risus, vel eleifend ligula malesuada et. Nunc et consequat odio. .."
    }
];


const WhiteTabs = styled(Tabs)({
    backgroundColor: 'white',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.05)',
});

const WhiteTab = styled(Tab)({
    backgroundColor: 'white',
});

const BackgroundBox = styled(Box)({
    position: 'relative',
    width: '100%',
    height: '233px',
    backgroundColor: '#ccc',
    overflow: 'hidden',
});

const CreateCaseButton = styled(Button)({
    position: 'absolute',
    bottom: '16px', // Ajusta la posición vertical del botón
    left: '50%',
    transform: 'translateX(-50%)', // Centra el botón horizontalmente
});

export default function Home() {
    const [tab, setTab] = useTabs(0);

    const handleCreateCase = () => {
        // Lógica para crear un caso
    };

    return (
        <Container maxWidth="xl">
            <BackgroundBox>
                <img
                    src="src/assets/Shutterstock_2072700533.jpg" // Ruta de la imagen
                    alt="Imagen de fondo"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <CreateCaseButton variant="contained" onClick={handleCreateCase}>
                    Crear Caso
                </CreateCaseButton>
            </BackgroundBox>


            <Grid container spacing={2}>
                {fakeData.map(caseData => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={caseData.id}>
                        <CaseCard title={caseData.title} description={caseData.description} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}
