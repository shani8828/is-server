const express = require("express");
const router = express.Router();

const { ingestEvent } = require("../controllers/ingest.controller");

router.post("/", ingestEvent);
router.get("/", (req, res)=>{
    res.send({
        message:"Hello from ingest."
    })
})
module.exports = router;