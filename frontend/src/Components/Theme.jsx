import { createTheme } from "@mui/material/styles"

const newTheme = createTheme({
    spacing: 6,
    palette: {
        primary: {
            main: '#4b4949',
            light: '#8b8b8b',
            dark: '#232323'
        },
        secondary: {
            main: '#c4cd50',
            light: '#eaecbf',
            dark: '#706511',
        },
        aqua: {
            dark: "#22607b",
        },
        paper: {
            main: "#ECECEC",
            dark: "#BABABA",
        },
        error: {
            main: "#e3193e",
            contrastText: "#FFFFFF",
            transparent: "#e3193e42"
        },
        info: {
            main: "#7373e8",
            transparent: "#d0d0ed"
        },
        success: {
            main: "#43b572",
            transparent: "#43b57242"
        },
        green: {
            main: "#43b572",
            dark: "#43b572",
            transparent: "#bcdbc9"
        },
        red: {
            main: "#e3193e",
            transparent: "#e3193e42"
        },
        blue: {
            main: "#7373e8",
            light: "#ADF5FF",
            dark: "#202D4C",
            transparent: "#f2f3f8",
        },
        lightblue: {
            main: "#ADF5FF",
        },
        celeste: {
            main: "#41b0b1",
        },
        gold: {
            main: "#ebeb21",
            transparent: "#ebeb2142",
            dark: "#ebeb21"
        },
        background: {
            main: "#f2f3f8"
        },
        grey: {
            main: "#ECECEC",
            medium: "#6A6A6A",
            dark: "#3E3E3E",
            dark2: "#6A6A6A",
            border: "#CACACA",
        },
        indigo: {
            main: "#1A237E",
            dark: "#000051",
            light: "#534BAE",
            lighter: "#DCE2F2",
        },
        confirm: {
            main: "#249e24",
        },
        middle: {
            main: "#ebeb21",
            contrastText: "#FFFFFF"
        },
        purple: {
            light: "#B865C1",
            dark: "#8F4799"
        },
        orange: {
            main: '#ffab6e'
        },
        white: {
            main: '#FFFFFF',
            sticker: "#f9f6f5"
        },
    },
    props: {
        MuiTypography: {
            variantMapping: {
                caption: 'p'
            }
        }
    },
    typography: {
        fontFamily: "'Poppins', sans-serif",
        h1: {
            color: "#efefef",
            fontSize: "1.4rem",
            fontWeight: 600,
        },
        h2: {
            color: "#6C6C6C",
            fontSize: "1.2rem",
            fontWeight: 400,
        },
        subtitle1: {
            color: "#6A6A6A",
            fontSize: "0.95rem",
            fontWeight: 400,
            lineHeight: "1.5rem"
        },
        subtitle2: {
            color: "#6A6A6A",
            fontSize: "0.95rem",
            fontWeight: 600,
        },
        body1: {
            letterSpacing: 0,
            color: "#707070",
            fontSize: "0.9rem",
            fontWeight: 400,
        },
        body2: {
            color: "#404040",
            fontSize: "0.95rem",
            ["@media (max-width:500px)"]: {
                fontSize: "0.95rem",
            },
        },
        h3: {
            color: "#6C6C6C",
            fontSize: "0.95rem",
            fontWeight: 400,
        },
        h4: {
            color: "#6C6C6C",
            fontSize: "1.1rem",
            fontWeight: 600,
        },
        h5: {
            color: "#6C6C6C",
            fontSize: "1.3rem",
            fontWeight: 500,
        },
        h6: {
            color: "#202D4C",
            fontSize: "1.6rem",
            fontWeight: 600,
            margin: 24
        },
        subtitle: {
            color: "#6A6A6A",
            fontSize: "1rem",
            fontWeight: 500,
        },
        caption: {
            color: "#6A6A6A",
            fontStyle: "italic",
            fontSize: "0.85rem",
            fontWeight: 400,
        },
    },
    components: {
        MuiSelect: {
            styleOverrides: {
                select: {
                    props: {
                        focus: {
                            background: 'unset'
                        }
                    }
                }
            }
        },
        MuiTableCell: {
            styleOverrides: {
                body: {
                    fontSize: "0.95rem",
                    ["@media (max-width:600px)"]: {
                        fontSize: "0.9rem",
                    },
                    color: "grey",
                },
                head: {
                    fontSize: "0.95rem",
                    ["@media (max-width:600px)"]: {
                        fontSize: "0.9rem",
                    },
                    '& h6': {
                        fontWeight: 600
                    }
                },
                root: {
                    padding: '6px 12px',
                    ["@media (max-width:600px)"]: {
                        fontSize: "0.9rem",
                    },
                    borderBottom: "1px solid #6a6a6a45",
                },
                stickyHeader: {
                    background: '#ECECEC'
                }
            }

        },
        MuiTableRow: {
            styleOverrides: {
                root: {
                    height: 55,
                },
            }

        },
        MuiButton: {
            styleOverrides: {
                root: {
                    fontWeight: 500,
                    justifyContent: 'center'
                },
                containedError: {
                    color: 'white'
                },
                containedSuccess: {
                    color: 'white'
                }
            }

        },
        MuiDivider: {
            styleOverrides: {
                root: {
                    backgroundColor: "darkgrey",
                    opacity: 0.8,
                },
            }

        },
        MuiIconButton: {
            styleOverrides: {
                colorSecondary: {
                    color: "grey",
                    "&:hover": {
                        color: "#cb6a6d",
                    },
                },
                label: {
                    '& > svg': {
                        height: 24,
                        width: 24
                    }
                }
            }

        },
        MuiMenu: {
            styleOverrides: {
                paper: {
                    maxHeight: 300,
                },
            }

        },
        MuiPaper: {
            styleOverrides: {
                rounded: {
                    borderRadius: 6,
                },
                elevation1: {
                    boxShadow: "0 0 20px rgb(8 21 66 / 5%)",
                },
            }

        },
        MuiBadge: {
            styleOverrides: {
                colorPrimary: {
                    backgroundColor: "#B865C1",
                },
                colorSecondary: {
                    backgroundColor: "#cb6a6d",
                },
            }

        },
        MuiInputLabel: {
            styleOverrides: {
                outlined: {
                    paddingLeft: 2,
                    paddingRight: 2,
                },
            }

        },
        MuiTableHead: {
            styleOverrides: {
                root: {
                    backgroundColor: "#ECECEC",
                    fontWeight: 600
                }
            }
        },
        MuiChip: {
            styleOverrides: {
                colorSuccess: {
                    background: "#43b572"
                }
            }
        },
        MuiPopover: {
            styleOverrides: {
                paper: {
                    transition: "all 0.2s ease !important",
                },
            }
        },
    },
})

export default newTheme
