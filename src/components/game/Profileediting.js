import React from "react";
import {withRouter} from "react-router-dom";
import {Button} from "../../views/design/Button";
import styled from "styled-components";
import {getDomain} from "../../helpers/getDomain";
import User from "../shared/models/User";

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
  border-radius: 100px;
  background: linear-gradient(rgb(27, 124, 186), rgb(222, 46, 101));
  transition: opacity 0.5s ease, transform 0.5s ease;
`;

const InputField = styled.input`
  &::placeholder {
    color: rgba(255, 255, 255, 0.2);
  }
  height: 35px;
  padding-left: 15px;
  margin-left: -10px;
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

class Profileediting extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: null,
            id: localStorage.getItem("myId"),
            token: localStorage.getItem("token")
        };
    }

    save() {
        fetch(`${getDomain()}/users/${this.state.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Token": this.state.token
            },
            body: JSON.stringify({
                username: this.state.username,
                birthdayDate: this.state.birthdayDate
            })
        })
            .then(response => response.json())
            .then(returnedUser => {

                if (returnedUser.status === 404 || returnedUser.status === 409) {
                    alert(returnedUser.message);
                } else {
                    this.props.history.push(`/game/profile/${this.state.id}`);
                }

            })
            .catch(err => {
                if (err.message.match(/Failed to fetch/)) {
                    alert("The server cannot be reached. Did you start it?");
                } else {
                    alert(`Something went wrong during the registration: ${err.message}`);
                }
            });

    }

    componentDidMount() {
        fetch(`${getDomain()}/users/${this.state.id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Token": this.state.token
            }
        })
            .then(response => response.json())
            .then(returnedUser => {
                const user = new User(returnedUser);
                this.setState({["username"]: user.username});
            })
            .catch(err => {
                if (err.message.match(/Failed to fetch/)) {
                    alert("The server cannot be reached. Did you start it?");
                } else {
                    alert(`Something went wrong during the logout: ${err.message}`);
                }
            });
    }

    handleInputChange(key, value) {
        this.setState({[key]: value});
    }

    render() {
        return (
            <FormContainer>

                <Form>
                    <Header>Edit your Profile</Header>
                    <Label>Username</Label>
                    <InputField
                        placeholder={this.state.username}
                        onChange={e => {
                            this.handleInputChange("username", e.target.value);
                        }}
                    />
                    <Label>Birthday</Label>
                    <InputField
                        type="date"
                        placeholder="Not supported in this Browser!"
                        onChange={e => {
                            this.handleInputChange("birthdayDate", e.target.value);
                        }}
                    />
                    <ButtonContainer>
                        <Button
                            width="40%"
                            onClick={() => {
                                this.save();
                            }}
                        >
                            Save
                        </Button>

                        <Button
                            width="40%"
                            onClick={() => {
                                this.props.history.push(`/game/profile/${this.state.id}`);
                            }}
                        >
                            Cancel
                        </Button>
                    </ButtonContainer>
                </Form>
            </FormContainer>
        );
    }
}

export default withRouter(Profileediting);