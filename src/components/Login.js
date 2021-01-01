import React, { Component } from 'react';
import { Row, Col, Card, CardBody, Label, Input, Button } from 'reactstrap';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMsg: null,
      form: {
        userName: "",
        password: "",
      }
    }
    this.onInputChange = this.onInputChange.bind(this);
  }

  onInputChange(name, value) {
    this.setState({ form: { ...this.state.form, [name]: value } })
  }

  Login() {
    const { form } = this.state;
    const { userName, password } = form;
    if (userName === 'encoraTest' && password === '123456') {
      sessionStorage.setItem("saveUser", userName);
      this.setState({ errorMsg: null });
      this.props.history.push('/notes');
    } else {
      this.setState({ errorMsg: 'Please Enter Valid Credentials!' });
      return;
    }
  }

  render() {
    const { form, errorMsg } = this.state;
    const { userName, password } = form;
    return (
      <div className="login page-layout">
        <div className="content m-0 float-none w-100">
          <div className="box c-box">
            <Card className="br4">
              <CardBody>
                <h1>Sign In</h1>
                <p className="text-muted">Sign In to your account</p>
                <div className="mb-3">
                  <Input
                    name="userName"
                    placeholder="User Name"
                    value={userName}
                    onChange={(e) => this.onInputChange(e.target.name, e.target.value)} />
                </div>
                <div className="input-password">
                  <Input
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => this.onInputChange(e.target.name, e.target.value)} />
                </div>
                {errorMsg ?
                  <Row>
                    <Col>
                      <Label className="error mb0">{errorMsg}</Label>
                    </Col>
                  </Row> : null}
                <Row className="mt-4">
                  <Col xs="6">
                    <Button
                      color="primary"
                      className="px-4"
                      onClick={() => this.Login('day')}
                    >Log In</Button>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </div>
        </div>
      </div >
    );
  }
}

export default Login;