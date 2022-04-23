import React,{useState,useEffect} from "react";
import { Button, Card, Form, Row , Col} from "react-bootstrap";

import { Link ,useHistory} from "react-router-dom";
import axios from "axios";



export default function UpdateUserInfo(){
    const [regUserdata, setRegUserdata]=useState({first_name:"",last_name:"", address:"", email:"", password:"",  contact:""});
    const [userDetails, setUserDetails] = useState();

    const history = useHistory();

    useEffect(() => {
        const user = localStorage.getItem("user");
        console.log("User: ", user);
        if (user !== null && user !== undefined) {
          setUserDetails(JSON.parse(user));
        } else {
        //   history.push('/login');
        }
      }, []);

    const handleChange=(event)=>{
        // console.log(event.target.value);
        setRegUserdata({...regUserdata,[event.target.name]:event.target.value})
    }
    const handleSubmit=(event)=>{
        event.preventDefault();
        console.log(regUserdata);

        axios.post("/customer/register",{regUserdata}).then(res=>{
            if (res.status==200){
                console.log(res.data)

                // navigate("/login");
                console.log("registration successful");
            }
            else{
                console.log("registration unsuccessful");
            }
            
        });
     
       
        setRegUserdata({first_name:"",last_name:"", address:"", email:"", password:"",  contact:""})
        

        // history.push("/login");
    }

return(
  <React.Fragment>

      <Card style={{ width: '35rem', marginLeft:'25rem', marginTop:'2rem' }}>
          <Card.Header  style={{textAlign:'center', color:'green', fontStyle:"italic"}}>Update your profile</Card.Header>
          <Card.Body>
          <form onSubmit={handleSubmit} onChange={handleChange}>
              <Form.Group>
              <Form.Floating className="mb-3">
                 <Form.Control type="text"  placeholder="Limeka" id="user_name" name="user_name" required />
                 <label htmlFor="user_name" style={{marginLeft:10}} > User Name</label>
                 </Form.Floating>
                 
                 <Form.Floating className="mb-3">
                 <Form.Control type="email"  placeholder="email" id="email" name="email" required/>
                 <label htmlFor="Email" style={{marginLeft:10}} > Email</label>
                 </Form.Floating>

                 <Form.Floating className="mb-3">
                 <Form.Control type="password" placeholder="Password" id="Password" name="password" required />
                 <label htmlFor="Password" style={{marginLeft:10}}> Password</label>
                 </Form.Floating>

                 <Form.Floating className="mb-3">
                 <Form.Control type="text"  placeholder="66944554687" id="contact" name="contact" required/>
                 <label htmlFor="contact" style={{marginLeft:10}} > Contact Number</label>
                 </Form.Floating> 
                 
              </Form.Group>
              <Row>
                  <Col>
                  <Button type="submit" variant="success" size="md" active>Update Info</Button>
                  </Col>
                  
              </Row>



              </form>
          </Card.Body>
      </Card>
  </React.Fragment>

    
)
}