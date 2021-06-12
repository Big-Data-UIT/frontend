import React, { } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Chart from './pages/Chart';
import Home from './pages/Home';
import { AppBar, Toolbar, Button, Typography, } from '@material-ui/core';
export default function App() {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6"
            style={{ marginRight: "1em" }}
          >
            MovieLens
          </Typography>
          <Button onClick={() => { window.location.href = "/chart" }} color="inherit">BXH</Button>
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
        </Switch>
      </BrowserRouter>
    </div>
  );
}