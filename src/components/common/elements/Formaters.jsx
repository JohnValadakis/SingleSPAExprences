import React from "react";
import NumberFormat from "react-number-format";

function CurrencyFormatCustom (props) {
    const { inputRef, onChange, ...other } = props;

    return (
        <NumberFormat
            {...other}
            getInputRef={inputRef}
            onValueChange={values => {
                onChange({ target: { name: props.name, value: values.value } });
            }}
            thousandSeparator
            isNumericString = {typeof value === 'string'}
        />
    );
}
const Formaters = { CurrencyFormatCustom };
export default Formaters;
