import React from "react";
import styled from "styled-components";
import {BaseContainer} from "../../helpers/layout";
import {getDomain} from "../../helpers/getDomain";
import User from "../shared/models/User";
import {withRouter} from "react-router-dom";
import {Button} from "../../views/design/Button";

const FormContainer = styled.div`
  margin-top: 2em;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 300px;
  justify-content: center;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 60%;
  height: 375px;
  font-size: 16px;
  font-weight: 300;
  padding-left: 37px;
  padding-right: 37px;
  border-radius: 20px;
  background: linear-gradient(rgb(27, 124, 186), rgb(122, 46, 101));
  transition: opacity 0.5s ease, transform 0.5s ease;
`;

const InputField = styled.input`
  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
  height: 35px;
  padding-left: 15px;
  margin-left: -4px;
  border: none;
  border-radius: 20px;
  margin-bottom: 20px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
`;

const Label = styled.label`
  color: white;
  margin-bottom: 10px;
  text-transform: uppercase;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const Header = styled.label`
  color: white;
  margin-bottom: 10px;
  font-size: x-large;
`;

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: null,
      username: null
    };
  }

  login() {
    fetch(`${getDomain()}/login`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      })
    })
        .then(response => response.json())
        .then(returnedUser => {

          if (returnedUser.status !== "ONLINE") {
            alert(returnedUser.message);
          } else {
            const user = new User(returnedUser);
            localStorage.setItem("token", user.token);
            localStorage.setItem("myId", user.id);
            this.props.history.push(`/game`);
          }

        })
        .catch(err => {
          if (err.message.match(/Failed to fetch/)) {
            alert("The server cannot be reached. Did you start it?");
          } else {
            alert(`Something went wrong during the login: ${err.message}`);
          }
        });
  }

  register() {
    this.props.history.push(`/register`);
  }

  handleInputChange(key, value) {
    this.setState({[key]: value});
  }

  render() {
    return (
        <BaseContainer>
          <FormContainer>

            <Form>
              <Header>Login</Header>
              <Label>Username</Label>
              <InputField
                  placeholder="Enter here.."
                  onChange={e => {
                    this.handleInputChange("username", e.target.value);
                  }}
              />
              <Label>Password</Label>
              <InputField
                  type="password"
                  placeholder="Enter here.."
                  onChange={e => {
                    this.handleInputChange("password", e.target.value);
                  }}
              />
              <ButtonContainer>
                <Button
                    disabled={!this.state.username || !this.state.password}
                    width="50%"
                    onClick={() => {
                      this.login();
                    }}
                >
                  Login
                </Button>
              </ButtonContainer>
              <ButtonContainer>
                <Button
                    width="50%"
                    onClick={() => {
                      this.register();
                    }}
                >
                  Registration
                </Button>
              </ButtonContainer>
            </Form>
          </FormContainer>
        </BaseContainer>
    );
  }
}

export default withRouter(Login);