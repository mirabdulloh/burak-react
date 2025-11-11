import React from "react";
import "../css/app.css";
import { Container } from "@mui/material";
import { Link, Route, Switch } from "react-router-dom";
import { AboutPage } from "./screens/About";
import { UsersPage } from "./screens/Users";

function App() {
  return(
  <div>
  <nav>
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/about">About</Link>
      </li>
      <li>
        <Link to="/users">Users</Link>
      </li>
    </ul>
  </nav>

  
  <Switch>
    <Route path="/about">
      <AboutPage />
    </Route>
    <Route path="/users">
      <UsersPage />
    </Route>
    <Route path="/">
      <HomePage />
    </Route>
  </Switch>
</div>
  );
}

function HomePage() {
  return <Container>HomePage</Container>;
}




export default App;





