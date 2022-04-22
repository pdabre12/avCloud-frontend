import './App.css';
import LoginPage from './components/LoginPage/Login';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Register from './components/RegisterPage/Register';

function App() {
  return (
    <Router>
    <div className="App">
      <Switch>
      <Route exact path="/login">
            <LoginPage />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
          </Switch>
    </div>
    </Router>
  );
}

export default App;
