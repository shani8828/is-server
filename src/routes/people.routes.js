const express = require("express");
const { getPeople } = require("../controllers/people.controller.js");

const router = express.Router();

router.get("/", getPeople);

module.exports = router;