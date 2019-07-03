const express = require('express')
const router = express.Router()
const User = require('../models/User')
const sha512 = require('js-sha512')
const jwt = require('jsonwebtoken')

router.post('/', (req, res) =>{
    let userData = req.body;
    User.findOne({nickname: userData.nickname, password: sha512(userData.password)}).exec((err, newUser) => {
        if (err){
            throw err
        }

        if(!newUser){
            res.status(403)
            res.send("Usuario o contraseña incorrecto")
        }
        
        if(newUser){
            let user = {
                id: newUser._id,
                nickname: newUser.nickname
            }

            let token = jwt.sign(user,'secretKey');
            res.json({token: token})
        }
    })
});

module.exports = router;