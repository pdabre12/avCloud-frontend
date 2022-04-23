import React, { useState,useEffect } from "react";
import { Button, Card, Form, Row, Col } from "react-bootstrap";

import { Link ,Redirect , useHistory} from "react-router-dom";

import axios from "axios";

export default function RegisterUser() {
  const history = useHistory();
  const [userDetails, setUserDetails] = useState();
  const [userProfile, setUserProfile] = useState();

  const [regUserdata, setRegUserdata] = useState({
    user_name: "",
    user_email: "",
    user_pw: "",
    user_phone: "",
  });

  useEffect(() => {
    return () => {
      const loggedInUser = localStorage.getItem("user");

      if (loggedInUser) {
        setUserDetails(JSON.parse(loggedInUser));
        history.push("/");
        //   navigate(-1);
      }
    };
  }, []);

  const handleChange = (event) => {
    // console.log(event.target.value);
    setRegUserdata({ ...regUserdata, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(regUserdata);

    axios.post("http://localhost:3000/users",regUserdata)
    .then(response=>{  
    console.log(response)
    if (response.status == 200) {
    localStorage.setItem("user", JSON.stringify(response.data));
      setUserProfile(response.data);
      history.go('/');
      console.log(response.data);

      // navigate("/login");
      console.log("registration successful");
      
    } else {
      console.log("registration unsuccessful");
      history.push("/register");
    }
  })
};

  // history.push("/login");

  return (
    <>
    {userProfile ? (
      <Redirect
        to={{
          pathname: "/userprofile",
          state: userProfile,
        }}
      />
    ) : (
    <React.Fragment>
      <Card style={{ width: "35rem", marginLeft: "25rem", marginTop: "2rem" }}>
        <Card.Header
          style={{ textAlign: "center", color: "green", fontStyle: "italic" }}
        >
          Create New Account
        </Card.Header>
        <Card.Body>
          <form onSubmit={handleSubmit} onChange={handleChange}>
            <Form.Group>
              <Form.Floating className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Limeka"
                  id="user_name"
                  name="user_name"
                  required
                />
                <label htmlFor="user_name" style={{ marginLeft: 10 }}>
                  {" "}
                  User Name
                </label>
              </Form.Floating>

              <Form.Floating className="mb-3">
                <Form.Control
                  type="email"
                  placeholder="email"
                  id="user_email"
                  name="user_email"
                  required
                />
                <label htmlFor="Email" style={{ marginLeft: 10 }}>
                  {" "}
                  Email
                </label>
              </Form.Floating>

              <Form.Floating className="mb-3">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  id="user_pw"
                  name="user_pw"
                  required
                />
                <label htmlFor="Password" style={{ marginLeft: 10 }}>
                  {" "}
                  Password
                </label>
              </Form.Floating>

              <Form.Floating className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="66944554687"
                  id="user_phone"
                  name="user_phone"
                  required
                />
                <label htmlFor="contact" style={{ marginLeft: 10 }}>
                  {" "}
                  Contact Number
                </label>
              </Form.Floating>
            </Form.Group>
            <Row>
              <Col>
                <Button type="submit" variant="success" size="md" active>
                  Register
                </Button>
              </Col>
              <Col>
                <Link
                  to="/login"
                  style={{ color: "green", fontStyle: "italic" }}
                >
                  Already a user ? Login{" "}
                </Link>
              </Col>
            </Row>
          </form>
        </Card.Body>
      </Card>
    </React.Fragment>
  )
  }
  </>
  );
}
