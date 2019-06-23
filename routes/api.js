const express = require('express');
const unirest = require('unirest');

const config = require('../config');

const router = express.Router();

router.use(require('../middleware/verifyToken'))

router.get('/players', (req, res) => {

    let name = req.query.name;
    console.log('Player', name, `${config.microservice.url}${config.microservice.player}${name}`)
    unirest.get(`${config.microservice.url}${config.microservice.player.byName}${name}`)
    .end((resp) => {
        console.log('response', resp.body);
        if(resp.error){
            res.status(500).json({
                msg: "An issue has occurred."
            })
        } else{
            res.status(200).json(resp.body)
        }
    })
});

module.exports = router;