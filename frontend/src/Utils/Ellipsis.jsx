import React, { useState, useRef, useEffect } from 'react'
import { Typography, Tooltip, IconButton, Box } from '@mui/material'
import PropTypes from 'prop-types'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import useToggle from '../Hooks/ToggleHook'
import InterpreterRichText from './InterpreterRichText'

const TextEllipsis = ({ text, variant, showTooltip, lenght = 11, htmlContent = false }) => {
  const [showFullText, toggleShowFullText] = useToggle(false)
  const tooltipRef = useRef(null)
  const iconRef = useRef(null)

  const handleTooltipOpen = (event) => {
    event.stopPropagation()
    toggleShowFullText()
  }
  
  const handleTooltipClose = () => {
    toggleShowFullText()
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        tooltipRef.current && 
        !tooltipRef.current.contains(event.target) && 
        iconRef.current && 
        !iconRef.current.contains(event.target)
      ) {
        toggleShowFullText(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const screenWidth = window.innerWidth
  const length = screenWidth / lenght 
  const truncatedText = text.length > length ? `${text.substring(0, length)}...` : text

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
      {htmlContent ? (
        <InterpreterRichText htmlContent={text} />
      ) : (
        <Typography 
          variant={variant} 
          sx={{ flexGrow: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
        >
          {truncatedText}
        </Typography>
      )}
      {showTooltip && text.length > length && (
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
  )
}

TextEllipsis.propTypes = {
  text: PropTypes.string.isRequired,
  variant: PropTypes.string,
  showTooltip: PropTypes.bool
}

TextEllipsis.defaultProps = {
  variant: 'body1',
  showTooltip: true
}

export default TextEllipsis