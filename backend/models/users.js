const pool = require('../db/pool');

const users = {
  create: (user) => new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if(err) {
        return reject(err);
      }

      connection.query('INSERT INTO users SET ?;', user, (err, result) => {
        connection.release();
        if(err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }),
  findByEmail: (email) => new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if(err) {
        return reject(err);
      }
      connection.query('SELECT * FROM users WHERE email LIKE ?;', email, (err, result) => {
        connection.release();
        if(err) {
          return reject(err);
        }
        resolve(result);
      });
    });
  }),

  findUserById: (id) => new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        return reject(err);
      }
      connection.query('SELECT * FROM users WHERE id=?;', id,  (err, result) => {
        connection.release();
        if(err) {
          return reject(err);
        }
        console.log(result);
        resolve(result);
      });
    });
  }),

  findAll: () => new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if(err) {
        return reject(err);
      }
      connection.query('SELECT * FROM users', (err, result) => {
        connection.release();
        if(err) {
          return reject(err);
        }
        resolve(result);
      });
    });
  }),

  deleteById: (id) => new Promise((resolve, reject) => {
    console.log("model id check",id)
    const deleteQuery = 'DELETE FROM users WHERE id=?;';
    pool.getConnection((err, connection) => {
      if(err) {
        return reject(err);
      }
      connection.query(deleteQuery, id, (err, result) => {
        connection.release();
        if (err) {
          return reject(err);
        }
        resolve(result);
      });
    });
  }),

  setNewPassword: (email, token, hashedPassword) => new Promise((resolve, reject) => {
    console.log("triple dpuble check",email,token, hashedPassword)
    pool.getConnection((err, connection) => {
      if(err) {
        return reject(err);
      }
      connection.query('UPDATE users SET password = ? WHERE email = ? AND reset_token = ?;', [hashedPassword, email,token], (err, result) => {
        connection.release();
        if(err) {
          return reject(err);
        }
        resolve(result);
      });
    });
  }),

  updateResetToken: (email, resetToken) => new Promise((resolve, reject) => {
    console.log("id and reset token check",email,resetToken)
    pool.getConnection((err, connection) => {
      if(err) {
        return reject(err);
      }
      connection.query('UPDATE users SET reset_token = ? WHERE email = ?;', [resetToken, email], (err, result) => {
        connection.release();
        if(err) {
          return reject(err);
        }
        resolve(result);
      });
    });
  })
  
};

module.exports = users;
