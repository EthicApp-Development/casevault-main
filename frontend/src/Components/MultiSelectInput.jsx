import React, { useState, useEffect } from 'react';
import {
	Dialog, FormControl, IconButton, InputAdornment, TextField, Typography,
	Button, Checkbox, Box
} from '@mui/material';
import MultiGroups from './MultiGroups';
import Clear from "@mui/icons-material/Clear";
import HighlightOffOutlined from "@mui/icons-material/HighlightOffOutlined";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import newTheme from './Theme';

const css = {
	dialog: {
		padding: 2,
		'& > *': {
			margin: '12px 0',
		},
	},
	optionsContainer: {
		maxHeight: 300,
		overflow: 'auto',
	},
	selected: {
		display: 'flex',
		flexWrap: 'wrap',
		gap: 1,
		maxHeight: 75,
		overflowY: 'auto',
	},
	selection: {
		background: newTheme.palette.background.main,
		padding: "2px 8px",
		borderRadius: 1,
		display: 'flex',
		alignItems: 'center',
		gap: 1
	},
	header: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		padding: 2
	},
	option: {
		display: 'flex',
		alignItems: 'center',
		cursor: 'pointer',
		paddingLeft: 2
	},
};

function sortOptions(a, b) {
	if (a.label > b.label) return 1;
	if (a.label < b.label) return -1;
	return 0;
}

function NewMultiSelectInput(props) {
	const [search, setSearch] = useState('');
	const [comments, setComments] = useState({});
	const [selectAll, setSelectAll] = useState(false);
	const [openSelect, setOpenSelect] = useState(false);
	const [filteredOptions, setFilteredOptions] = useState([]);

	const { value, onChange, options = [], label, grouped = (option) => "", name, required } = props;
	const rValue = Array.isArray(value) ? value : [];

	useEffect(() => {
		const rValue = Array.isArray(value) ? value : [];
		const newMessages = {};
		rValue.forEach(v => {
			const [option, message] = v?.toString().split(':');
			if (!!message) {
				newMessages[option] = message;
			}
		});
		setComments(newMessages);
	}, [value]);

	useEffect(() => {
		if (search.length > 2) {
			const results = options.filter(option => option.label.toLowerCase().includes(search.toLowerCase())).slice(0, 10); // Limitar a 10 resultados
			setFilteredOptions(results);
		} else {
			setFilteredOptions([]);
		}
	}, [search, options]);

	function handleSearch(event) {
		setSearch(event.target.value);
	}

	const handleChange = (option) => () => {
		const cleanedValues = rValue.map(v => v.toString().split(':')[0]);
		if (cleanedValues.includes(option.value)) {
			const newValue = rValue.filter(v => v.toString().split(':')[0] !== option.value);
			setSelectAll(false);
			const event = { target: { name, value: newValue } };
			onChange(event);
			return;
		}
		const newValue = [...rValue, option.value];
		const event = { target: { name, value: newValue } };
		onChange(event);
	};

	const handleSelectAll = () => {
		if (selectAll) {
			const event = { target: { name, value: [] } };
			setSelectAll(false);
			onChange(event);
		} else {
			const nonEmptyValues = filteredOptions.filter(option => option.value !== '').map(option => option.value);
			const event = { target: { name, value: nonEmptyValues } };
			setSelectAll(true);
			onChange(event);
		}
	};

	function handleCloseMenu() {
		const { onBlur } = props;
		onBlur && onBlur(value);
		setOpenSelect(false);
	}

	const onSelectGroup = (group) => () => {
		const cleanedValues = rValue.map(v => v.toString().split(":")[0]);
		const groupOptions = filteredOptions.filter(option => grouped(option).some(g => g === group));
		const groupValues = groupOptions.map(option => option.value);
		const allSelected = groupValues.every(v => cleanedValues.includes(v));
		const newValues = allSelected
			? cleanedValues.filter(v => !groupValues.includes(v))
			: [...new Set([...cleanedValues, ...groupValues])];
		const finalValue = newValues.map(v => `${v}:${comments[v]}`);
		const newEvent = {
			target: {
				name,
				value: finalValue
			}
		};
		onChange(newEvent);
	};

	function renderGroupedOptions() {
		const cleanedValues = rValue.map(v => v.toString().split(":")[0]);
		const groups = Array.from(new Set(filteredOptions.map(grouped).flat(Infinity)));
		return (
			<Box sx={css.optionsContainer}>
				{groups.map((group, gindex) => {
					const groupOptions = filteredOptions.filter(option => Array.isArray(grouped(option)) ? grouped(option).some(g => g === group) : grouped(option) === group);
					return <MultiGroups key={gindex} value={cleanedValues} group={group} options={groupOptions} onChange={handleChange} onSelectGroup={onSelectGroup} />;
				})}
			</Box>
		);
	}

	const renderSelected = () => {
		const cleanedValues = rValue.map(v => v.toString().split(':')[0]);
		const selectedOptions = options.filter(option => cleanedValues.includes(option.value));
		return (
			<Box sx={css.selected}>
				{selectedOptions.map((option, index) => (
					<Box key={option.value} sx={css.selection}>
						<Typography variant='subtitle1'>{option.label}</Typography>
						<IconButton size="small" onClick={handleChange(option)}>
							<Clear />
						</IconButton>
					</Box>
				))}
			</Box>
		);
	};

	const transformValues = (value) => {
		const cleanedValues = rValue.map(v => v.toString().split(':')[0]);
		const selectedNames = options.filter(option => cleanedValues.includes(option.value)).map(o => o.label);
		return selectedNames.join(', ');
	};

	return (
		<>
			<FormControl fullWidth style={{ margin: '12px 0' }}>
				<TextField
					value={transformValues(rValue) || []}
					fullWidth
					name={String(name)}
					onChange={onChange}
					variant="outlined"
					multiple
					onClick={() => setOpenSelect(true)}
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<KeyboardArrowDown />
							</InputAdornment>
						),
					}}
				/>
				<Dialog open={openSelect} onClose={handleCloseMenu} fullWidth maxWidth="sm">
					<Box sx={css.dialog}>
						<Box sx={css.header}>
							<Typography variant='h1'>{`Seleccionar ${label}`}</Typography>
							<IconButton size='small' onClick={handleCloseMenu}>
								<HighlightOffOutlined />
							</IconButton>
						</Box>
						<TextField value={search} onChange={handleSearch} label={`Buscar ${label}`} fullWidth/>
						{renderSelected()}
						{filteredOptions.length > 0 && (
							<>
								<Box sx={css.option} onClick={handleSelectAll}>
									<Checkbox checked={selectAll} />
									<Typography variant='subtitle1'>Seleccionar todo</Typography>
								</Box>
								{renderGroupedOptions()}
							</>
						)}
						<Box style={{ textAlign: 'right' }}>
							<Button variant="contained" color="primary" onClick={handleCloseMenu}>Guardar y terminar</Button>
						</Box>
					</Box>
				</Dialog>
				<Typography style={{ fontWeight: required ? 600 : 400 }} color={required ? "secondary" : "primary"}>{`${label}${required ? '*' : ''}`}</Typography>
			</FormControl>
		</>
	);
};

export default NewMultiSelectInput;
