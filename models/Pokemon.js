const mongoose = require('mongoose')
const Schema = mongoose.Schema

let pokemonSchema = new Schema({
    pokeId: { type: String, required: true },
    name: { type: String, required: true },
    types: [{ name: String }],
    sprites: {
        front: String,
        back: String
    },
    gifs: {
        front: String,
        back: String
    },
    footprint: { type: String, required: true },
    weight: { type: Number, required: true },
    height: { type: Number, required: true },
    hp: { type: Number, required: true },
    attack: { type: Number, required: true },
    defense: { type: Number, required: true }
})

pokemonSchema.set('toJSON', { getters: true, virtuals: false })

let PokemonModel = mongoose.model('Pokemon', pokemonSchema);

module.exports = PokemonModel;