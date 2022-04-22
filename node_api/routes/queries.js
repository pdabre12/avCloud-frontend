const express = require('express');
const router = express.Router();
const queries = require('../services/queries');

/* GET users. */
router.get('/', async function(req, res, next) {
  try {
    res.json(await queries.getMultipleUsers(req.query.page));
  } catch (err) {
    console.error(`Error while getting users info. `, err.message);
    next(err);
  }
});

/* POST user */
router.post('/', async function(req, res, next) {
  try {
    res.json(await queries.postUser(req.body));
  } catch (err) {
    console.error(`Error while creating user. `, err.message);
    next(err);
  }
});

/* login user */
router.post('/login', async function(req, res, next) {
  try {
    res.json(await queries.loginUser(req.body));
  } catch (err) {
    console.error(`Error while logging in. `, err.message);
    next(err);
  }
});

/* DELETE user */
router.delete('/:user_name', async function(req, res, next) {
  try {
    res.json(await queries.deleteUser(req.params.user_name));
  } catch (err) {
    console.error(`Error while deleting user. `, err.message);
    next(err);
  }
});


module.exports = router;