import axios from "axios";
import Topbar from "./components/topbar/Topbar";
import Homepage from "./pages/homepage/Homepage";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Settings from "./pages/settings/Settings";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./context/Context";
import Header from "./components/header/Header";

function App() {
  axios.defaults.withCredentials = true;
  axios.defaults.baseURL = "https://boghub-reborn.onrender.com/api";
  // axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*"
  const {user} = useContext(Context);
  return (
    <Router>
      <Topbar />
      <Header />
      <Switch>
        <Route exact path="/">
          <Homepage />
        </Route>
        <Route path="/posts">
          <Homepage />
        </Route>
        <Route path="/register">
           <Register />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/post/:id">
          <Single />
        </Route>
        <Route path="/write">{user ? <Write /> : <Login />}</Route>
        <Route path="/settings">
          {user ? <Settings /> : <Login />}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
