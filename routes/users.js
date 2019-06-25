const express = required('express')
const mongoose = required('mongoose')
const sha512 = required('js-sha512')
const router = express.Router()

let User = require('../models/User')

router.route('/')
    .get(function (req, res){
        User.find().exec(function (err, results){
            if (err){
                throw err
            }

            res.json(results);
        })
    })
    .post(function(req, res){
        let userData = req.body
        let userObj = new User({
            email: userData.email,
            nickname: userData.nickname,
            password: sha512(userData.password),
            pokemon: {
                hp: userData.hp, 
                attack: userData.attack,
                defense: userData.defense,
                pokemonId: userData.pokemonId
            }
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

                res.status(201)
                res.json(userObj.toJSON())
            }
        })
    })

router.route('/:user')
    .get(function (req, res) {
        let userSearch = req.params.user
        
        User.findOne().where("nickname" == userSearch || "email" == userSearch).exec(function (err, result){
            if (err){
                throw err
            }

            if (!result){
                res.status(404)
                res.send('Usuario no encontrado')
            }

            if (result) {
                
                let userJSON = result.toJSON()
                delete userJSON.password

                res.json(userJSON)
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