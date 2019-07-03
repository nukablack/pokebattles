const express = require('express')
const mongoose = require('mongoose')
const sha512 = require('js-sha512')
const router = express.Router()

let User = require('../models/User')

router.route('/')
    .get(function (req, res){
        //Método populate formatea para mostrar los datos del ID referenciado.
        //Al usar "-" delante de cada dato, lo que indicamos es que no queremos mostrarlo.
        User.find().populate('pokemon.pokemonId', "-hp -attack -defense").exec(function (err, results){
            if (err){
                throw err
            }

            let output = []
            
            results.forEach( (data) => {
                  output.push({
                      nickname: data.nickname,
                      email: data.email,
                      squad: data.poke_squad
                  })
                }
            )

            res.json(output);
        })
    })
    .post(function(req, res){
        let userData = req.body
        console.log(userData)
        let userObj = new User({
            email: userData.email,
            nickname: userData.nickname,
            password: sha512(userData.password),
            role: userData.role,
            enabled: userData.enabled,
            poke_squad: [{
                hp: userData.poke_squad.hp, 
                attack: userData.poke_squad.attack,
                defense: userData.poke_squad.defense,
                pokemonId: userData.poke_squad.pokemonId
            }],
            pokedex: [ userData.poke_squad.pokemonId ]
        })

        userObj.save(function(err) {
            if(err) {
                if (err.code === 11000){
                    res.status(400)
                    res.send("Ya existe un usuario con ese email o nickname.")
                }

                if( err.code !== 110000 ){
                    throw err
                }
            }

            console.log('Usuario registrado')
            res.status(201)
            res.json(userObj.toJSON())
        })
    })

router.route('/:user')
    .get(function (req, res) {
        let userSearch = req.params.user
        
        User.findOne({$or: [{"nickname": userSearch}, {"email": userSearch}]}, "-password").populate("poke_squad.pokemonId").exec(function (err, result){
            if (err){
                throw err
            }

            if (!result){
                res.status(404)
                res.send('Usuario no encontrado')
            }
            if (result) {
                let output = {
                    nickname: result.nickname,
                    poke_squad: {
                        hp: result.poke_squad[0].hp,
                        attack: result.poke_squad[0].attack,
                        defense: result.poke_squad[0].defense
                    },
                    pokemonInfo: {
                        name: result.poke_squad[0].pokemonId.name,
                        gif: result.poke_squad[0].pokemonId.gifs.back
                    }
                } 
                res.json(output)
            }
        })
    })
    .put(function (req, res) {
        let userSearch = req.params.user
        let userData = req.body
        
        User.findOne().where("nickname" == userSearch || "email" == userSearch).exec(function (err, result){
            if (err) {
                throw err
            }

            if (!result){
                res.status(404)
                res.send('Usuario no encontrado')
            }

            if (result){
                result.email = userData.email
                result.nickname = userData.nickname
                result.password = sha512(userData.password)
                result.pokemon = {
                    hp: userData.hp, 
                    attack: userData.attack,
                    defense: userData.defense,
                    pokemonId: userData.pokemonId
                }
            }
        })
    })

module.exports = router;