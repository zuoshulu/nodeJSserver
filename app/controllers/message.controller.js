let db = require("../models/message.model");
let messages = db.messages; 
// Create and Save a new message
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }
    
    const id = req.params.id;
    let channels = messages[id];
    if (messages.hasOwnProperty(id)) {
        channels.push(req.body[id]);
    }
    res.send(messages);
};

// Retrieve all available channels.
exports.getAllChannels = (req, res) => {
    let channels = [];
    for (var channel in messages) {
        if (messages.hasOwnProperty(channel)) {
            channels.push(channel);
        }
    }
    res.send(channels);
};

// Get channal messages with an id
exports.getChannelMsg = (req, res) => {
    const id = req.params.id;
    res.send(messages[id]);
};