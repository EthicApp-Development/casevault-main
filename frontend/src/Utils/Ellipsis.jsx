import React, { useState, useRef, useEffect } from 'react';
import { Typography, Tooltip, IconButton, Box } from '@mui/material';
import PropTypes from 'prop-types';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import useToggle from '../Hooks/ToggleHook';
import InterpreterRichText from './InterpreterRichText';

const TextEllipsis = ({ text, variant, showTooltip, maxLines, htmlContent = false }) => {
    const [showFullText, toggleShowFullText] = useToggle(false);
    const tooltipRef = useRef(null);
    const iconRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                tooltipRef.current &&
                !tooltipRef.current.contains(event.target) &&
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

    const handleTooltipOpen = (event) => {
        event.stopPropagation();
        toggleShowFullText();
    };

    const handleTooltipClose = () => {
        toggleShowFullText();
    };

    const handleCalculateMaxHeight = () => {
        const lineHeight = parseFloat(getComputedStyle(document.documentElement).fontSize);
        return `${(lineHeight * maxLines)}px`;
    };

    const maxHeight = maxLines ? handleCalculateMaxHeight() : 'none';

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 0 }}>
            {htmlContent ? (
                <InterpreterRichText htmlContent={text} />
            ) : (
                <Typography
                    variant={variant}
                    sx={{
                        flexGrow: 1,
                        whiteSpace: 'pre-wrap', // Permitir saltos de línea
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        maxHeight: maxHeight, // Establecer la altura máxima
                    }}
                >
                    {text}
                </Typography>
            )}
            {showTooltip && text.length > 0 && (
                <div ref={tooltipRef}>
                    <Tooltip
                        PopperProps={{
                            disablePortal: true,
                        }}
                        onClose={handleTooltipClose}
                        open={showFullText}
                        disableFocusListener
                        disableHoverListener
                        disableTouchListener
                        title={text}
                    >
                        <IconButton ref={iconRef} onClick={handleTooltipOpen} aria-label="show-more">
                            <HelpOutlineIcon />
                        </IconButton>
                    </Tooltip>
                </div>
            )}
        </Box>
    );
};

TextEllipsis.propTypes = {
    text: PropTypes.string.isRequired,
    variant: PropTypes.string,
    showTooltip: PropTypes.bool,
    maxLines: PropTypes.number,
};

TextEllipsis.defaultProps = {
    variant: 'body1',
    showTooltip: true,
    maxLines: 4, // Por defecto, máximo 4 líneas
};

export default TextEllipsis;
