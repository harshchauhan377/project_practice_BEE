const express = require("express")
const router = express.Router()

const {
    userRegister,
    userLogin,
    userProfile
} = require("../controllers/userController")

const {
    generateToken,
    validateJwtToken
} = require("../middleware/jwtmiddlewaare")

router.post("/register", userRegister)

router.post("/login", userLogin)

// router.post("/login", loginUser)
router.get("/getProfile", validateJwtToken, userProfile)

module.exports = router