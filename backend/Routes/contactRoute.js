const express = require("express");
const router = express.Router();

const { sendContactMail } = require("../Controllers/contactController");

router.post("/contact", sendContactMail);

module.exports = router;