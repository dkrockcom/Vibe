import React, { Component } from 'react';
import {
    Card,
    CardBody,
    Row,
    Col,
    Form,
    Button
} from 'reactstrap';
import api from './../../util/api';
import { Field, reduxForm, initialize } from 'redux-form';
import { connect } from 'react-redux';
import swal from 'sweetalert';

import ReduxInput from './../../common/ReduxField/input';
import ReduxCheckBox from './../../common/ReduxField/checkbox';
import validation from './../../common/validation';

class Camera extends Component {

    get isUpdate() {
        return this.props.match.params.id !== "0"
    }

    componentDidMount() {
        let id = this.props.match.params.id;
        if (this.isUpdate) {
            api.post("/camera", {
                id: id
            }, (res) => {
                if (res.success) {
                    let data = Object.assign({}, res.data);
                    this.props.dispatch(initialize("Camera", data));
                }
            });
        }
    }

    onSave = (values) => {
        api.post("addEditCamera", values, (res) => {
            swal({ text: res.message, icon: res.success ? 'success' : 'error' });
            if (res.success) {
                this.props.history.push('/cameras');
            }
        });
    }

    onCancel = (values) => {
        this.props.history.push('/cameras');
    }

    onDelete = () => {
        let id = this.props.match.params.id;
        api.post("deleteCamera", {
            Id: id
        }, (res) => {
            swal({ text: res.message, icon: res.success ? 'success' : 'error' });
            if (res.success) {
                this.props.history.push('/cameras');
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
                                        <label htmlFor="Ip">IP:</label>
                                    </Col>
                                    <Col md="6">
                                        <Field
                                            name="Ip"
                                            className="form-control"
                                            placeholder="Ip"
                                            component={ReduxInput}
                                            validate={[validation.required]}
                                        />
                                    </Col>
                                </Row>

                                <Row form className="form-group">
                                    <Col md="2">
                                        <label htmlFor="Port">Port:</label>
                                    </Col>
                                    <Col md="6">
                                        <Field
                                            name="Port"
                                            className="form-control"
                                            placeholder="Port"
                                            component={ReduxInput}
                                            validate={[validation.required]}
                                        />
                                    </Col>
                                </Row>

                                <Row form className="form-group">
                                    <Col md="2">
                                        <label htmlFor="Username">Username:</label>
                                    </Col>
                                    <Col md="6">
                                        <Field
                                            name="Username"
                                            className="form-control"
                                            placeholder="Username"
                                            component={ReduxInput}
                                            validate={[validation.required]}
                                        />
                                    </Col>
                                </Row>

                                <Row form className="form-group">
                                    <Col md="2">
                                        <label htmlFor="Password">Password:</label>
                                    </Col>
                                    <Col md="6">
                                        <Field
                                            name="Password"
                                            className="form-control"
                                            placeholder="Password"
                                            component={ReduxInput}
                                            validate={[validation.required]}
                                        />
                                    </Col>
                                </Row>

                                <Row form className="form-group">
                                    <Col md="2">
                                        <label htmlFor="Brand">Brand:</label>
                                    </Col>
                                    <Col md="6">
                                        <Field
                                            name="Brand"
                                            className="form-control"
                                            placeholder="Brand"
                                            component={ReduxInput}
                                            validate={[validation.required]}
                                        />
                                    </Col>
                                </Row>

                                <Row form className="form-group">
                                    <Col md="2">
                                        <label htmlFor="VideoUrl">VideoUrl:</label>
                                    </Col>
                                    <Col md="6">
                                        <Field
                                            name="VideoUrl"
                                            className="form-control"
                                            placeholder="VideoUrl"
                                            component={ReduxInput}
                                            validate={[validation.required]}
                                        />
                                    </Col>
                                </Row>

                                <Row form className="form-group">
                                    <Col md="2">
                                        <label htmlFor="AlarmTimeStart">AlarmTimeStart:</label>
                                    </Col>
                                    <Col md="6">
                                        <Field
                                            type="date"
                                            name="AlarmTimeStart"
                                            className="form-control"
                                            placeholder="AlarmTimeStart"
                                            component={ReduxInput}
                                        // validate={[validation.required]}
                                        />
                                    </Col>
                                </Row>

                                <Row form className="form-group">
                                    <Col md="2">
                                        <label htmlFor="AlarmTimeEnd">AlarmTimeEnd:</label>
                                    </Col>
                                    <Col md="6">
                                        <Field
                                            name="AlarmTimeEnd"
                                            className="form-control"
                                            placeholder="AlarmTimeEnd"
                                            component={ReduxInput}
                                        // validate={[validation.required]}
                                        />
                                    </Col>
                                </Row>

                                <Row form className="form-group">
                                    <Col md="2">
                                        <label htmlFor="IsDetectionEnabled">Is Detection Enabled:</label>
                                    </Col>
                                    <Col md="6">
                                        <Field
                                            name="IsDetectionEnabled"
                                            className="form-control"
                                            component={ReduxCheckBox}
                                        />
                                    </Col>
                                </Row>

                                <Row form className="form-group">
                                    <Col md="2">
                                        <label htmlFor="IsRecordingEnabled">Is Recording Enabled:</label>
                                    </Col>
                                    <Col md="6">
                                        <Field
                                            name="IsRecordingEnabled"
                                            className="form-control"
                                            component={ReduxCheckBox}
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
    form: 'Camera'
})(Camera));