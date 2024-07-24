import React, { useState } from 'react'
import { Checkbox, Collapse, IconButton, Typography, Box } from '@mui/material'
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown"
import KeyboardArrowUp from "@mui/icons-material/KeyboardArrowUp"
const css = {
	header: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		borderRadius: 2,
		paddingLeft: 2,
		background: 'whitesmoke'
	},
	header_text: {
		display: 'flex',
		alignItems: 'center',
	},
	option: {
		display: 'flex',
		alignItems: 'center',
		cursor: 'pointer'
	},
	grouped_options: {
		maxHeight: 300,
		overflowX: 'auto',
		marginLeft: "24px"
	},
	options: {
		paddingLeft: 2,
	},
	group: {
		marginBottom: 2
	},
}

function MultiGroups({ group, options, value, onChange, onSelectGroup }) {
	const [openGroup, setOpenGroup] = useState(false)
	const isGrouped = !!group && group !== ''

	const handleOpenGroup = () => {
		setOpenGroup(!openGroup)
	}
	const group_is_selected = options.every(option => value.includes(option.value))

	return (
		<Box sx={css.group}>
			<Box sx={css.header}>
				{isGrouped && (
					<>
						<Box sx={css.header_text}>
							<Checkbox checked={group_is_selected} onClick={onSelectGroup(group)} />
							<Typography variant='h4'>{group}</Typography>
						</Box>
						<IconButton size="small" onClick={handleOpenGroup}>
							{openGroup ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
						</IconButton>
					</>
				)}
			</Box>
			<Collapse in={isGrouped ? openGroup : true}>
				<Box sx={isGrouped ? css.grouped_options : css.options}>
					{options.map((option, index) => {
						const isSelected = value.includes(option.value);
						return (
							<Box key={option.label + index} sx={css.option} onClick={onChange(option)}>
								<Checkbox checked={isSelected} />
								<Typography variant='subtitle1'>{option.label}</Typography>
							</Box>
						)
					})}
				</Box>
			</Collapse>
		</Box>
	)
}

export default MultiGroups