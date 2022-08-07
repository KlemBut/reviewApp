const userScheme = require("../models/userScheme")
const reviewScheme = require("../models/reviewScheme")
const bcrypt = require("bcrypt")
module.exports = {
    register: async (req, res) => {
        console.log(req.body)
        const {email, passOne} = req.body
        const user = new userScheme()
        user.image = "https://matplotlib.org/stable/_images/stinkbug.png"
        user.username = email
        user.password = await bcrypt.hash(passOne, 10)
        try{
            await user.save()
        } catch(e) {
            console.log("not saved")
        }
        res.send({ok: "ok"})
    },
    addReview: async (req, res) => {
        console.log(req.body)
        const {reciever, rating, content} = req.body
        const review = new reviewScheme()
        review.reciever = reciever
        review.by = req.session.username
        review.rating = rating
        review.content = content
        
        
        try{
            await review.save()
            await userScheme.findOneAndUpdate({_id: reciever}, {$push: {rating:rating}})
           
             
        } catch(e) {
            console.log("not saved")
        }
        res.send({ok: "ok"})
    },
    login: async (req, res) => {
        const {email, pass} = req.body

        const user = await userScheme.findOne({username: email})
        
        if(user) {
            const passMatch = await bcrypt.compare(pass, user.password)

            if(passMatch) {
                req.session.username = user.username
                return res.send({success: true})
            }
        }

        res.send({success: false})
    },
    getUsers: async (req, res) => {
        const items = await userScheme.find()
        res.send({message: items})
    },
    loggedIn: async (req, res) => {
        
        res.send({message: req.session.username})
    },
    logout: async (req, res) => {
        req.session.username = req.body.user
        res.send({message: "loggedout"})
    },
    singleUser: async (req, res) => {
        const user = await userScheme.findOne({_id: req.body.id})
        const reviews = await reviewScheme.find({reciever: req.body.id })
        res.send({message: user, reviews})
    },
    
}