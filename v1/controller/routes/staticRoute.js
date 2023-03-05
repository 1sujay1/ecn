const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/", function (req, res) {
    res.sendFile(path.join(__dirname + "../../../../static/admin_dashboard.html"));
});

router.get("/admin", function (req, res) {
    res.sendFile(path.join(__dirname + "../../../../static/admin_dashboard.html"));
});


module.exports = router;