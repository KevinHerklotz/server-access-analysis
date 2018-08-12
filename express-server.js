const express = require('express');
const app = express();
const path = require('path');

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/src/epa.html'));
});
app.use(express.static(__dirname + '/src'));

app.listen(3000, () => console.log('...you can open http://localhost:3000/ now.'));
