import React from "react";
import styled from "styled-components";
import { Route } from "react-router-dom";
import Front from "../../game/Front";
import Profile from "../../game/Profile";
import Profileediting from "../../game/Profileediting";
import Game from "../../game/Game";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

class GameRouter extends React.Component {
    render() {
        /**
         * "this.props.base" is "/app" because as been passed as a prop in the parent of GameRouter, i.e., App.js
         */
        return (
            <Container>
                <Route
                    exact
                    path={`${this.props.base}/Front`}
                    render={() => <Front />}
                />

                <Route
                    path={`${this.props.base}`}
                    render={() => <Game />}
                />

                <Route
                    exact
                    path={`${this.props.base}/profile/:profileId`}
                    component = {Profile}
                />

                <Route
                    exact
                    path={`${this.props.base}/profile/:profileId/edit`}
                    component = {Profileediting}
                />

            </Container>
        );
    }
}
/*
* Don't forget to export your component!
 */
export default GameRouter;