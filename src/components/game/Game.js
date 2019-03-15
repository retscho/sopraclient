import React from "react";
import {Button} from "../../views/design/Button";
import {BaseContainer} from "../../helpers/layout";
import {withRouter} from "react-router-dom";
import styled from "styled-components";
import {getDomain} from "../../helpers/getDomain";

const Container = styled(BaseContainer)`
  width: 200px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;

const OptionsButton = styled(Button)`
  background: rgb(127, 124, 186);
`;

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: localStorage.getItem("myId"),
      token: localStorage.getItem("token")
    };
  }

  componentDidMount() {
    this.props.history.push("/game/front");
  }

  logout() {
    fetch(`${getDomain()}/logout`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Token": this.state.token
      },
      body: JSON.stringify({
        id: this.state.id
      })
    })
        .then(response => response.json())
        .then(returnedUser => {

          if (returnedUser.status !== "OFFLINE") {
            alert(returnedUser.message);
          }
          localStorage.removeItem("token");
          localStorage.removeItem("myId");
          this.props.history.push("/login");

        })
        .catch(err => {
          if (err.message.match(/Failed to fetch/)) {
            alert("The server cannot be reached. Did you start it?");
          } else {
            alert(`Something went wrong during the logout: ${err.message}`);
          }
        });
  }

  render() {
    return (
        <Container>
          <ButtonContainer>
            <OptionsButton
                width="110%"
                onClick={() => {
                  this.logout();
                }}
            >
              Logout
            </OptionsButton>
          </ButtonContainer>
        </Container>

    )
  }
}

export default withRouter(Game);