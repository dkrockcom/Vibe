import React from "react";
import moment from 'moment';

import {
    Input,
} from "reactstrap";

const renderField = ({ input, placeholder, type, disabled, meta: { touched, error, warning } }) => {
    if (type === "date" && input.value) {
        input.value = moment(input.value).format("YYYY-MM-DD")
    }
    return (
        <div>
            <Input type={type} disabled={disabled} placeholder={placeholder} {...input} />
            {touched && ((error && <span className="field-error">{error}</span>) || (warning && <span className="field-warning">{warning}</span>))}
        </div>
    )
}
export default renderField;