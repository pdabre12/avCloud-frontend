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

/* GET one users. */
router.get('/users/:user_name', async function(req, res, next) {
  var user = req.params.user_name;
  console.log("**** GET **** One user info ****");
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
module.exports = router;