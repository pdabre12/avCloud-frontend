import './App.css';
import Login from './components/UserManagement/Login';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Register from './components/UserManagement/Register';
import UpdateUserInfo from './components/UserManagement/UpdateUserInfo';
import UserProfile from './components/UserManagement/UserProfile';
import NavBar from './components/NavigationBar';
import BookRide from './components/rides/BookRide';

function App() {
  return (
    <Router>
    <NavBar />
    
    <div className="App">
      <Switch>
      <Route exact path="/">
            <UserProfile />
          </Route>
      <Route exact path="/login" component={Login}/>
           
          <Route exact path="/register" component={Register}/>
            
          <Route exact path="/updateuserprofile">
            <UpdateUserInfo />
          </Route>
          
          <Route exact path="/book">
            <BookRide />
          </Route>
         
          </Switch>
    </div>
    </Router>
  );
}

export default App;
