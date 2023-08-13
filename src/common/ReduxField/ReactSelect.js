import React, { Component } from 'react';
import Select from 'react-select';

export default class RenderSelectInput extends Component {
    
    onChange(event) {
        if (this.props.input.onChange && event != null) {
            this.props.input.onChange(event);
        } else {
            this.props.input.onChange(null);
        }
    }

    render() {
        const { input, options, name, id, meta: { touched, error, warning } } = this.props;
        return (
            <div>
                <Select
                    {...this.props}
                    {...input}
                    id={id}
                    name={name}
                    isMulti
                    options={options}
                    value={this.props.input.value || ''}
                    onBlur={() => this.props.input.onBlur(this.props.input.value)}
                    onChange={this.onChange.bind(this)}
                />
                {touched && ((error && <span className="field-error">{error}</span>) || (warning && <span className="field-warning">{warning}</span>))}
            </div>
        );
    }
}