import React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Home from "./containers/Home"
import Homepage from "./containers/Instance/Homepage";
import NotFound from "./containers/NotFound";
import Login from "./containers/Instance/Admin/Login"
import AdminHome from "./containers/Instance/Admin/AdminHome"
import Resume from "./containers/Resume";

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/">
                    <Home/>
                </Route>
                <Route exact path ="/erre2" children={<Resume/>}/>
                <Route exact path ="/erre2/:url" children={<Homepage/>}/>
                <Route exact path ="/login" children={<Login/>}/>
                <Route exact path ="/admin" children={<AdminHome/>}/>
                <Route>
                    <NotFound/>
                </Route>
            </Switch>
        </BrowserRouter>
    );
}