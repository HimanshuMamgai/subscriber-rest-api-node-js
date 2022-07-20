const express = require('express');
const router = express.Router();
const Subscriber = require('../models/subscribers');
const getSubscriber = require('../middleware/getSubscriber');

//Getting all
router.get('/', async (req, res) => {
    try {
        const subscribers = await Subscriber.find();
        res.status(200).json(subscribers);
    } catch(err) {
        res.status(500).json({message: err.message})
    }
});

//Getting one
router.get('/:id', getSubscriber, (req, res) => {
    res.status(200).json(res.subscriber.name);
});

//Creating one
router.post('/', async (req, res) => {
    const subscribers = new Subscriber({
        name: req.body.name,
        subscribedToChannel: req.body.subscribedToChannel
    });
    try {
        const newSubscriber = await subscribers.save();
        return res.status(201).json(newSubscriber);
    } catch(err) {
        return res.status(400).json({message: err.message});
    }
});

//Updating one
router.patch('/:id', getSubscriber, async (req, res) => {
    if(req.body.name != null) {
        res.subscriber.name = req.body.name;
    }
    if(req.body.subscribedToChannel != null) {
        res.subscriber.subscribedToChannel = req.body.subscribedToChannel;
    }
    try {
        const updatedSubscriber = await res.subscriber.save();
        res.status(201).json(updatedSubscriber);
    } catch(err) {
        res.status(400).json({message: err.message});
    }
});

//Deleting one
router.delete('/:id', getSubscriber, async (req, res) => {
    try {
        await res.subscriber.remove(); //mongodb method
        res.status(200).json('Subscriber Deleted!');
    } catch(err) {
        res.status(500).json({message: err.message});
    }
});

module.exports = router;