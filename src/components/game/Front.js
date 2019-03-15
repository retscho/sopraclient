import React from "react";
import styled from "styled-components";
import {BaseContainer} from "../../helpers/layout";
import {getDomain} from "../../helpers/getDomain";
import Player from "../../views/Player";
import {Spinner} from "../../views/design/Spinner";
import {Button} from "../../views/design/Button";
import {withRouter} from "react-router-dom";


const Container = styled(BaseContainer)`
  color: white;
  text-align: center;
`;

const Users = styled.ul`
  list-style: none;
  padding-left: 0;
`;

const PlayerContainer = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-left: 37px;
  padding-right: 37px;
  border-radius: 30px;
  height: 100px;
  margin-bottom: 5px;
  background: linear-gradient(rgb(123, 46, 101), rgb(27, 124, 186));
`;


class Front extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: null,
            token: localStorage.getItem("token")
        };
    }

    componentDidMount() {
        fetch(`${getDomain()}/users`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Token": this.state.token
            }
        })
            .then(response => response.json())
            .then(async users => {

                this.setState({ users });
            })
            .catch(err => {
                console.log(err);
                alert("Something went wrong fetching the users: " + err);
            });
    }


    render() {
        return (
            <Container>
                <h2>Front </h2>
                <p>Here you got them all</p>
                {!this.state.users ? (
                    <Spinner />
                ) : (
                    <div>
                        <Users>
                            {this.state.users.map(user => {
                                return (
                                    <PlayerContainer key={user.id}>

                                        <Player user={user}/>
                                        <Button
                                            width="110%"
                                            onClick={() => {
                                                this.props.history.push(`/game/profile/${user.id}`);
                                            }}
                                        >
                                            Profile
                                        </Button>

                                    </PlayerContainer>
                                );
                            })}
                        </Users>
                    </div>
                )}
            </Container>
        );
    }

}

export default withRouter(Front);