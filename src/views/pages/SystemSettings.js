import React, { Component } from 'react';
import {
    Card,
    CardBody,
    Row,
    Col,
    Form,
    Button
} from 'reactstrap';
import api from '../../util/api';
import { Field, reduxForm, initialize } from 'redux-form';
import { connect } from 'react-redux';
import swal from 'sweetalert';

import ReduxInput from '../../common/ReduxField/input';
import ReduxCheckBox from '../../common/ReduxField/checkbox';
import validation from '../../common/validation';

class SystemSettings extends Component {

    get isUpdate() {
        return true;
    }

    componentDidMount() {
        api.post("/SystemSettings", {
            id: 1
        }, (res) => {
            if (res.success) {
                let data = Object.assign({}, res.data);
                this.props.dispatch(initialize("SystemSettings", data));
            }
        });
    }

    onSave = (values) => {
        api.post("SaveSystemSettings", values, (res) => {
            swal({ text: res.message, icon: res.success ? 'success' : 'error' });
            if (res.success) {
                this.props.history.push('/Home');
            }
        });
    }

    onCancel = (values) => {
        this.props.history.push('/Home');
    }

    render() {
        const { handleSubmit, submitting } = this.props;
        return (
            <Card>
                <CardBody>
                    <Row noGutters>

                    </Row>
                    <Row>
                        <Col lg="12">
                            <Form onSubmit={handleSubmit(this.onSave)}>
                                <Row form className="form-group">
                                    <Col md="2">
                                        <label htmlFor="AlarmStart">AlarmStart:</label>
                                    </Col>
                                    <Col md="6">
                                        <Field
                                            type="date"
                                            name="AlarmStart"
                                            className="form-control"
                                            placeholder="Alarm Start"
                                            component={ReduxInput}
                                        // validate={[validation.required]}
                                        />
                                    </Col>
                                </Row>

                                <Row form className="form-group">
                                    <Col md="2">
                                        <label htmlFor="AlartEnd">AlartEnd:</label>
                                    </Col>
                                    <Col md="6">
                                        <Field
                                            type="date"
                                            name="AlartEnd"
                                            className="form-control"
                                            placeholder="Alart End"
                                            component={ReduxInput}
                                        // validate={[validation.required]}
                                        />
                                    </Col>
                                </Row>

                                <Row form className="form-group">
                                    <Col md="2">
                                        <label htmlFor="IsAlartEnabled">Is Alart Enabled:</label>
                                    </Col>
                                    <Col md="6">
                                        <Field
                                            name="IsAlartEnabled"
                                            className="form-control"
                                            component={ReduxCheckBox}
                                        />
                                    </Col>
                                </Row>

                                <Row form className="form-group">
                                    <Col md="2">
                                        <label htmlFor="MacAddress">Mac Address:</label>
                                    </Col>
                                    <Col md="6">
                                        <Field
                                            disabled={true}
                                            name="MacAddress"
                                            className="form-control"
                                            placeholder="Mac Address"
                                            component={ReduxInput}
                                            //validate={[validation.required]}
                                        />
                                    </Col>
                                </Row>

                                <Row form className="form-group">
                                    <Col md="2">
                                        <label htmlFor="SerialKey">Serial Key:</label>
                                    </Col>
                                    <Col md="6">
                                        <Field
                                            disabled={true}
                                            name="SerialKey"
                                            className="form-control"
                                            placeholder="Serial Key"
                                            component={ReduxInput}
                                            //validate={[validation.required]}
                                        />
                                    </Col>
                                </Row>

                                <Row form className="form-group">
                                    <Col md="2"> </Col>
                                    <Col md="6">
                                        <Button color="success" disabled={submitting}>Save</Button>&nbsp;
                                        <Button type="button" color="warning" onClick={this.onCancel}>Cancel</Button>&nbsp;
                                    </Col>
                                </Row>
                            </Form>
                        </Col>
                    </Row>
                </CardBody>
            </Card >
        )
    }
}

export default connect((state) => {
    return {}
})(reduxForm({
    form: 'SystemSettings'
})(SystemSettings));