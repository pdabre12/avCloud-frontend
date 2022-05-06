import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  ListGroup,
  ListGroupItem,
  Card,
  CardGroup,
  Col,
  Row,
  Spinner,
} from "react-bootstrap";
import axios from "axios";
import AdminNavBar from "./AdminNavigationBar";
const AdminDashboard = () => {

    const history = useHistory();
    const [userInfo,setUserInfo] = useState(null);

    useEffect(() => {
        const user = localStorage.getItem("admin");
        console.log("User: ", user);
        if (user !== null && user !== undefined) {
          setUserInfo(JSON.parse(user));
        }
        else{
          history.push('/admin/login')
          document.location.reload()
    }
},[]);





  return (
    <div>
      <AdminNavBar />

      <CardGroup style={{ marginTop: "10%" }}>
        <a href="/admin/dashboard/users">
          <Card style={{ marginLeft: "2%", marginRight: "2%" }}>
            <Card.Img variant="top" src="holder.js/100px160" />
            <Card.Body>
              <Card.Title>Card title</Card.Title>
              <Card.Text>
                This is a wider card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">Last updated 3 mins ago</small>
            </Card.Footer>
          </Card>
        </a>

        <a href="/admin/dashboard/cars">
          <Card style={{ marginRight: "2%" }}>
            <Card.Img variant="top" src="holder.js/100px160" />
            <Card.Body>
              <Card.Title>Card title</Card.Title>
              <Card.Text>
                This card has supporting text below as a natural lead-in to
                additional content.{" "}
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">Last updated 3 mins ago</small>
            </Card.Footer>
          </Card>
        </a>

        <a href="/admin/dashboard/users">
          <Card style={{ marginRight: "2%" }}>
            <Card.Img variant="top" src="holder.js/100px160" />
            <Card.Body>
              <Card.Title>Card title</Card.Title>
              <Card.Text>
                This is a wider card with supporting text below as a natural
                lead-in to additional content. This card has even longer content
                than the first to show that equal height action.
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">Last updated 3 mins ago</small>
            </Card.Footer>
          </Card>
        </a>
      </CardGroup>
    </div>
  );
};

export default AdminDashboard;
