import React from "react";
import {
    Input
} from "reactstrap";

const renderField = (props) => {
    const { input, meta: { touched, error, warning } } = props;
    console.log(input.value)
    return (
        <div>
            <Input type="checkbox" checked={input.value} {...input} />
            {touched && ((error && <span className="field-error">{error}</span>) || (warning && <span className="field-warning">{warning}</span>))}
        </div>
    )
}
export default renderField;