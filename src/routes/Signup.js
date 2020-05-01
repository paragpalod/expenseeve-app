import React , { useEffect , useState } from 'react';
import { Container , Row , Col , InputGroup , FormControl , Button, Card, Form , FormGroup } from 'react-bootstrap';
import { Link } from "react-router-dom";
import styled from 'styled-components';
import API from '../lib/api';
import Toaster from '../lib/toaster';

const Styles = styled.div`
  .signup {
    background-image: url('assets/expenseBg.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    height: 100%;
    padding: 75px
  }

  .card-title {
    text-align: center;
    margin-bottom: 30px;
  }

  .signupCard {
    margin: auto;
    height: 450px;
    width: 350px;
    background-color: #e2ffff;
    opacity: 0.7;
    &:hover {
      opacity: 1;
    }
  }

  .signupSuccessCard {
    margin: auto;
    height: 400px;
    width: 350px;
    background-color: #e2ffff;
    opacity: 0.7;
    &:hover {
      opacity: 1;
    }
  }

  Button {
    width: 250px
  }

  .inputBoxError {
    border: solid 1px red;
  }

  .inputDivError {
    margin-bottom: 0px;
  }

  .errMessage {
    color: red;
    font-size: 11px;
    margin-left: 10px
  }

  .creationSccess {
    color: green;
    font-weight: 800;
    font-size: 25px;
    margin-bottom: 30px;
    margin-top: 30px;
  }
`;

function Signup () {

  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nameError, setNameError] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [isAccountCreated , setIsAccountCreated] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('token') || sessionStorage.getItem('token')) {
      this.props.history.push('/admin/dashboard');
    }
  },[])

  async function submitSignupForm (ev) {
    ev.preventDefault();
    try {
      if (!name) {
        setNameError(true);
      } else if (!username){
        setUsernameError(true);
      } else if (!password) {
        setPasswordError(true);
      } else if (!confirmPassword) {
        setConfirmPasswordError(true);
      } else {
        const RESULT = await API.post('/signup' , { username, name, password, confirmPassword});
        if (RESULT) {
          setIsAccountCreated(true);
        }
      }
    } catch (Exception){
      Toaster(Exception.response.data.message, 'error');
    }
  }

  return  (
    <Styles>
      <Container fluid className="signup">
        <Row>
          <Col>
            <Card className={!isAccountCreated ? 'signupCard' : 'signupSuccessCard'} >
            <Card.Body>
            <Card.Title className= {isAccountCreated ? 'creationSccess' : ''}>{!isAccountCreated ? 'Sign Up' : 'Account  Created Successfully' }</Card.Title>
            {
              !isAccountCreated ?
              <Form role="form">
              <FormGroup className={nameError ? "inputDivError" : ""}>
                <InputGroup className="input-group-alternative">
                  <FormControl
                    className={nameError ? 'inputBoxError' : '' }
                    placeholder="Name"
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value)
                      if (e.target.value) {
                        setNameError(false);
                      }
                    }}
                  />
                </InputGroup>
              </FormGroup>
              {
                nameError &&
                <span className="errMessage" >Name can not be black</span>
              }
              <FormGroup className={(username.length < 6 && username.length > 0) || usernameError ? "inputDivError" : ""}>
                <InputGroup className="input-group-alternative">
                  <FormControl
                    className={(username.length < 6 && username.length > 0) || usernameError ? 'inputBoxError' : '' }
                    placeholder="Username"
                    type="text"
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                      if (e.target.value) {
                        setUsernameError(false);
                      }
                    }}
                  />
                </InputGroup>
              </FormGroup>
              {
                usernameError &&
                <span className="errMessage" >Username can not be black</span>
              }
              {
                username.length < 6 && username.length > 0 &&
                <span className="errMessage" >Username length should be 6 charactors long name</span>
              }
              <FormGroup className={(password.length < 6 && password.length > 0) || passwordError ? "inputDivError" : ""}>
                <InputGroup className="input-group-alternative">
                  <FormControl
                    className={(password.length < 6 && password.length > 0) || passwordError ? 'inputBoxError' : '' }
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (e.target.value) {
                        setPasswordError(false);
                      }
                    }}
                  />
                </InputGroup>
              </FormGroup>
              {
                passwordError &&
                <span className="errMessage" >Password can not be black</span>
              }
              {
                password.length < 6 && password.length > 0 &&
                <span className="errMessage" >Password length should be 6 charactors long name</span>
              }
              <FormGroup className={(password !== confirmPassword && confirmPassword.length > 0) || confirmPasswordError ? "inputDivError" : ""}>
                <InputGroup className="input-group-alternative">
                  <FormControl
                    className={(password !== confirmPassword && confirmPassword.length > 0) || confirmPasswordError ? 'inputBoxError' : '' }
                    placeholder="Confirm Password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      if (e.target.value) {
                        setConfirmPasswordError(false);
                      }
                    }}
                  />
                </InputGroup>
              </FormGroup>
              {
                confirmPasswordError &&
                <span className="errMessage" >Confirm password can not be black</span>
              }
              {
                password !== confirmPassword && confirmPassword.length > 0 &&
                <span className="errMessage" >Password and Confirm Password should be same</span>
              }
              <div className="text-center">
                <Button
                  className="my-4"
                  variant="info"
                  type="button"
                  onClick={submitSignupForm}
                >
                  SIGN UP
                </Button>
              </div>
              <div className="textCenter">
                <span>Already have an account? </span>
                <a href="/login" to="/login" tag={Link} >Login</a>
              </div>
              </Form>
              :
              <div style={{textAlign: 'center'}}>
                <div>
                  Your account has been created successfully. Click on got to ogin button and login to your account.
                </div>
                <div style={{fontWeight: '800', fontSize: '20px', marginTop: '30px'}}>THANK YOU!</div>
                <div className="textCenter">
                  <a href="/login" to="/login" tag={Link} >
                    <Button
                      className="mt-4"
                      variant="info"
                      type="button"
                    >
                      GO TO LOGIN
                    </Button>
                  </a>
                </div>
              </div>
            }
            </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Styles>
  )
}

export default Signup
