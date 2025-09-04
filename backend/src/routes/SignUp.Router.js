const express = require("express")
const userModel = require("../models/user.model")
const router = express.Router()
router.post("/AddUser", async (req, res) => {
    const email = req.body.email
    let out = false;
    const Users = await userModel.find()
    for (let index = 0; index < Users.length; index++) {
        const element = Users[index];
        if (element.email == email) {
            out = true;
            break;
        }
    }
    let message = ""
    if (out === true) {
        message = "User already exists"
    }
    else {
        message = "User added Succesfully"
        const User = userModel({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
        await User.save()
    }
    res.status(200).json({ message: message, out: out })
})
module.exports = router