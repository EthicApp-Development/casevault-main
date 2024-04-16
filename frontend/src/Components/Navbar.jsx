import React, { useContext, useState, useEffect } from 'react';
import { Box, AppBar, Toolbar, IconButton, Typography, Tab, Tabs } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';
import AppContext from '../Contexts/AppContext';

const Search = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: theme.spacing(2),
    width: '400px',
    [theme.breakpoints.down('md')]: {
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

const WhiteTabs = styled(Tabs)({
    backgroundColor: 'white',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.05)',
});

const WhiteTab = styled(Tab)({
    backgroundColor: 'white',
});

export default function Navbar() {

    const [searchValue, setSearchValue] = useState("")
    const navigate = useNavigate()
    const [tab, setTab] = useState()
    const { pathname } = location


    useEffect(() => {
        switch (pathname) {
            case '/home':
                setTab(0);
                break;
            case '/mycases':
                setTab(1);
                break;
            case '/savedcases':
                setTab(2);
                break;
            case '/information':
                setTab(3);
                break;
            default:
                setTab(0);
                break;
        }
    }, [pathname]);

    const onSearch = (searchTerm) => {
        if (searchTerm.trim() !== "") {
            navigate(`/search/${encodeURIComponent(searchTerm)}`);
        }
    };

    const handleSearchChange = (event) => {
        setSearchValue(event.target.value);
    };

    const handleSearchKeyDown = (event) => {
        if (event.key === 'Enter') {
            onSearch(searchValue);
        }
    };

    const handleTabChange = (event, newValue) => {
        setTab(newValue)
        if (newValue === 0) {
            navigate('/home')
        }
        else if (newValue === 1) {
            console.log(newValue)
            navigate('/mycases')
        }
        else if (newValue === 0) {
            console.log(newValue)
            navigate('/home')
        }
    }

    return (
        <Box sx={{ position: 'relative' }}>
            <AppBar sx={{ height: 64 }}>
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            sx={{ mr: 2 }}
                        >
                        </IconButton>
                        <Typography
                            variant="h1"
                            noWrap
                            component="div"
                            sx={{ display: { xs: 'none', sm: 'block' } }}
                        >
                            CaseVault
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search…"
                                inputProps={{ 'aria-label': 'search' }}
                                value={searchValue}
                                onChange={handleSearchChange}
                                onKeyDown={handleSearchKeyDown}
                            />
                        </Search>
                    </Box>
                    <IconButton
                        size="large"
                        edge="end"
                        aria-label="account of current user"
                        aria-haspopup="true"
                        color="inherit"
                    >
                        <AccountCircle />
                    </IconButton>
                </Toolbar>
                <Box sx={{ zIndex: 1, width: "100%" }} >
                    <WhiteTabs value={tab} onChange={handleTabChange} aria-label="basic tabs example">
                        <WhiteTab label="Home" />
                        <WhiteTab label="Mis casos" />
                        <WhiteTab label="Casos guardados" />
                        <WhiteTab label="Información" />
                    </WhiteTabs>
                </Box>
            </AppBar>
        </Box>
    );
}
