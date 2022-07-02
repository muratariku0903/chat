import React from 'react';
import { useRouter } from 'next/router';
import { AppBar, Box, Toolbar, Typography, Container, Button } from '@mui/material';


const pages = [
    {
        path: '/',
        name: 'Top'
    },
    {
        path: '/inquiries',
        name: 'Inquiries',
    },
    {
        path: '/contact',
        name: 'Contact',
    }
];

const Navigation: React.FC = () => {
    const router = useRouter();

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        LOGO
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map(({ path, name }) => (
                            <Button
                                key={path}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                                onClick={() => router.push(path)}
                            >
                                {name}
                            </Button>
                        ))}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};


export default Navigation;
