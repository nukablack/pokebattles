const router = express.router()
const user = require('..models/User')
const sha512 = require('js-sha512')
const jwt = require('jsonwebtoken')

router.post('/', async (req, res) =>{
    await User.findOne({name: req.body.name, password: sha512(req.body.password)}.exec((err, user) => {
        if (err){
            throw error
        }

        if(!result){
            res.status(403)
            res.send("Usuario o contraseña incorrecto")
        }
        
        if(result){
            let user = {
                id: result._id,
                name: result.name
            }

            let token = jwt.sign(user, req.app.get('secretKey'));
            result.save()

            res.json({token: token})
        }
    })
);
})

/*//Verificación
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
});*/

module.export = router;