import React, { } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Chart from './pages/Chart';
import Profile from './pages/Profile';
import Home from './pages/Home';
import { AppBar, Toolbar, Button, Typography, } from '@material-ui/core';
export default function App() {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h4"
            style={{ marginRight: "1em" }}
            onClick={() => { window.location.href = "/" }} 
          >
            MovieLens
          </Typography>
          <Button onClick={() => { window.location.href = "/chart" }} color="inherit">BXH</Button>
          <Button onClick={() => { window.location.href = "/profile" }} color="inherit">Profile</Button>
        </Toolbar>
      </AppBar>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" >
            <Home />
          </Route>
          <Route exact path="/chart" >
            <Chart />
          </Route>
          <Route exact path="/profile" >
            <Profile />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}