const express = require('express');
const router = express.Router();
const queries = require('../services/queries');

/* GET users. */
router.get('/users', async function(req, res, next) {
  console.log("**** GET **** All Users ****");
  try {
    res.json(await queries.getMultipleUsers(req.query.page));
  } catch (err) {
    console.error(`Error while getting users info. `, err.message);
    next(err);
  }
});

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


module.exports = router;