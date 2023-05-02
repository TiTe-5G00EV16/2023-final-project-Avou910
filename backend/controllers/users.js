const bcrypt = require('bcryptjs');
const { v4 } = require('uuid');
const jwt = require('jsonwebtoken');

const users = require('../models/users');
const { sendResetPasswordEmail } = require('./email.js');


const signUpUser = async (req, res) => {
  const {email, password} = req.body;

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    return res.status(500).send('Could not create user, try again please');
  }


  const newUser = {
    id: v4(),
    email,
    password: hashedPassword
  };

  try {
    const exist = await users.findByEmail(newUser.email);
    if(exist.length > 0) {
      return res.status(422).send('Could create user, user exists');
    }

    const result = await users.create(newUser);
    if(!result) {
      return res.status(500).send('Could not create user, try again please');
    }

    const token = jwt.sign(
      {
        id: newUser.id,
        email: newUser.email
      },
      process.env.JWT_KEY,
      { expiresIn: '1h' }
    );

    res.status(201).json({
      id: newUser.id,
      email: newUser.email,
      token
    })

  } catch (err) {
    return res.status(500).send('Could not create user, try again please');
  }
};

const loginUser = async (req, res) => {
  const {email, password} = req.body;
  
  let identifiedUser;
  try {
    const result = await users.findByEmail(email);
    if(!result[0]) {
      return res.status(401).send('No user found - Check your credentials');
    }
    identifiedUser = result[0];
  } catch (err) {
    return res.status(500).send('Something went wrong');
  }

  let isValidPassword;
  try {
    isValidPassword = await bcrypt.compare(password, identifiedUser.password);
    if(!isValidPassword) {
      return res.status(401).send('No user found - Check your credentials');
    }
  } catch (err) {
    return res.status(500).send('Something went wrong');
  }

  try {
    const token = jwt.sign(
      {
        id: identifiedUser.id,
        email: identifiedUser.email
      },
      process.env.JWT_KEY,
      { expiresIn: '1h' }
    );

    res.status(201).json({
      id: identifiedUser.id,
      email: identifiedUser.email,
      token
    })
  } catch (err) {
    return res.status(500).send('Something went wrong');
  }


};

const getUserById = async (req, res) => {
  try {
    const id = (req.params.id);
    const response = await users.findUserById(id);
    if(response.length === 1) {
      res.send(response[0]);
    }else {
      res.status(404).json({ message: `User with ID ${id} not found` });
    }
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

const getUsers = async (req, res) => {
  try {
    const response = await users.findAll();
    if(response) {
      res.send(response);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = (req.params.id);
    const response = await users.deleteById(id);
    if(response) {
      res.status(200).json('User deleted');
    }
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
};

const checkResetPassword = async (req, res, next) => {
  const { email } = req.body;

  try {
    const userEmail = await users.findByEmail(email);
    if (!userEmail) {
      return res.status(404).json({
        message: 'Email not found. Please try again.',
      });
    }
    const resetToken = v4();
    await users.updateResetToken(email.email, resetToken);

    console.log("any secrest here",process.env.JWT_SECRET)

    await sendResetPasswordEmail(email.email,resetToken);
    return res.status(200).json({
      message: 'Password reset email sent successfully.',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'An error occurred while sending the password reset email. Please try again later.',
    });
  }
};

const updatePassword = async (req, res) => {
  const { email, token, newPassword } = req.body;
  console.log("backend chekcking",email,token,newPassword)

  try {
    const result = await users.findByEmail(email);
    if(!result[0]) {
      return res.status(401).send('Invalid email');
    }
    //const user = result[0];

    /*if (users.reset_Token !== token) {
      return res.status(401).send('Invalid reset token');
    }*/

    const hashedPassword = await bcrypt.hash(newPassword, 12);
    await users.setNewPassword(email,token, hashedPassword);

    res.status(200).json({
      message: 'Password updated successfully'
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
};


module.exports = {
  loginUser,
  signUpUser,
  getUserById,
  getUsers,
  deleteUser,
  checkResetPassword,
  updatePassword
}
