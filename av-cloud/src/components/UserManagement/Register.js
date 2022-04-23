import React, { useState,useEffect } from "react";
import { Button, Card, Form, Row, Col } from "react-bootstrap";

import { Link, useHistory ,Redirect} from "react-router-dom";

import { register } from "../../features/autheticationfeature";

export default function RegisterUser() {
  const history = useHistory();
  const [userDetails, setUserDetails] = useState();
  const [userProfile, setUserProfile] = useState();

  const [regUserdata, setRegUserdata] = useState({
    user_name: "",
    email: "",
    password: "",
    contact: "",
  });

  useEffect(() => {
    return () => {
      const loggedInUser = localStorage.getItem("user");

      if (loggedInUser) {
        setUserDetails(JSON.parse(loggedInUser));
        window.alert("Already logged in");
        history.push("/user/profile");
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

    const res = register(regUserdata);
    if (res.status == 200) {
    localStorage.setItem("user", JSON.stringify(res.data));
      setUserProfile(res.data);
      history.go(-1);
      console.log(res.data);

      // navigate("/login");
      console.log("registration successful");
      
    } else {
      console.log("registration unsuccessful");
      history.push("/register");
    }
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
                  id="email"
                  name="email"
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
                  id="Password"
                  name="password"
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
                  id="contact"
                  name="contact"
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
