const express = require('express');
const path = require('path');

var app = express();

app.use(express.static(path.join(__dirname, 'javascript')));
app.use(express.static(path.join(__dirname, 'styles')));
app.use(express.static(path.join(__dirname, 'assets')));

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname + '/views/index.html'))
});

app.get('/map', function(req, res){
    res.sendFile(path.join(__dirname + '/views/map.html'))
});

app.listen(3800);