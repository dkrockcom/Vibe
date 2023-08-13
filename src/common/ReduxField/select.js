import React from "react";

const renderField = (props) => {
    const { input, placeholder, label, type, className, options, meta: { touched, error, warning } } = props;
    return (
        <div>
            <select className={className} {...input}>
                <option></option>
                {
                    options && options.map(item => {
                        return <option value={item.LookupId}>{item.DisplayValue}</option>
                    })
                }
            </select>
            {touched && ((error && <span className="field-error">{error}</span>) || (warning && <span className="field-warning">{warning}</span>))}
        </div>
    )
}

export default renderField;