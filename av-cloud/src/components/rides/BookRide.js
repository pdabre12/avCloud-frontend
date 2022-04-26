import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FindSourceAndDestination from './findSourceAndDestination';
import RideList from './RideList';
import ReviewRide from './ReviewRide';
import { useHistory } from 'react-router-dom';
import axios from 'axios';


const steps = ['Enter source and destination', 'Choose your car', 'Finalize your ride'];




export default function BookRide() {
  const [activeStep, setActiveStep] = useState(0);
  const [ride, setRide] = useState();
  const [loading, setLoading] = useState();
  const history = useHistory();


  const [userDetails , setUserDetails] =useState(null);

//   const authContext = useContext(AuthContext);
//   const {user} = authContext;

useEffect(() => {
  return () => {
    const loggedInUser = localStorage.getItem("user");

    if (loggedInUser) {
      setUserDetails(JSON.parse(loggedInUser));
      //   navigate(-1);
    }
    else{
      history.push('/login')
      document.location.reload()

    }
  };
}, []);


  const handleNext = async () => {
    setActiveStep(activeStep + 1);
    if(activeStep == 2){
      console.log(ride)

      const car_details ={
        
          "start_loc": "San Jose",
          "destination_loc": "Los Angeles",
          "car_id": 2
      
      }
      axios.post(`http://localhost:3000/bookings/${userDetails.username}`,car_details)
      .then(resp =>{
        if(resp.status === 200){
          setRide(resp.data.data);
          setLoading(false);
        }
        else{
          
          console.log('Error Occured', resp.data.message);
          history.push("/book")
          document.location.reload()
        }
      }

      )}
      
  };
  

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <FindSourceAndDestination 
                  setRide={setRide}
                  ride={ride}
              />;
      case 1:
        return <RideList 
                  setRide={setRide}
                  ride={ride}
                />;
      case 2:
        return <ReviewRide 
                  setRide={setRide}
                  ride={ride}
                />;
      default:
        // throw new Error('Unknown step');
    }
  }

  return (
    
      <Container component="main" maxWidth="m" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Ride Service
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }} >
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
              </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <>
              {!loading && (
                <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Your order has been placed.
                </Typography>
                <Typography variant="subtitle1">
                  Thank you for using AutoRentals. Have a safe journey
                </Typography>
              </React.Fragment>
              )}
              </>
              
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  {activeStep !== 0 && (
                    <Button variant="dark" onClick={handleBack} sx={{ mt: 5, ml: 1 }}>
                      Back
                    </Button>
                  )}

                  <Button
                    variant="dark"
                    onClick={handleNext}
                    sx={{ mt: 5, ml: 1 }}
                   
                  >
                    {activeStep === steps.length - 1 ? 'Book ride' : 'Next'}
                  </Button>
                </Box>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
      </Container>
   
  );
}