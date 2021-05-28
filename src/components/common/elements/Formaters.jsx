import React, { useEffect } from "react";
import NumberFormat from "react-number-format";

function CurrencyFormatCustom (props) {
    const { inputRef, onChange, value, ...other } = props;
    useEffect(() => {
        console.log(value);
    });
    return (
        <NumberFormat
            {...other}
            getInputRef={inputRef}
            onValueChange={values => {
                onChange({ target: { name: props.name, value: values.value } });
            }}
            value={value}
            thousandSeparator
            isNumericString
        />
    );
}
const Formaters = { CurrencyFormatCustom };
export default Formaters;
