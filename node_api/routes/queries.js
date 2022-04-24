const express = require('express');
const router = express.Router();
const queries = require('../services/queries');

/* GET a list of entries in {table}. */
router.get('/:table_name', async function(req, res, next) {
  var table = req.params.table_name;
  console.log("**** GET **** All " + table + " info ****");
  try {
    res.json(await queries.getMultiple(table));
  } catch (err) {
    console.error(`Error while fetching info. `, err.message);
    next(err);
  }
});


// *********** USERS ***********

/* POST new user */
router.post('/users', async function(req, res, next) {
  console.log("**** POST **** New User ****");
  try {
    res.json(await queries.postUser(req.body));
  } catch (err) {
    console.error(`Error while creating user. `, err.message);
    next(err);
  }
});


/* POST login credentials */
router.post('/users/login', async function(req, res, next) {
  console.log("**** POST **** User Login ****");
  try {
    res.json(await queries.loginUser(req.body));
  } catch (err) {
    console.error(`Error while logging in. `, err.message);
    next(err);
  }
});


/* DELETE user */
router.delete('/users/:user_name', async function(req, res, next) {
  console.log("**** DELETE **** Delete User ****");
  try {
    res.json(await queries.deleteUser(req.params.user_name));
  } catch (err) {
    console.error(`Error while deleting user. `, err.message);
    next(err);
  }
});


/* GET one users */
router.get('/users/:user_name', async function(req, res, next) {
  var user = req.params.user_name;
  console.log("**** GET **** One User Info ****");
  try {
    res.json(await queries.getOneUser(user));
  } catch (err) {
    console.error(`Error getting information about this user. `, err.message);
    next(err);
  }
});


/* PUT update user info */
router.put('/users/:user_name', async function(req, res, next) {
  console.log("**** PUT **** Update User info ****");
  try {
    res.json(await queries.putUser(req.body, req.params.user_name));
  } catch (err) {
    console.error(`Error while updating user. `, err.message);
    next(err);
  }
});


// *********** CARS ***********

/* POST new car */
router.post('/cars', async function(req, res, next) {
  console.log("**** POST **** New Car ****");
  try {
    res.json(await queries.postCar(req.body));
  } catch (err) {
    console.error(`Error while posting a car. `, err.message);
    next(err);
  }
});


/* GET one car */
router.get('/cars/:car_id', async function(req, res, next) {
  var car = req.params.car_id;
  console.log("**** GET **** One Car Info ****");
  try {
    res.json(await queries.getOneCar(car));
  } catch (err) {
    console.error(`Error getting information about this car. `, err.message);
    next(err);
  }
});


/* DELETE car */
router.delete('/cars/:car_id', async function(req, res, next) {
  console.log("**** DELETE **** Delete Car ****");
  try {
    res.json(await queries.deleteCar(req.params.car_id));
  } catch (err) {
    console.error(`Error while deleting car. `, err.message);
    next(err);
  }
});


/* GET nearby idle cars */
router.get('/car/nearby', async function(req, res, next) {
  console.log("**** GET **** Nearby Car Info ****");
  try {
    res.json(await queries.getCarNearBy(req.body));
  } catch (err) {
    console.error(`Error getting information about nearby car. `, err.message);
    next(err);
  }
});


// *********** Booking ***********

router.post('/bookings/:user_name', async function(req, res, next) {
  console.log("**** POST **** New Booking ****");
  try {
    res.json(await queries.postBooking(req.body, req.params.user_name));
  } catch (err) {
    console.error(`Error while posting a booking. `, err.message);
    next(err);
  }
});


// *********** Trip ***********

router.post('/trip/start/:booking_id', async function(req, res, next) {
  console.log("**** POST **** Start A trip ****");
  try {
    res.json(await queries.postStart(req.params.booking_id));
  } catch (err) {
    console.error(`Error while starting a trip. `, err.message);
    next(err);
  }
});


router.put('/trip/pickup/:booking_id', async function(req, res, next) {
  console.log("**** PUT **** Pick Up A Guest ****");
  try {
    res.json(await queries.putPickup(req.params.booking_id));
  } catch (err) {
    console.error(`Error while picking up. `, err.message);
    next(err);
  }
});


router.put('/trip/end/:booking_id', async function(req, res, next) {
  console.log("**** PUT **** End A trip ****");
  try {
    res.json(await queries.putEnd(req.body, req.params.booking_id));
  } catch (err) {
    console.error(`Error while ending a trip. `, err.message);
    next(err);
  }
});

module.exports = router;