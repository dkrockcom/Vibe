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
import validation from '../../common/validation';

class SmartSensor extends Component {

    get isUpdate() {
        return this.props.match.params.id !== "0"
    }

    componentDidMount() {
        let id = this.props.match.params.id;
        if (this.isUpdate) {
            api.post("/SmartSensor", {
                id: id
            }, (res) => {
                if (res.success) {
                    this.props.dispatch(initialize("SmartSensor", res.data));
                }
            });
        }
    }

    onSave = (values) => {
        api.post("addEditSmartSensor", values, (res) => {
            swal({ text: res.message, icon: res.success ? 'success' : 'error' });
            if (res.success) {
                this.props.history.push('/SmartSensors');
            }
        });
    }

    onCancel = (values) => {
        this.props.history.push('/SmartSensors');
    }

    onDelete = () => {
        let id = this.props.match.params.id;
        api.post("deleteSmartSensor", {
            Id: id
        }, (res) => {
            swal({ text: res.message, icon: res.success ? 'success' : 'error' });
            if (res.success) {
                this.props.history.push('/SmartSensors');
            }
        });
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
                                        <label htmlFor="Name">Name:</label>
                                    </Col>
                                    <Col md="6">
                                        <Field
                                            name="Name"
                                            className="form-control"
                                            placeholder="Name"
                                            component={ReduxInput}
                                            validate={[validation.required]}
                                        />
                                    </Col>
                                </Row>

                                <Row form className="form-group">
                                    <Col md="2">
                                        <label htmlFor="MacAddress">MacAddress:</label>
                                    </Col>
                                    <Col md="6">
                                        <Field
                                            name="MacAddress"
                                            className="form-control"
                                            placeholder="MacAddress"
                                            component={ReduxInput}
                                            validate={[validation.required]}
                                        />
                                    </Col>
                                </Row>

                                <Row form className="form-group">
                                    <Col md="2">
                                        <label htmlFor="Location">Location:</label>
                                    </Col>
                                    <Col md="6">
                                        <Field
                                            name="Location"
                                            className="form-control"
                                            placeholder="Location"
                                            component={ReduxInput}
                                            validate={[validation.required]}
                                        />
                                    </Col>
                                </Row>

                                <Row form className="form-group">
                                    <Col md="2"> </Col>
                                    <Col md="6">
                                        <Button color="success" disabled={submitting}>Save</Button>&nbsp;
                                        <Button type="button" color="warning" onClick={this.onCancel}>Cancel</Button>&nbsp;
                                        {this.isUpdate && <Button color="danger" onClick={this.onDelete}>Delete</Button>}
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
    form: 'SmartSensor'
})(SmartSensor));