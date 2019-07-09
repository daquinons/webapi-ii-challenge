const express = require('express');
const cors = require('cors');
const router =  require('./routes/api/');

const server = express();
server.use(express.json());
server.use(cors())
server.use(router);

server.listen(4000, () => console.log("Server listening at port 4000"));