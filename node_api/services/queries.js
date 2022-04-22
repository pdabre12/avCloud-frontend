const db = require('./db');
const helper = require('../helper');
const config = require('../config');

var getSHA256ofJSON = function(input){
    return crypto.createHash('sha256').update(JSON.stringify(input)).digest('hex')
}

async function getMultipleUsers(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT * FROM users LIMIT ${offset},${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}


async function postUser(user){
  const result = await db.query(
    `INSERT INTO users(user_name, user_pw, user_email, user_phone)
    VALUES 
    ('${user.user_name}', '${user.user_pw}', '${user.user_email}', '${user.user_phone}')`
  );

  let message = 'Error in creating a user';

  if (result.affectedRows) {
    message = 'New user created successfully';
  }

  return {message};
}


async function deleteUser(user_name){
  const result = await db.query(
    `DELETE FROM users WHERE user_name='${user_name}'`
  );

  let message = 'Error in deleting user';

  if (result.affectedRows) {
    message = 'user deleted successfully';
  }

  return {message};
}

  module.exports = {
  getMultipleUsers,
  postUser,
  deleteUser
}