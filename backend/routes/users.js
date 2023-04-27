const express = require('express');
const router = express.Router();

const { loginUser, signUpUser, getUserById, getUsers } = require('../controllers/users');

router.post('/signup', signUpUser);
router.post('/login', loginUser);
router.get('/:id', getUserById);
router.get('/', getUsers);


module.exports = router;