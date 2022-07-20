const mongoose = require('mongoose');
const Subscriber = require('../models/subscribers');

//Middleware function
async function getSubscriber(req, res, next) {
    let subscriber;
    try {
        subscriber = await Subscriber.findById(req.params.id);
        if(subscriber == null) {
            res.status(400).json('Can\'t find any subscriber!');
        }
    } catch(err) {
        res.status(500).json({message: err.message});
    }
    res.subscriber = subscriber;
    next();
}

module.exports = getSubscriber;