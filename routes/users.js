const express = required('express')
const mongoose = required('mongoose')
const sha512 = required('js-sha512')
const router = express.Router()

let User = require('../models/User')

router.route('/')
