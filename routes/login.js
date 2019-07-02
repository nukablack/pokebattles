const router = express.router()
const user = require('..models/User')
const sha512 = require('js-sha512')
const jwt = require('jsonwebtoken')

router.post('/', async (req, res) =>{
    await User.findOne(nickname: req.body.name, (err, user) => {
        if (err){
            return res.status(500).json({
                title: 'server error',
                error: err
            })
        }
        //incorrect user or password
        if(!user || !sha512.compareSync(req.body.password, user.password)){
            return res.status(401).json({
                title: 'login failed',
                error: 'invalid credentials'
            });
        }
        //ig all is good
        let token = jwt.sign({userId: user._id, nickname: user.name, usermail: user.mail}, 'secretKey');
        return res.status(200).json({
            title: `Login success`,
            token: token
            })
        }
    })
);

//Verificación
router.get('/', async (req, res) =>{
    let token = await req.headers.token;
    jwt.verify(token, 'secretKey', (err, decoded) => {
        if (err){
            return res.status(401).json({
                title: 'unauthorized'
            })
        }
        //token válido
        User.findOne({_id: decoded.userId }, (err, user) => {
            return res.status(200).json({
                title: 'user grabbed',
                user: {
                    email: user.email,
                    name: user.name
                }
            })
        })
    })
});

module.exports = router;