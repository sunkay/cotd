var express = require('express'),
    devices = require('./routes/devices.js');
 
var app = express();

app.configure(function () {
    app.use(express.bodyParser());
});

//Devices CRUD
app.get('/devices', devices.findAll);       // list
app.get('/devices/:id', devices.findById);  // find
app.post('/devices', devices.add);          // add new device
app.put('/devices/:id', devices.update);    // update
app.delete('/devices/:id', devices.delete); // delete

app.listen(3000);
console.log('Listening on port 3000...');


