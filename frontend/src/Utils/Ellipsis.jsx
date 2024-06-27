import React, { useRef, useEffect, useState } from 'react';
import { Typography, Tooltip, IconButton, Box } from '@mui/material';
import PropTypes from 'prop-types';
import HelpIcon from '@mui/icons-material/Help';
import useToggle from '../Hooks/ToggleHook';

const TextEllipsis = ({ text, variant, showTooltip, maxLines, color }) => {
    const [showFullText, toggleShowFullText] = useToggle(false);
    const [isTruncated, setIsTruncated] = useState(false);
    const textRef = useRef(null);
    const iconRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                textRef.current &&
                !textRef.current.contains(event.target) &&
                iconRef.current &&
                !iconRef.current.contains(event.target)
            ) {
                toggleShowFullText(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (textRef.current) {
            const { scrollHeight, clientHeight } = textRef.current;
            setIsTruncated(scrollHeight > clientHeight);
        }
    }, [text, maxLines]);

    const handleTooltipOpen = (event) => {
        event.stopPropagation();
        toggleShowFullText();
    };

    const handleTooltipClose = () => {
        toggleShowFullText(false);
    };

    const shouldShowTooltip = showTooltip && isTruncated;

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 0 }}>
            <Typography
                variant={variant}
                ref={textRef}
                sx={{
                    flexGrow: 1,
                    display: '-webkit-box',
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    WebkitLineClamp: maxLines,
                }}
                color={color || ""}
            >
                {text}
            </Typography>
            {shouldShowTooltip && (
                <Tooltip
                    PopperProps={{
                        disablePortal: true,
                        modifiers: [
                            {
                                name: 'flip',
                                options: {
                                    fallbackPlacements: ['top-start', 'bottom-start'],
                                },
                            },
                            {
                                name: 'preventOverflow',
                                options: {
                                    altAxis: true,
                                    tether: false,
                                },
                            },
                        ],
                    }}
                    onClose={handleTooltipClose}
                    open={showFullText}
                    disableFocusListener
                    disableHoverListener
                    disableTouchListener
                    title={text}
                >
                    <IconButton ref={iconRef} onClick={handleTooltipOpen} aria-label="show-more">
                        <HelpIcon />
                    </IconButton>
                </Tooltip>
            )}
        </Box>
    );
};

TextEllipsis.propTypes = {
    text: PropTypes.string.isRequired,
    variant: PropTypes.string,
    showTooltip: PropTypes.bool,
    maxLines: PropTypes.number,
    color: PropTypes.string,
};

TextEllipsis.defaultProps = {
    variant: 'body1',
    showTooltip: true,
    maxLines: 2, // Por defecto, máximo 2 líneas antes de cortar con puntos suspensivos
};

export default TextEllipsis;
