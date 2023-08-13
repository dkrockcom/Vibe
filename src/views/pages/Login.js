import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Button, CardBody, CardGroup, Col, Container, Input, InputGroup, Row, FormFeedback } from 'reactstrap';
import ReactLoading from 'react-loading';
import Logo from './../../assets/images/vibe-logo.svg';
import api from './../../util/api';

class Login extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                username: 'admin',
                password: 'admin'
            },
            error: {}
        }
    }

    onLogin = () => {
        let { data, error } = this.state;
        let hasError = false;
        let username = data['username'];
        let password = data['password'];
        if (username === "") {
            error["username"] = "username Cannot be Empty";
            hasError = true
        }
        else {
            error["username"] = undefined;
        }
        if (password === "") {
            error["password"] = "Password Cannot Be Empty";
            hasError = true;
        }
        else {
            error["password"] = undefined;
        }
        if (username === "") {
            error["username"] = "Username Cannot Be Empty";
            hasError = true;
        }

        if (hasError) {
            this.setState(error);
        }
        else {
            api.post("/login", { Username: username, Password: password }, (res) => {
                if (!res.success) {
                    return this.setState({
                        error: res.message,
                        loggingIn: false
                    });
                }
                this.props.history.push('/home');
            });
        }
    }

    onChange(field, value) {
        let { data } = this.state;
        switch (field) {
            case "username":
                data["username"] = value;
                break;

            case "password":
                data["password"] = value;
                break;

            default:
                break;
        }
    }

    render() {
        let { isFetching } = this.props
        let { error, data, username, password } = this.state;
        return (
            <div className="app flex-row align-items-center login-container">
                <Container className="login-container">
                    <Row className="justify-content-center">
                        <Col md="6" sm="6">
                            <CardGroup>
                                <CardBody className="login-container">
                                    <form className="login-form" onSubmit={(e) => {
                                        e.preventDefault();
                                        this.onLogin();
                                    }}>

                                        <center>
                                            <img width="100" src={Logo} alt="Real Wave" />
                                            {/* <p className="text-center login-caption">Intelligent Video Surveillance Cloud</p> */}
                                        </center>
                                        <br />

                                        <h2 className="text-center login-text">Welcome</h2>
                                        <p className="text-center login-text">Use your credentials to login below</p>

                                        <InputGroup className="mb-2">
                                            <Input invalid={error["username"] !== undefined} type="text" disabled={isFetching} className="login-input" onChange={(val) => data["username"] = val.target.value} name="username" placeholder="Username" autoComplete="new-password" />
                                            <FormFeedback>{error["username"]}</FormFeedback>
                                        </InputGroup>

                                        <InputGroup className="mb-2">
                                            <Input invalid={error["password"] !== undefined} type="password" disabled={isFetching} className="login-input" onChange={(val) => data["password"] = val.target.value} name="password" placeholder="Password" autoComplete="new-password" />
                                            <FormFeedback>{error["password"]}</FormFeedback>
                                        </InputGroup>

                                        <InputGroup className="mb-2">
                                            <Button color="primary" disabled={isFetching} className="login-button btn-block">
                                                <center>
                                                    {isFetching ? <ReactLoading type={'bars'} color={'white'} height="1.5em" width="1.5em" /> : <i className="fa fa-unlock" aria-hidden="true"> <span> Login</span></i>}
                                                </center>
                                            </Button>
                                        </InputGroup>

                                        <Row>
                                            <Col md={12} className="text-center">
                                                <div className="login-bottom-text">
                                                    <span className="text-left cursor">Contact Us</span>
                                                </div>
                                            </Col>
                                        </Row>

                                    </form>
                                </CardBody>
                            </CardGroup>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}
export default connect(null)(Login);