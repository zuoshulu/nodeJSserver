var express = require('express');

const bodyParser = require("body-parser");
const cors = require("cors");

var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');

var schema = buildSchema(`
    type Message {
        channel1: [String]
        channel2: [String]
        channel3: [String]
    }
    type Query {
        channels: [String]
        messages: Message
    }
`);

// Load message data from a global variable (in-memory DB) 
const messages = require("./app/models/message.model"); 

var root = { 
    channels: () => ['channel1', 'channel2', 'channel3'],
    messages: () => {return messages;}
};
 
var app = express();

var corsOptions = {
    origin: "http://localhost:3000" // the port need to match the client's port, otherwise client call to the api will fail
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.json({ message: "Welcome to Zuoshu's Data Server." });
});

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

require("./app/routes/message.routes")(app);

app.listen(4000, () => 
console.log('localhost:4000/graphql for graphql access,\nlocalhost:4000/api/channels to see avaliable channels\nlocalhost:4000/api/messages/channel1 to see channel1`s messages'));