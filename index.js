const http = require('http');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const config = require('./config');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

app.use('/api', require('./routes/api'));

app.post('/login', (req, res) => {
    console.log(req.body);
    if(req.body.username == 'admin' && req.body.password == 'admin'){
        res.status(202).json({
            'name': 'admin',
            'token': jwt.sign({
                userId: 'admin'
            }, config.secret, {
                expiresIn: '2h'
            })
        })
    } else{
        res.status(401).json({
            message: "Authentication falied"
        });
    }
})

app.get('/', (req, res) => {
    res.json({
        ping: "pong"
    })
})

app.use('/', function(req, res){
    res.status(404).json({
        title: '404 Error'
    });
})

var port = process.env.PORT || 3000;

const server= http.createServer(app);
server.listen(port, ()=>{
    console.log('App running at port:', port)
});