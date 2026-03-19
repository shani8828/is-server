const express = require("express");
const { getEvents } = require("../controllers/event.controller.js");

const router = express.Router();

router.get("/", getEvents);

module.exports = router;