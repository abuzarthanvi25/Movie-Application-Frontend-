import React from "react";
import { TextField } from "@mui/material";

export default function EZ_Input(props) {
  const {
    label,
    onChange,
    value,
    type,
    disabled,
    required,
    fullWidth,
    InputProps,
    margin,
    inpRef,
    width,
  } = props;

  // -- TYPE CHECK
  // fullwidth: BOOLEAN
  // required: BOOLEAN
  // onChange: function

  return (
    <>
      <TextField
        label={label}
        ref={inpRef}
        sx={{ margin: { margin }, width: { width } }}
        fullWidth
        InputProps={InputProps}
        variant="outlined"
        required={required}
        onChange={onChange}
        value={value}
        type={type}
        disabled={disabled}
      />
    </>
  );
}
