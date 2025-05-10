import ClearIcon from "@mui/icons-material/Clear";
import { Checkbox, FormControl, FormControlLabel, FormHelperText, IconButton, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import React, { memo, useEffect, useState } from 'react';
import IsNull from '../common/Common';
import '../css/Input.css';

const areEqual = (prevProps, nextProps) => {
    // Custom comparison logic based on prevProps and nextProps
    // Return true if props are equal, return false otherwise
    if (nextProps.value !== prevProps.value ||
        nextProps.checked !== prevProps.checked ||
        nextProps.minDate !== prevProps.minDate ||
        nextProps.maxDate !== prevProps.maxDate ||
        nextProps.className !== prevProps.className ||
        nextProps.error !== prevProps.error ||
        nextProps.helperText !== prevProps.helperText ||
        nextProps.options !== prevProps.options) {
        return false;
    } else {
        return true;
    }
};

const Input = memo((props) => {
    const inputRef = React.createRef(null);
    const [value, setValue] = useState(props?.value ?? '')

    const handleClearClick = (e) => {
        e.preventDefault();
        setValue('')
        if (!IsNull(props.onClear))
            props.onClear('')
    }

    const handleDateClearClick = (e) => {
        e.preventDefault();
        setValue(null)
        if (!IsNull(props.onClear))
            props.onClear(null)
    }

    const handleValueChange = (e) => {
        setValue(e.target.value)
        if (!IsNull(props.onChange)) {
            props.onChange(e)
        }
    }

    const handleDateChange = (date) => {
        setValue(date)
        if (!IsNull(props.onChange)) {
            props.onChange(date)
        }
    }

    useEffect(() => {
        if (props?.value !== undefined)
            setValue(props.value)
    }, [props.value])

    let type = IsNull(props.type) ? 'text' : props.type
    switch (type) {
        case 'text':
            return (
                <div className={!IsNull(props.customClass) ? (props.customClass + " customInput") : "customInput"}>
                    <TextField
                        label={props.label ?? ""}
                        variant={props.variant ?? "outlined"}
                        inputRef={inputRef}
                        slotProps={{
                            htmlInput: props.inputProps,
                            input: {
                                endAdornment: (
                                    <IconButton
                                        style={{
                                            "display": (value === '' ? "none" : "")
                                        }}
                                        onClick={handleClearClick}>
                                        {props.disabled ? "" : <ClearIcon sx={{ fontSize: '10px !important' }} />}
                                    </IconButton>),
                                pattern: props.pattern,
                                title: props.title
                            },
                            inputLabel: {
                                className: props.inputLabelClass
                            }
                        }}
                        value={value}
                        required={props.required ?? false}
                        error={props.error ?? false}
                        helperText={!IsNull(props.error) && props.error === true ?
                            (!IsNull(props.helperText) ? props.helperText : (!IsNull(props.label) ? props.label + " is required!" : "Empty field!")) : ""}
                        onChange={handleValueChange}
                        type={props.dataType ?? "text"}
                        placeholder={props.placeholder}
                        className={props.className ?? ""}
                        style={{ m: 2, "&.MuiFocused .MuiIconButtonRoot": { color: 'primary.main' } }}
                        disabled={props.disabled ?? false}
                    />
                </div>
            );
        case 'date':
            return (
                <div className={!IsNull(props.customClass) ? (props.customClass + " customInput") : "customInput"}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            disableToolbar={props.disableToolbar ?? "false"}
                            autoOk={props.autoOk ?? "true"}
                            variant={props.variant ?? "inline"}
                            inputVariant={props.inputVariant ?? "outlined"}
                            label={props.label ?? ""}
                            value={value}
                            error={props.error ?? false}
                            disablePast={props.disablePast ?? false}
                            disableFuture={props.disableFuture ?? false}
                            inputRef={props.inputRef ?? null}
                            slotProps={{
                                textField: {
                                    required: (props.required ?? false)
                                },
                                field: {
                                    clearable: true,
                                    onClear: props.fieldOnClear,
                                    onFocus: props.fieldOnFocus,
                                    onBlur: props.fieldOnBlur,
                                    required: (props.required ?? false)
                                }
                            }}
                            helperText={!IsNull(props.error) && props.error === true ?
                                (!IsNull(props.helperText) ? props.helperText : (!IsNull(props.label) ? props.label + " is required!" : "Empty field!")) : ""}
                            onChange={handleDateChange}
                            format={props.dateFormat ?? "dd/MM/yyyy"}
                            minDate={props.minDate ?? new Date('1900-01-01')}
                            maxDate={props.maxDate ?? new Date('2099-01-12')}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                            disabled={props.disabled ?? false}
                        />
                    </LocalizationProvider>
                </div>
            );
        case 'dateMonth':
            return (
                <div className={!IsNull(props.customClass) ? (props.customClass + " customInput") : "customInput"}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DesktopDatePicker
                            views={['month', 'day']}
                            format='dd MMMM'
                            disableToolbar={props.disableToolbar ?? "true"}
                            autoOk={props.autoOk ?? "true"}
                            variant={props.variant ?? "inline"}
                            inputVariant={props.inputVariant ?? "outlined"}
                            label={props.label ?? ""}
                            value={value}
                            error={props.error ?? false}
                            helperText={!IsNull(props.error) && props.error === true ?
                                (!IsNull(props.helperText) ? props.helperText : (!IsNull(props.label) ? props.label + " is required!" : "Empty field!")) : ""}
                            onChange={handleDateChange}
                            minDate={props.minDate ?? new Date('1900-01-01')}
                            maxDate={props.maxDate ?? new Date('2099-01-12')}
                            InputProps={{
                                endAdornment: (
                                    <IconButton
                                        style={{
                                            "display": (value === null ? "none" : "")
                                        }}
                                        onClick={handleDateClearClick}>
                                        <ClearIcon />
                                    </IconButton>)
                            }}
                        />
                    </LocalizationProvider>
                </div>);
        case 'select':
            return (
                <div className={!IsNull(props.customClass) ? (props.customClass + " customInput") : "customInput"}>
                    <FormControl style={{ m: 1, minWidth: "100%" }} error={(props.error ?? false)}
                        required={props.required ?? false}>
                        <InputLabel
                            id={props.labelId ?? "simple-select-label"}
                            className={props.inputLabelClass} >
                            {props.label}
                        </InputLabel>
                        <Select variant={props.variant ?? 'outlined'}
                            fullWidth={props.fullWidth ?? true}
                            labelId={props.labelId ?? "simple-select-label"}
                            value={value}
                            className={props.className ?? ""}
                            label={props.label ?? ""}
                            id={props.id ?? "simple-select"}
                            required={props.required ?? false}
                            onChange={handleValueChange}>
                            <MenuItem value="">
                                Select
                            </MenuItem>
                            {props.options.map((i, k) => {
                                return <MenuItem key={k} value={i.value}>{i.text}</MenuItem>
                            })}
                        </Select>
                        {(props.error ?? false) && <FormHelperText error={(props.error ?? false)}>{!IsNull(props.error) && props.error === true ?
                            (!IsNull(props.helperText) ? props.helperText : (!IsNull(props.label) ? props.label + " is required!" : "Empty field!")) : ""}</FormHelperText>}
                    </FormControl>
                </div>);
        case 'checkbox':
            return (
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={props.checked ?? "false"}
                            onChange={(e) => {
                                return !IsNull(props.onChange) ?
                                    props.onChange(e)
                                    : () => { };
                            }}
                            slotProps={{
                                htmlInput: { 'aria-label': 'controlled' }
                            }}
                            className={props.className ?? ""}
                            color="default" />
                    }
                    label={props.label ?? ""}
                    labelPlacement={props.labelPlacement ?? "end"} />
            );
        case 'textarea':
            return (
                <div className={!IsNull(props.customClass) ? (props.customClass + " customInput") : "customInput"}>
                    <TextField
                        label={props.label ?? ""}
                        variant={props.variant ?? "outlined"}
                        multiline
                        maxRows={props.maxRows ?? 1}
                        value={value}
                        required={props.required ?? false}
                        error={props.error ?? false}
                        helperText={!IsNull(props.error) && props.error === true ?
                            (!IsNull(props.helperText) ? props.helperText : (!IsNull(props.label) ? props.label + " is required!" : "Empty field!")) : ""}
                        onChange={handleValueChange}
                        placeholder={props.placeholder}
                        className={props.className ?? ""}
                        style={{ m: 2, "&.MuiFocused .MuiIconButtonRoot": { color: 'primary.main' } }}
                        disabled={props.disabled ?? false}
                        inputRef={inputRef}
                        slotProps={{
                            htmlInput: props.inputProps,
                            input: {
                                endAdornment: (
                                    <IconButton
                                        style={{
                                            "display": (value === '' ? "none" : "")
                                        }}
                                        onClick={handleClearClick}>
                                        {props.disabled ? "" : <ClearIcon sx={{ fontSize: '10px !important' }} />}
                                    </IconButton>),
                                className: props.className,
                                onChange: handleValueChange,
                                required: props.required ?? false,
                                value: value
                            },
                            inputLabel: {
                                className: props.inputLabelClass
                            },
                        }}
                    />
                </div>)
        default:
            return (<></>);
    }
}, areEqual);

export default Input;