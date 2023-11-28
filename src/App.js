import { Switch, Route } from "react-router-dom";
import "./App.css";
import UserList from "./components/UserList/UserList";
import { Redirect } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/users">
          <UserList />
        </Route>
        <Route path="/">
          <Redirect to="/users" />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
