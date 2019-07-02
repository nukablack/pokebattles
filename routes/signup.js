const router = express.router()
const User = require('..models/User')
const sha512 = require('js-sha512')
const jwt = require('jsonwebtoken')

router.post('/register', (req, res, next) => {
    const newUser = new User({
        name: req.body.nickname,
        email: req.body.email,
        password: sha512(req.body.password)
    })
    newUser.save(err => {
        if(err){
            return res.status(400).json({
                title: 'error',
                error: 'email or nick in use'
            })
        }
        return res.status(200).json({
            title: 'signup success'
        })
    })
})