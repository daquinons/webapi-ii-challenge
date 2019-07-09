import express from 'express';

const server = express();
server.use(express.json());

server.use("/api", (req, res) => {
  res.json({message: "API up and running"});
});

server.listen(4000, () => console.log("Server listening at port 4000"));