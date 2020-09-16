const server = require("./api/server");

// const port = process.env.PORT || 5003;
server.listen(5003, () => {
  console.log("It's up and running on port 5003");
});
