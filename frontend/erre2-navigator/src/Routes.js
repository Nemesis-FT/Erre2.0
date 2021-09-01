import React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Home from "./containers/Home"
import Homepage from "./containers/Instance/Homepage";
import NotFound from "./containers/NotFound";

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/">
                    <Home/>
                </Route>
                <Route exact path ="/erre2/:url" children={<Homepage/>}></Route>
                <Route>
                    <NotFound/>
                </Route>
            </Switch>
        </BrowserRouter>
    );
}