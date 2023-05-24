var express = require('express');
var router = express.Router();
var userHelper = require('../helpers/userHelpers')

/* GET home page. */
router.get('/', function (req, res, next) {
    if (req.session.user) {
        res.json(req.session.user)
    } else {
        req.session.user="nabeel"
        res.json(200)
    }
});
router.post('/signup', (req, res, next) => {
    userHelper.createUser(req.body).then((status, user) => {
        req.session.loggedIn = true
        req.session.user = user
        res.json(status)
    })
})
router.post('/login', (req, res, next) => {
    userHelper.validateUser(req.body).then((status) => {
        console.log(status);
        if (status == 200) {
            req.session.isLoggedIn = true;
            req.session.user = req.body.email
            console.log(req.session);
        }
        res.json(status)
    })
})
router.get('/profile', (req, res) => {
    res.json(req.session)
})

module.exports = router;
