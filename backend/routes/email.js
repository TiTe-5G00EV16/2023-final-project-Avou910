const express = require('express');
const router = express.Router();
const { sendEmail, sendResetPasswordEmail } = require('../controllers/email');

router.post('/', sendEmail);
router.post('/', sendResetPasswordEmail);

module.exports = router;
