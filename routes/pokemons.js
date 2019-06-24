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
    .post(function (req, res) {
        let pokemonData = req.body
        let pokemonObj = new Pokemon({
            pokeId: pokemonData.pokeId,
            name: pokemonData.name,
            types: pokemonData.types,
            sprites: pokemonData.sprites,
            gifs: pokemonData.gifs,
            footprint: pokemonData.footprint,
            weight: pokemonData.weight,
            height: pokemonData.height,
            hp: pokemonData.hp,
            attack: pokemonData.attack,
            defense: pokemonData.defense
        })

        pokemonObj.save(function (err) {
            if(err){
                throw err
            }

            res.status(201)
            res.setDefaultEncoding(pokemonObj.toJSON())
        })
    });

router.route('/:id')
    .get(function (req, res){
        let pokemonId = req.params.id

        if (!result){
            res.status(404)
            res.send('Pokemon no encontrado')
        }

        if (result){
            Pokemon.findOne({pokeId: pokemonId}).exec(function (err, result){
                if (err){
                    throw err
                }

                res.json(result.toJSON())
            })
        }
    })
    .put(function (req, res){
        let pokemonId = req.params.id
        let pokemonData = req.body
        Pokemon.findOne({pokeId: pokemonId}).exec(function (err, result){
            if (err){
                throw err
            }

            if (!result){
                res.status(404)
                res.send('Pokemon no encontrado')
            }

            if (result){
                result.pokeId = pokemonData.pokeId
                result.name = pokemonData.name
                result.types = pokemonData.types
                result.sprites = pokemonData.sprites
                result.gifs = pokemonData.gifs
                result.footprint = pokemonData.footprint
                result.weight = pokemonData.weight
                result.height = pokemonData.height
                result.hp = pokemonData.hp
                result.attack = pokemonData.attack
                result.defense = pokemonData.defense

                result.save(function (err){
                    if (err){
                        throw err
                    }

                    res.json(result.toJSON())
                })
            }
        })
    });

    module.exports = router;