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
import ReduxSelect from '../../common/ReduxField/select';
import validation from '../../common/validation';

class User extends Component {

    get isUpdate() {
        return this.props.match.params.id !== "0"
    }

    componentDidMount() {
        let id = this.props.match.params.id;
        if (this.isUpdate) {
            api.post("/user", {
                id: id
            }, (res) => {
                if (res.success) {
                    this.props.dispatch(initialize("User", res.data));
                }
            });
        }
    }

    onSave = (values) => {
        api.post("addEditUser", values, (res) => {
            swal({ text: res.message, icon: res.success ? 'success' : 'error' });
            if (res.success) {
                this.props.history.push('/users');
            }
        });
    }

    onCancel = (values) => {
        this.props.history.push('/users');
    }

    onDelete = () => {
        let id = this.props.match.params.id;
        api.post("deleteUser", {
            Id: id
        }, (res) => {
            swal({ text: res.message, icon: res.success ? 'success' : 'error' });
            if (res.success) {
                this.props.history.push('/users');
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

                                {
                                    !this.isUpdate && <Row form className="form-group">
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
                                }

                                <Row form className="form-group">
                                    <Col md="2">
                                        <label htmlFor="Role">Role:</label>
                                    </Col>
                                    <Col md="6">
                                        <Field
                                            name="Role"
                                            className="form-control"
                                            placeholder="Role"
                                            options={[
                                                { LookupId: 'ADMIN', DisplayValue: "ADMIN" },
                                                { LookupId: 'USER', DisplayValue: "USER" }
                                            ]}
                                            component={ReduxSelect}
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
    form: 'User'
})(User));