const express = require('express')
const router = express.Router()
let Pokemon = require('../models/Pokemon')

router.route('/')
    .get(function (req, res) {
        Pokemon.find().exec(function (err, results){
            if (err) {
                throw err
            }

            res.json(results);
        })
    })

router.route('/:id')
    .get(function (req, res){
        let pokemonId = req.params.id

        if (!res){
            res.status(404)
            res.send('Pokemon no encontrado')
        }

        if (res){
            Pokemon.findOne({pokeId: pokemonId}).exec(function (err, result){
                if (err){
                    throw err
                }

                res.json(result.toJSON())
            })
        }
    })

    module.exports = router;