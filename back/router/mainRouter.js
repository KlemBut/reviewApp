const express = require("express")
const router = express.Router()
const {
    register,
    login,
    getUsers,
    loggedIn,
    singleUser,
    logout,
    addReview,
    
} = require("../controllers/mainController")

router.post("/register", register)
router.post("/login", login)
router.post("/logout", logout)
router.post("/user", singleUser)
router.post("/addReview", addReview)

router.get("/userdb", getUsers)
router.get("/loggedin", loggedIn)
module.exports = router
