const express = require("express");
const { protect, authorize } = require("../Middleware/auth");
const { getadminData, getuserData } = require("../Controllers/userController");

const router = express.Router();

router.get("/admin" , protect ,authorize(["Admin"]) , getadminData );
router.get("/user" , protect , authorize(["User" , "Admin"]) , getuserData)

module.exports = router;