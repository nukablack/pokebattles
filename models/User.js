const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Pokemon = mongoose.model('Pokemon')

let userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    nickname: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    enabled: { type: Boolean, default: true },
    role: { type: String, default: 'user' },
    pokemon: {
        hp: { type: Number },
        attack: { type: Number },
        defense: { type: Number },
        pokemonId: { type: Schema.ObjectId, ref: "Pokemon"}
    },
    pokedex: [{type: Schema.ObjectId, ref: "Pokemon"}]
})

userSchema.set('toJSON', { getters: true, virtuals: false })

let UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;