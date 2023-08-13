import React from "react";

import {
    Input
} from "reactstrap";

const renderField = ({ input, placeholder, label, rows, type, disabled, meta: { touched, error, warning } }) => {
    return (
        <div>
            <input type="textarea" {...{ rows: rows }} type={type} disabled={disabled} placeholder={placeholder} {...input} />
            {touched && ((error && <span className="field-error">{error}</span>) || (warning && <span className="field-warning">{warning}</span>))}
        </div>
    )
}
export default renderField;