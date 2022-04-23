import './App.css';
import Login from './components/UserManagement/Login';
import { BrowserRouter , Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Register from './components/UserManagement/Register';
import UpdateUserInfo from './components/UserManagement/UpdateUserInfo';
import UserProfile from './components/UserManagement/UserProfile';
import NavBar from './components/NavigationBar';

function App() {
  return (
    <BrowserRouter>
    <NavBar />
    <div className="App">
      <Switch>
        {/* <Route exact path='/'>
          <div>1</div>
        </Route> */}
      <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
          <Route exact path="/updateuserprofile">
            <UpdateUserInfo />
          </Route>
          <Route exact path="/user/profile">
            <UserProfile />
          </Route>
         
          </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
