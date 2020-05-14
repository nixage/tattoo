const express = require('express');
const path = require('path');

const server = express();

/* ===========================SERVER USE=========================== */
server.use(express.static(__dirname + '/dist/'))

/* ================================================================ */


server.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname + '/dist/index.min.html'))
});

server.listen(process.env.PORT || 4001); 
// server.listen(3001, function () {
//   console.log('Example app listening on port 3001');
// });

