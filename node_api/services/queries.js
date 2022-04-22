const db = require('./db');
const helper = require('../helper');
const config = require('../config');
const crypto = require('crypto');
const algorithm = 'aes-256-ctr';
const secret_key = Buffer.from('FoCKvdLslUuB4y3EZlKate7XGottHski1LmyqJHvUhs=', 'base64');
const iv_len = 16;

// ref: https://stackoverflow.com/questions/60369148/how-do-i-replace-deprecated-crypto-createcipher-in-node-js
function encrypt(text) {
    let iv = crypto.randomBytes(iv_len);
    let cipher = crypto.createCipheriv(algorithm, Buffer.from(secret_key, 'hex'), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return iv.toString('hex') + ':' + encrypted.toString('hex');
}

function decrypt(text) {
    let textParts = text.split(':');
    let iv = Buffer.from(textParts.shift(), 'hex');
    let encryptedText = Buffer.from(textParts.join(':'), 'hex');
    let decipher = crypto.createDecipheriv(algorithm, Buffer.from(secret_key, 'hex'), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
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
  var pw_sha = encrypt(user.user_pw);
  // console.log(pw_sha);

  const result = await db.query(
    `INSERT INTO users(user_name, user_pw, user_email, user_phone)
    VALUES 
    ('${user.user_name}', '${pw_sha}', '${user.user_email}', '${user.user_phone}')`
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