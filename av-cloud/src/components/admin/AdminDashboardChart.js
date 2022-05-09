import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import { Chart } from "chart.js/auto";

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

const AdminDashboardChart = () => {
  const [bookings, setBookings] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [chartData, setChartData] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const user = localStorage.getItem("admin");
    console.log("User: ", user);
    if (user !== null && user !== undefined) {
      setUserInfo(JSON.parse(user));
    } else {
      history.push("/admin/login");
      document.location.reload();
    }

    axios.get("http://localhost:3000/bookings").then((res) => {
      if (res.status === 200) {
        console.log(res.data.data);
        setBookings(res.data.data)

            if (bookings!==null && bookings!== undefined) {
                console.log(bookings);
              setChartData({
                labels: bookings?.map((booking) => booking.booking_id),
                datasets: [
                  {
                    label: "Price in USD",
                    data: bookings?.map((booking) => booking.b_car_id),
                    backgroundColor: [
                      "#ffbb11",
                      "#ecf0f1",
                      "#50AF95",
                      "#f3ba2f",
                      "#2a71d0",
                    ],
                  },
                ],
              });
            //   console.log(chartData)
            }
            

       
      } else {
        console.log("Error happened!");
        document.location.reload();
      }
    });
  }, []);

  return (
    <div>
      <>
        <AdminNavBar />
        {/* {bookings?.map((booking) => {
          <div>
            {booking.booking_id}
            xxxxxxx
          </div>;
        })} */}
        {chartData ? (
          <Bar
            data={chartData}
            // width={"300%"}
            options={{
            // maintainAspectRatio: false ,
              plugins: {
                title: {
                  display: true,
                  text: "Cryptocurrency prices",
                },
                legend: {
                  display: true,
                  position: "bottom",
                },
              },
            }}
          />
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "90vh",
            }}
          >
            <Spinner animation="border" variant="success" />
          </div>
        )}
      </>
    </div>
  );
};

export default AdminDashboardChart;
