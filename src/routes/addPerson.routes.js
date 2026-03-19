const express = require('express');
const router = express.Router();
const { addPerson, getKnownPeople } = require('../controllers/addPerson.controller');

router.post('/add', addPerson);
router.get('/all', getKnownPeople); // New route for the dashboard

module.exports = router;