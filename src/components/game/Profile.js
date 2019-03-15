import React from "react";
import styled from "styled-components";
import {BaseContainer} from "../../helpers/layout";
import {getDomain} from "../../helpers/getDomain";
import User from "../shared/models/User";
import {Button} from "../../views/design/Button";
import {withRouter} from "react-router-dom";

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const Container = styled(BaseContainer)`
  color: white;
  text-align: center;
`;

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: null,
            status: null,
            creationDate: null,
            birthdayDate: "[No information]",
            token: localStorage.getItem("token")
        };
    }

    static getDateString(date) {
        if (date === "[No information]") {
            return date;
        }
        date = String(date).split('T');
        const days = String(date[0]).split('-');
        return (days[2] + "." + days[1] + "." + days[0]);
    }

    componentDidMount() {
        const { params } = this.props.match;

        fetch(`${getDomain()}/users/${params.profileId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Token": this.state.token
            }
        })
            .then(response => response.json())
            .then(returnedUser => {

                if (returnedUser.status === 404) {
                    alert(returnedUser.message);
                    this.back();
                } else {
                    const user = new User(returnedUser);
                    this.setState({["username"]: user.username});
                    this.setState({["status"]: user.status});
                    this.setState({["creationDate"]: user.creationDate});
                    this.setState({["id"]: user.id});
                    if (user.birthdayDate !== null) {
                        this.setState({["birthdayDate"]: user.birthdayDate});
                    }
                }

            })
            .catch(err => {
                if (err.message.match(/Failed to fetch/)) {
                    alert("The server cannot be reached. Did you start it?");
                } else {
                    alert(`Something went wrong during the logout: ${err.message}`);
                }
            });
    }

    back() {
        this.props.history.push("/game/Front");
    }

    render() {
        return (
            <Container>
                <h2>{this.state.username} </h2>
                <p>{this.state.status}</p>
                <div>
                    <p>Birthday Date   {Profile.getDateString(this.state.birthdayDate)}</p>
                    <p>Creating Date   {Profile.getDateString(this.state.creationDate)}</p>
                    <ButtonContainer>
                        <Button
                            disabled={`${this.state.id}` !== localStorage.getItem("myId")}
                            width="100%"
                            onClick={() => {
                                this.props.history.push(`/game/profile/${localStorage.getItem("myId")}/edit`);
                            }}
                        >
                            Edit
                        </Button>
                        <Button
                            width="100%"
                            onClick={() => {
                                this.back();
                            }}
                        >
                            Back
                        </Button>
                    </ButtonContainer>
                </div>
            </Container>
        );
    }
}

export default withRouter(Profile);