const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(table_name){
  const rows = await db.query(
    `SELECT * FROM ${table_name}`
  );
  const data = helper.emptyOrRows(rows);

  return {
    data
  }
}


async function postUser(user){
  var pw_sha = helper.encrypt(user.user_pw);
  // console.log(pw_sha);

  const result = await db.query(
    `INSERT INTO users(user_name, user_pw, user_email, user_phone)
    VALUES 
    ('${user.user_name}', '${pw_sha}', '${user.user_email}', '${user.user_phone}')`
  );

  let message = 'Error in creating user. ';

  if (result.affectedRows) {
    message = 'New user created successfully!';
  }

  return {message};
}


async function loginUser(user){
  const result = await db.query(
    `SELECT user_pw FROM users WHERE user_name = '${user.user_name}'`
  );
  // console.log(result);

// ref: https://stackoverflow.com/questions/48782788/convert-nodejs-mysql-result-to-accessible-json-object
  var jsonObj = Object.assign({}, result[0]);
  // console.log(jsonObj.user_pw);

  var pw_sha = helper.decrypt(jsonObj.user_pw);
  // console.log(pw_sha);

  if (pw_sha === user.user_pw) 
    message = 'Log in successfully!';
  else 
    message = 'Error in logging in. ';

  return {message};
}


async function deleteUser(user_name){
  const result = await db.query(
    `DELETE FROM users WHERE user_name='${user_name}'`
  );

  let message = 'Error in deleting user. ';

  if (result.affectedRows) {
    message = 'User deleted successfully!';
  }

  return {message};
}

async function getOneUser(user_name){
  const row = await db.query(
    `SELECT * FROM users WHERE user_name='${user_name}'`
  );

  const data = helper.emptyOrRows(row);

  return {
    data
  }
}

async function putUser(user, user_name){
  var new_pw_sha = helper.encrypt(user.user_pw);
  const query = 'UPDATE `users` SET user_pw = ?, user_email = ?, user_phone = ? WHERE user_name = ?';
  const result = await db.query(query, [new_pw_sha, user.user_email, user.user_phone, user_name]);

  // const result = await db.query(
  //   `UPDATE users
  //    SET user_pw = '${new_pw_sha}',
  //        user_email = '${user_email}',
  //        user_phone = '${user_phone}'
  //     WHERE user_name='${user_name}'
  //    `
  // );

  let message = 'Error in updating user. ';

  if (result.affectedRows) {
    message = 'User updated successfully!';
  }

  return {message};
}

  module.exports = {
  getMultiple,
  postUser,
  loginUser,
  deleteUser,
  getOneUser,
  putUser
}