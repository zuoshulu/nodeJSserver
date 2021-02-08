module.exports = app => {
    const message = require("../controllers/message.controller.js");
    
    var router = require("express").Router();
  
    // Create a new message
    router.post("/:id", message.create);
  
    // Retrieve all channels
    router.get("/channels", message.getAllChannels);
  
    // Retrieve all messages with channel id
    router.get("/messages/:id", message.getChannelMsg);
  
    app.use("/api", router);
  };
  