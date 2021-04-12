const router = require('express').Router();
const { Workout } = require('../models');

router.get('/', async (req, res) => {
    res.render('index')
})

module.exports = router;