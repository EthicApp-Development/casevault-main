import axios from "axios";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect, useContext, useRef } from 'react';
import { styled } from '@mui/material/styles'
import ListItemButton from '@mui/material/ListItemButton';
import { Box, Grid, Button, TextField, Chip, FormControl, Snackbar, ClickAwayListener, Collapse } from "@mui/material";
import CaseCard from "./Case/CaseCard";
import AppContext from './Contexts/AppContext';
import { createCase, getAllTags } from './API/cases';
import { inline_buttons } from  './Utils/defaultStyles';
import { getMyChannels } from "./API/channels";
import { getFromLocalStorage } from './storage-commons'

const CASES_API = import.meta.env.VITE_API_CASES_URL;
const SMART_HOME_FEED_API = `${CASES_API}/smart_home_feed`;

const css = {
    container: {
        width: "100%"
    },
    createContainer: {
        padding: '20px',
        marginBottom: '20px'
    },
    inputRounded: {
        width: '40%',
        borderRadius: '50px',
        '& .MuiOutlinedInput-root': {
            borderRadius: '50px',
        },
    },
    centerAlign: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px'
    },
    formLabel: {
        textAlign: 'center',
        marginBottom: '10px',
        width: '100%',
    },
};

export default function Home() {
    const [cases, setCases] = useState([]);
    const navigate = useNavigate();
    const {user} = useContext(AppContext)
    const [authenticated, setauthenticated] = useState(null);
    const [caseTitle, setCaseTitle] = useState("");
    const [tags, setTags] = useState([])
    const [myChannels, setMyChannels] = useState([])
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [isFormOpen, setIsFormOpen] = useState(false);
    const inputTextFocusRef = useRef(null);

    const [cursorScore, setCursorScore] = useState(null);
    const [cursorId, setCursorId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const loadMoreRef = useRef(null);


    const fetchCases = async (load = false) => {
        if (user) {
            setLoading(true);
            try {
                const params = {
                    user_id: user.id,
                };
                if (load && cursorScore !== null && cursorId !== null) {
                    params.cursor_score = cursorScore;
                    params.cursor_id = cursorId;
                };
                const response = await axios.get(SMART_HOME_FEED_API, { params });
                const fetchedCases = response.data.info;
                if (load) {
                    setCases((prev) => [...prev, ...fetchedCases]);
                } else {
                    setCases(fetchedCases);
                }
                if (fetchedCases.length > 0) {
                    // Update cursors to last item in list
                    const lastItem = fetchedCases[fetchedCases.length - 1];
                    setCursorScore(lastItem.score);
                    setCursorId(lastItem.id);

                    // If less than limit, no more data
                    if (fetchedCases.length < 9) {
                        setHasMore(false);
                    } else {
                        setHasMore(true);
                    }
                } else {
                    setHasMore(false);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
        const loggedInUser = getFromLocalStorage("authenticated");
        if (loggedInUser) {
            setauthenticated(loggedInUser);
        } else {
            navigate("/login")
        }
    };

    useEffect(() => {
        fetchCases(false);
    }, [user, navigate]);

    useEffect(() => {
        if (loading || !hasMore) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    fetchCases(true);
                }
            },
            {
                threshold: 1.0
            }
        );

        const currentRef = loadMoreRef.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [loading, hasMore]);

/*
    useEffect(() => {
        const fetchCases = async () => {
            if (user){
                try {
                    const response = await axios.get(CASES_API, {
                        params: {
                            user_id: user.id // Enviar user_id como parámetro
                        }
                    });
                    setCases(response.data.info);
                    
                } catch (error) {
                    console.log(error);
                }
            }
            const loggedInUser = getFromLocalStorage("authenticated");
            if (loggedInUser) {
                setauthenticated(loggedInUser);
            } else {
                navigate("/login")
            }
        };
        fetchCases();
    }, [user, navigate]); 
*/
    useEffect(() => {
        const fetchTags = async () => {
            try {
                const response = await getAllTags()
                setTags(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchTags();
    }, []); 

    useEffect(() => {
        if (user) {
          async function fetchData() {
            try {
              const response = await getMyChannels({ user_id: user.id });
              setMyChannels(response.data);
            } catch (error) {
              console.error('Error fetching data:', error);
            }
          }
          fetchData();
        } else {
          console.log('No hay usuario logueado');
        }
      }, [user]);

    useEffect(() => {
        if (isFormOpen && inputTextFocusRef.current) {
            inputTextFocusRef.current.focus();
        }
    }, [isFormOpen]);

    async function handleCreateCase() {
        const response = await fetch("images/default_case_img.png");
        const blob = await response.blob();
        const defaultImg = new File([blob], "default_case_img.png");
        const formData = new FormData();
        formData.append('case[user_id]', user.id);
        formData.append('case[main_image]', defaultImg);
        formData.append('case[title]',caseTitle)
        try {
            const response = await createCase(formData);
            const createdCase = response?.data?.info;
            handleCloseForm();
            navigate(`/create_case/${createdCase.id}/text`)
        } catch (error) {
            console.error("Error al crear el caso:", error);
        }
    }
    
    const handleClick = (caseId) => (event) => {
        event.stopPropagation();
        navigate(`/show_case/${caseId}/text`);
    };

    const handleClickTag = (tag) => {
        const tagNameWithHash = `${encodeURIComponent("#"+tag.name)}`;
        navigate(`/search/${tagNameWithHash}`);
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const handleCaseAdded = () => {
        setSnackbarMessage('Caso agregado con éxito');
        setSnackbarOpen(true);
    };

    const handleOpenForm = () => {
        setIsFormOpen(true);
    };
    
    const handleCloseForm = () => {
        setIsFormOpen(false);
        setCaseTitle(""); // Optional: clear input
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (caseTitle !== "") {
          handleCreateCase();
        }
    };

    return (
        user?.first_name ? 
            <Box sx={css.container}>
                <Box sx={css.createContainer}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-start', width: '100%' }}>
                        <ClickAwayListener onClickAway={handleCloseForm}>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', width: '100%' }}>
                            {!isFormOpen && (
                                <Button variant="contained" onClick={handleOpenForm}>
                                Crear caso
                                </Button>
                            )}
                            <Collapse in={isFormOpen}>
                                <form onSubmit={handleSubmit}>
                                <FormControl fullWidth>
                                    <Box sx={{ ...css.centerAlign, ...css.inline_buttons }}>
                                    <TextField
                                        required
                                        id="case-title"
                                        label="Título del caso..."
                                        variant="outlined"
                                        value={caseTitle}
                                        onChange={(e) => setCaseTitle(e.target.value)}
                                        sx={css.inputRounded}
                                        autoFocus
                                        inputRef={inputTextFocusRef}
                                    />
                                    <Button
                                        variant="contained"
                                        type="submit"
                                        disabled={caseTitle === ""}
                                    >
                                        Crear caso
                                    </Button>
                                    </Box>
                                </FormControl>
                                </form>
                            </Collapse>
                            </Box>
                        </ClickAwayListener>
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginTop: 2, width: '100%', marginLeft: 5 }}>
                    {tags.slice(0, 10).map((tag) => (
                        <Chip
                            key={tag.id}
                            label={tag.name}
                            onClick={() => handleClickTag(tag)}
                            sx={{ marginBottom: 1 }}
                        />
                    ))}
                </Box>
                <Grid container spacing={8}>
                    {cases?.map(caseData => (
                        <Grid item xs={12} sm={6} md={4} lg={4} key={caseData.id}>
                            <ListItemButton onClick={handleClick(caseData.id)}>
                                <CaseCard
                                    title={caseData.title}
                                    description={caseData.description}
                                    image_url={caseData.main_image_url}
                                    case_id={caseData.id}
                                    owner = {caseData.user_info}
                                    owner_info = {caseData.user_id}
                                    saved = {caseData.saved}
                                    myChannels={myChannels}
                                    onCaseAdded={handleCaseAdded}
                                    avgRating={caseData.average_rating}
                                    sx={{
                                        height: '100%', 
                                        display: 'flex', 
                                        flexDirection: 'column',
                                        overflow: 'hidden', 
                                        textOverflow: 'ellipsis', 
                                        whiteSpace: 'nowrap',
                                    }}
                                />
                            </ListItemButton>
                        </Grid>
                    ))}
                    {hasMore && (
                        <Box
                            ref={loadMoreRef}
                            sx={{ height: '60px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                        >
                            {loading && <span>Cargando más casos...</span>}
                        </Box>
                    )}
                </Grid>
                <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={6000}
                    onClose={handleSnackbarClose}
                    message={snackbarMessage}
                />
            </Box>
        :
        <Box></Box>
    );
}
