const express = require("express");
const {
  registerForEvent,
  getRegistrationsForUser,
} = require("../controllers/registrationController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.post(
  "/register",
  authMiddleware,
  (req, res, next) => {
    console.log("Register route hit"); // Add this to see if the route is being accessed
    next();
  },
  registerForEvent
);
router.get("/my-registrations", authMiddleware, getRegistrationsForUser); // Ensure this route is defined

module.exports = router;
