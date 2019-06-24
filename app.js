const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')

const router = express.Router()
const app = express()
const dbConnStr = ""
const routePrefix = "/api/v1"

app.use(bodyParser.json())
app.use(cors())

let db = mongoose.connection;

db.on('error', function(){
    console.log('Error al conectarse con la base de datos.')
});
db.once('open', function(){
    console.log('Conectado a la base de datos')
})

mongoose.connect(dbConnStr, { useNewUrlParser: true, useFindAndModify: false })

app.listen(process.env.PORT || 8080, function(){
    console.log('Servidor activo en http://localhost:8080')
})