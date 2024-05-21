import { backdropClasses } from "@mui/material"
import newTheme from "../Components/Theme"

export const inline_space = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 2
}

export const inline_space_no_wrap = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
}

export const inline_space_start = {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 2
}

export const inline_space_start_no_wrap = {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 2
}

export const inline_space_end = {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 2
}

export const inline_space_end_no_wrap = {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    gap: 2
}

export const inline_space_title = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 2,
    marginBottom: 2
}

export const inline_title_no_wrap = {
    display: 'flex',
    alignItems: 'center',
    gap: 2,
    marginBottom: 2,
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
}

export const inline = {
    display: 'flex',
    alignItems: 'center',
    gap: 2
}

export const inline_align_end = {
    display: 'flex',
    alignItems: 'flex-end',
    flexWrap: 'wrap',
    gap: 2
}

export const inline_align_start = {
    display: 'flex',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    gap: 2
}

export const inline_title = {
    display: 'flex',
    alignItems: 'center',
    gap: 2,
    marginBottom: 2
}

export const inline_buttons = {
    display: 'flex',
    alignItems: 'center',
    gap: 1
}

export const inline_buttons_wrap = {
    display: 'flex',
    alignItems: 'center',
    gap: 1,
    flexWrap: 'wrap'
}

export const text_space = {
    margin: '12px 0'
}

export const end_buttons = {
    textAlign: 'end'
}

export const end_flex_buttons = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 2
}

export const labeless = {
    marginBottom: -2
}

export const dialog_style = {
    padding: 3,
    background: "#eeeeee",
    borderRadius: 5,
    marginBottom: 3,
}

export const full_dialog_style = {
    padding: 3,
    maxWidth: 600,
    width: '100%',
    margin: '0 auto',
    boxSizing: 'border-box'
}

export const link_style = {
    color: newTheme.palette.blue.main,
    textDecoration: 'underline',
    cursor: 'pointer'
}

export const paper_style = {
    padding: 2,
    borderRadius: 2,
    background: '#F7F9F9',
    position: 'relative'
}

export const title_style = {
    marginBottom: 2
}

export const section_separation = {
    margin: '24px 0'
}

export const italic = {
    fontStyle: 'italic'
}

export const elliptical = {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
}

export const italic_link = {
    fontStyle: 'italic',
    color: newTheme.palette.blue.main,
    textDecoration: 'underline',
    cursor: 'pointer'
}

export const loader_container = {
    position: 'relative',
    height: 150,
}

export const highligh_info = {
    color: newTheme.palette.blue.main,
}

export const highligh_secondary = {
    color: newTheme.palette.secondary.main,
}

export const centered_container = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}

export const transitioner = {
    transition: 'all 0.2s ease'
}