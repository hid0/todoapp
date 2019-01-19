'use strict'


var express = require('express')

var morgan = require('morgan')

var path = require('path')

var app = express()

var mongoose = require('mongoose')

var bodyParser = require('body-parser')

// butuh konfigurasi file untuk mendefinisikan di app/Config.js
var config = require('./app/Config')

// kenek databese
mongoose.connect(config.DB)

// mengirim file static dari public direktori
app.use(express.static(path.join(__dirname, '/public')))

// menggunakan morgan untuk nge-log request dalam mode dev
app.use(morgan('dev'))

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: true }))

var port = config.APP_PORT || 4000

app.listen(port) // listen port udah didefinisikan di config file

console.log('====================================')
console.log('App Listening on port ' + port)
console.log('====================================')

var todoRoutes = require('./app/Routes')

app.use('/api', todoRoutes)

app.use(function (req, res, next) {
    // web yang akan dpt kenek
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:' + port)

    // request method yang diperbolehkan
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')

    // request heeaders yang diperbolehkan
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')

    // pass untuk layer berikutnya pada middleware
    next()
})

// server index.html halaman ketika request ke root telah dibuat
app.get('/', function (req, res, next) {
    res.sendfile('./public/index.html')
})


